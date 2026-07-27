'use client';

import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import Link from 'next/link';
import { motion, useSpring, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Clock } from 'lucide-react';
import {
  productTagLabels,
  tierPriceLabel,
  tierDiscountPercent,
  formatPrice,
  type Product,
} from '@/lib/products';
import { ServiceArt } from '@/components/store/service-art';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const tagVariant = {
  'best-seller': 'default',
  popular: 'secondary',
  new: 'outline',
} as const;

export function ProductCard({ product }: { product: Product }) {
  const featured = product.tags?.includes('best-seller') ?? false;
  const cardRef = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const artX = useSpring(0, { stiffness: 200, damping: 20 });
  const artY = useSpring(0, { stiffness: 200, damping: 20 });

  function handlePointerMove(e: ReactPointerEvent<HTMLAnchorElement>) {
    if (reduce || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const relY = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    artX.set(relX * -8);
    artY.set(relY * -8);
  }

  function handlePointerLeave() {
    artX.set(0);
    artY.set(0);
  }

  return (
    <Link
      ref={cardRef}
      href={`/services/${product.slug}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'group relative block h-full overflow-hidden rounded-2xl border bg-card p-2.5 transition-[border-color,box-shadow] duration-300 [transition-timing-function:var(--ease-out-expo)] sm:p-4',
        featured
          ? 'border-primary/40 shadow-[0_0_0_1px_oklch(0.85_0.135_190_/_18%),0_0_40px_oklch(0.85_0.135_190_/_14%)] hover:shadow-[0_0_0_1px_oklch(0.85_0.135_190_/_30%),0_0_56px_oklch(0.85_0.135_190_/_20%)]'
          : 'border-border hover:border-primary/45 hover:shadow-[0_0_28px_oklch(0.85_0.135_190_/_10%)]',
      )}
    >
      {product.tags && product.tags.length > 0 && (
        <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1 sm:top-3 sm:left-3">
          {product.tags.map((tag) =>
            tag === 'limited-time' ? (
              <Badge
                key={tag}
                className="border-transparent bg-amber-500 text-white shadow-[0_0_12px_oklch(0.75_0.15_70_/_35%)]"
              >
                <Clock data-icon="inline-start" className="size-3" />
                {productTagLabels[tag]}
              </Badge>
            ) : (
              <Badge key={tag} variant={tagVariant[tag]}>
                {productTagLabels[tag]}
              </Badge>
            ),
          )}
        </div>
      )}
      <motion.div style={reduce ? undefined : { x: artX, y: artY }}>
        <ServiceArt slug={product.slug} />
      </motion.div>
      <div className="p-1.5 pt-3 sm:p-2 sm:pt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-heading text-base font-semibold sm:text-lg">{product.name}</h3>
          <ArrowUpRight className="hidden size-5 shrink-0 text-muted-foreground transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary sm:block" />
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground sm:hidden">{product.shortTagline}</p>
        <p className="mt-1.5 hidden text-sm text-muted-foreground text-pretty sm:block">
          {product.tagline}
        </p>

        {product.quoteOnly ? (
          <p className="mt-3 text-xs font-medium text-primary sm:mt-4 sm:text-sm">
            Free quote, priced per project
          </p>
        ) : (
          <ul className="mt-3 space-y-1.5 sm:mt-4">
            {product.tiers.map((tier) => {
              const discount = tierDiscountPercent(tier);
              return (
                <li
                  key={tier.id}
                  className="flex items-center justify-between gap-1 rounded-md bg-secondary/50 px-2 py-1.5 text-xs sm:px-3 sm:text-sm"
                >
                  <span className="text-muted-foreground">{tier.name}</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    {discount !== null && (
                      <>
                        <span className="text-muted-foreground/70 line-through tabular-nums">
                          {formatPrice(tier.originalPriceCents!)}
                        </span>
                        <Badge variant="destructive" className="px-1.5 py-0 text-[10px]">
                          {discount}% OFF
                        </Badge>
                      </>
                    )}
                    <span className="font-heading font-semibold text-primary tabular-nums">
                      {tierPriceLabel(tier)}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Link>
  );
}
