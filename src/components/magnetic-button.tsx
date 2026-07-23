'use client';

import { useRef, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react';
import { motion, useSpring, useReducedMotion } from 'motion/react';

/**
 * Wraps a single interactive child (button/link) and pulls it a few px toward
 * the cursor while hovered, on a spring — restrained enough to feel like a
 * detail rather than a gimmick. Reserved for the single primary CTA on a page.
 */
export function MagneticButton({ children, strength = 18 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 300, damping: 20, mass: 0.5 });

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
