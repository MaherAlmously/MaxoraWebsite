'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { BLACK_FRIDAY, promoDismissalKey } from '@/lib/promo';
import { usePromoActive } from '@/components/promo/use-promo';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="facet-cut border-primary/30 bg-card overflow-hidden border p-0 sm:max-w-md">
        <Image
          src={BLACK_FRIDAY.image}
          alt={BLACK_FRIDAY.imageAlt}
          width={1086}
          height={1448}
          sizes="(max-width: 640px) 90vw, 28rem"
          priority={false}
          className="h-auto w-full"
        />

        <div className="flex flex-col gap-3 p-5 pt-1">
          <DialogTitle className="font-heading text-xl font-semibold">
            <span className="text-gradient">50% off</span> web &amp; mobile development
          </DialogTitle>
          <DialogDescription>
            Black Friday pricing on new website and app builds, {BLACK_FRIDAY.window}.
          </DialogDescription>

          <div className="mt-1 flex flex-col gap-2 sm:flex-row">
            <Button asChild size="lg" className="glow flex-1">
              <Link href={BLACK_FRIDAY.href} onClick={() => handleOpenChange(false)}>
                {BLACK_FRIDAY.cta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <DialogClose render={<Button variant="outline" size="lg" />}>Not now</DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
