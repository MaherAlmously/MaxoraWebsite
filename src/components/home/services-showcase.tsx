import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/store/product-card';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';

export function ServicesShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="What we do"
        title="Everything your brand needs to grow"
        description="Pick a service, choose a package, and check out in minutes. Custom projects get a free quote."
      />
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {products.map((product, i) => (
          <Reveal key={product.slug} delay={(i % 3) * 0.1}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/services">
            View All Services
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Reveal>
    </section>
  );
}
