'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, X } from 'lucide-react';
import { BLACK_FRIDAY, promoDismissalKey } from '@/lib/promo';
import { usePromoActive } from '@/components/promo/use-promo';
import { PromoCountdown } from '@/components/promo/promo-countdown';
import { promoFromPrices } from '@/components/promo/promo-prices';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

const OPEN_DELAY_MS = 2500;

// Routes where an overlay would get in the way rather than help.
const SUPPRESSED = ['/black-friday', '/checkout', '/pay'];

export function BlackFridayPopup() {
  const pathname = usePathname();
  const active = usePromoActive(BLACK_FRIDAY);
  const [open, setOpen] = useState(false);
  const suppressed = SUPPRESSED.some((route) => pathname.startsWith(route));

  useEffect(() => {
    if (!active || suppressed) return;

    let dismissed = false;
    try {
      dismissed = localStorage.getItem(promoDismissalKey(BLACK_FRIDAY)) === 'dismissed';
    } catch {
      // Storage blocked (private mode, hardened browser): treat as not dismissed
      // but still only show once per page load.
    }
    if (dismissed) return;

    const id = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [active, suppressed]);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      try {
        localStorage.setItem(promoDismissalKey(BLACK_FRIDAY), 'dismissed');
      } catch {
        // Nothing to do; the popup simply reappears on the next visit.
      }
    }
  }

  if (!active || suppressed) return null;

  // Safe to read the clock here: `active` is only true after hydration.
  const from = promoFromPrices();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* No facet-cut here: the clip-path would cut the corner off the artwork
          and the close button. gap-0 undoes the popup's default grid gap. */}
      <DialogContent
        showCloseButton={false}
        className="bg-bf-ink text-bf-bone border-bf-gold/25 w-[calc(100%-1.5rem)] max-w-xl gap-0 overflow-hidden rounded-3xl border p-0 shadow-2xl shadow-black/60 ring-0 sm:max-w-2xl"
      >
        {/* Ember wash behind everything, so the obsidian ground is not flat. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(120% 90% at 8% 0%, oklch(0.5 0.2 25 / 55%) 0%, transparent 58%), radial-gradient(90% 80% at 100% 100%, oklch(0.66 0.19 38 / 32%) 0%, transparent 60%)',
          }}
        />

        <button
          type="button"
          onClick={() => handleOpenChange(false)}
          aria-label="Close offer"
          className="text-bf-bone/70 hover:text-bf-bone focus-visible:ring-bf-gold/60 absolute top-3 right-3 z-20 rounded-full bg-black/40 p-2 backdrop-blur-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <X className="size-4" />
        </button>

        <div className="relative grid max-h-[85dvh] overflow-y-auto sm:max-h-none sm:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)]">
          {/* Flyer panel. object-contain so the 3:4 artwork is never cropped or
              stretched; it letterboxes against the obsidian ground instead. */}
          <div className="relative flex items-center justify-center bg-black/35 p-4">
            <Image
              src={BLACK_FRIDAY.image}
              alt={BLACK_FRIDAY.imageAlt}
              width={1086}
              height={1448}
              sizes="(min-width: 640px) 18rem, 70vw"
              priority={false}
              className="h-auto max-h-40 w-auto rounded-lg object-contain shadow-lg shadow-black/50 sm:max-h-[21rem] sm:w-full"
            />
          </div>

          {/* The perforation is the one structural flourish, and it is what a
              voucher actually has. It rides on the content panel's own edge so
              it lands exactly on the seam at every width: horizontal when the
              panels stack, vertical when they sit side by side. */}
          <div className="border-bf-gold/25 relative flex flex-col gap-4 border-t border-dashed p-6 sm:border-t-0 sm:border-l sm:p-7">
            <div>
              <p className="text-bf-gold/80 text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
                {BLACK_FRIDAY.name} · {BLACK_FRIDAY.window}
              </p>
              <DialogTitle className="mt-3 font-heading text-3xl leading-[0.95] font-semibold tracking-tight sm:text-4xl">
                <span className="text-foil inline-block text-6xl leading-none sm:text-7xl">50%</span>
                <span className="mt-1 block">off web &amp; app builds</span>
              </DialogTitle>
              <DialogDescription className="text-bf-bone/70 mt-3 text-sm text-pretty">
                Websites from <span className="text-bf-bone font-semibold">{from.web}</span> and
                apps from <span className="text-bf-bone font-semibold">{from.app}</span>. Fixed
                scope, paid online, no subscription.
              </DialogDescription>
            </div>

            <PromoCountdown size="sm" />

            <div className="mt-1 flex flex-col gap-2">
              <Button
                asChild
                size="lg"
                className="glow-ember bg-bf-ember hover:bg-bf-ember/90 w-full border-0 text-white"
              >
                <Link href={BLACK_FRIDAY.href} onClick={() => handleOpenChange(false)}>
                  {BLACK_FRIDAY.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-bf-bone/80 hover:bg-bf-bone/10 hover:text-bf-bone w-full"
              >
                <Link
                  href="/services/web-development"
                  onClick={() => handleOpenChange(false)}
                >
                  See the packages
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
