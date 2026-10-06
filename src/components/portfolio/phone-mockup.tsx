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
    <TiltCard className="mx-auto w-fit">
      <motion.div
        className="group border-border bg-card relative flex aspect-[9/16] w-56 flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border shadow-xl shadow-black/20 transition-shadow duration-300 hover:shadow-[0_0_32px_-8px_var(--grad-a)] sm:w-64"
        whileHover={reduce ? undefined : { scale: 1.015, y: -4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Notch */}
        <span className="bg-muted absolute top-2 left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-full" />

        <motion.div
          animate={reduce ? undefined : { scale: [1, 1.035, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src={image}
            alt={`${name} app icon`}
            width={112}
            height={112}
            className="glow rounded-3xl"
            priority={priority}
          />
        </motion.div>
      </motion.div>
    </TiltCard>
  );
}
