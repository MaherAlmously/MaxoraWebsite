import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'Privacy Policy | Maxora',
  description: 'How Maxora collects, uses, and protects your information.',
};

const lastUpdated = 'July 27, 2026';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6">
      <Reveal>
        <p className="eyebrow mb-3">Maxora</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy <span className="text-gradient">Policy</span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="facet-cut mt-10 space-y-8 rounded-xl border border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
          <p>
            This Privacy Policy explains how Maxora (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) collects, uses, and protects information when you visit our website
            or order our services. By using this site, you agree to the practices described here.
          </p>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              1. Information We Collect
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="text-foreground">Contact details:</span> name, email, and phone
                number when you place an order, send us a message, or create an account.
              </li>
              <li>
                <span className="text-foreground">Order details:</span> the services you buy,
                project notes, and payment confirmation. We do not store your full card number,
                that is handled directly by our payment processor, Stripe.
              </li>
              <li>
                <span className="text-foreground">Account information:</span> email and password
                (stored encrypted) if you create an account.
              </li>
              <li>
                <span className="text-foreground">Basic usage data:</span> pages visited and
                general analytics so we can see what is working on the site.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>To deliver the service or project you paid for.</li>
              <li>To reply to messages and quote requests.</li>
              <li>To process payments and keep your order history accurate.</li>
              <li>To send order updates and, if you agree, occasional updates about our work.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              3. How We Share Your Information
            </h2>
            <p>We do not sell your personal information. We only share it with:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="text-foreground">Service providers:</span> Supabase (database and
                hosting) and Stripe (payments), who process data on our behalf.
              </li>
              <li>
                <span className="text-foreground">Legal requirements:</span> if required by law or
                a valid legal request.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">4. Data Security</h2>
            <p>
              We use encryption in transit (HTTPS/TLS), encrypted password storage, and access
              controls to protect your data. No system is 100% secure, but we take reasonable
              steps to keep your information safe and respond quickly to any issue.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              5. Data Retention
            </h2>
            <p>
              We keep your information for as long as needed to deliver our services and keep
              basic business records, unless you ask us to delete it sooner and we have no legal
              reason to keep it.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              6. Your Rights
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Ask us what information we have about you.</li>
              <li>
                Ask us to correct or delete your information by emailing{' '}
                <a href="mailto:maxoradev@gmail.com" className="text-primary hover:underline">
                  maxoradev@gmail.com
                </a>
                .
              </li>
              <li>Opt out of non-essential emails at any time.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will update the &quot;Last
              updated&quot; date above when we do.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">8. Contact Us</h2>
            <p>
              Questions about this policy? Email us at{' '}
              <a href="mailto:maxoradev@gmail.com" className="text-primary hover:underline">
                maxoradev@gmail.com
              </a>{' '}
              or visit our{' '}
              <Link href="/contact" className="text-primary hover:underline">
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </Reveal>
    </div>
  );
}
