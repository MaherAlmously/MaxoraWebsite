'use client';

import { BLACK_FRIDAY } from '@/lib/promo';
import { usePromoCountdown } from '@/components/promo/use-promo';
import { cn } from '@/lib/utils';

const units = ['days', 'hours', 'minutes', 'seconds'] as const;
const labels: Record<(typeof units)[number], string> = {
  days: 'Days',
  hours: 'Hours',
  minutes: 'Mins',
  seconds: 'Secs',
};

/** Counts down to the end of the Black Friday window. Renders nothing until hydrated. */
export function PromoCountdown({ className }: { className?: string }) {
  const left = usePromoCountdown(BLACK_FRIDAY);
  if (!left) return null;

  return (
    <div className={cn('flex items-center gap-2 sm:gap-3', className)} aria-live="off">
      {units.map((unit) => (
        <div
          key={unit}
          className="facet-cut-sm border-primary/25 bg-primary/5 min-w-14 rounded-lg border px-3 py-2 text-center"
        >
          <span className="font-heading block text-xl font-semibold tabular-nums">
            {String(left[unit]).padStart(2, '0')}
          </span>
          <span className="eyebrow block text-[0.6rem]">{labels[unit]}</span>
        </div>
      ))}
    </div>
  );
}
