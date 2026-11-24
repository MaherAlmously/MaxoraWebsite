'use client';

import { useEffect, useState } from 'react';
import { isPromoActive, promoTimeLeft, type Promo, type PromoCountdown } from '@/lib/promo';

// Every page on this site is statically generated, so a promo evaluated during
// render would freeze whatever `new Date()` returned at build time and never
// expire. These hooks resolve the window on the client after mount instead, the
// same "stay null until hydrated" shape the cart uses for localStorage.

/** `null` until resolved on the client; then `true`/`false`. */
export function usePromoActive(promo: Promo): boolean | null {
  const [active, setActive] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setActive(isPromoActive(promo));
    check();
    // A visitor can sit on the page across the cutoff; re-check each minute.
    const id = window.setInterval(check, 60_000);
    return () => window.clearInterval(id);
  }, [promo]);

  return active;
}

/** `null` until resolved on the client. Ticks every second. */
export function usePromoCountdown(promo: Promo): PromoCountdown | null {
  const [left, setLeft] = useState<PromoCountdown | null>(null);

  useEffect(() => {
    const tick = () => setLeft(promoTimeLeft(promo));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [promo]);

  return left;
}
