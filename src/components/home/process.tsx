import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

const steps = [
  {
    title: 'Pick your package',
    text: 'Browse services with real prices and choose the package that fits, or request a custom quote.',
  },
  {
    title: 'Tell us about your brand',
    text: 'Check out and share your goals, content, and preferences. We confirm scope within 24 hours.',
  },
  {
    title: 'We design and build',
    text: 'You get previews as we work and revision rounds to make it exactly right.',
  },
  {
    title: 'Launch and grow',
    text: 'We deliver your files or put your site live, and stay available for support after.',
  },
];

export function Process() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="How it works"
        title="From order to launch in four steps"
      />
      <ol className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.1}>
            <li className="relative h-full rounded-xl border border-border bg-card p-6">
              <span className="font-heading text-sm font-semibold text-primary">
                Step {i + 1}
              </span>
              <h3 className="mt-3 font-heading font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-1/2 -right-4 hidden h-px w-3 bg-primary/40 lg:block"
                />
              )}
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
