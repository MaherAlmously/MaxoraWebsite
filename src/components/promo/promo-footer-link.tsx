'use client';

import Link from 'next/link';
import { BLACK_FRIDAY } from '@/lib/promo';
import { usePromoActive } from '@/components/promo/use-promo';

/** Footer entry that exists only while the campaign is running. */
export function PromoFooterLink() {
  const active = usePromoActive(BLACK_FRIDAY);
  if (!active) return null;

  return (
    <Link
      href={BLACK_FRIDAY.href}
      className="text-primary hover:text-foreground font-medium transition-colors"
    >
      {BLACK_FRIDAY.name} · {BLACK_FRIDAY.discount}
    </Link>
  );
}
