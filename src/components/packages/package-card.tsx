'use client';

import Image from 'next/image';
import { Check, Loader2, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import {
  effectiveTierPrice,
  formatPrice,
  tierDiscountPercent,
  tierSaleIsLive,
  type Product,
  type ProductTier,
} from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { useHydrated } from '@/components/packages/use-hydrated';
import { cn } from '@/lib/utils';

export type PackageArt = { src: string; alt: string };

export function PackageCard({
  product,
  tier,
  art,
  blurb,
  highlight = false,
}: {
  product: Product;
  tier: ProductTier;
  art: PackageArt;
  /** One line on who this tier is for. */
  blurb: string;
  highlight?: boolean;
}) {
  const { addItem } = useCart();

  // Pages are statically generated, so a sale resolved during render would be
  // frozen at build time. Resolve it after mount instead: the server still has
  // the final say at checkout, but the price on screen is never a stale one.
  const hydrated = useHydrated();
  const now = hydrated ? new Date() : undefined;
  const onSale = hydrated && tierSaleIsLive(tier, now);
  // Before hydration this MUST be the list price, not `effectiveTierPrice`:
  // that helper would default to `new Date()` at build time and freeze a sale
  // price into the static HTML that outlives the campaign. Showing list first
  // and correcting downward is the only direction that cannot mislead.
  const price = hydrated ? effectiveTierPrice(tier, now) : tier.listPriceCents;
  const discount = hydrated ? tierDiscountPercent(tier, now) : null;

  function handleAdd() {
    addItem({
      productSlug: product.slug,
      productName: product.name,
      tierId: tier.id,
      tierName: tier.name,
      unitPriceCents: effectiveTierPrice(tier),
      billing: tier.billing,
      termMonths: tier.termMonths,
    });
    toast.success(`${tier.name} added to cart`);
  }

  return (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-[border-color,box-shadow,transform] duration-300 [transition-timing-function:var(--ease-out-expo)]',
        highlight
          ? 'border-primary/45 shadow-[0_0_0_1px_oklch(0.85_0.135_190_/_14%),0_18px_48px_-24px_oklch(0.85_0.135_190_/_35%)]'
          : 'border-border hover:border-primary/35',
        'hover:-translate-y-1',
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={art.src}
          alt={art.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        {/* Keeps the type legible over any photograph without dimming the whole
            image. Weighted toward the bottom third, where the title sits. */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 via-35% to-card/5" />

        {onSale && discount !== null && (
          <span className="bg-bf-crimson text-bf-bone absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide shadow-lg shadow-black/30">
            {discount}% OFF
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-heading text-xl font-semibold">{tier.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">{blurb}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-4">
        {/* Fixed height so the post-hydration price swap cannot shift the layout. */}
        <div className="flex min-h-14 flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="font-heading text-4xl font-semibold tabular-nums">
            {formatPrice(price)}
          </span>
          {onSale && (
            <span className="text-lg text-muted-foreground/70 line-through tabular-nums">
              {formatPrice(tier.listPriceCents)}
            </span>
          )}
          <span className="w-full text-xs text-muted-foreground">
            {onSale ? 'Black Friday price, one-time' : 'One-time, no subscription'}
          </span>
        </div>

        <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          size="lg"
          className={cn('mt-6 w-full', highlight && 'glow')}
          variant={highlight ? 'default' : 'outline'}
          onClick={handleAdd}
          disabled={!hydrated}
        >
          {hydrated ? (
            <ShoppingCart className="size-4" />
          ) : (
            <Loader2 className="size-4 animate-spin" />
          )}
          Add to Cart
        </Button>
        <p className="mt-2.5 text-center text-xs text-muted-foreground">
          We confirm scope with you before any work starts.
        </p>
      </div>
    </div>
  );
}
