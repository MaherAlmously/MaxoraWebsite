import { Rocket, ShieldCheck, Timer, Wallet } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

const features = [
  {
    icon: Wallet,
    title: 'Clear, upfront pricing',
    text: 'Every package has a listed price. No surprise invoices, no hidden fees.',
  },
  {
    icon: Timer,
    title: 'Fast turnaround',
    text: 'Most projects ship within days, not months, without cutting corners.',
  },
  {
    icon: Rocket,
    title: 'Built to convert',
    text: 'Design decisions driven by what makes visitors become customers.',
  },
  {
    icon: ShieldCheck,
    title: 'You own everything',
    text: 'Full ownership of your files, your site, and your brand assets.',
  },
];

export function WhyUs() {
  return (
    <section className="border-y border-border bg-card/30 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Maxora"
          title="Real deadlines, real deliverables"
          description="Fixed packages, real deadlines, and work you can check at every step. You always know what you pay and what you get."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-border bg-card p-6 transition-colors duration-200 hover:border-primary/40">
                <feature.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-heading font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
