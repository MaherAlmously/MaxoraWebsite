'use client';

import { useState } from 'react';
import { Loader2, Wallet, Tag } from 'lucide-react';
import { submitPaymentRequest } from '@/app/actions/payment-request';
import { previewPromoCode } from '@/app/actions/promo';
import { formatPrice } from '@/lib/products';
import { EmbeddedPayment } from '@/components/embedded-payment';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

export function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoChecking, setPromoChecking] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [discountedCents, setDiscountedCents] = useState<number | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payment, setPayment] = useState<{ clientSecret: string } | null>(null);

  const amountCents = Math.round((Number(amount) || 0) * 100);
  const totalCents = discountedCents ?? amountCents;

  async function handleApplyPromo() {
    if (!promoCode.trim() || !amountCents) return;
    setPromoChecking(true);
    setPromoError(null);
    const result = await previewPromoCode(promoCode, amountCents);
    if (result.ok) {
      setDiscountedCents(result.discountedAmountCents);
    } else {
      setDiscountedCents(null);
      setPromoError(result.error);
    }
    setPromoChecking(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const result = await submitPaymentRequest({
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      note: String(form.get('note') ?? ''),
      amount: Number(amount),
      promoCode,
    });
    if (result?.ok) {
      setPayment({ clientSecret: result.clientSecret });
    } else if (result) {
      setError(result.error);
    }
    setSubmitting(false);
  }

  if (payment) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-border bg-background/50 p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Amount</span>
            <span>{formatPrice(amountCents)}</span>
          </div>
          {discountedCents !== null && (
            <div className="mt-1 flex items-center justify-between text-sm text-primary">
              <span>Promo discount</span>
              <span>-{formatPrice(amountCents - discountedCents)}</span>
            </div>
          )}
          <Separator className="my-3" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total due</span>
            <span className="font-heading text-lg font-semibold">{formatPrice(totalCents)}</span>
          </div>
        </div>
        <EmbeddedPayment
          clientSecret={payment.clientSecret}
          returnUrl={`${window.location.origin}/pay/success`}
          label={`Pay ${formatPrice(totalCents)}`}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setDiscountedCents(null);
            }}
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
      <div className="space-y-2">
        <Label htmlFor="promoCode">Promo code (optional)</Label>
        <div className="flex gap-2">
          <Input
            id="promoCode"
            name="promoCode"
            placeholder="TEST95"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              setDiscountedCents(null);
              setPromoError(null);
            }}
          />
          <Button
            type="button"
            variant="outline"
            disabled={promoChecking || !promoCode.trim() || !amountCents}
            onClick={handleApplyPromo}
          >
            {promoChecking ? <Loader2 className="size-4 animate-spin" /> : 'Apply'}
          </Button>
        </div>
        {promoError && <p className="text-sm text-destructive">{promoError}</p>}
        {discountedCents !== null && (
          <p className="flex items-center gap-1.5 text-sm text-primary">
            <Tag className="size-3.5" />
            Promo applied — new total {formatPrice(discountedCents)}
          </p>
        )}
      </div>

      {!!amountCents && (
        <div className="rounded-lg border border-border bg-background/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total due</span>
            <span className="font-heading text-lg font-semibold">{formatPrice(totalCents)}</span>
          </div>
        </div>
      )}

      {error && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full glow" disabled={submitting}>
        {submitting ? <Loader2 className="size-4 animate-spin" /> : <Wallet className="size-4" />}
        Continue to Payment
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        You&apos;ll enter your card right here — no redirect.
      </p>
    </form>
  );
}
