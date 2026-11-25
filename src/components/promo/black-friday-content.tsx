'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, MessageSquare, Phone } from 'lucide-react';
import { BLACK_FRIDAY } from '@/lib/promo';
import { usePromoActive } from '@/components/promo/use-promo';
import { PromoCountdown } from '@/components/promo/promo-countdown';
import { PackageGrid } from '@/components/packages/package-grid';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';

const included = [
  'New website builds: marketing sites, ecommerce, landing pages',
  'Web applications: portals, dashboards, booking and scheduling',
  'Mobile apps for iOS and Android',
  'Cross-platform and desktop application builds',
  'Design, development, and launch for all of the above',
];

const steps = [
  {
    title: 'Pick a package or tell us the project',
    text: 'Buy a package outright, or send us the brief if what you need sits outside them. Either way it has to start before the offer closes.',
  },
  {
    title: 'We confirm the scope',
    text: 'We come back within 24 hours with exactly what is included at that price, in writing, before any work begins.',
  },
  {
    title: 'The price holds',
    text: 'Once the scope is agreed during the offer window, the discounted price stands even if the build itself starts later.',
  },
];

export function BlackFridayContent() {
  const active = usePromoActive(BLACK_FRIDAY);

  // `null` while the window is still being resolved on the client. Render the
  // live shell so there's no layout jump, just no ended claim yet.
  const ended = active === false;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
      {/* Campaign ground: warm obsidian, deliberately unlike the rest of the site. */}
      <div className="bg-bf-ink text-bf-bone border-bf-gold/20 relative overflow-hidden rounded-3xl border p-6 sm:p-10 lg:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(90% 80% at 5% 0%, oklch(0.5 0.2 25 / 48%) 0%, transparent 60%), radial-gradient(80% 70% at 100% 100%, oklch(0.66 0.19 38 / 28%) 0%, transparent 62%)',
          }}
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <Reveal>
            <p className="text-bf-gold/80 text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
              {BLACK_FRIDAY.name} · {BLACK_FRIDAY.window}
            </p>
            <h1 className="mt-5 font-heading font-semibold tracking-tight">
              <span className="text-foil inline-block text-7xl leading-[0.85] sm:text-8xl lg:text-9xl">
                50%
              </span>
              <span className="mt-2 block text-3xl leading-tight sm:text-4xl lg:text-5xl">
                off web &amp; app development
              </span>
            </h1>
            <p className="text-bf-bone/70 mt-5 max-w-xl text-lg text-pretty">
              Half price on new website and application builds started during Black Friday week.
              Same scope, same build, same support after launch. {BLACK_FRIDAY.subhead}
            </p>

            {ended ? (
              <div className="border-bf-gold/25 mt-8 rounded-2xl border bg-black/30 p-6">
                <h2 className="font-heading text-lg font-semibold">This offer has ended</h2>
                <p className="text-bf-bone/70 mt-2 text-sm text-pretty">
                  Black Friday pricing ran {BLACK_FRIDAY.window}. The packages are still
                  available at their standard prices, and we scope every project individually.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-bf-ember hover:bg-bf-ember/90 border-0 text-white">
                    <Link href="/services">
                      See Our Services
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="text-bf-bone/80 hover:bg-bf-bone/10 hover:text-bf-bone"
                  >
                    <Link href="/contact">Tell Us What You Need</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <PromoCountdown className="mt-8" />
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="glow-ember bg-bf-ember hover:bg-bf-ember/90 border-0 text-white"
                  >
                    <a href="#packages">
                      Claim the Offer
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="text-bf-bone/80 hover:bg-bf-bone/10 hover:text-bf-bone"
                  >
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
            <div className="border-bf-gold/25 relative mx-auto max-w-xs overflow-hidden rounded-2xl border shadow-2xl shadow-black/50">
              <Image
                src={BLACK_FRIDAY.image}
                alt={BLACK_FRIDAY.imageAlt}
                width={1086}
                height={1448}
                sizes="(max-width: 1024px) 80vw, 20rem"
                priority
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <div id="packages" className="mt-20 scroll-mt-28">
        <SectionHeading
          eyebrow="Buy now"
          title="Packages at half price"
          description="Fixed scope, fixed price, paid online. Add one to your cart and we confirm the detail before any work starts."
          align="left"
        />
        <PackageGrid productSlug="website-development" className="lg:grid-cols-2" />
        <PackageGrid productSlug="app-development" className="mt-5 lg:grid-cols-2" />
      </div>

      <div className="mt-20">
        <SectionHeading
          eyebrow="The fine print"
          title="What the 50% covers"
          description="Written out plainly so there are no surprises on the quote."
          align="left"
        />
        <Reveal>
          <div className="border-bf-crimson/30 rounded-2xl border bg-card p-6 sm:p-8">
            <ul className="grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <Check className="text-savings mt-0.5 size-4 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border pt-5 text-xs text-muted-foreground">
              Applies to new builds started during the offer window. Monthly maintenance plans and
              work already quoted keep their usual pricing, and third-party costs such as hosting,
              domains, and app store fees are not included.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-20">
        <SectionHeading eyebrow="How to claim it" title="Three steps" align="left" />
        <div className="grid gap-5 sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <span className="text-bf-ember font-heading text-2xl font-semibold tabular-nums">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-heading font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {!ended && (
        <Reveal className="mt-20">
          <div className="bg-bf-ink text-bf-bone border-bf-gold/20 relative flex flex-col items-center gap-5 overflow-hidden rounded-3xl border px-6 py-10 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(70% 140% at 0% 50%, oklch(0.5 0.2 25 / 42%) 0%, transparent 65%)',
              }}
            />
            <div className="relative">
              <h2 className="font-heading text-xl font-semibold">
                Offer closes Nov 30, 11:59pm
              </h2>
              <p className="text-bf-bone/70 mt-1 text-sm">
                Not sure which package fits? Tell us the project and we&apos;ll reply within 24
                hours.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="glow-ember bg-bf-ember hover:bg-bf-ember/90 relative shrink-0 border-0 text-white"
            >
              <Link href="/contact?type=black-friday">
                <MessageSquare className="size-4" />
                Ask Us First
              </Link>
            </Button>
          </div>
        </Reveal>
      )}
    </div>
  );
}
