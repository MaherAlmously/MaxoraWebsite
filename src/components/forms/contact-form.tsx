'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { submitContact, type ContactState } from '@/app/actions/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const helpOptions = [
  { value: 'custom-software', label: 'Custom Software' },
  { value: 'ai-automation', label: 'AI & Automation' },
  { value: 'web-mobile-apps', label: 'Web or Mobile App' },
  { value: 'not-sure', label: 'Not Sure' },
];

const budgetOptions = [
  { value: '', label: 'Prefer to discuss' },
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 - $15,000' },
  { value: '15k-50k', label: '$15,000 - $50,000' },
  { value: '50k-plus', label: '$50,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
];

const timelineOptions = [
  { value: '', label: 'Not sure yet' },
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3-months', label: '1-3 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: 'exploring', label: 'Just exploring options' },
];

const selectClassName =
  'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none [&>option]:bg-popover';

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get('type') ?? searchParams.get('service') ?? '';
  const [state, formAction, pending] = useActionState<ContactState, FormData>(submitContact, null);

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
    <form action={formAction} className="space-y-5">
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
        <Label htmlFor="company">Company (optional)</Label>
        <Input id="company" name="company" placeholder="Your business name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">What can we help with?</Label>
        <select
          id="service"
          name="service"
          defaultValue={preselected}
          className={selectClassName}
        >
          {helpOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="budget_range">Budget range</Label>
          <select id="budget_range" name="budget_range" className={selectClassName}>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeline">Timeline</Label>
          <select id="timeline" name="timeline" className={selectClassName}>
            {timelineOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Tell us about your problem or project</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What's slowing your business down, or what do you want to build?"
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
