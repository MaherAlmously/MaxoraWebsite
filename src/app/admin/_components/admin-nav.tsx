'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/admin', label: 'Orders', icon: LayoutDashboard },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/payments', label: 'Payment Requests', icon: CreditCard },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2">
      {nav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all',
              active
                ? 'border-primary/50 bg-primary/10 text-primary shadow-[0_0_16px_oklch(0.85_0.135_190_/_15%)]'
                : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground',
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
