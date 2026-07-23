import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LayoutDashboard, MessageSquare, CreditCard, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Admin Dashboard' };

async function signOut() {
  'use server';
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/admin');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin') redirect('/');

  const nav = [
    { href: '/admin', label: 'Orders', icon: LayoutDashboard },
    { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
    { href: '/admin/payments', label: 'Payment Requests', icon: CreditCard },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-24 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Admin</p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <form action={signOut}>
          <Button variant="outline" type="submit">
            <LogOut className="size-4" />
            Sign Out
          </Button>
        </form>
      </div>

      <nav className="mt-8 flex flex-wrap gap-2 border-b border-border pb-4">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8">{children}</div>
    </div>
  );
}
