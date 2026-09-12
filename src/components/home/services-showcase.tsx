import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/services';
import { ServiceCard } from '@/components/services/service-card';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';

export function ServicesShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="What we do"
        title="Three ways we help your business run better"
        description="Tell us the problem. We'll figure out whether it's custom software, automation, or an app, and build it."
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.1}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/services">
            View All Services
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Reveal>
    </section>
  );
}
