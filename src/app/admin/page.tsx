import Link from 'next/link';
import { PackageOpen } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

type OrderItem = {
  product_name: string;
  tier_name: string;
  unit_price_cents: number;
  quantity: number;
};

type OrderRow = {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
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

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = '', status = '' } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from('orders')
    .select(
      'id, user_id, customer_name, customer_email, customer_phone, total_cents, status, created_at, order_items(product_name, tier_name, unit_price_cents, quantity)',
    )
    .order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);
  if (q) query = query.or(`customer_name.ilike.%${q}%,customer_email.ilike.%${q}%`);

  const { data: orders } = await query;
  const orderList = (orders ?? []) as OrderRow[];

  const totalRevenue = orderList
    .filter((o) => o.status === 'paid' || o.status === 'fulfilled')
    .reduce((sum, o) => sum + o.total_cents, 0);
  const guestCount = orderList.filter((o) => !o.user_id).length;
  const clientCount = orderList.length - guestCount;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="facet-cut rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Total orders</p>
          <p className="mt-1 font-heading text-2xl font-semibold">{orderList.length}</p>
        </div>
        <div className="facet-cut rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Clients vs guests</p>
          <p className="mt-1 font-heading text-2xl font-semibold">
            {clientCount} / {guestCount}
          </p>
        </div>
        <div className="facet-cut rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Revenue (paid/fulfilled)</p>
          <p className="mt-1 font-heading text-2xl font-semibold">{formatPrice(totalRevenue)}</p>
        </div>
      </div>

      <form className="mt-8 flex flex-wrap items-center gap-3" method="get">
        <Input
          name="q"
          defaultValue={q}
          placeholder="Search by name or email..."
          className="max-w-xs"
        />
        <select
          name="status"
          defaultValue={status}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="fulfilled">Fulfilled</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button
          type="submit"
          className="h-9 rounded-md border border-border bg-card px-4 text-sm font-medium hover:border-primary/40"
        >
          Filter
        </button>
        {(q || status) && (
          <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary">
            Clear
          </Link>
        )}
      </form>

      <div className="mt-6">
        {orderList.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-10 text-center">
            <PackageOpen className="mx-auto size-10 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">No orders match this filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orderList.map((order) => (
              <div key={order.id} className="facet-cut rounded-xl border border-border bg-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-heading text-base font-semibold">{order.customer_name}</p>
                      <Badge variant={order.user_id ? 'default' : 'secondary'}>
                        {order.user_id ? 'Client' : 'Guest'}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{order.customer_email}</p>
                    {order.customer_phone && (
                      <p className="text-sm text-muted-foreground">{order.customer_phone}</p>
                    )}
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {order.id.slice(0, 8)} · {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-lg font-semibold">
                      {formatPrice(order.total_cents)}
                    </p>
                    <Badge variant={statusVariant[order.status] ?? 'secondary'} className="mt-1 capitalize">
                      {order.status}
                    </Badge>
                  </div>
                </div>
                <ul className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
                  {order.order_items.map((item, i) => (
                    <li key={i} className="flex justify-between gap-3 text-muted-foreground">
                      <span>
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
    </div>
  );
}
