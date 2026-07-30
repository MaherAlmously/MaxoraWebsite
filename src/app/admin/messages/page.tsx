import Link from 'next/link';
import { MailOpen } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { InitialsAvatar } from '../_components/initials-avatar';
import { StatCard } from '../_components/stat-card';
import { DetailField } from '../_components/detail-field';
import { ReplyForm } from '../_components/reply-form';

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  service: string | null;
  message: string;
  created_at: string;
};

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; from?: string; to?: string }>;
}) {
  const { q = '', from = '', to = '' } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from('contact_messages')
    .select('id, name, email, subject, service, message, created_at')
    .order('created_at', { ascending: false });

  if (from) query = query.gte('created_at', new Date(from).toISOString());
  if (to) query = query.lte('created_at', new Date(`${to}T23:59:59`).toISOString());
  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%`);

  const { data } = await query;
  const messages = (data ?? []) as Message[];
  const hasFilters = q || from || to;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:max-w-xs">
        <StatCard icon={MailOpen} label="Total messages" value={String(messages.length)} accent />
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
            href="/admin/messages"
            className="flex h-9 items-center px-2 text-sm text-muted-foreground hover:text-primary"
          >
            Clear
          </Link>
        )}
      </form>

      <div className="mt-6">
        {messages.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-10 text-center">
            <MailOpen className="mx-auto size-10 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">No messages match this filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className="facet-cut rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <InitialsAvatar name={m.name} />
                    <div>
                      <p className="font-heading text-base font-semibold">{m.name}</p>
                      {(m.subject || m.service) && (
                        <div className="mt-1.5 flex flex-wrap gap-2">
                          {m.subject && <Badge variant="outline">{m.subject}</Badge>}
                          {m.service && <Badge variant="secondary">{m.service}</Badge>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-3">
                  <DetailField label="Email" value={m.email} />
                  <DetailField
                    label="Received"
                    value={new Date(m.created_at).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  />
                  <DetailField label="Message ID" value={`#${m.id.slice(0, 8)}`} />
                </div>

                <div className="mt-4 border-t border-border pt-4">
                  <DetailField label="Message" value={<span className="whitespace-pre-wrap">{m.message}</span>} />
                </div>

                <div className="mt-4 flex flex-wrap items-start gap-3 border-t border-border pt-4">
                  <ReplyForm to={m.email} defaultSubject={`Re: your message to Maxora`} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
