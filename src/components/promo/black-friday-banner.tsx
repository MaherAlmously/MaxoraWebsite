'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Tag } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { BLACK_FRIDAY } from '@/lib/promo';
import { usePromoActive } from '@/components/promo/use-promo';
import { PromoCountdown } from '@/components/promo/promo-countdown';
import { Button } from '@/components/ui/button';
import { AmbientGlow } from '@/components/ambient-glow';
import { MagneticButton } from '@/components/magnetic-button';
import { cn } from '@/lib/utils';

/**
 * In-flow promo band, deliberately not a fixed top strip: the navbar is
 * `fixed top-0` and every page clears it with `pt-32`, so a sticky bar would
 * mean re-spacing the whole site for one week.
 *
 * The campaign window resolves after hydration, so the gate lives out here and
 * the scroll-linked body is a separate component. Keeping `useScroll` inside a
 * component that only mounts once the banner is real means its target ref is
 * attached when the listener is set up, rather than still being null.
 */
export function BlackFridayBanner({ className }: { className?: string }) {
  const active = usePromoActive(BLACK_FRIDAY);
  if (!active) return null;
  return <BannerBody className={className} />;
}

function BannerBody({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.5'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <section className={cn('mx-auto max-w-6xl px-4 py-(--section-py-sm) sm:px-6', className)}>
      <motion.div
        ref={ref}
        style={reduce ? undefined : { scale, opacity }}
        className="facet-cut border-primary/35 bg-card relative overflow-hidden rounded-3xl border px-6 py-10 sm:px-10 sm:py-12"
      >
        <AmbientGlow />
        <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-2">
              <Tag className="size-3.5" />
              {BLACK_FRIDAY.name} · {BLACK_FRIDAY.window}
            </p>
            <h2 className="text-display-sm font-heading font-semibold text-balance">
              <span className="text-gradient">50% off</span> web &amp; mobile development
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md text-balance">
              Half price on new website and app builds started during Black Friday week.{' '}
              {BLACK_FRIDAY.subhead}
            </p>

            <PromoCountdown className="mt-7" />

            <div className="mt-8">
              <MagneticButton>
                <Button asChild size="lg" className="glow">
                  <Link href={BLACK_FRIDAY.href}>
                    {BLACK_FRIDAY.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </div>

          <Link
            href={BLACK_FRIDAY.href}
            aria-hidden
            tabIndex={-1}
            className="facet-cut-sm border-primary/25 relative mx-auto hidden w-full max-w-60 overflow-hidden rounded-xl border transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] hover:scale-[1.02] lg:block"
          >
            <Image
              src={BLACK_FRIDAY.image}
              alt=""
              width={1086}
              height={1448}
              sizes="240px"
              className="h-auto w-full"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
