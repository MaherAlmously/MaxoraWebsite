'use client';

import Link from 'next/link';
import { Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/reveal';
import { BrowserMockup } from '@/components/portfolio/browser-mockup';
import { portfolioProjects } from '@/lib/portfolio';

export function ProjectShowcase() {
  return (
    <div className="space-y-24 sm:space-y-32">
      {portfolioProjects.map((project, i) => {
        const reversed = i % 2 === 1;
        return (
          <div key={project.slug} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={reversed ? 'lg:order-2' : undefined}>
              <BrowserMockup
                image={project.image}
                domain={project.domain}
                name={project.name}
                priority={i === 0}
              />
            </Reveal>

            <Reveal delay={0.1} className={reversed ? 'lg:order-1' : undefined}>
              <p className="eyebrow mb-3">{project.domain}</p>
              <h3 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                {project.name}
              </h3>
              <p className="text-gradient-flow mt-2 text-base font-medium sm:text-lg">
                {project.tagline}
              </p>
              <p className="text-muted-foreground mt-4">{project.description}</p>

              <ul className="border-border mt-6 space-y-2.5 border-t pt-5">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check className="text-primary mt-0.5 size-4 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild size="lg" className="glow mt-8">
                <Link href={project.url} target="_blank" rel="noopener noreferrer">
                  View live site
                  <ExternalLink className="size-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
