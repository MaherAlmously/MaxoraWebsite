import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, products } from '@/lib/products';
import { ProductDetail } from '@/components/store/product-detail';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.tagline };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
