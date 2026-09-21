import { Clock3, PhoneOff, TimerReset, BellRing } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

const points = [
  {
    icon: Clock3,
    title: 'An empty chair is a sunk cost',
    text: 'The hygienist, the room, and the block of time were already scheduled. A last-minute cancellation doesn’t give any of it back.',
  },
  {
    icon: PhoneOff,
    title: 'Calling down a list doesn’t scale',
    text: 'Working through a paper or mental waitlist by phone takes staff time that’s better spent with the patients already in the chair.',
  },
  {
    icon: TimerReset,
    title: 'Most cancellations come in late',
    text: 'By the time a slot opens, there’s rarely enough notice to fill it through manual outreach before the appointment time passes.',
  },
  {
    icon: BellRing,
    title: 'Patients want the earlier slot',
    text: 'Plenty of patients would gladly move up if they knew in time — they just need to be asked automatically, the moment it happens.',
  },
];

export function WhyItMatters() {
  return (
    <section className="border-y border-border bg-card/30 py-(--section-py-sm)">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why It Matters"
          title="Every canceled slot is a small, avoidable loss"
          description="None of this is dramatic on its own. It just adds up, appointment by appointment, week after week."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-border bg-card p-6 transition-colors duration-200 hover:border-primary/40">
                <point.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-heading font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{point.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
