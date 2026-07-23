import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LogOut, PackageOpen } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = { title: 'My Account' };

type OrderItem = {
  product_name: string;
  tier_name: string;
  unit_price_cents: number;
  quantity: number;
};

type Order = {
  id: string;
  total_cents: number;
  status: string;
  created_at: string;
  order_items: OrderItem[];
};

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  paid: 'default',
  pending: 'secondary',
  fulfilled: 'default',
  cancelled: 'destructive',
};

async function signOut() {
  'use server';
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role === 'admin') redirect('/admin');

  const { data: orders } = await supabase
    .from('orders')
    .select('id, total_cents, status, created_at, order_items(product_name, tier_name, unit_price_cents, quantity)')
    .order('created_at', { ascending: false });

  const orderList = (orders ?? []) as Order[];

  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">My Account</p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">Order history</h1>
          <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <form action={signOut}>
          <Button variant="outline" type="submit">
            <LogOut className="size-4" />
            Sign Out
          </Button>
        </form>
      </div>

      <Separator className="my-8" />

      {orderList.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-10 text-center">
          <PackageOpen className="mx-auto size-10 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">
            No orders yet. Orders you place while logged in will show up here.
          </p>
          <Button asChild className="mt-6">
            <Link href="/services">Browse Services</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          {orderList.map((order) => (
            <div key={order.id} className="facet-cut rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">
                    {order.id.slice(0, 8)} · {new Date(order.created_at).toLocaleDateString()}
                  </p>
                  <p className="mt-1 font-heading text-lg font-semibold">
                    {formatPrice(order.total_cents)}
                  </p>
                </div>
                <Badge variant={statusVariant[order.status] ?? 'secondary'} className="capitalize">
                  {order.status}
                </Badge>
              </div>
              <Separator className="my-4" />
              <ul className="space-y-2 text-sm">
                {order.order_items.map((item, i) => (
                  <li key={i} className="flex justify-between gap-3">
                    <span className="text-muted-foreground">
                      {item.product_name} ({item.tier_name})
                      {item.quantity > 1 ? ` × ${item.quantity}` : ''}
                    </span>
                    <span>{formatPrice(item.unit_price_cents * item.quantity)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
