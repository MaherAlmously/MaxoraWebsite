import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { ClientsMarquee } from '@/components/home/clients-marquee';

export function ClientsShowcase() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our clients"
          title="Businesses we've helped grow"
          description="A few of the brands, shops, and organizations we've built websites, logos, and content for."
        />
      </div>

      <Reveal>
        <ClientsMarquee />
      </Reveal>
    </section>
  );
}
