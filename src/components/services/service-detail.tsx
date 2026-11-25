import Link from 'next/link';
import { ArrowLeft, Check, CreditCard, MessageSquare } from 'lucide-react';
import type { MaxoraService } from '@/lib/services';
import { ServiceIcon } from '@/components/services/service-icon';
import { PackageGrid } from '@/components/packages/package-grid';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/reveal';

export function ServiceDetail({ service }: { service: MaxoraService }) {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-32 pb-24 sm:px-6">
      <Link
        href="/services"
        className="mb-10 inline-flex items-center gap-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-5" />
        All services
      </Link>

      <Reveal className="text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
          <ServiceIcon name={service.icon} className="size-6" />
        </span>
        <p className="eyebrow mt-6 mb-3">Service</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {service.name}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary text-pretty">{service.tagline}</p>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-pretty">
          {service.description}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-sm font-medium text-muted-foreground">
            A few examples of what we build:
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {service.examples.map((example) => (
              <li
                key={example}
                className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm"
              >
                <Check className="size-4 shrink-0 text-primary" />
                <span>{example}</span>
              </li>
            ))}
          </ul>
        </div>

        {service.packagesProductSlug && (
          <div className="mt-16">
            <div className="text-center">
              <p className="eyebrow mb-3">Packages</p>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Pick a package and get started today
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground text-pretty">
                Fixed scope, fixed price, paid online. Need something outside these? Tell us what
                you have in mind and we&apos;ll quote it.
              </p>
            </div>
            <PackageGrid productSlug={service.packagesProductSlug} className="mt-8" />
          </div>
        )}

        {service.packages && (
          <div className="mx-auto mt-14 max-w-4xl">
            <p className="text-center text-sm font-medium text-muted-foreground">
              Monthly plans. Cancel any time.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {service.packages.map((plan) => (
                <div
                  key={plan.name}
                  className="flex h-full flex-col rounded-xl border border-border bg-card p-6"
                >
                  <h3 className="font-heading font-semibold">{plan.name}</h3>
                  <p className="mt-1 font-heading text-2xl font-semibold text-primary">
                    {plan.price}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground text-pretty">{plan.summary}</p>
                  <ul className="mt-5 space-y-2 border-t border-border pt-5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="glow">
              <Link href={`/contact?type=${service.contactType}`}>
                <MessageSquare className="size-4" />
                Tell Us What You Need
              </Link>
            </Button>
            {service.packages && (
              <Button asChild size="lg" variant="outline">
                <Link href="/pay">
                  <CreditCard className="size-4" />
                  Make a Payment
                </Link>
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            No commitment. We reply within 24 hours.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
