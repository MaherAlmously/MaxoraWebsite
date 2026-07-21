'use client';

import { useActionState } from 'react';
import { Loader2, Wallet } from 'lucide-react';
import {
  submitPaymentRequest,
  type PaymentRequestState,
} from '@/app/actions/payment-request';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function PaymentForm() {
  const [state, formAction, pending] = useActionState<PaymentRequestState, FormData>(
    submitPaymentRequest,
    null,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" required placeholder="Jordan Smith" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@company.com" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount (USD)</Label>
        <div className="relative">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
            $
          </span>
          <Input
            id="amount"
            name="amount"
            type="number"
            min="1"
            max="100000"
            step="0.01"
            required
            placeholder="250.00"
            className="pl-7"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="note">What is this payment for? (optional)</Label>
        <Textarea
          id="note"
          name="note"
          rows={3}
          placeholder="Invoice number, project name, or agreed work…"
        />
      </div>

      {state && !state.ok && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full glow" disabled={pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Wallet className="size-4" />}
        Continue to Payment
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        You&apos;ll be redirected to Stripe to securely complete payment.
      </p>
    </form>
  );
}
