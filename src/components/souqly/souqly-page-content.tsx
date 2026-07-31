'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { FileText, ShieldCheck, Trash2 } from 'lucide-react';

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

// Play Store listing isn't live yet — swap this for the real URL once
// Souqly is published under a public link.
const PLAY_STORE_URL = '#';

export function SouqlyPageContent() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto max-w-2xl px-4 pt-32 pb-24 sm:px-6">
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
        initial={reduce ? false : { opacity: 0, y: -16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
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
        className="mt-8"
      >
        <Link
          href={PLAY_STORE_URL}
          className="group relative inline-block"
          aria-label="Get Souqly on Google Play"
        >
          {/* Pulsing glow ring behind the badge */}
          <motion.span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-2xl blur-xl"
            style={{ background: 'var(--grad-a)' }}
            animate={
              reduce
                ? { opacity: 0.35 }
                : { opacity: [0.25, 0.5, 0.25], scale: [0.96, 1.06, 0.96] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-lg"
            whileHover={reduce ? undefined : { scale: 1.06, rotate: -1.5, y: -3 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          >
            <Image
              src="/google-play-logo.jpg"
              alt="Get it on Google Play"
              width={220}
              height={66}
              className="h-[52px] w-auto rounded-lg sm:h-[58px]"
              priority
            />
            {/* Shine sweep across the badge on hover */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </motion.div>
        </Link>
      </motion.div>

      <div className="mt-10 space-y-4">
        {LINKS.map((link, i) => (
          <motion.div
            key={link.href}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
