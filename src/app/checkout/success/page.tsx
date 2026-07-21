import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClearCartOnMount } from '@/components/clear-cart-on-mount';

export const metadata: Metadata = { title: 'Order Placed' };

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 pt-32 pb-24 text-center sm:px-6">
      <ClearCartOnMount />
      <CheckCircle2 className="size-14 text-primary" />
      <h1 className="mt-6 font-heading text-3xl font-semibold tracking-tight">
        Order placed. Thank you!
      </h1>
      <p className="mt-4 text-muted-foreground">
        Your payment was received and the details were sent to your email. We&apos;ll follow up
        within 24 hours with next steps.
      </p>
      {order && (
        <p className="mt-3 font-mono text-xs text-muted-foreground">Order ID: {order}</p>
      )}
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/services">Keep Browsing</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/account">View My Orders</Link>
        </Button>
      </div>
    </div>
  );
}
