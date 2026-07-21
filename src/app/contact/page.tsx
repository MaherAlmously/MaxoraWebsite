import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Clock, Mail, MessageSquare, Phone } from 'lucide-react';
import { ContactForm } from '@/components/forms/contact-form';
import { Reveal } from '@/components/reveal';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tell us about your project and get a free quote from Maxora within 24 hours.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <p className="eyebrow mb-3">Contact</p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Tell us about <span className="text-gradient">your project</span>
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Tell us what you need: a website, a logo, an app, or a project of your own.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <MessageSquare className="size-5 text-primary" />
              <span className="text-muted-foreground">Free quotes, no commitment</span>
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
