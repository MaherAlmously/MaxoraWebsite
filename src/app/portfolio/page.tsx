import type { Metadata } from 'next';
import { PortfolioPageContent } from '@/components/portfolio/portfolio-page-content';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Selected Maxora web design and development work, including smokingrillplano.com, masuly.com, and maherealtor.com.',
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
