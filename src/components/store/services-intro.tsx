'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const heading = 'Pick a service.';

export function ServicesIntro() {
  const reduce = useReducedMotion();

  return (
    <div>
      <motion.div
        className="glow mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
        initial={reduce ? false : { opacity: 0, y: -16, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.05 }}
      >
        <motion.span
          animate={reduce ? undefined : { rotate: [0, 15, -10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
        >
          <Sparkles className="size-4" />
        </motion.span>
        Welcome — let&apos;s find your service
      </motion.div>

      <motion.p
        className="eyebrow mb-3"
        initial={reduce ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        Services
      </motion.p>

      <h1
        aria-label={`${heading} Order in minutes.`}
        className="flex flex-wrap items-baseline gap-x-[0.28em] font-heading text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl"
      >
        <span className="inline-block whitespace-nowrap" aria-hidden>
          {heading.split('').map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              style={{ transformOrigin: '50% 80%' }}
              initial={
                reduce ? false : { opacity: 0, y: 34, rotateX: 75, scale: 0.7, filter: 'blur(8px)' }
              }
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.25 + i * 0.025, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {letter === ' ' ? ' ' : letter}
            </motion.span>
          ))}
        </span>
        <span className="h-0 basis-full" aria-hidden />
        <motion.span
          className="text-gradient-flow inline-block whitespace-nowrap"
          aria-hidden
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.65, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          Order in minutes.
        </motion.span>
      </h1>

      <motion.div
        className="mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-[var(--grad-a)] to-[var(--grad-b)]"
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ transformOrigin: '0% 50%' }}
        transition={{ delay: 0.95, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.p
        className="mt-4 max-w-2xl text-muted-foreground"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.05 }}
      >
        Every package has a listed price. Add it to your cart and check out like any store.
        Bigger project in mind? The quote-based services are one message away.
      </motion.p>
    </div>
  );
}
