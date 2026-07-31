'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { Lock } from 'lucide-react';
import { TiltCard } from '@/components/tilt-card';

export function BrowserMockup({
  image,
  domain,
  name,
  priority,
}: {
  image: string;
  domain: string;
  name: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <TiltCard>
      <motion.div
        className="group border-border bg-card relative overflow-hidden rounded-2xl border shadow-xl shadow-black/20 transition-shadow duration-300 hover:shadow-[0_0_32px_-8px_var(--grad-a)]"
        whileHover={reduce ? undefined : { scale: 1.015, y: -4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Window chrome */}
        <div className="border-border bg-muted/60 flex items-center gap-3 border-b px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-yellow-400/70" />
            <span className="size-2.5 rounded-full bg-green-400/70" />
          </span>
          <span className="border-border bg-background/70 text-muted-foreground mx-auto flex max-w-[70%] items-center gap-1.5 rounded-full border px-3 py-1 text-xs">
            <Lock className="size-3 shrink-0" />
            <span className="truncate">{domain}</span>
          </span>
        </div>

        {/* Screenshot */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={image}
            alt={`${name} website preview`}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority={priority}
          />
        </div>
      </motion.div>
    </TiltCard>
  );
}
