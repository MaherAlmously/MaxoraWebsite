'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { TiltCard } from '@/components/tilt-card';

export function PhoneMockup({
  image,
  name,
  priority,
}: {
  image: string;
  name: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <TiltCard className="mx-auto w-full max-w-[280px] sm:max-w-[320px]">
      <motion.div
        className="group border-border bg-card relative overflow-hidden rounded-2xl border shadow-xl shadow-black/20 transition-shadow duration-300 hover:shadow-[0_0_32px_-8px_var(--grad-a)]"
        whileHover={reduce ? undefined : { scale: 1.015, y: -4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div className="relative aspect-[9/16] w-full overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={reduce ? undefined : { scale: [1, 1.035, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src={image}
              alt={`${name} app screenshot`}
              fill
              sizes="(min-width: 1024px) 320px, 80vw"
              className="object-cover object-top"
              priority={priority}
            />
          </motion.div>
        </div>
      </motion.div>
    </TiltCard>
  );
}
