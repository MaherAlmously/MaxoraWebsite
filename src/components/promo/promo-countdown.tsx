'use client';

import { BLACK_FRIDAY, type PromoCountdown as Countdown } from '@/lib/promo';
import { usePromoCountdown } from '@/components/promo/use-promo';
import { cn } from '@/lib/utils';

const units = ['days', 'hours', 'minutes', 'seconds'] as const;
const labels: Record<(typeof units)[number], string> = {
  days: 'Days',
  hours: 'Hrs',
  minutes: 'Min',
  seconds: 'Sec',
};

type Urgency = {
  /** Also the accessible announcement, so colour never carries the meaning alone. */
  note: string;
  digit: string;
  dot: string;
  chip: string;
  label: string;
};

/**
 * Three bands rather than a single red: a countdown that is red for a week
 * stops meaning anything, and the colour has to earn the alarm it raises.
 */
function urgencyOf(left: Countdown): Urgency {
  const hoursLeft = left.days * 24 + left.hours;
  if (hoursLeft >= 48) {
    return {
      note: 'Offer open',
      digit: 'text-countdown-safe',
      dot: 'bg-countdown-safe',
      chip: 'border-countdown-safe/30 bg-countdown-safe/10',
      label: 'text-countdown-safe/70',
    };
  }
  if (hoursLeft >= 12) {
    return {
      note: 'Ending soon',
      digit: 'text-countdown-warn',
      dot: 'bg-countdown-warn',
      chip: 'border-countdown-warn/35 bg-countdown-warn/10',
      label: 'text-countdown-warn/70',
    };
  }
  return {
    note: 'Final hours',
    digit: 'text-countdown-urgent',
    dot: 'bg-countdown-urgent',
    chip: 'border-countdown-urgent/40 bg-countdown-urgent/12',
    label: 'text-countdown-urgent/75',
  };
}

export function PromoCountdown({
  className,
  size = 'default',
}: {
  className?: string;
  size?: 'default' | 'sm';
}) {
  const left = usePromoCountdown(BLACK_FRIDAY);
  if (!left) return null;

  const urgency = urgencyOf(left);
  const small = size === 'sm';

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center gap-2">
        <span className={cn('size-1.5 rounded-full', urgency.dot)} />
        <span className={cn('text-xs font-semibold tracking-wide', urgency.digit)}>
          {urgency.note}
        </span>
      </div>

      {/* Coarse, non-ticking summary for screen readers: the per-second digits
          below are aria-hidden so assistive tech is not read a new number
          every second. */}
      <p className="sr-only" aria-live="polite">
        {urgency.note}. {left.days} days and {left.hours} hours left in the Black Friday offer.
      </p>

      <div className="flex items-center gap-2 sm:gap-2.5" aria-hidden>
        {units.map((unit) => (
          <div
            key={unit}
            className={cn(
              'rounded-xl border text-center',
              urgency.chip,
              small ? 'min-w-12 px-2 py-1.5' : 'min-w-15 px-3 py-2',
            )}
          >
            <span
              className={cn(
                'font-heading block font-semibold tabular-nums',
                urgency.digit,
                small ? 'text-lg' : 'text-2xl',
              )}
            >
              {String(left[unit]).padStart(2, '0')}
            </span>
            <span
              className={cn(
                'block text-[0.625rem] font-medium tracking-[0.18em] uppercase',
                urgency.label,
              )}
            >
              {labels[unit]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
