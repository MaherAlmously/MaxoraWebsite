// The three public-facing Maxora services (the new B2B software positioning).
// Kept separate from `products.ts`, which remains the legacy commerce catalog
// (still live at /store and every /services/[slug] product URL, just no
// longer part of the primary services structure).
export type ServiceContactType = 'custom-software' | 'ai-automation' | 'web-mobile-apps';

export type MaxoraService = {
  slug: ServiceContactType;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  examples: string[];
  icon: string; // resolved in components/services/service-icon.tsx
  /** Matches the "What can we help with?" option on the contact form. */
  contactType: ServiceContactType;
};

export const services: MaxoraService[] = [
  {
    slug: 'custom-software',
    name: 'Custom Software',
    shortName: 'Custom Software',
    tagline: 'We build software specifically around how your business works.',
    description:
      "If you're running your business through spreadsheets, sticky notes, or five tools that don't talk to each other, we build the one system that actually fits how your team works. You tell us the problem, we design and build the software around it.",
    examples: [
      'Internal business systems',
      'Employee management',
      'Customer or client portals',
      'Scheduling and booking',
      'Inventory tracking',
      'Custom CRM systems',
      'Dashboards and reporting',
      'Replacing spreadsheets and manual processes',
    ],
    icon: 'LayoutGrid',
    contactType: 'custom-software',
  },
  {
    slug: 'ai-automation',
    name: 'AI & Automation',
    shortName: 'AI & Automation',
    tagline: 'We automate repetitive work and use AI where it can actually save your business time.',
    description:
      "A lot of the work your team does every day doesn't need a person doing it. We find the repetitive, time-consuming parts of your business and automate them, using AI only where it genuinely saves time, not because it's trendy.",
    examples: [
      'Business process automation',
      'Document processing',
      'Automated data entry',
      'AI assistants',
      'Customer support automation',
      'Automated reports',
      'Workflow automation',
      'Connecting your existing tools together',
    ],
    icon: 'Workflow',
    contactType: 'ai-automation',
  },
  {
    slug: 'web-mobile-apps',
    name: 'Web & Mobile Apps',
    shortName: 'Web & Mobile Apps',
    tagline: 'We design and build complete applications for businesses and startups.',
    description:
      "Whether it's an app idea you've been sitting on or a platform your business needs to run, we design and build it end to end, on the web and on iOS and Android.",
    examples: [
      'Customer applications',
      'Employee applications',
      'SaaS platforms',
      'Booking platforms',
      'Client portals',
      'Business dashboards',
      'Marketplaces',
      'iOS and Android apps',
    ],
    icon: 'Smartphone',
    contactType: 'web-mobile-apps',
  },
];

export function getService(slug: string): MaxoraService | undefined {
  return services.find((s) => s.slug === slug);
}
