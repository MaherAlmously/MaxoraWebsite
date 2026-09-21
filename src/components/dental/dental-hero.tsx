'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CancellationFlow } from '@/components/dental/cancellation-flow';

const words: { text: string; gradient?: boolean; break?: boolean }[] = [
  { text: 'A' },
  { text: 'cancellation' },
  { text: 'shouldn’t', break: true },
  { text: 'mean' },
  { text: 'an' },
  { text: 'empty', gradient: true, break: true },
  { text: 'chair.', gradient: true },
];

export function DentalHero() {
  const reduce = useReducedMotion();
  let letterIndex = 0;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(44rem circle at 50% 10%, var(--grad-a) 0%, transparent 60%)',
          opacity: 0.12,
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl px-4 pt-32 pb-6 text-center sm:px-6 sm:pt-40">
        <motion.p
          className="eyebrow mb-6 inline-flex items-center gap-2"
          initial={reduce ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CalendarClock className="size-3.5" />
          For Independent Dental Practices
        </motion.p>

        <h1
          aria-label="A cancellation shouldn't mean an empty chair."
          className="flex flex-wrap items-baseline justify-center gap-x-[0.28em] font-heading text-3xl leading-[1.15] font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          {words.map((word, w) => {
            if (word.gradient) {
              const i = letterIndex;
              letterIndex += word.text.length;
              return [
                word.break && <span key={`br-${w}`} className="h-0 basis-full" aria-hidden />,
                <motion.span
                  key={w}
                  className="text-gradient-flow inline-block whitespace-nowrap"
                  aria-hidden
                  initial={reduce ? false : { opacity: 0, y: 40, scale: 0.75 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.03, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word.text}
                </motion.span>,
              ];
            }
            return [
              word.break && <span key={`br-${w}`} className="h-0 basis-full" aria-hidden />,
              <span key={w} className="inline-block whitespace-nowrap" aria-hidden>
                {word.text.split('').map((letter, l) => {
                  const i = letterIndex++;
                  return (
                    <motion.span
                      key={l}
                      className="inline-block"
                      style={{ transformOrigin: '50% 80%' }}
                      initial={
                        reduce
                          ? false
                          : { opacity: 0, y: 40, rotateX: 80, scale: 0.65, filter: 'blur(8px)' }
                      }
                      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
                      transition={{ delay: 0.15 + i * 0.03, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </span>,
            ];
          })}
        </h1>

        <motion.p
          className="mx-auto mt-7 max-w-xl text-lg text-muted-foreground text-balance"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          Every canceled appointment is chair time your practice already paid for and won&apos;t get
          back. Patients opt in to earlier openings, and when a slot frees up, the system finds and
          texts the right patients automatically — no front desk calling down a list.
        </motion.p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.75 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 1.05 }}
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
          >
            <Button asChild size="lg" className="glow">
              <Link href="/contact?service=dental-pilot">
                Start a Free Pilot
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.75 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 1.15 }}
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
          >
            <Button asChild size="lg" variant="outline">
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative mx-auto mt-14 w-full max-w-5xl px-4 pb-20 sm:px-6 sm:pb-28"
        initial={reduce ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <CancellationFlow />
      </motion.div>
    </section>
  );
}
