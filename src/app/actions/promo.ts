'use server';

import { applyPromoToAmount } from '@/lib/stripe-discount';

export type PromoPreviewResult =
  | { ok: true; discountedAmountCents: number }
  | { ok: false; error: string };

export async function previewPromoCode(code: string, amountCents: number): Promise<PromoPreviewResult> {
  const trimmed = code.trim();
  if (!trimmed) return { ok: false, error: 'Enter a code first.' };
  const result = await applyPromoToAmount(trimmed, amountCents);
  if (!result.ok) return result;
  return { ok: true, discountedAmountCents: result.discountedAmountCents };
}
