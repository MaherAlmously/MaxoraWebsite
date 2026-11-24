import type { Metadata } from 'next';
import { BLACK_FRIDAY } from '@/lib/promo';
import { BlackFridayContent } from '@/components/promo/black-friday-content';

export const metadata: Metadata = {
  title: 'Black Friday — 50% Off Web & App Development',
  description: `${BLACK_FRIDAY.discount} on new website and application builds, ${BLACK_FRIDAY.window}. ${BLACK_FRIDAY.subhead}`,
  // A dated promo page shouldn't keep collecting search equity once it expires.
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Black Friday — 50% Off Web & App Development | Maxora',
    description: `${BLACK_FRIDAY.discount} on new website and application builds, ${BLACK_FRIDAY.window}.`,
    images: [{ url: BLACK_FRIDAY.image, alt: BLACK_FRIDAY.imageAlt }],
  },
};

export default function BlackFridayPage() {
  return <BlackFridayContent />;
}
