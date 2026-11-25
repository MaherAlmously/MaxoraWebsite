import { getProduct } from '@/lib/products';
import { PackageCard, type PackageArt } from '@/components/packages/package-card';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

/**
 * Per-tier presentation: the photograph and the one-line "who this is for".
 * Prices, names, and features all come from the catalog - nothing here is a
 * second source of truth for anything you could get wrong.
 */
const presentation: Record<string, { art: PackageArt; blurb: string; highlight?: boolean }> = {
  'website-development:informative': {
    art: {
      src: '/images/packages/website-informative.jpg',
      alt: 'A desk with a monitor showing a business website and a laptop beside it',
    },
    blurb: 'For businesses that need to be found and trusted online.',
  },
  'website-development:ecommerce': {
    art: {
      src: '/images/packages/website-ecommerce.jpg',
      alt: 'A hand holding a payment card in front of an open laptop',
    },
    blurb: 'For selling products directly, with a cart and real checkout.',
    highlight: true,
  },
  'app-development:launch': {
    art: {
      src: '/images/packages/app-launch.jpg',
      alt: 'A designer sketching an app home screen on paper at a desk',
    },
    blurb: 'Get the first real version of your idea into one app store.',
  },
  'app-development:scale': {
    art: {
      src: '/images/packages/app-scale.jpg',
      alt: 'A laptop screen filled with application source code',
    },
    blurb: 'The full product: both platforms, accounts, payments, dashboard.',
    highlight: true,
  },
};

export function PackageGrid({
  productSlug,
  className,
}: {
  productSlug: string;
  className?: string;
}) {
  const product = getProduct(productSlug);
  if (!product || product.tiers.length === 0) return null;

  return (
    <div className={cn('grid grid-cols-1 gap-5 sm:grid-cols-2', className)}>
      {product.tiers.map((tier, i) => {
        const preset = presentation[`${product.slug}:${tier.id}`];
        if (!preset) return null;
        return (
          <Reveal key={tier.id} delay={i * 0.08}>
            <PackageCard
              product={product}
              tier={tier}
              art={preset.art}
              blurb={preset.blurb}
              highlight={preset.highlight}
            />
          </Reveal>
        );
      })}
    </div>
  );
}

/** True when a service slug has purchasable packages behind it. */
export function hasPackages(productSlug: string): boolean {
  const product = getProduct(productSlug);
  return Boolean(product && product.tiers.length > 0);
}
