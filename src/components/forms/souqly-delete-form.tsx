'use client';

import { useActionState } from 'react';
import { CheckCircle2, Loader2, Trash2 } from 'lucide-react';
import {
  submitSouqlyDeleteRequest,
  type SouqlyDeleteState,
} from '@/app/actions/souqly-delete';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const REASON_OPTIONS = [
  'No longer using the app',
  'Privacy concerns',
  'Found a better alternative',
  'Too many notifications',
  'Creating a new account',
  'Other',
];

export function SouqlyDeleteForm() {
  const [state, formAction, pending] = useActionState<SouqlyDeleteState, FormData>(
    submitSouqlyDeleteRequest,
    null,
  );

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-10 text-center">
        <CheckCircle2 className="mx-auto size-12 text-primary" />
        <h2 className="mt-4 font-heading text-2xl font-semibold">Request received</h2>
        <p className="mt-2 text-muted-foreground">
          We&apos;ll process your Souqly account deletion request and email you at the address
          you provided once it&apos;s complete.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" required placeholder="Jordan Smith" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email associated with your account</Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="reason">Reason (optional)</Label>
        <select
          id="reason"
          name="reason"
          defaultValue=""
          className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none [&>option]:bg-popover"
        >
          <option value="">Prefer not to say</option>
          {REASON_OPTIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {state && !state.ok && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Button type="submit" size="lg" variant="destructive" disabled={pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
        Request Deletion
      </Button>
    </form>
  );
}
