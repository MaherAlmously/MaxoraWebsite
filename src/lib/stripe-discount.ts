import { getStripeClient } from '@/lib/stripe';

type PromoResult =
  | { ok: true; promotionCodeId: string; discountedAmountCents: number }
  | { ok: false; error: string };

// One-time PaymentIntents have no coupon param, so the discount is applied
// to the amount up front. Subscriptions get the promotion code passed
// directly (see checkout.ts) so Stripe can track it as a recurring discount.
export async function applyPromoToAmount(code: string, amountCents: number): Promise<PromoResult> {
  const stripe = getStripeClient();
  const list = await stripe.promotionCodes.list({
    code,
    active: true,
    limit: 1,
    expand: ['data.promotion.coupon'],
  });
  const promo = list.data[0];
  if (!promo || promo.promotion.type !== 'coupon' || !promo.promotion.coupon) {
    return { ok: false, error: 'That promo code is invalid or expired.' };
  }
  const coupon = promo.promotion.coupon;
  if (typeof coupon === 'string') {
    return { ok: false, error: 'That promo code is invalid or expired.' };
  }
  let discounted = amountCents;
  if (coupon.percent_off) {
    discounted = Math.round(amountCents * (1 - coupon.percent_off / 100));
  } else if (coupon.amount_off) {
    discounted = Math.max(0, amountCents - coupon.amount_off);
  }
  return { ok: true, promotionCodeId: promo.id, discountedAmountCents: discounted };
}

export async function findPromotionCodeId(code: string): Promise<string | null> {
  const stripe = getStripeClient();
  const list = await stripe.promotionCodes.list({ code, active: true, limit: 1 });
  return list.data[0]?.id ?? null;
}
