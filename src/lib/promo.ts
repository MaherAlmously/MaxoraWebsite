// Time-boxed promotions. Everything about a campaign (dates, copy, artwork)
// lives here so the banner, the popup, and the landing page can never disagree.
//
// Dates carry an explicit UTC offset rather than a bare date string, so the
// window means the same thing whatever timezone the server happens to run in.
// -06:00 is America/Chicago in November (CST), where the business operates.

export type Promo = {
  /** Stable id; also the localStorage dismissal key suffix. Bump it for a new campaign. */
  id: string;
  name: string;
  /** Inclusive start. */
  start: Date;
  /** Exclusive end, so the last advertised day is covered in full. */
  end: Date;
  /** Human-readable window, as printed on the flyer. */
  window: string;
  discount: string;
  headline: string;
  subhead: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
};

export const BLACK_FRIDAY: Promo = {
  id: 'bf-2026',
  name: 'Black Friday',
  start: new Date('2026-11-24T00:00:00-06:00'),
  end: new Date('2026-12-01T00:00:00-06:00'),
  window: 'Nov 24 – Nov 30',
  discount: '50% OFF',
  headline: 'Black Friday: 50% off web & mobile development',
  subhead: 'Turn your idea into a real product.',
  href: '/black-friday',
  cta: 'Explore Offer',
  image: '/promos/black-friday-2026.png',
  imageAlt: 'Maxora Tech Black Friday offer: 50% off web and mobile development, Nov 24 to Nov 30',
};

export function isPromoActive(promo: Promo, now: Date = new Date()): boolean {
  return now >= promo.start && now < promo.end;
}

export function hasPromoEnded(promo: Promo, now: Date = new Date()): boolean {
  return now >= promo.end;
}

export type PromoCountdown = { days: number; hours: number; minutes: number; seconds: number };

/** Time left until the promo closes. Clamped at zero so it never counts backwards. */
export function promoTimeLeft(promo: Promo, now: Date = new Date()): PromoCountdown {
  const ms = Math.max(0, promo.end.getTime() - now.getTime());
  const totalSeconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export const promoDismissalKey = (promo: Promo) => `maxora-promo-${promo.id}`;
