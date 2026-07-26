import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { AlertTriangle } from 'lucide-react';
import { SouqlyDeleteForm } from '@/components/forms/souqly-delete-form';
import { Reveal } from '@/components/reveal';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Souqly - Delete Account',
  description: 'Request permanent deletion of your Souqly account and associated data.',
};

export default function SouqlyDeletePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-32 pb-24 sm:px-6">
      <Reveal>
        <Image
          src="/souqly-icon.png"
          alt="Souqly"
          width={64}
          height={64}
          className="mb-4 rounded-2xl"
        />
        <p className="eyebrow mb-3">Souqly</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Delete your <span className="text-gradient">account</span>
        </h1>
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" />
          <span>This action is permanent and cannot be reversed once processed.</span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="facet-cut mt-10 rounded-xl border border-border bg-card p-6 sm:p-8">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <SouqlyDeleteForm />
          </Suspense>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Read our{' '}
          <Link href="/souqly/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </Reveal>
    </div>
  );
}
