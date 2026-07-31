'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { PointerEvent, ReactNode } from 'react';

/** Wraps its children in a subtle 3D tilt that follows the pointer. */
export function TiltCard({
  children,
  disableTilt,
  className,
}: {
  children: ReactNode;
  disableTilt?: boolean;
  className?: string;
}) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), {
    stiffness: 250,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), {
    stiffness: 250,
    damping: 20,
  });

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (disableTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function onPointerLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
    >
      {children}
    </motion.div>
  );
}
