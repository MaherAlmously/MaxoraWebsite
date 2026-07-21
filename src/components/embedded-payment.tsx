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

function PayButton({ returnUrl, label }: { returnUrl: string; label: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? 'Please check your payment details.');
      setSubmitting(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
    });

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />
      {error && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full glow" disabled={!stripe || !elements || submitting}>
        {submitting ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
        {label}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Payments are processed securely by Stripe.
      </p>
    </form>
  );
}

export function EmbeddedPayment({
  clientSecret,
  returnUrl,
  label,
}: {
  clientSecret: string;
  returnUrl: string;
  label: string;
}) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PayButton returnUrl={returnUrl} label={label} />
    </Elements>
  );
}
