'use client';

/**
 * Lightweight static gradient glow, sharing the hero's color language
 * (--grad-a / --grad-b) so ambient sections read as one system instead of
 * a generic blur-3xl blob dropped in per-component.
 */
export function AmbientGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={className ?? 'pointer-events-none absolute inset-0'}
      style={{
        background:
          'radial-gradient(38rem circle at 30% 20%, var(--grad-a) 0%, transparent 60%), radial-gradient(30rem circle at 80% 90%, var(--grad-b) 0%, transparent 65%)',
        opacity: 0.16,
      }}
    />
  );
}
