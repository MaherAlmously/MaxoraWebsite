'use client';

import Image from 'next/image';
import { clients, type Client } from '@/lib/clients';

/**
 * A single row cycling through all 12 clients. Content is doubled for a
 * seamless loop; with all 12 unique logos per copy, the seam is far wider
 * than any viewport, so the repeat is never visible on screen at once.
 */
const items = [...clients, ...clients];

function LogoTile({ client }: { client: Client }) {
  return (
    <div
      className="group glass flex w-40 shrink-0 flex-col items-center gap-2.5 rounded-xl px-4 py-4 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_28px_oklch(0.85_0.135_190_/_20%)] sm:w-48"
      title={`${client.name}: ${client.service}`}
    >
      <div className="size-14 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-border transition-shadow duration-300 group-hover:ring-primary/50 sm:size-16">
        <Image
          src={client.logo}
          alt={client.name}
          width={64}
          height={64}
          className="h-full w-full object-cover"
        />
      </div>
      <p className="w-full truncate text-center text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
        {client.name}
      </p>
    </div>
  );
}

export function ClientsMarquee() {
  return (
    <div className="overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="marquee-row flex w-max gap-4" style={{ animationDuration: '30s' }}>
        {items.map((client, j) => (
          <LogoTile key={`${client.name}-${j}`} client={client} />
        ))}
      </div>
    </div>
  );
}
