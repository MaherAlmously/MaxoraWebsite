import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Payment Received' };

export default function PaySuccessPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 pt-32 pb-24 text-center sm:px-6">
      <CheckCircle2 className="size-14 text-primary" />
      <h1 className="mt-6 font-heading text-3xl font-semibold tracking-tight">
        Payment received. Thank you!
      </h1>
      <p className="mt-4 text-muted-foreground">
        Your payment went through and a confirmation has been sent to your email.
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
