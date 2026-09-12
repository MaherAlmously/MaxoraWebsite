import { Hero } from '@/components/home/hero';
import { ProblemFit } from '@/components/home/problem-fit';
import { ServicesShowcase } from '@/components/home/services-showcase';
import { ClientsShowcase } from '@/components/home/clients-showcase';
import { WhyUs } from '@/components/home/why-us';
import { Process } from '@/components/home/process';
import { CtaBanner } from '@/components/home/cta-banner';

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemFit />
      <ServicesShowcase />
      <WhyUs />
      <Process />
      <ClientsShowcase />
      <CtaBanner />
    </>
  );
}
