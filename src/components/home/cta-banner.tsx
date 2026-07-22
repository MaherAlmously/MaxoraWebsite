import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
      <Reveal>
        <div className="facet-cut relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-card via-card to-primary/10 px-6 py-16 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          />
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Start your project today
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-balance text-muted-foreground">
            Order a package online in minutes, or send us your idea and get a free quote within 24
            hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="glow">
              <Link href="/services">
                Browse Services
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
