'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { submitContact, type ContactState } from '@/app/actions/contact';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type PendingFields = { name: string; email: string; service: string; message: string };

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get('service') ?? '';
  const [state, formAction, pending] = useActionState<ContactState, FormData>(submitContact, null);
  const pendingFieldsRef = useRef<PendingFields | null>(null);

  function handleAction(formData: FormData) {
    pendingFieldsRef.current = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      service: String(formData.get('service') ?? ''),
      message: String(formData.get('message') ?? ''),
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
        subject: `New contact message from ${fields.name}`,
        from_name: 'Maxora Website',
        name: fields.name,
        email: fields.email,
        service: fields.service || 'not specified',
        message: fields.message,
      }),
    }).catch((err) => console.error('[web3forms] notification error:', err));
  }, [state]);

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-10 text-center">
        <CheckCircle2 className="mx-auto size-12 text-primary" />
        <h2 className="mt-4 font-heading text-2xl font-semibold">Message sent</h2>
        <p className="mt-2 text-muted-foreground">
          Thanks for reaching out. We&apos;ll reply within 24 hours.
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
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@company.com" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="service">Service you&apos;re interested in</Label>
        <select
          id="service"
          name="service"
          defaultValue={preselected}
          className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none [&>option]:bg-popover"
        >
          <option value="">Not sure yet</option>
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Tell us about your project</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What are you building? Goals, timeline, examples you like…"
        />
      </div>

      {state && !state.ok && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Button type="submit" size="lg" className="glow" disabled={pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        Send Message
      </Button>
    </form>
  );
}
