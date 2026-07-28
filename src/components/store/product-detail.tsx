'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowLeft, Check, Sparkles, MessageSquare, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { formatPrice, tierPriceLabel, tierDiscountPercent, type Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/reveal';
import { fireProductPageConfetti } from '@/lib/confetti';
import { cn } from '@/lib/utils';

const exampleListVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const exampleItemVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedTierId, setSelectedTierId] = useState(
    product.tiers.length > 0 ? product.tiers[0].id : '',
  );
  const selectedTier = product.tiers.find((t) => t.id === selectedTierId);
  const reduce = useReducedMotion();

  useEffect(() => {
    fireProductPageConfetti();
  }, [product.slug]);

  // Put the highlighted (best value) tier in the middle column on a 3-up grid,
  // matching the conventional pricing-table layout.
  const displayTiers =
    product.tiers.length === 3
      ? (() => {
          const idx = product.tiers.findIndex(
            (t) => t.billing === 'monthly' && t.termMonths === 12,
          );
          if (idx === -1 || idx === 1) return product.tiers;
          const rest = product.tiers.filter((_, i) => i !== idx);
          return [rest[0], product.tiers[idx], rest[1]];
        })()
      : product.tiers;

  function handleAdd() {
    if (!selectedTier) return;
    addItem({
      productSlug: product.slug,
      productName: product.name,
      tierId: selectedTier.id,
      tierName: selectedTier.name,
      unitPriceCents: selectedTier.priceCents,
      billing: selectedTier.billing,
      termMonths: selectedTier.termMonths,
    });
    toast.success(`${product.name} (${selectedTier.name}) added to cart`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pt-32 pb-24 sm:px-6">
      <Link
        href="/services"
        className="mb-10 inline-flex items-center gap-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-5" />
        All services
      </Link>

      <Reveal className="text-center">
        <p className="eyebrow mb-3">{product.quoteOnly ? 'Priced per project' : 'Service'}</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {product.name}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary text-pretty">{product.tagline}</p>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-pretty">
          {product.description}
        </p>
      </Reveal>

      {product.quoteOnly ? (
        <Reveal delay={0.1} className="mt-12">
          {product.examples && product.examples.length > 0 && (
            <div className="mx-auto max-w-2xl">
              <p className="text-center text-sm font-medium text-muted-foreground">
                A few examples of what we can build:
              </p>
              <motion.ul
                className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                variants={reduce ? undefined : exampleListVariants}
                initial={reduce ? undefined : 'hidden'}
                whileInView={reduce ? undefined : 'show'}
                viewport={{ once: true, amount: 0.4 }}
              >
                {product.examples.map((example) => (
                  <motion.li
                    key={example}
                    variants={reduce ? undefined : exampleItemVariants}
                    className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm"
                  >
                    <Check className="size-4 shrink-0 text-primary" />
                    <span>{example}</span>
                  </motion.li>
                ))}
                <motion.li
                  variants={reduce ? undefined : exampleItemVariants}
                  className="flex items-center gap-2.5 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm text-primary sm:col-span-2"
                >
                  <Sparkles className="size-4 shrink-0" />
                  <span>Anything you want, just ask</span>
                </motion.li>
              </motion.ul>
            </div>
          )}

          <div className="mt-10 text-center">
            <Button asChild size="lg" className="glow">
              <Link href={`/contact?service=${product.slug}`}>
                <MessageSquare className="size-4" />
                Request a Free Quote
              </Link>
            </Button>
            <p className="mt-3 text-sm text-muted-foreground">
              No commitment. We reply within 24 hours.
            </p>
          </div>
        </Reveal>
      ) : (
        <Reveal delay={0.1} className="mt-14">
          <div
            className={cn(
              'mx-auto grid items-end gap-5',
              product.tiers.length >= 3
                ? 'grid-cols-1 sm:grid-cols-3 sm:gap-4 lg:gap-6'
                : 'max-w-2xl grid-cols-1 sm:grid-cols-2',
            )}
            role="radiogroup"
            aria-label="Choose a package"
          >
            {displayTiers.map((tier) => {
              const selected = tier.id === selectedTierId;
              const highlight = tier.billing === 'monthly' && tier.termMonths === 12;
              const discount = tierDiscountPercent(tier);
              return (
                <button
                  key={tier.id}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={cn(
                    'relative flex h-full flex-col rounded-2xl border p-5 text-left transition-all duration-200 sm:p-7',
                    highlight
                      ? 'border-primary bg-primary/5 shadow-[0_0_40px_oklch(0.85_0.135_190_/_12%)] sm:scale-105 sm:z-10'
                      : selected
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/40',
                  )}
                >
                  {highlight && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="default">
                      Best Value
                    </Badge>
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading text-lg font-semibold">{tier.name}</span>
                    <div className="flex items-center gap-2">
                      {discount !== null && (
                        <Badge variant="destructive" className="px-1.5 py-0 text-[10px]">
                          {discount}% OFF
                        </Badge>
                      )}
                      <span
                        className={cn(
                          'flex size-5 shrink-0 items-center justify-center rounded-full border-2',
                          selected ? 'border-primary bg-primary' : 'border-muted-foreground/60',
                        )}
                      >
                        {selected && (
                          <Check className="size-3.5 text-primary-foreground" strokeWidth={3} />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span
                      className={cn(
                        'font-heading font-semibold text-primary',
                        highlight ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl',
                      )}
                    >
                      {formatPrice(tier.priceCents)}
                    </span>
                    {tier.billing === 'monthly' && (
                      <span className="text-muted-foreground">/mo</span>
                    )}
                    {tier.billing === 'daily' && (
                      <span className="text-muted-foreground">/day</span>
                    )}
                    {discount !== null && (
                      <span className="text-base text-muted-foreground/70 line-through tabular-nums">
                        {formatPrice(tier.originalPriceCents!)}
                      </span>
                    )}
                  </div>
                  <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mx-auto mt-10 max-w-md sm:mt-14">
            <Button size="lg" className="w-full glow" onClick={handleAdd}>
              <ShoppingCart className="size-4" />
              Add to Cart{selectedTier ? ` for ${tierPriceLabel(selectedTier)}` : ''}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              No payment is taken until we confirm your order.
            </p>
          </div>
        </Reveal>
      )}
    </div>
  );
}
