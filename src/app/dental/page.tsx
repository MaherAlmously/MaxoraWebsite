import type { Metadata } from 'next';
import { DentalHero } from '@/components/dental/dental-hero';
import { HowItWorks } from '@/components/dental/how-it-works';
import { WhyItMatters } from '@/components/dental/why-it-matters';
import { WorksWithWorkflow } from '@/components/dental/works-with-workflow';
import { DentalCtaBanner } from '@/components/dental/dental-cta-banner';

export const metadata: Metadata = {
  title: 'Dental Practice Cancellation Recovery',
  description:
    'Turn canceled appointments back into filled chairs. Patients opt in to earlier openings, and when a cancellation happens, the right patients are matched and texted automatically — no front desk calling down a list.',
  alternates: { canonical: '/dental' },
};

export default function DentalPage() {
  return (
    <>
      <DentalHero />
      <HowItWorks />
      <WhyItMatters />
      <WorksWithWorkflow />
      <DentalCtaBanner />
    </>
  );
}
