import Link from 'next/link';
import { PackageOpen, Receipt, Users, Wallet } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { StatCard } from './_components/stat-card';
import { InitialsAvatar } from './_components/initials-avatar';
import { DetailField } from './_components/detail-field';

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
  notes: string | null;
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
  searchParams: Promise<{ q?: string; status?: string; type?: string; from?: string; to?: string }>;
}) {
  const { q = '', status = '', type = '', from = '', to = '' } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from('orders')
    .select(
      'id, user_id, customer_name, customer_email, customer_phone, notes, total_cents, status, created_at, order_items(product_name, tier_name, unit_price_cents, quantity)',
    )
    .order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);
  if (type === 'client') query = query.not('user_id', 'is', null);
  if (type === 'guest') query = query.is('user_id', null);
  if (from) query = query.gte('created_at', new Date(from).toISOString());
  if (to) query = query.lte('created_at', new Date(`${to}T23:59:59`).toISOString());
  if (q)
    query = query.or(
      `customer_name.ilike.%${q}%,customer_email.ilike.%${q}%,customer_phone.ilike.%${q}%`,
    );

  const { data: orders } = await query;
  const orderList = (orders ?? []) as OrderRow[];

  const totalRevenue = orderList
    .filter((o) => o.status === 'paid' || o.status === 'fulfilled')
    .reduce((sum, o) => sum + o.total_cents, 0);
  const guestCount = orderList.filter((o) => !o.user_id).length;
  const clientCount = orderList.length - guestCount;

  const hasFilters = q || status || type || from || to;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Receipt} label="Total orders" value={String(orderList.length)} />
        <StatCard
          icon={Wallet}
          label="Revenue (paid/fulfilled)"
          value={formatPrice(totalRevenue)}
          accent
        />
        <StatCard icon={Users} label="Registered clients" value={String(clientCount)} />
        <StatCard icon={PackageOpen} label="Guest checkouts" value={String(guestCount)} />
      </div>

      <form className="facet-cut mt-8 flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card p-4" method="get">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">Name, email, or phone</label>
          <Input name="q" defaultValue={q} placeholder="Search..." className="w-56" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">Status</label>
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
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">Type</label>
          <select
            name="type"
            defaultValue={type}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">Clients + guests</option>
            <option value="client">Clients only</option>
            <option value="guest">Guests only</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">From</label>
          <input
            type="date"
            name="from"
            defaultValue={from}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">To</label>
          <input
            type="date"
            name="to"
            defaultValue={to}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          />
        </div>
        <button
          type="submit"
          className="h-9 rounded-md border border-border bg-card px-4 text-sm font-medium hover:border-primary/40"
        >
          Filter
        </button>
        {hasFilters && (
          <Link
            href="/admin"
            className="h-9 px-2 text-sm text-muted-foreground hover:text-primary flex items-center"
          >
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
              <div
                key={order.id}
                className="facet-cut group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <InitialsAvatar name={order.customer_name} />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-heading text-base font-semibold">
                          {order.customer_name}
                        </p>
                        <Badge variant={order.user_id ? 'default' : 'secondary'}>
                          {order.user_id ? 'Client' : 'Guest'}
                        </Badge>
                      </div>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground/70">
                        Order #{order.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-lg font-semibold">
                      {formatPrice(order.total_cents)}
                    </p>
                    <Badge
                      variant={statusVariant[order.status] ?? 'secondary'}
                      className="mt-1 capitalize"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-4">
                  <DetailField label="Email" value={order.customer_email} />
                  <DetailField label="Phone" value={order.customer_phone || '—'} />
                  <DetailField
                    label="Placed"
                    value={new Date(order.created_at).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  />
                  <DetailField label="Account" value={order.user_id ? 'Registered client' : 'Guest checkout'} />
                </div>

                {order.notes && (
                  <div className="mt-4 border-t border-border pt-4">
                    <DetailField label="Notes" value={order.notes} />
                  </div>
                )}

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
