import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

const problems = [
  'We’re doing too much manually.',
  'We’ve outgrown spreadsheets.',
  'Our systems don’t work together.',
  'We need software built specifically for our business.',
  'We have an app idea.',
  'We want to use AI but don’t know where it makes sense.',
];

export function ProblemFit() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading eyebrow="Sound familiar?" title="If any of this sounds like you, we can help" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem, i) => (
          <Reveal key={problem} delay={(i % 3) * 0.08}>
            <div className="h-full rounded-xl border border-border bg-card px-5 py-5">
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
