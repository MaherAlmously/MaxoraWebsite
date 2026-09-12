import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, products } from '@/lib/products';
import { getService, services } from '@/lib/services';
import { ProductDetail } from '@/components/store/product-detail';
import { ServiceDetail } from '@/components/services/service-detail';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...services.map((s) => ({ slug: s.slug })), ...products.map((p) => ({ slug: p.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (service) return { title: service.name, description: service.tagline };
  const product = getProduct(slug);
  if (product) return { title: product.name, description: product.tagline };
  return {};
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;

  const service = getService(slug);
  if (service) return <ServiceDetail service={service} />;

  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
