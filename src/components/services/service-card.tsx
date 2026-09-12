import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import type { MaxoraService } from '@/lib/services';
import { ServiceIcon } from '@/components/services/service-icon';
import { cn } from '@/lib/utils';

export function ServiceCard({
  service,
  className,
}: {
  service: MaxoraService;
  className?: string;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        'group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-[border-color,box-shadow] duration-300 [transition-timing-function:var(--ease-out-expo)] hover:border-primary/45 hover:shadow-[0_0_32px_oklch(0.85_0.135_190_/_10%)] sm:p-8',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
          <ServiceIcon name={service.icon} className="size-5" />
        </span>
        <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
      </div>

      <h3 className="mt-6 font-heading text-xl font-semibold">{service.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground text-pretty">{service.tagline}</p>

      <ul className="mt-6 space-y-2 border-t border-border pt-5">
        {service.examples.slice(0, 4).map((example) => (
          <li key={example} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
            <span>{example}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
