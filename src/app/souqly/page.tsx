import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, ShieldCheck, Trash2 } from 'lucide-react';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'Souqly',
  description: 'Souqly - account deletion, privacy policy, and terms and conditions.',
};

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

export default function SouqlyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-32 pb-24 sm:px-6">
      <Reveal>
        <Image
          src="/souqly-icon.png"
          alt="Souqly"
          width={72}
          height={72}
          className="mb-4 rounded-2xl"
        />
        <p className="eyebrow mb-3">Souqly</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Souqly <span className="text-gradient">app</span>
        </h1>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Available now on Android. iOS is coming soon.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 space-y-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="facet-cut group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 sm:p-6"
            >
              <span className="glow flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <link.icon className="size-5" />
              </span>
              <span>
                <span className="block font-heading text-base font-semibold text-foreground group-hover:text-primary">
                  {link.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {link.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
