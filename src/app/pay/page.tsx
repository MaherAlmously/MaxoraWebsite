import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { PaymentForm } from '@/components/forms/payment-form';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'Custom Payment',
  description: 'Pay an agreed amount to Maxora. Enter the amount and we send a secure payment link.',
};

export default function PayPage() {
  return (
    <div className="mx-auto max-w-xl px-4 pt-32 pb-24 sm:px-6">
      <Reveal className="text-center">
        <p className="eyebrow mb-3">Custom Payment</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight">
          Pay an <span className="text-gradient">agreed amount</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Already spoke with us about a price? Enter it here and pay securely through Stripe.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <div className="facet-cut rounded-xl border border-border bg-card p-6 sm:p-8">
          <PaymentForm />
        </div>
        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-primary" />
          Payments are processed through a secure, encrypted link.
        </p>
      </Reveal>
    </div>
  );
}
