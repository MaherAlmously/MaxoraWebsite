import { Puzzle, ShieldCheck, Users, Wrench } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

const features = [
  {
    icon: Users,
    title: 'We start by understanding your business',
    text: 'No jumping straight to building. We learn how your business actually runs before we design anything.',
  },
  {
    icon: Puzzle,
    title: 'Built around your workflow',
    text: 'Software designed to fit how your team already works, not the other way around.',
  },
  {
    icon: ShieldCheck,
    title: 'You own what we build',
    text: 'Full ownership of the software and your data. No lock-in.',
  },
  {
    icon: Wrench,
    title: 'Support after launch',
    text: 'We stay available to fix issues, make changes, and improve things as your business grows.',
  },
];

export function WhyUs() {
  return (
    <section className="border-y border-border bg-card/30 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Maxora"
          title="Software that actually fits how you work"
          description="We build around your business, not a template. Here's what that means in practice."
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
