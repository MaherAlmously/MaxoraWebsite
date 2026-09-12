import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Clock, Mail, MessageSquare, Phone } from 'lucide-react';
import { ContactForm } from '@/components/forms/contact-form';
import { Reveal } from '@/components/reveal';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us what is slowing your business down or what you want to build. Maxora will figure out the software needed to solve it.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <p className="eyebrow mb-3">Contact</p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Tell us what&apos;s <span className="text-gradient">slowing you down</span>
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            You don&apos;t need a technical spec. Describe the problem or the idea, even if
            you&apos;re not sure what to call it, and we&apos;ll figure out the right software for
            it.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <MessageSquare className="size-5 text-primary" />
              <span className="text-muted-foreground">&quot;Not sure&quot; is a fine answer</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-5 text-primary" />
              <span className="text-muted-foreground">Replies within 24 hours</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-5 text-primary" />
              <span className="text-muted-foreground">Everything in writing, always</span>
            </li>
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            Prefer email?{' '}
            <a href="mailto:maxoradev@gmail.com" className="text-primary hover:underline">
              maxoradev@gmail.com
            </a>
          </p>
          <p className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <Phone className="size-4 text-primary" />
            <a href="tel:+18175010172" className="hover:underline">
              (817) 501-0172
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="facet-cut rounded-xl border border-border bg-card p-6 sm:p-8">
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <ContactForm />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
