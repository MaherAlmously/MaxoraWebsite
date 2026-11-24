import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

const problems = [
  'Our website looks dated and doesn’t bring in work.',
  'We’ve outgrown the template we started on.',
  'We need a site that actually takes orders.',
  'We need software built specifically for our business.',
  'We have an app idea and no one to build it.',
  'Our site launched years ago and nobody maintains it.',
];

export function ProblemFit() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading eyebrow="Sound familiar?" title="If any of this sounds like you, we can help" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem, i) => (
          <Reveal key={problem} delay={(i % 3) * 0.08}>
            <div className="flex h-full items-center justify-center rounded-xl border border-border bg-card px-5 py-6 text-center">
              <p className="font-heading text-base font-medium text-balance">
                &ldquo;{problem}&rdquo;
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
