import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

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
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from('payment_requests')
    .select('id, name, email, amount_cents, note, status, created_at')
    .order('created_at', { ascending: false });

  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%`);

  const { data } = await query;
  const requests = (data ?? []) as PaymentRequest[];

  return (
    <div>
      <form className="flex flex-wrap items-center gap-3" method="get">
        <Input name="q" defaultValue={q} placeholder="Search by name or email..." className="max-w-xs" />
        <button
          type="submit"
          className="h-9 rounded-md border border-border bg-card px-4 text-sm font-medium hover:border-primary/40"
        >
          Filter
        </button>
        {q && (
          <Link href="/admin/payments" className="text-sm text-muted-foreground hover:text-primary">
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
              <div key={r.id} className="facet-cut rounded-xl border border-border bg-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-heading text-base font-semibold">{r.name}</p>
                    <p className="text-sm text-muted-foreground">{r.email}</p>
                    {r.note && <p className="mt-2 text-sm text-muted-foreground">{r.note}</p>}
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleString()}
                    </p>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
