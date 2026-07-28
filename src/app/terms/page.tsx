import type { Metadata } from 'next';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Maxora',
  description: 'The terms that apply when you use the Maxora website or order our services.',
};

const lastUpdated = 'July 27, 2026';

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6">
      <Reveal>
        <p className="eyebrow mb-3">Maxora</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Terms and <span className="text-gradient">Conditions</span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="facet-cut mt-10 space-y-8 rounded-xl border border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
          <p>
            These Terms and Conditions (&quot;Terms&quot;) govern your use of the Maxora website
            and any service you order from us. By placing an order or using this site, you agree
            to these Terms.
          </p>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">1. Our Services</h2>
            <p>
              Maxora provides software, web, mobile, and desktop development services along with
              related digital work. Priced packages are listed on our services page. Some work is
              quoted individually based on what you need.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              2. Orders and Payment
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Prices are listed in USD and are current at the time of ordering.</li>
              <li>Payment is processed securely through Stripe. We never see your full card details.</li>
              <li>
                Some plans are billed on a recurring basis (monthly or otherwise). You can cancel
                a recurring plan at any time by contacting us.
              </li>
              <li>Placing an order does not guarantee a specific delivery date unless we confirm one in writing.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              3. Refunds and Cancellations
            </h2>
            <p>
              Because our work starts shortly after payment, refunds are handled case by case.
              Contact us as soon as possible if something is wrong with your order and we will
              work out a fair resolution. Recurring plans can be cancelled before the next billing
              date to avoid the next charge.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              4. Ownership
            </h2>
            <p>
              Once a project is paid for and delivered, you own the final files, code, and assets
              we hand over, unless we agree otherwise in writing. We may keep internal working
              copies for our own records and portfolio use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              5. Client Responsibilities
            </h2>
            <p>
              You are responsible for giving us accurate information, timely feedback, and any
              content or access needed to complete your project. Delays on your end may delay
              delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              6. Limitation of Liability
            </h2>
            <p>
              We do our best work on every project, but we are not liable for indirect losses,
              lost profits, or issues caused by third-party services we integrate with (such as
              Stripe or hosting providers). Our total liability for any order is limited to the
              amount you paid for that order.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              7. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. We will update the &quot;Last
              updated&quot; date above when we do. Continuing to use the site after a change means
              you accept the updated Terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold text-foreground">8. Contact Us</h2>
            <p>
              Questions about these Terms? Email us at{' '}
              <a href="mailto:maxoradev@gmail.com" className="text-primary hover:underline">
                maxoradev@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </Reveal>
    </div>
  );
}
