import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'Souqly - Terms & Conditions',
  description: 'The rules that govern your use of the Souqly app.',
};

const lastUpdated = 'July 31, 2026';

export default function SouqlyTermsPage() {
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
          Terms & <span className="text-gradient">Conditions</span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="facet-cut mt-10 space-y-8 rounded-xl border border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
          <p>
            These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of the
            Souqly mobile app (the &quot;App&quot;). By creating an account or using the App, you
            agree to be bound by these Terms. If you do not agree, do not use the App.
          </p>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              1. Eligibility & Accounts
            </h2>
            <p>
              You must be at least 13 years old to use the App. You are responsible for
              maintaining the confidentiality of your account credentials and for all activity
              that occurs under your account. Notify us immediately of any unauthorized use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              2. Listings & Transactions
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                You are solely responsible for the accuracy of any listing, description, photo, or
                price you post in the App.
              </li>
              <li>
                Souqly acts as a marketplace connecting buyers and sellers. We are not a party to
                any transaction between users and do not guarantee the quality, safety, or
                legality of items listed.
              </li>
              <li>
                Payments are processed through a third-party payment provider. You agree to that
                provider&apos;s terms in addition to these Terms.
              </li>
              <li>Prohibited items, fraudulent listings, and scams are strictly forbidden.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              3. Acceptable Use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Violate any applicable law or regulation while using the App.</li>
              <li>Harass, threaten, or defraud other users.</li>
              <li>Post content that is illegal, infringing, or misleading.</li>
              <li>Attempt to interfere with, disrupt, or reverse-engineer the App.</li>
              <li>Create multiple accounts to evade a suspension or ban.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              4. Content Ownership & License
            </h2>
            <p>
              You retain ownership of the content you post (listings, photos, messages). By
              posting content, you grant Souqly a non-exclusive, worldwide, royalty-free license
              to host, display, and distribute that content within the App as needed to operate
              the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              5. Suspension & Termination
            </h2>
            <p>
              We may suspend or terminate your account at our discretion if we believe you have
              violated these Terms, engaged in fraudulent activity, or put other users at risk.
              You may stop using the App at any time and request account deletion via our{' '}
              <Link href="/souqly/delete" className="text-primary hover:underline">
                account deletion page
              </Link>
              .
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              6. Disclaimers & Limitation of Liability
            </h2>
            <p>
              The App is provided &quot;as is&quot; without warranties of any kind. To the fullest
              extent permitted by law, Souqly is not liable for any indirect, incidental, or
              consequential damages arising from your use of the App or transactions between
              users.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              7. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. We will update the &quot;Last
              updated&quot; date above and, for material changes, provide notice within the App.
              Continued use of the App after changes take effect constitutes acceptance of the
              revised Terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">8. Contact Us</h2>
            <p>
              If you have questions about these Terms, contact us at{' '}
              <a href="mailto:maxoradev@gmail.com" className="text-primary hover:underline">
                maxoradev@gmail.com
              </a>
              .
            </p>
          </section>

          <p>
            See also our{' '}
            <Link href="/souqly/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </Reveal>
    </div>
  );
}
