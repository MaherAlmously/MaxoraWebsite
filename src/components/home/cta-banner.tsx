'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { AmbientGlow } from '@/components/ambient-glow';
import { MagneticButton } from '@/components/magnetic-button';

const points = ['Fixed, upfront pricing', 'Most projects ship in days', '24/7 support access'];

export function CtaBanner() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.35'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-(--section-py-sm) sm:px-6">
      <motion.div
        ref={ref}
        style={reduce ? undefined : { scale, opacity }}
        className="facet-cut relative overflow-hidden rounded-3xl border border-primary/25 bg-card px-6 py-14 sm:px-12 sm:py-20"
      >
        <AmbientGlow />
        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4">Ready when you are</p>
            <h2 className="text-display-sm font-heading font-semibold text-balance">
              Start your project today
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground text-balance">
              Order a package online in minutes, or send us your idea and get a free quote within
              24 hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton>
                <Button asChild size="lg" className="glow">
                  <Link href="/services">
                    Browse Services
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </MagneticButton>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
            </div>
          </div>

          <ul className="space-y-4 border-t border-border/60 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm font-medium">
                <span className="glow size-1.5 shrink-0 rounded-full bg-primary" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
