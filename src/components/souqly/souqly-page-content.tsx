'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import type { PointerEvent } from 'react';
import { FileText, ShieldCheck, Sparkles, Trash2 } from 'lucide-react';

const LINKS = [
  {
    href: '/souqly/delete',
    icon: Trash2,
    title: 'Delete your account',
    description: 'Request permanent deletion of your Souqly account and associated data.',
  },
  {
    href: '/souqly/privacy',
    icon: ShieldCheck,
    title: 'Privacy Policy',
    description: 'How Souqly collects, uses, and protects your data.',
  },
  {
    href: '/souqly/terms',
    icon: FileText,
    title: 'Terms & Conditions',
    description: 'The rules that govern your use of the Souqly app.',
  },
];

// Fixed sparkle positions (not random) so the field is identical between
// server and client renders.
const SPARKLES = [
  { x: 8, y: 10, delay: 0, size: 3 },
  { x: 92, y: 16, delay: 0.6, size: 4 },
  { x: 14, y: 34, delay: 1.4, size: 3 },
  { x: 88, y: 40, delay: 0.3, size: 3 },
  { x: 4, y: 60, delay: 1.1, size: 4 },
  { x: 95, y: 66, delay: 1.8, size: 3 },
  { x: 20, y: 84, delay: 0.8, size: 3 },
  { x: 80, y: 88, delay: 2.1, size: 4 },
];

// Play Store listing isn't live yet — swap this for the real URL once
// Souqly is published under a public link.
const PLAY_STORE_URL = '#';

/** Wraps a store badge in a subtle 3D tilt that follows the pointer. */
function TiltCard({
  children,
  disableTilt,
}: {
  children: React.ReactNode;
  disableTilt?: boolean;
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
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
    >
      {children}
    </motion.div>
  );
}

export function SouqlyPageContent() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden px-4 pt-32 pb-24 sm:px-6">
      {/* Ambient glow drifting behind the hero content */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--grad-a) 0%, transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={
          reduce
            ? { opacity: 0.16 }
            : { opacity: [0.1, 0.22, 0.1], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-40 left-1/2 -z-10 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--grad-b) 0%, transparent 72%)',
        }}
        initial={{ opacity: 0 }}
        animate={
          reduce ? { opacity: 0.1 } : { opacity: [0.06, 0.16, 0.06], scale: [1, 1.12, 1] }
        }
        transition={{ duration: 7, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Twinkling sparkle field */}
      {!reduce &&
        SPARKLES.map((s, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute -z-10 rounded-full bg-[var(--grad-a)]"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              boxShadow: '0 0 8px 1px var(--grad-a)',
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{
              duration: 2.2,
              delay: s.delay,
              repeat: Infinity,
              repeatDelay: 3.5,
              ease: 'easeInOut',
            }}
          />
        ))}

      <motion.div
        initial={reduce ? false : { opacity: 0, y: -16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0], rotate: [0, -2, 0, 2, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block"
        >
          <Image
            src="/souqly-icon.png"
            alt="Souqly"
            width={80}
            height={80}
            className="glow mb-4 rounded-2xl"
          />
        </motion.div>
        <p className="eyebrow mb-3">Souqly</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Souqly <span className="text-gradient-flow">app</span>
        </h1>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Available now on Android. iOS is coming soon.
        </p>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 flex flex-wrap items-end gap-5"
      >
        {/* Google Play — live */}
        <Link
          href={PLAY_STORE_URL}
          className="group relative inline-block"
          aria-label="Get Souqly on Google Play"
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-2xl blur-xl"
            style={{ background: 'var(--grad-a)' }}
            initial={{ opacity: 0.25, scale: 0.96 }}
            animate={
              reduce
                ? { opacity: 0.35 }
                : { opacity: [0.25, 0.5, 0.25], scale: [0.96, 1.06, 0.96] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <TiltCard>
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-lg"
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.35,
                type: 'spring',
                stiffness: 260,
                damping: 14,
              }}
              whileHover={reduce ? undefined : { scale: 1.06, y: -3 }}
              whileTap={reduce ? undefined : { scale: 0.96 }}
            >
              <Image
                src="/google-play-logo.jpg"
                alt="Get it on Google Play"
                width={220}
                height={66}
                className="h-[52px] w-auto rounded-lg sm:h-[58px]"
                priority
              />
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </motion.div>
          </TiltCard>
        </Link>

        {/* App Store — coming soon, styled as locked/dimmed */}
        <div className="group relative inline-block cursor-default select-none">
          <motion.span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-2xl blur-lg"
            style={{ background: 'var(--muted-foreground)' }}
            animate={reduce ? { opacity: 0.12 } : { opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <TiltCard disableTilt={reduce ?? undefined}>
            <motion.div
              className="relative flex h-[52px] items-center gap-2.5 overflow-hidden rounded-2xl border border-border bg-card px-3 opacity-70 shadow-lg grayscale sm:h-[58px] sm:px-3.5"
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{
                delay: 0.45,
                type: 'spring',
                stiffness: 260,
                damping: 14,
              }}
              whileHover={reduce ? undefined : { scale: 1.04, opacity: 0.85 }}
            >
              <Image
                src="/app-store-icon.jpg"
                alt="Apple App Store"
                width={40}
                height={40}
                className="size-9 shrink-0 rounded-[9px] sm:size-10"
              />
              <span className="flex flex-col leading-none">
                <span className="text-[10px] tracking-wide text-muted-foreground">
                  Coming soon to the
                </span>
                <span className="font-heading text-sm font-semibold text-foreground">
                  App Store
                </span>
              </span>
            </motion.div>
          </TiltCard>
          {/* "Coming soon" ribbon badge */}
          <motion.span
            className="absolute -top-2.5 -right-2.5 flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold tracking-wide text-primary-foreground shadow-md"
            animate={reduce ? undefined : { scale: [1, 1.12, 1], rotate: [0, 4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="size-3" />
            Soon
          </motion.span>
        </div>
      </motion.div>

      <div className="mt-10 space-y-4">
        {LINKS.map((link, i) => (
          <motion.div
            key={link.href}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={link.href} className="block">
              <motion.div
                className="facet-cut group flex items-start gap-4 rounded-xl border border-border bg-card p-5 sm:p-6"
                whileHover={
                  reduce
                    ? undefined
                    : { scale: 1.015, borderColor: 'var(--primary)', y: -2 }
                }
                whileTap={reduce ? undefined : { scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 340, damping: 22 }}
              >
                <motion.span
                  className="glow flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  whileHover={reduce ? undefined : { rotate: -8, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <link.icon className="size-5" />
                </motion.span>
                <span>
                  <span className="block font-heading text-base font-semibold text-foreground group-hover:text-primary">
                    {link.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {link.description}
                  </span>
                </span>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
