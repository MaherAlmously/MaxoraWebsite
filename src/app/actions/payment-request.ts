'use server';

import { randomUUID } from 'crypto';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { formatPrice } from '@/lib/products';
import { sendNotification } from '@/lib/web3forms';
import { getStripeClient } from '@/lib/stripe';

export type PaymentRequestState = { ok: boolean; error?: string } | null;

export async function submitPaymentRequest(
  _prev: PaymentRequestState,
  formData: FormData,
): Promise<PaymentRequestState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const note = String(formData.get('note') ?? '').trim();
  const amountRaw = String(formData.get('amount') ?? '').trim();

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Please enter your name and a valid email address.' };
  }
  const amount = Number(amountRaw);
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

  await sendNotification(`Payment request: ${formatPrice(amountCents)} from ${name}`, {
    from: `${name} <${email}>`,
    amount: formatPrice(amountCents),
    note: note || 'none',
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: amountCents,
          product_data: { name: note ? `Custom Payment — ${note}` : 'Custom Payment to Maxora' },
        },
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    customer_email: email,
    success_url: `${siteUrl}/pay/success`,
    cancel_url: `${siteUrl}/pay`,
    metadata: { payment_request_id: requestId },
  });

  if (!session.url) {
    console.error('[payment-request] Stripe session created without a URL', session.id);
    return { ok: false, error: 'Could not start payment. Please try again.' };
  }

  const { error: sessionUpdateError } = await createServiceClient()
    .from('payment_requests')
    .update({ stripe_session_id: session.id })
    .eq('id', requestId);
  if (sessionUpdateError) {
    console.error('[payment-request] failed to save stripe_session_id:', sessionUpdateError);
  }

  redirect(session.url);
}
