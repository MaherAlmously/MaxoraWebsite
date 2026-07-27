import confetti from 'canvas-confetti';

const GOLD = ['#f5c542', '#e0a92c', '#fff3c4', '#c98910', '#ffe89a', '#b8860b'];

/**
 * Heavy, layered gold burst fired from the click point on a service card in
 * the services grid — meant to feel rich/celebratory, not a quick blip.
 */
export function fireServiceCardConfetti(clientX: number, clientY: number) {
  if (typeof window === 'undefined') return;
  const origin = { x: clientX / window.innerWidth, y: clientY / window.innerHeight };
  const base = { colors: GOLD, disableForReducedMotion: true, origin };

  confetti({ ...base, particleCount: 90, spread: 70, startVelocity: 48, gravity: 0.9, scalar: 1.1 });
  confetti({
    ...base,
    particleCount: 50,
    spread: 100,
    startVelocity: 32,
    gravity: 0.8,
    scalar: 0.85,
    angle: 60,
  });
  confetti({
    ...base,
    particleCount: 50,
    spread: 100,
    startVelocity: 32,
    gravity: 0.8,
    scalar: 0.85,
    angle: 120,
  });
  setTimeout(() => {
    confetti({ ...base, particleCount: 70, spread: 130, startVelocity: 38, gravity: 0.85, scalar: 1 });
  }, 160);
}

/**
 * Slower, more restrained shimmer for landing on a single service page —
 * two side cannons from the top corners rather than a click-point burst,
 * so it reads as a distinct "you've arrived" moment, not a repeat of the
 * grid's click effect.
 */
export function fireProductPageConfetti() {
  if (typeof window === 'undefined') return;
  const base = {
    colors: GOLD,
    disableForReducedMotion: true,
    shapes: ['star', 'circle'] as confetti.Shape[],
    ticks: 260,
  };

  confetti({ ...base, particleCount: 45, angle: 60, spread: 55, startVelocity: 42, gravity: 0.55, scalar: 1.2, origin: { x: 0, y: 0.25 } });
  confetti({ ...base, particleCount: 45, angle: 120, spread: 55, startVelocity: 42, gravity: 0.55, scalar: 1.2, origin: { x: 1, y: 0.25 } });
}
