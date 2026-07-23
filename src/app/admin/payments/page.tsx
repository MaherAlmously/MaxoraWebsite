import Link from 'next/link';
import { CreditCard, Wallet } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { InitialsAvatar } from '../_components/initials-avatar';
import { StatCard } from '../_components/stat-card';
import { DetailField } from '../_components/detail-field';

type PaymentRequest = {
  id: string;
  name: string;
  email: string;
  amount_cents: number;
  note: string | null;
  status: string;
  created_at: string;
};

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  paid: 'default',
  pending: 'secondary',
  cancelled: 'destructive',
};

export default async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; from?: string; to?: string }>;
}) {
  const { q = '', status = '', from = '', to = '' } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from('payment_requests')
    .select('id, name, email, amount_cents, note, status, created_at')
    .order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);
  if (from) query = query.gte('created_at', new Date(from).toISOString());
  if (to) query = query.lte('created_at', new Date(`${to}T23:59:59`).toISOString());
  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%`);

  const { data } = await query;
  const requests = (data ?? []) as PaymentRequest[];
  const totalRequested = requests.reduce((sum, r) => sum + r.amount_cents, 0);
  const hasFilters = q || status || from || to;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-2xl">
        <StatCard icon={CreditCard} label="Total requests" value={String(requests.length)} />
        <StatCard icon={Wallet} label="Total requested" value={formatPrice(totalRequested)} accent />
      </div>

      <form
        className="facet-cut mt-8 flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card p-4"
        method="get"
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">Name or email</label>
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
            <option value="cancelled">Cancelled</option>
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
            href="/admin/payments"
            className="flex h-9 items-center px-2 text-sm text-muted-foreground hover:text-primary"
          >
            Clear
          </Link>
        )}
      </form>

      <div className="mt-6">
        {requests.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-10 text-center">
            <CreditCard className="mx-auto size-10 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">No payment requests match this filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((r) => (
              <div
                key={r.id}
                className="facet-cut rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <InitialsAvatar name={r.name} />
                    <div>
                      <p className="font-heading text-base font-semibold">{r.name}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground/70">
                        Request #{r.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-lg font-semibold">
                      {formatPrice(r.amount_cents)}
                    </p>
                    <Badge variant={statusVariant[r.status] ?? 'secondary'} className="mt-1 capitalize">
                      {r.status}
                    </Badge>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-3">
                  <DetailField label="Email" value={r.email} />
                  <DetailField
                    label="Requested"
                    value={new Date(r.created_at).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  />
                  <DetailField label="Amount" value={formatPrice(r.amount_cents)} />
                </div>

                {r.note && (
                  <div className="mt-4 border-t border-border pt-4">
                    <DetailField label="Note" value={r.note} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
