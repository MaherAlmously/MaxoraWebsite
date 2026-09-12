'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';
import { SectionHeading } from '@/components/section-heading';

const steps = [
  {
    title: 'Understand your business',
    text: 'We start by learning how your business actually runs, and what is slowing it down.',
  },
  {
    title: 'Plan the solution',
    text: 'We figure out the right approach, custom software, automation, or an app, and scope it clearly.',
  },
  {
    title: 'Design and build',
    text: 'You see progress as we go, with regular check-ins so nothing is a surprise.',
  },
  {
    title: 'Launch',
    text: 'We put the finished software into your team’s hands and make sure it works.',
  },
  {
    title: 'Support and improve',
    text: 'We stay available to fix issues and improve the software as your business grows.',
  },
];

function ProcessStep({
  step,
  index,
  progress,
}: {
  step: (typeof steps)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const threshold = index / (steps.length - 1);
  const fill = useTransform(progress, [Math.max(threshold - 0.06, 0), threshold], [0, 1], {
    clamp: true,
  });
  const scale = useTransform(fill, [0, 1], [0.7, 1]);

  return (
    <li className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
      <div className="relative z-10 shrink-0 lg:mb-4">
        <div className="flex size-10 items-center justify-center rounded-full border-2 border-border bg-background font-heading text-sm font-semibold text-muted-foreground">
          {index + 1}
        </div>
        <motion.div
          aria-hidden
          style={reduce ? { opacity: 1 } : { opacity: fill, scale }}
          className="glow absolute inset-0 flex items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold text-primary-foreground"
        >
          {index + 1}
        </motion.div>
      </div>
      <div className="flex-1 w-full rounded-xl border border-border bg-card p-5 lg:flex lg:flex-col lg:justify-center">
        <h3 className="font-heading font-semibold">{step.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
      </div>
    </li>
  );
}

export function Process() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.4'],
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading eyebrow="How it works" title="From problem to launch in five steps" />

      <ol
        ref={containerRef}
        className="relative mt-10 grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-5 lg:gap-4"
      >
        {/* Static track */}
        <div
          aria-hidden
          className="absolute top-5 bottom-5 left-5 w-px -translate-x-1/2 bg-border lg:inset-x-[10%] lg:top-5 lg:bottom-auto lg:left-auto lg:h-px lg:w-auto lg:translate-x-0"
        />
        {/* Animated fill, grows as you scroll through the section */}
        <motion.div
          aria-hidden
          style={
            reduce
              ? { scaleY: 1, scaleX: 1 }
              : { scaleY: scrollYProgress, scaleX: scrollYProgress }
          }
          className="glow absolute top-5 bottom-5 left-5 w-px origin-top -translate-x-1/2 bg-primary lg:inset-x-[10%] lg:top-5 lg:bottom-auto lg:left-auto lg:h-px lg:w-auto lg:origin-left lg:translate-x-0"
        />

        {steps.map((step, i) => (
          <ProcessStep key={step.title} step={step} index={i} progress={scrollYProgress} />
        ))}
      </ol>
    </section>
  );
}
