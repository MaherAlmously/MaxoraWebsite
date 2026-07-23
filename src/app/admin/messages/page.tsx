import { MailOpen, Mail } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { InitialsAvatar } from '../_components/initials-avatar';
import { StatCard } from '../_components/stat-card';
import Link from 'next/link';

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
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from('contact_messages')
    .select('id, name, email, subject, service, message, created_at')
    .order('created_at', { ascending: false });

  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%`);

  const { data } = await query;
  const messages = (data ?? []) as Message[];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:max-w-xs">
        <StatCard icon={MailOpen} label="Total messages" value={String(messages.length)} accent />
      </div>

      <form className="mt-8 flex flex-wrap items-center gap-3" method="get">
        <Input name="q" defaultValue={q} placeholder="Search by name or email..." className="max-w-xs" />
        <button
          type="submit"
          className="h-9 rounded-md border border-border bg-card px-4 text-sm font-medium hover:border-primary/40"
        >
          Filter
        </button>
        {q && (
          <Link href="/admin/messages" className="text-sm text-muted-foreground hover:text-primary">
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
                      <span className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Mail className="size-3.5" />
                        {m.email}
                      </span>
                      {(m.subject || m.service) && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {m.subject && <Badge variant="outline">{m.subject}</Badge>}
                          {m.service && <Badge variant="secondary">{m.service}</Badge>}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground/70">
                    {new Date(m.created_at).toLocaleString()}
                  </p>
                </div>
                <p className="mt-4 whitespace-pre-wrap border-t border-border pt-4 text-sm">
                  {m.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
