'use client';

import { useActionState, useEffect, useRef } from 'react';
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

type PendingFields = { name: string; email: string; reason: string };

export function SouqlyDeleteForm() {
  const [state, formAction, pending] = useActionState<SouqlyDeleteState, FormData>(
    submitSouqlyDeleteRequest,
    null,
  );
  const pendingFieldsRef = useRef<PendingFields | null>(null);

  function handleAction(formData: FormData) {
    pendingFieldsRef.current = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      reason: String(formData.get('reason') ?? ''),
    };
    return formAction(formData);
  }

  useEffect(() => {
    if (!state?.ok || !pendingFieldsRef.current) return;
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    const fields = pendingFieldsRef.current;
    pendingFieldsRef.current = null;
    if (!key) {
      console.warn('[web3forms] NEXT_PUBLIC_WEB3FORMS_KEY not set, skipping email notification');
      return;
    }
    // Web3Forms free plan only accepts client-side (browser) submissions, not server calls.
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: `Souqly account deletion request from ${fields.name}`,
        from_name: 'Souqly App',
        name: fields.name,
        email: fields.email,
        reason: fields.reason || 'not provided',
        message: `Souqly account deletion request\nName: ${fields.name}\nEmail: ${fields.email}\nReason: ${fields.reason || 'not provided'}`,
      }),
    }).catch((err) => console.error('[web3forms] notification error:', err));
  }, [state]);

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
    <form action={handleAction} className="space-y-5">
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
