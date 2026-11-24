import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Maxora is a software company that builds custom websites and applications for growing businesses, and keeps them running after launch.',
};

const points: { title: string; text: string; href?: string; linkLabel?: string }[] = [
  {
    title: 'Scoped against a number you already track',
    text: 'Before we build, we agree on what the work is supposed to move: hours spent on a task, orders taken online, leads coming through the site. It keeps the scope honest and gives you something to judge the result by.',
  },
  {
    title: 'Custom-built, not a template',
    text: 'Every business runs a little differently. We design and code around how your team actually works, instead of bending your workflow to fit an off-the-shelf tool.',
  },
  {
    title: 'Built to grow with you',
    text: 'We build on a stack that holds up as traffic, catalogue size, and headcount grow, and we structure the code so the next feature is an addition rather than a rebuild. You own the code and the data.',
  },
  {
    title: 'Maintained after launch',
    text: 'Launch day is not the end of the work. Monthly maintenance plans cover updates, backups, monitoring, and the small fixes that otherwise pile up.',
    href: '/services/maintenance-packages',
    linkLabel: 'See maintenance packages',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
      <Reveal className="max-w-2xl">
        <p className="eyebrow mb-3">About Maxora</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          A software company built around <span className="text-gradient">how you work.</span>
        </h1>
        <p className="mt-4 text-muted-foreground text-pretty">
          Maxora builds custom websites and applications for businesses that have outgrown what
          they started on. Every build is written for your business rather than adapted from a
          template, scoped against a result you can measure, and structured so it can keep growing
          after launch instead of needing to be replaced.
        </p>
        <p className="mt-4 text-muted-foreground text-pretty">
          We do three things: web development, app development for mobile, desktop, and
          cross-platform, and the monthly maintenance that keeps both running. Work we have shipped
          is on the{' '}
          <Link href="/portfolio" className="text-primary underline-offset-4 hover:underline">
            work page
          </Link>
          .
        </p>
      </Reveal>

      <div className="mt-20">
        <SectionHeading
          eyebrow="How we work"
          title="What you can expect from working with us"
          align="left"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                <h3 className="font-heading font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">{point.text}</p>
                {point.href && (
                  <Link
                    href={point.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground"
                  >
                    {point.linkLabel}
                    <ArrowRight className="size-3.5" />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-20">
        <div className="facet-cut flex flex-col items-center gap-4 rounded-2xl border border-primary/25 bg-card px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="font-heading text-xl font-semibold">Have a problem worth solving?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us what you&apos;re dealing with. We&apos;ll tell you what&apos;s possible.
            </p>
          </div>
          <Button asChild size="lg" className="glow shrink-0">
            <Link href="/contact">
              <MessageSquare className="size-4" />
              Tell Us What You Need
            </Link>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
