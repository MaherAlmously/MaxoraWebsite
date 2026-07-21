'use client';

import { useMemo, useState } from 'react';
import { categoryLabels, type Product } from '@/lib/products';
import { ProductCard } from '@/components/store/product-card';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

type CategoryFilter = 'all' | Product['category'];

export function ServicesBrowser({ products }: { products: Product[] }) {
  const [active, setActive] = useState<CategoryFilter>('all');

  const filtered = useMemo(
    () => (active === 'all' ? products : products.filter((p) => p.category === active)),
    [products, active],
  );

  const featured = filtered.filter((p) => !p.quoteOnly && p.featured);
  const priced = filtered.filter((p) => !p.quoteOnly && !p.featured);
  const quoteOnly = filtered.filter((p) => p.quoteOnly);
  const isFiltered = active !== 'all';

  const tabs: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    ...(Object.entries(categoryLabels) as [Product['category'], string][]).map(([id, label]) => ({
      id,
      label,
    })),
  ];

  return (
    <div>
      <div className="mt-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={cn(
              'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-200',
              active === tab.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isFiltered ? (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5">
              {featured.map((product, i) => (
                <Reveal key={product.slug} delay={i * 0.08}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          )}

          {priced.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-5">
              {priced.map((product, i) => (
                <Reveal key={product.slug} delay={i * 0.08}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          )}

          {quoteOnly.length > 0 && (
            <>
              <Reveal className="mt-20 mb-8">
                <p className="eyebrow mb-3">Custom scope</p>
                <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                  Priced per project
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  These depend on what you want to build, so we quote each one individually. Tell
                  us what you need and we&apos;ll reply within 24 hours.
                </p>
              </Reveal>

              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
                {quoteOnly.map((product, i) => (
                  <Reveal key={product.slug} delay={(i % 3) * 0.08}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">
          No services in this category yet.
        </p>
      )}
    </div>
  );
}
