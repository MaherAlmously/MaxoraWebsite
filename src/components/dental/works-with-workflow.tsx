import { Puzzle, ShieldCheck, Settings2, Users2 } from 'lucide-react';
import { Reveal } from '@/components/reveal';

const bullets = [
  {
    icon: Puzzle,
    text: 'Sits alongside your current scheduling software — nothing to migrate or replace.',
  },
  {
    icon: Users2,
    text: 'Your front desk stays in control. They can see every match and every fill.',
  },
  {
    icon: ShieldCheck,
    text: 'Patients only hear from the system if they opted in — no cold outreach, ever.',
  },
  {
    icon: Settings2,
    text: 'You set the rules for how patients are matched and contacted before anything goes live.',
  },
];

export function WorksWithWorkflow() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-(--section-py-sm) sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-3">Fits Your Day</p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            It works with what you already have, not instead of it
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground text-pretty">
            This isn&apos;t a new scheduling system to learn. It watches for cancellations in the
            background and handles the outreach that would otherwise fall to your front desk —
            quietly, and only within rules your practice sets.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="facet-cut rounded-xl border border-border bg-card p-6 sm:p-8">
            <ul className="space-y-5">
              {bullets.map((bullet) => (
                <li key={bullet.text} className="flex items-start gap-3">
                  <bullet.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">{bullet.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
