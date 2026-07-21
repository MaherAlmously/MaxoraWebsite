'use server';

import { randomUUID } from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { getTier, formatPrice } from '@/lib/products';
import { sendNotification } from '@/lib/web3forms';
import { getStripeClient } from '@/lib/stripe';
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
  items: CheckoutItemInput[];
};

export type CheckoutResult =
  | { ok: true; orderId: string; checkoutUrl: string }
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

  await sendNotification(`New order: ${formatPrice(totalCents)} from ${name}`, {
    order_id: orderId,
    customer: `${name} <${email}>`,
    phone: input.customerPhone || 'not provided',
    total: formatPrice(totalCents),
    items: lines
      .map((l) => `${l.product_name} (${l.tier_name}) x${l.quantity} at ${formatPrice(l.unit_price_cents)}`)
      .join('; '),
    notes: input.notes || 'none',
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
  const isSubscription = input.items.some((i) => getTier(i.productSlug, i.tierId)?.billing === 'monthly');

  const stripeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = lines.map((l) => {
    const tier = getTier(l.product_slug, l.tier_id)!;
    const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
      currency: 'usd',
      unit_amount: l.unit_price_cents,
      product_data: { name: `${l.product_name} — ${l.tier_name}` },
    };
    if (tier.billing === 'monthly') {
      priceData.recurring = { interval: 'month' };
    }
    return { price_data: priceData, quantity: l.quantity };
  });

  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: isSubscription ? 'subscription' : 'payment',
    line_items: stripeLineItems,
    customer_email: email,
    client_reference_id: orderId,
    success_url: `${siteUrl}/checkout/success?order=${orderId}`,
    cancel_url: `${siteUrl}/checkout`,
    metadata: { order_id: orderId },
    ...(isSubscription ? { subscription_data: { metadata: { order_id: orderId } } } : {}),
  });

  if (!session.url) {
    console.error('[checkout] Stripe session created without a URL', session.id);
    return { ok: false, error: 'Could not start payment. Please try again.' };
  }

  // orders has no client-facing UPDATE policy, so this uses the service role,
  // which is safe here: orderId was just generated in this request, not user input.
  const { error: sessionUpdateError } = await createServiceClient()
    .from('orders')
    .update({ stripe_session_id: session.id })
    .eq('id', orderId);
  if (sessionUpdateError) {
    console.error('[checkout] failed to save stripe_session_id:', sessionUpdateError);
  }

  return { ok: true, orderId, checkoutUrl: session.url };
}
