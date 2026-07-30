'use server';

import { randomUUID } from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { sendNotification, sendConfirmation } from '@/lib/resend';
import { formatPrice } from '@/lib/products';
import { getStripeClient } from '@/lib/stripe';
import { applyPromoToAmount } from '@/lib/stripe-discount';

export type PaymentRequestState =
  | { ok: true; requestId: string; clientSecret: string }
  | { ok: false; error: string }
  | null;

export type PaymentRequestInput = {
  name: string;
  email: string;
  note?: string;
  amount: number;
  promoCode?: string;
};

export async function submitPaymentRequest(input: PaymentRequestInput): Promise<PaymentRequestState> {
  const name = input.name.trim();
  const email = input.email.trim();
  const note = input.note?.trim() ?? '';

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Please enter your name and a valid email address.' };
  }
  const amount = input.amount;
  if (!Number.isFinite(amount) || amount <= 0 || amount > 100000) {
    return { ok: false, error: 'Please enter a valid amount between $1 and $100,000.' };
  }
  const amountCents = Math.round(amount * 100);

  // Generated here because RLS blocks .select() returning rows for guests.
  const requestId = randomUUID();

  const supabase = await createClient();
  const { error } = await supabase
    .from('payment_requests')
    .insert({ id: requestId, name, email, amount_cents: amountCents, note: note || null });
  if (error) {
    console.error('[payment-request] insert failed:', error);
    return { ok: false, error: 'Something went wrong submitting your payment. Please try again.' };
  }

  void sendNotification(`Payment request: ${formatPrice(amountCents)} from ${name}`, {
    from: `${name} <${email}>`,
    amount: formatPrice(amountCents),
    note: note || 'none',
  });

  void sendConfirmation(email, {
    subject: 'We received your payment request',
    heading: `Thanks, ${name.split(' ')[0]}`,
    message: `We've received your payment request for ${formatPrice(amountCents)} and the Maxora team will follow up shortly.`,
  });

  const promoCode = input.promoCode?.trim() ?? '';
  let paymentIntent;
  try {
    let finalAmountCents = amountCents;
    if (promoCode) {
      const promo = await applyPromoToAmount(promoCode, amountCents);
      if (!promo.ok) {
        return { ok: false, error: promo.error };
      }
      finalAmountCents = promo.discountedAmountCents;
    }

    const stripe = getStripeClient();
    paymentIntent = await stripe.paymentIntents.create({
      amount: Math.max(finalAmountCents, 50),
      currency: 'usd',
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
      metadata: { payment_request_id: requestId },
    });
  } catch (err) {
    console.error('[payment-request] Stripe payment creation failed:', err);
    const message = err instanceof Error ? err.message : 'Could not start payment. Please try again.';
    return { ok: false, error: message };
  }

  if (!paymentIntent.client_secret) {
    console.error('[payment-request] Stripe payment created without a client secret', paymentIntent.id);
    return { ok: false, error: 'Could not start payment. Please try again.' };
  }

  const { error: sessionUpdateError } = await createServiceClient()
    .from('payment_requests')
    .update({ stripe_session_id: paymentIntent.id })
    .eq('id', requestId);
  if (sessionUpdateError) {
    console.error('[payment-request] failed to save stripe_session_id:', sessionUpdateError);
  }

  return { ok: true, requestId, clientSecret: paymentIntent.client_secret };
}
