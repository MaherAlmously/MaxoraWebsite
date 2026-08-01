'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrowserMockup } from '@/components/portfolio/browser-mockup';
import { portfolioProjects } from '@/lib/portfolio';

const featureList: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const featureItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

export function ProjectShowcase() {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32">
      {portfolioProjects.map((project, i) => {
        const reversed = i % 2 === 1;
        // Each row slides in from opposite sides: image from the outer edge,
        // copy from the inner edge, so alternating rows alternate direction.
        const imageFromX = reversed ? 60 : -60;
        const textFromX = reversed ? -60 : 60;

        return (
          <div
            key={project.slug}
            className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <motion.div
              className={reversed ? 'lg:order-2' : undefined}
              initial={reduce ? false : { opacity: 0, x: imageFromX }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <BrowserMockup
                image={project.image}
                domain={project.domain}
                name={project.name}
                priority={i === 0}
              />
            </motion.div>

            <motion.div
              className={reversed ? 'lg:order-1' : undefined}
              initial={reduce ? false : { opacity: 0, x: textFromX }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <p className="eyebrow">{project.domain}</p>
                <span className="border-primary/30 bg-primary/10 text-primary rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide">
                  {project.category}
                </span>
              </div>
              <h3 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                {project.name}
              </h3>
              <p className="text-gradient-flow mt-2 text-base font-medium sm:text-lg">
                {project.tagline}
              </p>
              <p className="text-muted-foreground mt-4">{project.description}</p>

              <motion.ul
                className="border-border mt-6 space-y-2.5 border-t pt-5"
                variants={reduce ? undefined : featureList}
                initial={reduce ? undefined : 'hidden'}
                whileInView={reduce ? undefined : 'show'}
                viewport={{ once: true, amount: 0.4 }}
              >
                {project.features.map((feature) => (
                  <motion.li
                    key={feature}
                    variants={reduce ? undefined : featureItem}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <Check className="text-primary mt-0.5 size-4 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <Button asChild size="lg" className="glow mt-8 w-full sm:w-auto">
                <Link href={project.url} target="_blank" rel="noopener noreferrer">
                  View live site
                  <ExternalLink className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
