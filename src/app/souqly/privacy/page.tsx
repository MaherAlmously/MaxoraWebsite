import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'Souqly - Privacy Policy',
  description: 'How Souqly collects, uses, and protects your data.',
};

const lastUpdated = 'July 26, 2026';

export default function SouqlyPrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6">
      <Reveal>
        <Image
          src="/souqly-icon.png"
          alt="Souqly"
          width={64}
          height={64}
          className="mb-4 rounded-2xl"
        />
        <p className="eyebrow mb-3">Souqly</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy <span className="text-gradient">Policy</span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="facet-cut mt-10 space-y-8 rounded-xl border border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
          <p>
            This Privacy Policy explains how Souqly (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) collects, uses, shares, and protects information when you use the
            Souqly mobile app (the &quot;App&quot;). By creating an account or using the App, you
            agree to the practices described here.
          </p>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              1. Information We Collect
            </h2>
            <p>We collect the following types of information:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="text-foreground">Account information:</span> name, email
                address, password (stored encrypted), and profile details you choose to add.
              </li>
              <li>
                <span className="text-foreground">User content:</span> listings, photos,
                descriptions, and messages you post or send within the App.
              </li>
              <li>
                <span className="text-foreground">Transaction information:</span> order details
                and payment confirmation, processed through a third-party payment provider. We do
                not store your full card number on our servers.
              </li>
              <li>
                <span className="text-foreground">Device and usage data:</span> device type,
                operating system, app version, IP address, and general usage analytics (e.g.
                crash logs, feature usage) to help us maintain and improve the App.
              </li>
              <li>
                <span className="text-foreground">Location data (if enabled):</span> approximate
                or precise location, only if you grant permission, used to show relevant local
                listings.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>To create and manage your account and authenticate your access.</li>
              <li>To operate core features: listings, messaging, search, and transactions.</li>
              <li>To process payments and prevent fraud.</li>
              <li>To send account-related notifications (e.g. order updates, security alerts).</li>
              <li>To monitor, diagnose, and improve App performance and reliability.</li>
              <li>To enforce our Terms of Service and keep the App safe from abuse.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              3. How We Share Your Information
            </h2>
            <p>
              We do not sell your personal information. We share data only in these limited
              cases:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="text-foreground">Service providers:</span> our hosting and
                database provider (Supabase) and payment processor, who process data on our
                behalf under their own security and confidentiality obligations.
              </li>
              <li>
                <span className="text-foreground">Other users:</span> information you choose to
                make public in your profile, listings, or messages is visible to other users of
                the App.
              </li>
              <li>
                <span className="text-foreground">Legal requirements:</span> if required to
                comply with a law, regulation, legal process, or valid governmental request.
              </li>
              <li>
                <span className="text-foreground">Business transfers:</span> in connection with a
                merger, acquisition, or sale of assets, with notice to affected users.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">4. Data Security</h2>
            <p>
              We use industry-standard safeguards to protect your data, including encryption in
              transit (HTTPS/TLS), encrypted password storage, and access controls that restrict
              who can view your data internally. No method of transmission or storage is 100%
              secure, so we cannot guarantee absolute security, but we work to protect your
              information and respond promptly to any suspected breach.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              5. Data Retention
            </h2>
            <p>
              We retain your information for as long as your account is active or as needed to
              provide the App&apos;s services. If you request deletion, we remove your personal
              data within a reasonable time, except where we are required to retain certain
              records (e.g. transaction records) for legal, tax, or fraud-prevention purposes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              6. Your Rights and Choices
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Access, update, or correct your account information within the App.</li>
              <li>
                Request permanent deletion of your account and associated data via our{' '}
                <Link href="/souqly/delete" className="text-primary hover:underline">
                  account deletion page
                </Link>
                .
              </li>
              <li>Disable location permissions at any time through your device settings.</li>
              <li>Opt out of non-essential notifications in the App&apos;s settings.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              7. Children&apos;s Privacy
            </h2>
            <p>
              The App is not directed to children under 13, and we do not knowingly collect
              personal information from children under 13. If we learn that we have collected
              such information, we will delete it promptly.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will update the &quot;Last
              updated&quot; date above and, for material changes, provide notice within the App.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or how we handle your data, contact
              us at{' '}
              <a href="mailto:maxoradev@gmail.com" className="text-primary hover:underline">
                maxoradev@gmail.com
              </a>
              .
            </p>
          </section>

          <p>
            See also our{' '}
            <Link href="/souqly/terms" className="text-primary hover:underline">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>
      </Reveal>
    </div>
  );
}
