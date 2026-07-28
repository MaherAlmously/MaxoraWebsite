'use server';

import { randomUUID } from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { getTier, formatPrice } from '@/lib/products';
import { getStripeClient } from '@/lib/stripe';
import { applyPromoToAmount, findPromotionCodeId } from '@/lib/stripe-discount';
import type Stripe from 'stripe';

export type CheckoutItemInput = {
  productSlug: string;
  productName: string;
  tierId: string;
  quantity: number;
};

export type CheckoutInput = {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  notes?: string;
  promoCode?: string;
  items: CheckoutItemInput[];
};

export type CheckoutResult =
  | {
      ok: true;
      orderId: string;
      clientSecret: string;
      notify: { subject: string; fields: Record<string, string | number> };
    }
  | { ok: false; error: string };

export async function placeOrder(input: CheckoutInput): Promise<CheckoutResult> {
  const name = input.customerName?.trim();
  const email = input.customerEmail?.trim();
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Please enter your name and a valid email address.' };
  }
  if (!input.items?.length) {
    return { ok: false, error: 'Your cart is empty.' };
  }

  // Re-validate every line against the canonical catalog, never trust client prices.
  const lines = [];
  for (const item of input.items) {
    const tier = getTier(item.productSlug, item.tierId);
    const quantity = Math.floor(item.quantity);
    if (!tier || quantity < 1 || quantity > 20) {
      return { ok: false, error: 'Your cart contains an invalid item. Please rebuild it.' };
    }
    lines.push({
      product_slug: item.productSlug,
      product_name: item.productName,
      tier_id: tier.id,
      tier_name: tier.name,
      unit_price_cents: tier.priceCents,
      quantity,
    });
  }
  const totalCents = lines.reduce((n, l) => n + l.unit_price_cents * l.quantity, 0);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Generated here because RLS blocks .select() returning rows for guests.
  const orderId = randomUUID();

  const { error: orderError } = await supabase.from('orders').insert({
    id: orderId,
    user_id: user?.id ?? null,
    customer_name: name,
    customer_email: email,
    customer_phone: input.customerPhone?.trim() || null,
    notes: input.notes?.trim() || null,
    total_cents: totalCents,
  });
  if (orderError) {
    console.error('[checkout] order insert failed:', orderError);
    return { ok: false, error: 'Something went wrong placing your order. Please try again.' };
  }

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(lines.map((l) => ({ ...l, order_id: orderId })));
  if (itemsError) {
    console.error('[checkout] order items insert failed:', itemsError);
    return { ok: false, error: 'Something went wrong placing your order. Please try again.' };
  }

  // Web3Forms' free plan rejects server-side requests, so the actual email
  // send happens client-side after this action returns; we just build the payload here.
  const notify = {
    subject: `New order: ${formatPrice(totalCents)} from ${name}`,
    fields: {
      order_id: orderId,
      customer: `${name} <${email}>`,
      phone: input.customerPhone || 'not provided',
      total: formatPrice(totalCents),
      items: lines
        .map((l) => `${l.product_name} (${l.tier_name}) x${l.quantity} at ${formatPrice(l.unit_price_cents)}`)
        .join('; '),
      notes: input.notes || 'none',
    },
  };

  const isSubscription = input.items.some((i) => getTier(i.productSlug, i.tierId)?.billing === 'monthly');
  const promoCode = input.promoCode?.trim();

  let clientSecret: string | null | undefined;
  let referenceId: string | undefined;

  try {
    const stripe = getStripeClient();

    let promotionCodeId: string | null = null;
    if (promoCode) {
      const promo = await findPromotionCodeId(promoCode);
      if (!promo) {
        return { ok: false, error: 'That promo code is invalid or expired.' };
      }
      promotionCodeId = promo;
    }

    if (isSubscription) {
      const recurringLines = lines.filter((l) => getTier(l.product_slug, l.tier_id)!.billing === 'monthly');
      const oneTimeLines = lines.filter((l) => getTier(l.product_slug, l.tier_id)!.billing !== 'monthly');

      const customer = await stripe.customers.create({ name, email, metadata: { order_id: orderId } });

      // Subscription items need a real Product id (unlike Checkout/PaymentIntent
      // price_data, which allow inline product_data), so create one per line.
      const recurringItems = await Promise.all(
        recurringLines.map(async (l) => {
          const product = await stripe.products.create({ name: `${l.product_name}: ${l.tier_name}` });
          return {
            price_data: {
              currency: 'usd',
              unit_amount: l.unit_price_cents,
              recurring: { interval: 'month' as const },
              product: product.id,
            },
            quantity: l.quantity,
          };
        }),
      );

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.confirmation_secret'],
        metadata: { order_id: orderId },
        items: recurringItems,
        ...(oneTimeLines.length
          ? {
              add_invoice_items: await Promise.all(
                oneTimeLines.map(async (l) => {
                  const product = await stripe.products.create({
                    name: `${l.product_name}: ${l.tier_name}`,
                  });
                  return {
                    price_data: {
                      currency: 'usd',
                      unit_amount: l.unit_price_cents,
                      product: product.id,
                    },
                    quantity: l.quantity,
                  };
                }),
              ),
            }
          : {}),
        ...(promotionCodeId ? { discounts: [{ promotion_code: promotionCodeId }] } : {}),
      });

      const invoice = subscription.latest_invoice as Stripe.Invoice | null;
      clientSecret = invoice?.confirmation_secret?.client_secret;
      referenceId = subscription.id;
    } else {
      let amountCents = totalCents;
      if (promoCode) {
        const promo = await applyPromoToAmount(promoCode, totalCents);
        if (!promo.ok) {
          return { ok: false, error: promo.error };
        }
        amountCents = promo.discountedAmountCents;
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.max(amountCents, 50),
        currency: 'usd',
        receipt_email: email,
        automatic_payment_methods: { enabled: true },
        metadata: { order_id: orderId },
      });
      clientSecret = paymentIntent.client_secret;
      referenceId = paymentIntent.id;
    }
  } catch (err) {
    console.error('[checkout] Stripe payment creation failed:', err);
    const message = err instanceof Error ? err.message : 'Could not start payment. Please try again.';
    return { ok: false, error: message };
  }

  if (!clientSecret) {
    console.error('[checkout] Stripe payment created without a client secret', orderId);
    return { ok: false, error: 'Could not start payment. Please try again.' };
  }

  // orders has no client-facing UPDATE policy, so this uses the service role,
  // which is safe here: orderId was just generated in this request, not user input.
  const { error: sessionUpdateError } = await createServiceClient()
    .from('orders')
    .update({ stripe_session_id: referenceId })
    .eq('id', orderId);
  if (sessionUpdateError) {
    console.error('[checkout] failed to save stripe_session_id:', sessionUpdateError);
  }

  return { ok: true, orderId, clientSecret, notify };
}
