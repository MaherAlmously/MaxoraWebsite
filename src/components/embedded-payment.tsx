'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

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
    setSubmitting(true);
    setError(null);

    const { error: elementsError } = await elements.submit();
    if (elementsError) {
      setError(elementsError.message ?? 'Please check your payment details.');
      setSubmitting(false);
      return;
    }

    const result = await onConfirmDetails(e.currentTarget);
    if (!result.ok) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret: result.clientSecret,
      confirmParams: { return_url: result.returnUrl ?? returnUrl },
    });

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed. Please try again.');
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
  return (
    <Elements
      stripe={stripePromise}
      options={{ mode, amount: Math.max(amountCents, 50), currency: 'usd' }}
    >
      <InnerForm returnUrl={returnUrl} submitLabel={submitLabel} onConfirmDetails={onConfirmDetails}>
        {children}
      </InnerForm>
    </Elements>
  );
}
