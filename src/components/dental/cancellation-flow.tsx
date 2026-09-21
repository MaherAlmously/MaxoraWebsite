'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { CalendarX, Users, MessageSquareText, CheckCircle2, CalendarCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const STAGES: { label: string; icon: LucideIcon }[] = [
  { label: 'Appointment Canceled', icon: CalendarX },
  { label: 'Matching Patients', icon: Users },
  { label: 'Text Sent', icon: MessageSquareText },
  { label: 'Patient Accepts', icon: CheckCircle2 },
  { label: 'Slot Filled', icon: CalendarCheck },
];

const STAGE_MS = 1800;

/**
 * Auto-advancing demonstration of the core loop, so a dentist understands the
 * product in seconds without reading copy. Pure opacity/transform animation
 * (no canvas/SVG lib) so it stays cheap; falls back to a static, fully-lit
 * state when the user prefers reduced motion.
 */
export function CancellationFlow() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % STAGES.length);
    }, STAGE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="glass facet-cut relative mx-auto w-full max-w-3xl rounded-2xl p-5 sm:p-8">
      <p className="eyebrow mb-6 text-center sm:mb-8">The Loop, Live</p>

      <ol className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
        {/* Track: vertical on mobile, horizontal on larger screens */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-4 w-px bg-border sm:top-4 sm:right-4 sm:bottom-auto sm:left-4 sm:h-px sm:w-auto"
        />

        {STAGES.map((stage, i) => {
          const isActive = reduce || i === active;
          const isDone = !reduce && i < active;
          const Icon = stage.icon;

          return (
            <li
              key={stage.label}
              className="relative z-10 flex items-center gap-3 sm:flex-1 sm:flex-col sm:items-center sm:text-center"
            >
              <motion.div
                className="glow flex size-9 shrink-0 items-center justify-center rounded-full border-2 bg-card sm:size-11"
                animate={{
                  borderColor:
                    isActive || isDone
                      ? 'var(--primary)'
                      : 'var(--border)',
                  scale: isActive && !isDone ? 1.08 : 1,
                  boxShadow:
                    isActive || isDone
                      ? '0 0 24px oklch(0.85 0.135 190 / 25%), 0 0 64px oklch(0.85 0.135 190 / 12%)'
                      : '0 0 0 rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <Icon
                  className="size-4 sm:size-5"
                  style={{ color: isActive || isDone ? 'var(--primary)' : 'var(--muted-foreground)' }}
                />
              </motion.div>

              <span
                className="text-xs font-medium sm:mt-1 sm:text-sm"
                style={{ color: isActive || isDone ? 'var(--foreground)' : 'var(--muted-foreground)' }}
              >
                {stage.label}
              </span>
            </li>
          );
        })}
      </ol>

      {!reduce && (
        <div className="mt-6 flex justify-center sm:mt-8" aria-hidden>
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-center text-sm text-muted-foreground"
            >
              {stageCaption(active)}
            </motion.p>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function stageCaption(index: number): string {
  switch (index) {
    case 0:
      return 'A patient cancels their 2:00 PM cleaning.';
    case 1:
      return 'The system checks opted-in patients for fit and availability.';
    case 2:
      return 'Matched patients get an automatic text about the opening.';
    case 3:
      return 'First patient to reply confirms the new time.';
    default:
      return 'The chair is filled — no front-desk calls made.';
  }
}
