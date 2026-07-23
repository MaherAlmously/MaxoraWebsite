import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AuthForm } from '@/components/forms/auth-form';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = { title: 'Sign Up' };

export default function SignupPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-24 sm:px-6">
      <Reveal className="text-center">
        <p className="eyebrow mb-3">Join Maxora</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Track your orders and keep your project history in one place.
        </p>
      </Reveal>
      <Reveal delay={0.1} className="mt-8">
        <div className="facet-cut rounded-xl border border-border bg-card p-6 sm:p-8">
          <Suspense fallback={null}>
            <AuthForm mode="signup" />
          </Suspense>
        </div>
      </Reveal>
    </div>
  );
}
