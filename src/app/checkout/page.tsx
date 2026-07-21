'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Tag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice, getTier } from '@/lib/products';
import { placeOrder } from '@/app/actions/checkout';
import { previewPromoCode } from '@/app/actions/promo';
import { InlineCheckoutForm, type ConfirmDetailsResult } from '@/components/embedded-payment';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

export default function CheckoutPage() {
  const { items, subtotalCents, ready, clear } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoChecking, setPromoChecking] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [discountedCents, setDiscountedCents] = useState<number | null>(null);

  const totalCents = discountedCents ?? subtotalCents;
  const isSubscription = items.some((i) => getTier(i.productSlug, i.tierId)?.billing === 'monthly');

  async function handleApplyPromo() {
    if (!promoCode.trim()) return;
    setPromoChecking(true);
    setPromoError(null);
    const result = await previewPromoCode(promoCode, subtotalCents);
    if (result.ok) {
      setDiscountedCents(result.discountedAmountCents);
    } else {
      setDiscountedCents(null);
      setPromoError(result.error);
    }
    setPromoChecking(false);
  }

  async function handleConfirmDetails(form: HTMLFormElement): Promise<ConfirmDetailsResult> {
    const fd = new FormData(form);
    const result = await placeOrder({
      customerName: String(fd.get('name') ?? ''),
      customerEmail: String(fd.get('email') ?? ''),
      customerPhone: String(fd.get('phone') ?? ''),
      notes: String(fd.get('notes') ?? ''),
      promoCode,
      items: items.map((i) => ({
        productSlug: i.productSlug,
        productName: i.productName,
        tierId: i.tierId,
        quantity: i.quantity,
      })),
    });
    if (result.ok) {
      clear();
      return {
        ok: true,
        clientSecret: result.clientSecret,
        returnUrl: `${window.location.origin}/checkout/success?order=${result.orderId}`,
      };
    }
    return { ok: false, error: result.error };
  }

  const cartIsEmpty = ready && items.length === 0;

  return (
    <div className="mx-auto max-w-5xl px-4 pt-32 pb-24 sm:px-6">
      <Link
        href="/services"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Continue shopping
      </Link>

      <h1 className="font-heading text-4xl font-semibold tracking-tight">Checkout</h1>

      {cartIsEmpty ? (
        <div className="mt-12 rounded-xl border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button asChild className="mt-6">
            <Link href="/services">Browse Services</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <InlineCheckoutForm
            mode={isSubscription ? 'subscription' : 'payment'}
            amountCents={totalCents}
            returnUrl={typeof window !== 'undefined' ? `${window.location.origin}/checkout/success` : ''}
            submitLabel={`Pay ${formatPrice(totalCents)}`}
            onConfirmDetails={handleConfirmDetails}
          >
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
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+1 555 000 0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Project notes (optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Anything we should know: links, goals, deadlines"
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
                  disabled={promoChecking || !promoCode.trim()}
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
          </InlineCheckoutForm>

          <aside className="h-fit rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading font-semibold">Order Summary</h2>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.productSlug}:${item.tierId}`}
                  className="flex items-start justify-between gap-3 text-sm"
                >
                  <div>
                    <p>{item.productName}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.tierName}
                      {item.quantity > 1 ? ` × ${item.quantity}` : ''}
                      {item.billing === 'monthly' && item.termMonths
                        ? ` · ${item.termMonths}-month plan`
                        : ''}
                    </p>
                  </div>
                  <span className="whitespace-nowrap text-primary">
                    {formatPrice(item.unitPriceCents * item.quantity)}
                    {item.billing === 'monthly' && <span className="text-xs">/mo</span>}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(subtotalCents)}</span>
            </div>
            {discountedCents !== null && (
              <div className="mt-1 flex items-center justify-between text-sm text-primary">
                <span>Promo discount</span>
                <span>-{formatPrice(subtotalCents - discountedCents)}</span>
              </div>
            )}
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total due</span>
              <span className="font-heading text-xl font-semibold">{formatPrice(totalCents)}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Monthly plans are billed each month for the plan length.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
