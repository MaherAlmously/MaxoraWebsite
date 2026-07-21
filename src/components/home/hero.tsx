'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronDown, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroBackground } from '@/components/home/hero-background';

const words: { text: string; gradient?: boolean; break?: boolean }[] = [
  { text: 'Build' },
  { text: 'bigger.' },
  { text: 'Sell', break: true, gradient: true },
  { text: 'more.', gradient: true },
];

export function Hero() {
  const reduce = useReducedMotion();
  let letterIndex = 0;

  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      <HeroBackground />

      <div className="relative mx-auto w-full max-w-4xl px-4 pt-32 pb-10 text-center sm:px-6 sm:pt-40">
        <motion.p
          className="eyebrow mb-6"
          initial={reduce ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tech · Design · Growth
        </motion.p>

        <h1
          aria-label="Build bigger. Sell more."
          className="flex flex-wrap items-baseline justify-center gap-x-[0.28em] font-heading text-5xl leading-[1.08] font-semibold tracking-tight sm:text-7xl"
        >
          {words.map((word, w) => {
            if (word.gradient) {
              // Animated as one block: per-letter transforms break the
              // background-clip that makes the gradient text visible.
              const i = letterIndex;
              letterIndex += word.text.length;
              return [
                word.break && <span key={`br-${w}`} className="h-0 basis-full" aria-hidden />,
                <motion.span
                  key={w}
                  className="text-gradient-flow inline-block whitespace-nowrap"
                  aria-hidden
                  initial={reduce ? false : { opacity: 0, y: 46, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.15 + i * 0.035,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
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
                          : { opacity: 0, y: 46, rotateX: 85, scale: 0.6, filter: 'blur(10px)' }
                      }
                      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
                      transition={{
                        delay: 0.15 + i * 0.035,
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
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
          transition={{ duration: 0.6, delay: 1.15 }}
        >
          Websites, branding, and content for startups, creators, and growing businesses. Done
          fast and right.
        </motion.p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 1.35 }}
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
          >
            <Button asChild size="lg" className="glow">
              <Link href="/services">
                See Services and Prices
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 1.45 }}
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
          >
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                <MessageSquare className="size-4" />
                Get a Free Quote
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none mt-10 flex justify-center text-muted-foreground"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          aria-hidden
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="size-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
