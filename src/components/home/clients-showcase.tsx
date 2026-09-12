import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { ClientsMarquee } from '@/components/home/clients-marquee';

export function ClientsShowcase() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Who we've worked with"
          title="Businesses that trusted us to build for them"
        />
      </div>

      <Reveal>
        <ClientsMarquee />
      </Reveal>

      <Reveal className="mt-10 text-center">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          See the work behind a few of these
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </section>
  );
}
