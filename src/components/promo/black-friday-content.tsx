'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, MessageSquare, Phone, X } from 'lucide-react';
import { BLACK_FRIDAY } from '@/lib/promo';
import { usePromoActive } from '@/components/promo/use-promo';
import { PromoCountdown } from '@/components/promo/promo-countdown';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { AmbientGlow } from '@/components/ambient-glow';
import { MagneticButton } from '@/components/magnetic-button';

const included = [
  'New website builds: marketing sites, ecommerce, landing pages',
  'Web applications: portals, dashboards, booking and scheduling',
  'Mobile apps for iOS and Android',
  'Cross-platform and desktop application builds',
  'Design, development, and launch for the above',
];

const excluded = [
  'Monthly maintenance plans',
  'Work already quoted or in progress',
  'Third-party costs such as hosting, domains, and app store fees',
];

const steps = [
  {
    title: 'Tell us what you want built',
    text: 'Send us the project through the contact form before the offer closes. A couple of sentences is enough to start.',
  },
  {
    title: 'We scope it and quote it',
    text: 'We come back within 24 hours with the scope and the full price, with the 50% already applied.',
  },
  {
    title: 'Lock it in',
    text: 'Approve the quote during the offer window and the discounted price holds, even if the build itself starts later.',
  },
];

export function BlackFridayContent() {
  const active = usePromoActive(BLACK_FRIDAY);

  // `null` while the window is still being resolved on the client. Render the
  // static shell so there's no layout jump, just no live/ended claim yet.
  const ended = active === false;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal>
          <p className="eyebrow mb-3">
            {BLACK_FRIDAY.name} · {BLACK_FRIDAY.window}
          </p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            <span className="text-gradient">50% off</span> web &amp; mobile development
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-lg text-pretty">
            Half price on new website and application builds started during Black Friday week. Same
            scope, same build, same support after launch. {BLACK_FRIDAY.subhead}
          </p>

          {ended ? (
            <div className="border-border bg-card mt-8 rounded-xl border p-6">
              <h2 className="font-heading text-lg font-semibold">This offer has ended</h2>
              <p className="text-muted-foreground mt-2 text-sm text-pretty">
                Black Friday pricing ran {BLACK_FRIDAY.window}. We still scope and quote every
                project individually, so it is worth telling us what you have in mind.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="lg" className="glow">
                  <Link href="/contact">
                    <MessageSquare className="size-4" />
                    Tell Us What You Need
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/services">See Our Services</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <PromoCountdown className="mt-8" />
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <Button asChild size="lg" className="glow">
                    <Link href="/contact?type=black-friday">
                      Claim the Offer
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </MagneticButton>
                <Button asChild size="lg" variant="outline">
                  <a href="tel:+18175010172">
                    <Phone className="size-4" />
                    817 501 0172
                  </a>
                </Button>
              </div>
            </>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="facet-cut border-primary/25 relative mx-auto max-w-sm overflow-hidden rounded-2xl border">
            <Image
              src={BLACK_FRIDAY.image}
              alt={BLACK_FRIDAY.imageAlt}
              width={1086}
              height={1448}
              sizes="(max-width: 1024px) 90vw, 24rem"
              priority
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>

      <div className="mt-24">
        <SectionHeading
          eyebrow="The fine print"
          title="What the 50% covers"
          description="Written out plainly so there are no surprises on the quote."
          align="left"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="border-primary/25 bg-card h-full rounded-xl border p-6">
              <h3 className="font-heading font-semibold">Included</h3>
              <ul className="mt-4 space-y-2.5">
                {included.map((item) => (
                  <li key={item} className="text-muted-foreground flex items-start gap-2.5 text-sm">
                    <Check className="text-primary mt-0.5 size-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border-border bg-card h-full rounded-xl border p-6">
              <h3 className="font-heading font-semibold">Not included</h3>
              <ul className="mt-4 space-y-2.5">
                {excluded.map((item) => (
                  <li key={item} className="text-muted-foreground flex items-start gap-2.5 text-sm">
                    <X className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-24">
        <SectionHeading eyebrow="How to claim it" title="Three steps" align="left" />
        <div className="grid gap-5 sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="border-border bg-card h-full rounded-xl border p-6">
                <span className="eyebrow">Step {i + 1}</span>
                <h3 className="font-heading mt-3 font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm text-pretty">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {!ended && (
        <Reveal className="mt-20">
          <div className="facet-cut border-primary/25 bg-card relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <AmbientGlow />
            <div className="relative">
              <h2 className="font-heading text-xl font-semibold">
                Offer closes {BLACK_FRIDAY.window.split('–')[1]?.trim() ?? 'Nov 30'}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Send us the project and we&apos;ll come back with a scoped quote within 24 hours.
              </p>
            </div>
            <Button asChild size="lg" className="glow relative shrink-0">
              <Link href="/contact?type=black-friday">
                <MessageSquare className="size-4" />
                Claim the Offer
              </Link>
            </Button>
          </div>
        </Reveal>
      )}
    </div>
  );
}
