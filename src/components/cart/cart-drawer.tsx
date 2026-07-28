'use client';

import Link from 'next/link';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export function CartDrawer() {
  const { items, subtotalCents, isDrawerOpen, closeDrawer, setQuantity, removeItem } = useCart();

  return (
    <Sheet open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading">Your Cart</SheetTitle>
          <SheetDescription>
            {items.length === 0 ? 'Nothing here yet.' : 'Review your services before checkout.'}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingCart className="size-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Browse our services and add one to get started.
            </p>
            <Button asChild onClick={closeDrawer}>
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-4">
              {items.map((item) => (
                <div
                  key={`${item.productSlug}:${item.tierId}`}
                  className="facet-cut rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.tierName}
                        {item.billing === 'monthly' && item.termMonths
                          ? `, ${formatPrice(item.unitPriceCents)}/mo for ${item.termMonths} months`
                          : ''}
                      </p>
                    </div>
                    <button
                      aria-label={`Remove ${item.productName}`}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                      onClick={() => removeItem(item.productSlug, item.tierId)}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-7"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          setQuantity(item.productSlug, item.tierId, item.quantity - 1)
                        }
                      >
                        <Minus className="size-3.5" />
                      </Button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-7"
                        aria-label="Increase quantity"
                        onClick={() =>
                          setQuantity(item.productSlug, item.tierId, item.quantity + 1)
                        }
                      >
                        <Plus className="size-3.5" />
                      </Button>
                    </div>
                    <p className="text-sm font-semibold text-primary">
                      {formatPrice(item.unitPriceCents * item.quantity)}
                      {item.billing === 'monthly' && <span className="text-xs">/mo</span>}
                      {item.billing === 'daily' && <span className="text-xs">/day</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-4 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-heading text-lg font-semibold">
                  {formatPrice(subtotalCents)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Monthly plans are billed per month; the subtotal shows the first month.
              </p>
              <Separator className="my-4" />
              <Button asChild className="w-full glow" size="lg" onClick={closeDrawer}>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
