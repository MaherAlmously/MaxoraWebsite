'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { Rocket, ShieldCheck, Timer, Wallet } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

const stats = [
  { value: 50, suffix: '+', label: 'Projects delivered' },
  { value: 7, suffix: ' days', label: 'Average turnaround' },
  { value: 92, suffix: '%', label: 'On track' },
  { value: 24, suffix: '/7', label: 'Support access' },
];

const features = [
  {
    icon: Wallet,
    title: 'Clear, upfront pricing',
    text: 'Every package has a listed price. No surprise invoices, no hidden fees.',
  },
  {
    icon: Timer,
    title: 'Fast turnaround',
    text: 'Most projects ship within days, not months, without cutting corners.',
  },
  {
    icon: Rocket,
    title: 'Built to convert',
    text: 'Design decisions driven by what makes visitors become customers.',
  },
  {
    icon: ShieldCheck,
    title: 'You own everything',
    text: 'Full ownership of your files, your site, and your brand assets.',
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="font-heading text-2xl font-semibold text-gradient sm:text-3xl">
      {display}
      {suffix}
    </span>
  );
}

export function WhyUs() {
  return (
    <section className="border-y border-border bg-card/30 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Maxora"
          title="An agency that works like a product"
          description="Fixed packages, real deadlines, and work you can check at every step. You always know what you pay and what you get."
        />

        <Reveal>
          <div className="facet-cut flex flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-xl border border-border bg-card px-6 py-6 sm:gap-x-10">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-x-8 sm:gap-x-10">
                <div className="flex items-baseline gap-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                {i < stats.length - 1 && (
                  <span className="hidden h-6 w-px bg-border sm:block" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.08}>
              <div className="facet-cut h-full rounded-xl border border-border bg-card p-6">
                <feature.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-heading font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
