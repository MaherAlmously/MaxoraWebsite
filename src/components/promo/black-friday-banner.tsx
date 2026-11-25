'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Tag } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { BLACK_FRIDAY } from '@/lib/promo';
import { usePromoActive } from '@/components/promo/use-promo';
import { PromoCountdown } from '@/components/promo/promo-countdown';
import { promoFromPrices } from '@/components/promo/promo-prices';
import { Button } from '@/components/ui/button';
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
  // Only mounted once the promo is confirmed live, so reading the clock is safe.
  const from = promoFromPrices();
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
        className="bg-bf-ink text-bf-bone border-bf-gold/20 relative overflow-hidden rounded-3xl border px-6 py-10 sm:px-10 sm:py-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(85% 90% at 2% 0%, oklch(0.5 0.2 25 / 45%) 0%, transparent 60%), radial-gradient(70% 80% at 100% 100%, oklch(0.66 0.19 38 / 26%) 0%, transparent 62%)',
          }}
        />
        <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <p className="text-bf-gold/80 mb-4 flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
              <Tag className="size-3.5" />
              {BLACK_FRIDAY.name} · {BLACK_FRIDAY.window}
            </p>
            <h2 className="font-heading font-semibold tracking-tight text-balance">
              <span className="text-foil inline-block text-6xl leading-[0.85] sm:text-7xl">50%</span>
              <span className="mt-1.5 block text-2xl sm:text-3xl">
                off web &amp; app development
              </span>
            </h2>
            <p className="text-bf-bone/70 mt-4 max-w-md text-balance">
              Websites from <span className="text-bf-bone font-semibold">{from.web}</span>, apps
              from <span className="text-bf-bone font-semibold">{from.app}</span>.{' '}
              {BLACK_FRIDAY.subhead}
            </p>

            <PromoCountdown className="mt-7" />

            <div className="mt-8">
              <MagneticButton>
                <Button
                  asChild
                  size="lg"
                  className="glow-ember bg-bf-ember hover:bg-bf-ember/90 border-0 text-white"
                >
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
            className="border-bf-gold/25 relative mx-auto hidden w-full max-w-60 overflow-hidden rounded-xl border shadow-xl shadow-black/40 transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] hover:scale-[1.02] lg:block"
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
