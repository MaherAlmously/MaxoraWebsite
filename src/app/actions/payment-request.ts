'use server';

import { createClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/products';
import { sendNotification } from '@/lib/web3forms';

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

  const supabase = await createClient();
  const { error } = await supabase.from('payment_requests').insert({
    name,
    email,
    amount_cents: amountCents,
    note: note || null,
  });
  if (error) {
    console.error('[payment-request] insert failed:', error);
    return { ok: false, error: 'Something went wrong submitting your payment. Please try again.' };
  }

  await sendNotification(`Payment request: ${formatPrice(amountCents)} from ${name}`, {
    from: `${name} <${email}>`,
    amount: formatPrice(amountCents),
    note: note || 'none',
  });

  return { ok: true };
}
