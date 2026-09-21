import { UserCheck, Radar, CalendarCheck2 } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

const steps = [
  {
    icon: UserCheck,
    title: 'Patients opt in',
    text: 'Existing patients agree to be notified if an earlier appointment opens up — a simple, one-time opt-in, no app to download.',
  },
  {
    icon: Radar,
    title: 'A cancellation happens',
    text: 'The moment a slot cancels, the system checks it against opted-in patients for fit — appointment type, timing, and provider.',
  },
  {
    icon: CalendarCheck2,
    title: 'The slot gets refilled',
    text: 'Matched patients get a text about the opening automatically. Whoever accepts first takes the slot — no calls from your front desk.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-(--section-py-sm) sm:px-6">
      <SectionHeading
        eyebrow="How It Works"
        title="Three steps, running in the background"
        description="It works quietly alongside your day — no new habits for your team to learn."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.1}>
            <div className="relative h-full rounded-xl border border-border bg-card p-6">
              <span className="eyebrow mb-4 block text-xs">Step {i + 1}</span>
              <step.icon className="size-6 text-primary" />
              <h3 className="mt-4 font-heading font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
