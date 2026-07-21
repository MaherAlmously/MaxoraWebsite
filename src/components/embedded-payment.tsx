'use client';

import { useEffect, useState } from 'react';
import { loadStripe, type Appearance } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

// Mirrors the color tokens in globals.css so the card form matches the
// site's actual palette instead of Stripe's default blue theme.
const lightAppearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: 'oklch(0.48 0.1 205)',
    colorBackground: 'oklch(0.97 0.004 242)',
    colorText: 'oklch(0.22 0.016 250)',
    colorDanger: 'oklch(0.55 0.19 25)',
    borderRadius: '10px',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  },
};

const darkAppearance: Appearance = {
  theme: 'night',
  variables: {
    colorPrimary: 'oklch(0.85 0.135 190)',
    colorBackground: 'oklch(0.24 0.007 250)',
    colorText: 'oklch(0.965 0.004 240)',
    colorDanger: 'oklch(0.65 0.2 25)',
    borderRadius: '10px',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  },
};

function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true,
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

export type ConfirmDetailsResult =
  | { ok: true; clientSecret: string; returnUrl?: string }
  | { ok: false; error: string };

function InnerForm({
  returnUrl,
  submitLabel,
  onConfirmDetails,
  children,
}: {
  returnUrl: string;
  submitLabel: string;
  onConfirmDetails: (form: HTMLFormElement) => Promise<ConfirmDetailsResult>;
  children: React.ReactNode;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stripe || !elements) return;
    // Capture the form before any `await` — the browser nulls out
    // e.currentTarget as soon as synchronous event dispatch finishes.
    const form = e.currentTarget;
    setSubmitting(true);
    setError(null);

    try {
      const { error: elementsError } = await elements.submit();
      if (elementsError) {
        setError(elementsError.message ?? 'Please check your payment details.');
        return;
      }

      const result = await onConfirmDetails(form);
      if (!result.ok) {
        setError(result.error);
        return;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret: result.clientSecret,
        confirmParams: { return_url: result.returnUrl ?? returnUrl },
      });

      if (confirmError) {
        setError(confirmError.message ?? 'Payment failed. Please try again.');
      }
    } catch (err) {
      console.error('[payment] unexpected error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {children}
      <PaymentElement />
      {error && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full glow" disabled={!stripe || !elements || submitting}>
        {submitting ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
        {submitLabel}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Payments are processed securely by Stripe.
      </p>
    </form>
  );
}

// Renders the Payment Element without an existing PaymentIntent/Subscription
// (Stripe's "deferred" pattern) so the card fields sit in the same form as
// the customer's details. The actual PaymentIntent/Subscription is only
// created when they hit Pay, via onConfirmDetails.
export function InlineCheckoutForm({
  mode,
  amountCents,
  returnUrl,
  submitLabel,
  onConfirmDetails,
  children,
}: {
  mode: 'payment' | 'subscription';
  amountCents: number;
  returnUrl: string;
  submitLabel: string;
  onConfirmDetails: (form: HTMLFormElement) => Promise<ConfirmDetailsResult>;
  children: React.ReactNode;
}) {
  const isDark = useIsDarkTheme();

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode,
        amount: Math.max(amountCents, 50),
        currency: 'usd',
        appearance: isDark ? darkAppearance : lightAppearance,
      }}
    >
      <InnerForm returnUrl={returnUrl} submitLabel={submitLabel} onConfirmDetails={onConfirmDetails}>
        {children}
      </InnerForm>
    </Elements>
  );
}
