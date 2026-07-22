import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { productTagLabels, tierPriceLabel, type Product } from '@/lib/products';
import { ServiceArt } from '@/components/store/service-art';
import { Badge } from '@/components/ui/badge';

const tagVariant = {
  'best-seller': 'default',
  popular: 'secondary',
  new: 'outline',
  'limited-time': 'destructive',
} as const;

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/services/${product.slug}`}
      className="group relative block h-full rounded-2xl border border-border bg-card p-2.5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:bg-accent/40 hover:shadow-xl sm:p-4"
    >
      {product.tags && product.tags.length > 0 && (
        <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1 sm:top-3 sm:left-3">
          {product.tags.map((tag) => (
            <Badge key={tag} variant={tagVariant[tag]}>
              {productTagLabels[tag]}
            </Badge>
          ))}
        </div>
      )}
      <ServiceArt slug={product.slug} />
      <div className="p-1.5 pt-3 sm:p-2 sm:pt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-heading text-base font-semibold sm:text-lg">{product.name}</h3>
          <ArrowUpRight className="hidden size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary sm:block" />
        </div>
        <p className="mt-1.5 hidden text-sm text-muted-foreground text-pretty sm:block">
          {product.tagline}
        </p>

        {product.quoteOnly ? (
          <p className="mt-3 text-xs font-medium text-primary sm:mt-4 sm:text-sm">
            Free quote, priced per project
          </p>
        ) : (
          <>
            <ul className="mt-3 space-y-1.5 sm:mt-4">
              {product.tiers.map((tier) => (
                <li
                  key={tier.id}
                  className="flex items-center justify-between gap-1 rounded-md bg-secondary/50 px-2 py-1.5 text-xs sm:px-3 sm:text-sm"
                >
                  <span className="text-muted-foreground">{tier.name}</span>
                  <span className="font-semibold whitespace-nowrap text-primary">
                    {tierPriceLabel(tier)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2.5 text-xs text-muted-foreground">
              {product.tiers[0]?.billing === 'monthly'
                ? 'Billed monthly for the length of the plan'
                : 'One-time payment'}
            </p>
          </>
        )}
      </div>
    </Link>
  );
}
