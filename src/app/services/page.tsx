import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { products } from '@/lib/products';
import { ServicesBrowser } from '@/components/store/services-browser';
import { ServicesIntro } from '@/components/store/services-intro';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Websites, logos, social media, flyers, apps, and video. Browse Maxora services with clear pricing and order online.',
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
      <ServicesIntro />

      <ServicesBrowser products={products} />

      <Reveal className="mt-16">
        <div className="facet-cut flex flex-col items-center gap-4 rounded-2xl border border-primary/25 bg-card px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="font-heading text-xl font-semibold">Not sure which package fits?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us your goal and budget. We&apos;ll recommend the right one, free.
            </p>
          </div>
          <Button asChild size="lg" className="glow shrink-0">
            <Link href="/contact">
              <MessageSquare className="size-4" />
              Ask Us
            </Link>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
