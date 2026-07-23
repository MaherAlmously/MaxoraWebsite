import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { LogOut, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { AdminNav } from './_components/admin-nav';

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

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-24 sm:px-6">
        <div className="facet-cut glass flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--grad-a)] to-[var(--grad-b)] text-primary-foreground shadow-[0_0_20px_oklch(0.85_0.135_190_/_25%)]">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <p className="eyebrow mb-1">Admin</p>
              <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Dashboard
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <form action={signOut}>
            <Button variant="outline" type="submit">
              <LogOut className="size-4" />
              Sign Out
            </Button>
          </form>
        </div>

        <div className="mt-6">
          <AdminNav />
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
