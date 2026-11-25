import { BLACK_FRIDAY, cheapestLivePrice } from '@/lib/promo';
import { formatPrice, getProduct } from '@/lib/products';

/**
 * "Websites from $X, apps from $Y" for campaign copy, read out of the catalog
 * instead of typed into the sentence, so the headline can never quote a price
 * the catalog no longer has.
 *
 * Not a hook despite what it feeds: it reads the clock, so it must only be
 * called from code that already runs on the client. Every caller sits behind
 * `usePromoActive`, which is false until hydration.
 */
export function promoFromPrices(): { web: string; app: string } {
  const now = new Date();
  const webTiers = getProduct('website-development')?.tiers ?? [];
  const appTiers = getProduct('app-development')?.tiers ?? [];
  return {
    web: formatPrice(cheapestLivePrice(webTiers, BLACK_FRIDAY, now)),
    app: formatPrice(cheapestLivePrice(appTiers, BLACK_FRIDAY, now)),
  };
}
