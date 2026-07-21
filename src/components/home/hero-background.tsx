'use client';

import { useEffect, useRef } from 'react';

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
      <div className="hero-glow-halo absolute inset-0" />
      <div className="hero-glow-mid absolute inset-0" />
      <div className="hero-glow-core absolute inset-0" />
    </div>
  );
}
