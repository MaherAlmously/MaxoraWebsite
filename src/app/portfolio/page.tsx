import type { Metadata } from 'next';
import { PortfolioPageContent } from '@/components/portfolio/portfolio-page-content';

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Real software Maxora has built for real businesses, including smokingrillplano.com, masuly.com, and maherealtor.com. The problem, what we built, and the result.',
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
