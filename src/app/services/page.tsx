import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { services } from '@/lib/services';
import { ServiceCard } from '@/components/services/service-card';
import { Process } from '@/components/home/process';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import { BlackFridayBanner } from '@/components/promo/black-friday-banner';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Web development, app development for mobile, desktop, and cross-platform, and monthly maintenance packages. Tell us what you need built and we will scope it.',
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
      <div className="max-w-2xl">
        <p className="eyebrow mb-3">Services</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Software built <span className="text-gradient">around your business.</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Three things, done properly: we build your website, we build your app, and we keep both
          running afterwards. Tell us what you need and we&apos;ll scope it before any work starts.
        </p>
      </div>

      <BlackFridayBanner className="max-w-none px-0 pb-0 sm:px-0" />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Reveal key={service.slug}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <Process />
      </div>

      <Reveal className="mt-6">
        <div className="facet-cut flex flex-col items-center gap-4 rounded-2xl border border-primary/25 bg-card px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="font-heading text-xl font-semibold">Not sure what you need?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us the problem. We&apos;ll figure out the software.
            </p>
          </div>
          <Button asChild size="lg" className="glow shrink-0">
            <Link href="/contact">
              <MessageSquare className="size-4" />
              Tell Us What You Need
            </Link>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
