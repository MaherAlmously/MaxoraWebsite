'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, LogIn, UserPlus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/account';
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [resendState, setResendState] = useState<'idle' | 'sending' | 'sent'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');
    const supabase = createClient();

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${location.origin}/auth/callback` },
        });
        if (error) {
          setError(error.message);
          return;
        }
        if (!data.session) {
          // Email confirmation is on, no session until the link is clicked.
          setConfirmSent(true);
          return;
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setError(
            error.message === 'Invalid login credentials'
              ? 'Email or password is incorrect.'
              : error.message,
          );
          return;
        }
        if (!data.user.email_confirmed_at) {
          // Signed in but never confirmed (e.g. confirmation requirement was
          // toggled on after this account was created) - don't let it through.
          await supabase.auth.signOut();
          setUnconfirmedEmail(email);
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
        if (profile?.role === 'admin') {
          router.push('/admin');
          router.refresh();
          return;
        }
      }
      router.push(next);
      router.refresh();
    } catch {
      // Network hiccup or unexpected client throw - surface it instead of
      // leaving the button stuck spinning until a manual refresh.
      setError('Something went wrong. Please try again.');
    } finally {
      setPending(false);
    }
  }

  async function handleResend() {
    if (!unconfirmedEmail) return;
    setResendState('sending');
    try {
      const supabase = createClient();
      await supabase.auth.resend({
        type: 'signup',
        email: unconfirmedEmail,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      });
      setResendState('sent');
    } catch {
      setResendState('idle');
    }
  }

  if (unconfirmedEmail) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
        <h2 className="font-heading text-xl font-semibold">Please confirm your email</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {unconfirmedEmail} hasn&apos;t been confirmed yet. Check your inbox for the confirmation
          link, or we can send a new one.
        </p>
        <Button
          type="button"
          className="mt-5"
          onClick={handleResend}
          disabled={resendState !== 'idle'}
        >
          {resendState === 'sending' ? (
            <Loader2 className="size-4 animate-spin" />
          ) : resendState === 'sent' ? (
            'Confirmation email sent'
          ) : (
            'Resend confirmation email'
          )}
        </Button>
      </div>
    );
  }

  if (confirmSent) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
        <h2 className="font-heading text-xl font-semibold">Check your email</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We sent a confirmation link to your inbox. Click it to activate your account, then log
          in.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Don&apos;t see it? Check your spam or junk folder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="you@company.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
        />
      </div>

      {error && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full glow" disabled={pending}>
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : mode === 'signup' ? (
          <UserPlus className="size-4" />
        ) : (
          <LogIn className="size-4" />
        )}
        {mode === 'signup' ? 'Create Account' : 'Log In'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {mode === 'signup' ? (
          <>
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </>
        ) : (
          <>
            New to Maxora?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              Create an account
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
