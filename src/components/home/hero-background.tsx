'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';

// Fixed positions (not random per render) so the drifting particles don't
// shift between server/client hydration.
const PARTICLES = [
  { x: 18, y: 24, delay: 0.1, duration: 4.2, size: 5 },
  { x: 82, y: 20, delay: 0.6, duration: 4.8, size: 4 },
  { x: 12, y: 62, delay: 1.1, duration: 4.4, size: 6 },
  { x: 88, y: 58, delay: 0.3, duration: 5.2, size: 5 },
  { x: 50, y: 12, delay: 1.4, duration: 4.6, size: 4 },
  { x: 30, y: 78, delay: 0.85, duration: 5, size: 5 },
  { x: 70, y: 74, delay: 0.45, duration: 4.5, size: 4 },
  { x: 60, y: 30, delay: 1.25, duration: 4.9, size: 6 },
];

/**
 * Glow that follows the pointer across the hero.
 *
 * Three layers chase the pointer at different rates: a small bright core on a
 * spring (it overshoots slightly and settles), a mid glow, and a big slow
 * halo. The faster you move, the brighter and wider they get, so the effect
 * reacts to how you move rather than just where you are.
 *
 * Window-level pointer events mean the text and buttons never block it, and
 * touch drags work the same as a mouse. With no pointer (phones at rest, idle
 * desktops) the target wanders on its own so there is always motion.
 */
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceForEntrance = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // All positions are percentages of the hero box.
    let tgtX = 50;
    let tgtY = 38;
    // Core runs on a spring, so it needs velocity.
    let coreX = 50;
    let coreY = 38;
    let velX = 0;
    let velY = 0;
    let midX = 50;
    let midY = 38;
    let haloX = 50;
    let haloY = 38;
    let power = 0;
    let lastX = 50;
    let lastY = 38;

    let pointerActive = false;
    let idleTimer: number | undefined;
    let raf = 0;
    const start = performance.now();

    const STIFFNESS = 0.14;
    const DAMPING = 0.76;

    function onPointerMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      tgtX = ((e.clientX - rect.left) / rect.width) * 100;
      tgtY = ((e.clientY - rect.top) / rect.height) * 100;
      pointerActive = true;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        pointerActive = false;
      }, 2500);
    }

    function frame(now: number) {
      if (!pointerActive && !reduce) {
        const t = (now - start) / 1000;
        tgtX = 50 + Math.sin(t * 0.26) * 28;
        tgtY = 38 + Math.sin(t * 0.41 + 1.2) * 18;
      }

      // Spring the core toward the target, overshooting a little.
      velX = (velX + (tgtX - coreX) * STIFFNESS) * DAMPING;
      velY = (velY + (tgtY - coreY) * STIFFNESS) * DAMPING;
      coreX += velX;
      coreY += velY;

      midX += (tgtX - midX) * 0.075;
      midY += (tgtY - midY) * 0.075;
      haloX += (tgtX - haloX) * 0.025;
      haloY += (tgtY - haloY) * 0.025;

      // How fast the glow is travelling, smoothed and clamped to 0..1.
      const speed = Math.hypot(coreX - lastX, coreY - lastY);
      lastX = coreX;
      lastY = coreY;
      power += (Math.min(speed / 2.4, 1) - power) * 0.09;

      const s = el!.style;
      s.setProperty('--gx1', `${coreX.toFixed(2)}%`);
      s.setProperty('--gy1', `${coreY.toFixed(2)}%`);
      s.setProperty('--gx2', `${midX.toFixed(2)}%`);
      s.setProperty('--gy2', `${midY.toFixed(2)}%`);
      s.setProperty('--gx3', `${haloX.toFixed(2)}%`);
      s.setProperty('--gy3', `${haloY.toFixed(2)}%`);
      s.setProperty('--glow-power', power.toFixed(3));

      raf = requestAnimationFrame(frame);
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(raf);
      window.clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Welcome bloom: a bright flash that blooms outward once and settles
          into the ambient glow, plus a scatter of particles that drift and
          shimmer continuously — an ongoing loop, not a one-shot pulse. */}
      {!reduceForEntrance && (
        <>
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(48rem circle at 50% 38%, var(--grad-a) 0%, transparent 65%)',
            }}
            initial={{ opacity: 0.9, scale: 0.35 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
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
      {/*
        Each glow layer's own opacity is driven live by the CSS class
        (via --glow-power, set every frame from pointer speed). Animating
        opacity with motion directly on that element would leave a
        permanent inline style that overrides the CSS rule after the
        entrance finishes, freezing the pointer-reactive brightness. So the
        entrance fade goes on a wrapper instead, multiplying with the
        layer's own live opacity rather than replacing it.
      */}
      <motion.div
        className="absolute inset-0"
        initial={reduceForEntrance ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <div className="hero-glow-halo absolute inset-0" />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        initial={reduceForEntrance ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.35 }}
      >
        <div className="hero-glow-mid absolute inset-0" />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        initial={reduceForEntrance ? false : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-glow-core absolute inset-0" />
      </motion.div>
    </div>
  );
}
