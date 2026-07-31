'use client';

import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Reveal } from '@/components/reveal';
import { clients } from '@/lib/clients';

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

/**
 * A static (non-scrolling) animated grid of client logos, tailored for the
 * portfolio landing page — a "trust wall" that pops in on scroll rather
 * than the homepage's auto-scrolling marquee, since this page is read
 * top-to-bottom by a single warm lead rather than skimmed.
 */
export function TrustedBy() {
  const reduce = useReducedMotion();

  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-3">Trusted by</p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Businesses we&apos;ve helped grow
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-pretty">
            A few of the brands, shops, and organizations we&apos;ve built websites, logos, and
            content for.
          </p>
        </Reveal>

        <motion.div
          className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-6"
          variants={reduce ? undefined : container}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={{ once: true, amount: 0.2 }}
        >
          {clients.map((client) => (
            <motion.div
              key={client.name}
              variants={reduce ? undefined : item}
              whileHover={
                reduce
                  ? undefined
                  : {
                      y: -6,
                      scale: 1.06,
                      transition: { type: 'spring', stiffness: 300, damping: 18 },
                    }
              }
              className="group glass hover:border-primary/50 flex flex-col items-center gap-2.5 rounded-xl px-3 py-5 transition-all duration-300 hover:shadow-[0_0_28px_oklch(0.85_0.135_190_/_20%)]"
              title={`${client.name}: ${client.service}`}
            >
              <div className="ring-border group-hover:ring-primary/50 size-12 shrink-0 overflow-hidden rounded-full bg-white ring-1 transition-shadow duration-300 sm:size-14">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-muted-foreground group-hover:text-foreground w-full truncate text-center text-xs font-medium transition-colors duration-300">
                {client.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
