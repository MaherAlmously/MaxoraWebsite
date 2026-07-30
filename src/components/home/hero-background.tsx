'use client';

import { motion, useReducedMotion } from 'motion/react';

// Fixed positions (not random per render) so the streaking stars don't shift
// between server/client hydration. Each one travels along `angle` (degrees,
// 0 = left-to-right) for `travel` px, leaving a fading tail behind it.
const SHOOTING_STARS = [
  { x: 6, y: 18, angle: -18, delay: 0, duration: 1.6, travel: 160, length: 90 },
  { x: 92, y: 12, angle: 200, delay: 1.4, duration: 1.9, travel: 140, length: 80 },
  { x: 16, y: 68, angle: -12, delay: 2.6, duration: 1.5, travel: 180, length: 100 },
  { x: 84, y: 74, angle: 195, delay: 0.7, duration: 1.7, travel: 150, length: 85 },
  { x: 48, y: 8, angle: -24, delay: 3.4, duration: 1.8, travel: 170, length: 95 },
  { x: 30, y: 42, angle: -15, delay: 4.6, duration: 1.6, travel: 155, length: 88 },
  { x: 70, y: 36, angle: 205, delay: 1.9, duration: 2, travel: 165, length: 92 },
  { x: 10, y: 88, angle: -20, delay: 5.5, duration: 1.5, travel: 145, length: 80 },
  { x: 60, y: 90, angle: -16, delay: 3.9, duration: 1.9, travel: 175, length: 98 },
  { x: 90, y: 50, angle: 198, delay: 6.2, duration: 1.7, travel: 150, length: 85 },
  { x: 38, y: 60, angle: -22, delay: 7, duration: 1.6, travel: 160, length: 90 },
  { x: 20, y: 30, angle: -14, delay: 5, duration: 1.8, travel: 170, length: 95 },
];

// Small ambient dots (unrelated to the shooting stars) that gently drift and
// shimmer in place, giving the field some depth behind the streaks.
const PARTICLES = [
  { x: 18, y: 24, delay: 0.1, duration: 2.8, size: 5 },
  { x: 82, y: 20, delay: 0.4, duration: 3.2, size: 4 },
  { x: 12, y: 62, delay: 0.75, duration: 2.9, size: 6 },
  { x: 88, y: 58, delay: 0.2, duration: 3.4, size: 5 },
  { x: 50, y: 12, delay: 0.95, duration: 3, size: 4 },
  { x: 30, y: 78, delay: 0.55, duration: 3.3, size: 5 },
  { x: 70, y: 74, delay: 0.3, duration: 3, size: 4 },
  { x: 60, y: 30, delay: 0.85, duration: 3.2, size: 6 },
];

/**
 * Ambient hero backdrop: a soft static glow behind the headline plus a field
 * of streaking "shooting star" particles and small drifting dots. No longer
 * tracks the pointer - the motion is fully ambient so it reads the same on
 * touch devices and doesn't fight with the text for attention.
 */
export function HeroBackground() {
  const reduceForEntrance = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(48rem circle at 50% 38%, var(--grad-a) 0%, transparent 65%)',
          opacity: 0.14,
        }}
      />
      {!reduceForEntrance && (
        <>
          {SHOOTING_STARS.map((s, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.length,
                height: 2,
                transform: `rotate(${s.angle}deg)`,
                transformOrigin: 'left center',
                background: 'linear-gradient(90deg, transparent, var(--grad-a) 70%, #fff)',
              }}
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: [0, s.travel * 0.5, s.travel],
              }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                ease: 'easeOut',
                repeat: Infinity,
                repeatDelay: 6 + s.delay * 0.4,
              }}
            />
          ))}
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-[var(--grad-a)]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                boxShadow: '0 0 10px 2px var(--grad-a)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 0.85, 0.85, 0], y: [10, -6, -18, -30] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
