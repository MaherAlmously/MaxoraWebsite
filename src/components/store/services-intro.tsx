'use client';

import { motion, useReducedMotion } from 'motion/react';

export function ServicesIntro() {
  const reduce = useReducedMotion();

  return (
    <div className="relative py-4">
      {/* Soft glow sweep that blooms in behind the heading, then settles to a
          quiet ambient glow. No badge, no per-letter flourish — just a
          slower, more spaced reveal. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-10 -z-10 size-[26rem]"
        style={{
          background:
            'radial-gradient(closest-side, var(--grad-a) 0%, transparent 72%)',
        }}
        initial={reduce ? false : { opacity: 0, scale: 0.7 }}
        animate={{ opacity: [0, 0.22, 0.14], scale: [0.7, 1.05, 1] }}
        transition={{ duration: 1.8, times: [0, 0.55, 1], ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.p
        className="eyebrow mb-4"
        initial={reduce ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        Services
      </motion.p>

      <motion.h1
        className="font-heading text-4xl leading-[1.12] font-semibold tracking-tight sm:text-5xl"
        initial={reduce ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        Pick a service.
        <br className="hidden sm:block" />{' '}
        <span className="text-gradient-flow">Order in minutes.</span>
      </motion.h1>

      <motion.p
        className="mt-6 max-w-2xl text-muted-foreground"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        Every package has a listed price. Add it to your cart and check out like any store.
        Bigger project in mind? The quote-based services are one message away.
      </motion.p>
    </div>
  );
}
