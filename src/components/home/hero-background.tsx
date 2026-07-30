'use client';

import { motion, useReducedMotion } from 'motion/react';

// Deterministic pseudo-random generator (fixed seed) so the star field is
// identical between server and client renders - real Math.random() here
// would cause a hydration mismatch.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Each star travels along `angle` (degrees, 0 = left-to-right) for `travel`
// viewport-widths, so the streak always crosses the full screen edge to
// edge regardless of device size, then fades and loops after `repeatDelay`.
const rand = mulberry32(7);
const SHOOTING_STARS = Array.from({ length: 22 }, () => ({
  x: Math.round(rand() * 100),
  y: Math.round(rand() * 100),
  angle: (rand() < 0.5 ? -1 : 1) * (12 + rand() * 16) + (rand() < 0.5 ? 0 : 180),
  delay: +(rand() * 10).toFixed(2),
  duration: +(1.1 + rand() * 0.7).toFixed(2),
  travel: +(130 + rand() * 40).toFixed(0),
  length: Math.round(70 + rand() * 50),
  repeatDelay: +(3 + rand() * 5).toFixed(2),
}));

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
                rotate: s.angle,
                transformOrigin: 'left center',
                background: 'linear-gradient(90deg, transparent, var(--grad-a) 70%, #fff)',
                willChange: 'transform, opacity',
              }}
              initial={{ opacity: 0, x: '0vw' }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: ['0vw', `${s.travel * 0.55}vw`, `${s.travel}vw`],
              }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                ease: [0.3, 0, 0.2, 1],
                repeat: Infinity,
                repeatDelay: s.repeatDelay,
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
