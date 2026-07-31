'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/reveal';
import { HeroBackground } from '@/components/home/hero-background';
import { ProjectShowcase } from '@/components/portfolio/project-showcase';
import { TrustedBy } from '@/components/portfolio/trusted-by';

export function PortfolioPageContent() {
  const reduce = useReducedMotion();

  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackground />
        <div className="relative mx-auto max-w-2xl px-4 pt-32 pb-16 text-center sm:px-6 sm:pt-40">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-3">Selected work</p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-6xl">
              A closer look at what <span className="text-gradient-flow">we build</span>
            </h1>
            <p className="text-muted-foreground mt-5 text-base sm:text-lg">
              Your website could look this good.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <ProjectShowcase />
      </section>

      <TrustedBy />

      <section className="py-14">
        <Reveal className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to start yours?
          </h2>
          <p className="text-muted-foreground mt-3">
            Reach out whenever you&apos;re ready to move forward.
          </p>
          <Button asChild size="lg" className="glow mt-7 w-full sm:w-auto">
            <Link href="/contact">
              Get in touch
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
