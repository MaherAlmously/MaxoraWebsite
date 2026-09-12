import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Maxora is a software company that helps businesses replace spreadsheets, manual work, and disconnected tools with software built around how they actually operate.',
};

const points = [
  {
    title: 'You know the problem. We figure out the software.',
    text: 'You don’t need to come to us with a technical spec. Tell us what’s slowing your business down or what you want to build, and we work out the right way to solve it.',
  },
  {
    title: 'Built around your business, not a template',
    text: 'Every business runs a little differently. We design software around how your team actually works, instead of forcing your workflow into an off-the-shelf tool.',
  },
  {
    title: 'Involved through the whole build',
    text: 'You see progress as we build, not just a finished product at the end. Scope stays clear, and you always know what’s happening next.',
  },
  {
    title: 'Support after launch',
    text: 'Software needs to keep working after it ships. We stay available to fix issues, make changes, and improve things as your business grows.',
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
          Maxora helps businesses replace spreadsheets, manual processes, and disconnected tools
          with software designed around how they actually operate. You tell us what&apos;s slowing
          you down or what you want to build, and we figure out the technology needed to solve it,
          custom software, automation, or a web or mobile app.
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
              <div className="h-full rounded-xl border border-border bg-card p-6">
                <h3 className="font-heading font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">{point.text}</p>
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
