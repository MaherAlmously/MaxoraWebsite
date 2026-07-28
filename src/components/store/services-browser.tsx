'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { categoryLabels, type Product } from '@/lib/products';
import { ProductCard } from '@/components/store/product-card';
import { cn } from '@/lib/utils';

type CategoryFilter = 'all' | Product['category'];
type PricingFilter = 'all' | 'fixed' | 'quote';

const pricingTabs: { id: PricingFilter; label: string }[] = [
  { id: 'all', label: 'All pricing' },
  { id: 'fixed', label: 'Fixed price' },
  { id: 'quote', label: 'Custom quote' },
];

function cardVariants(i: number): Variants {
  const fromLeft = i % 2 === 0;
  return {
    hidden: {
      opacity: 0,
      x: fromLeft ? -70 : 70,
      y: 24,
      rotate: fromLeft ? -5 : 5,
      scale: 0.92,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 140, damping: 17, delay: (i % 3) * 0.08 },
    },
  };
}

export function ServicesBrowser({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [pricing, setPricing] = useState<PricingFilter>('all');
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () =>
      products
        .filter((p) => category === 'all' || p.category === category)
        .filter((p) => {
          if (pricing === 'all') return true;
          if (pricing === 'quote') return p.quoteOnly;
          return !p.quoteOnly;
        }),
    [products, category, pricing],
  );

  const categoryTabs: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    ...(Object.entries(categoryLabels) as [Product['category'], string][]).map(([id, label]) => ({
      id,
      label,
    })),
  ];

  return (
    <div>
      <div className="mt-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setCategory(tab.id)}
            className={cn(
              'shrink-0 rounded-lg border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-200',
              category === tab.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {pricingTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setPricing(tab.id)}
            className={cn(
              'shrink-0 rounded-lg border px-4 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-200 sm:text-sm',
              pricing === tab.id
                ? 'border-primary/60 bg-primary/5 text-primary'
                : 'border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div
          key={`${category}-${pricing}`}
          className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3"
        >
          {filtered.map((product, i) => (
            <motion.div
              key={product.slug}
              variants={reduce ? undefined : cardVariants(i)}
              initial={reduce ? undefined : 'hidden'}
              whileInView={reduce ? undefined : 'show'}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-muted-foreground">
          No services match these filters yet.
        </p>
      )}
    </div>
  );
}
