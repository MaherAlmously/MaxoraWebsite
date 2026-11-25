// The three public-facing Maxora services (the new B2B software positioning).
// Kept separate from `products.ts`, which remains the legacy commerce catalog
// (still live at /store and every /services/[slug] product URL, just no
// longer part of the primary services structure).
export type ServiceContactType = 'web-development' | 'app-development' | 'maintenance-packages';

/** Only the maintenance service lists packages; the other two are scoped per project. */
export type ServicePackage = {
  name: string;
  price: string;
  summary: string;
  features: string[];
};

export type MaxoraService = {
  slug: ServiceContactType;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  examples: string[];
  packages?: ServicePackage[];
  /** Slug in `products.ts` holding this service's buyable tiers, if it has any. */
  packagesProductSlug?: string;
  icon: string; // resolved in components/services/service-icon.tsx
  /** Matches the "What can we help with?" option on the contact form. */
  contactType: ServiceContactType;
};

export const services: MaxoraService[] = [
  {
    slug: 'web-development',
    name: 'Web Development',
    shortName: 'Web Development',
    tagline:
      'Custom-built websites and web apps, designed around how your business actually sells.',
    description:
      "Every site we build is designed and coded for your business, not adapted from a template. We start with what you need the site to do, whether that's bringing in leads, taking orders, or giving your customers somewhere to log in, and build toward that. It ships fast, works on every screen, and is built so you can add to it later without starting over.",
    examples: [
      'Business and marketing websites',
      'Ecommerce stores and checkout',
      'Customer and client portals',
      'Booking and scheduling systems',
      'Internal tools and dashboards',
      'Landing pages for campaigns',
      'Rebuilds of slow or dated sites',
      'Integrations with the tools you already use',
    ],
    icon: 'Globe',
    packagesProductSlug: 'website-development',
    contactType: 'web-development',
  },
  {
    slug: 'app-development',
    name: 'App Development',
    shortName: 'App Development',
    tagline:
      'Mobile, desktop, and cross-platform apps built from the idea through to the app store.',
    description:
      'We design and build applications end to end: the interface your users see, the backend and database behind it, accounts, payments, and the release itself. Cross-platform where one codebase makes sense for iOS and Android, native or desktop where the product needs it. We handle App Store and Google Play submission, and we stay on to ship updates after launch.',
    examples: [
      'iOS and Android apps',
      'Cross-platform builds from one codebase',
      'Desktop applications for Windows and macOS',
      'SaaS platforms and customer portals',
      'Marketplaces and booking platforms',
      'Internal apps for your team',
      'Backend, API, and database work',
      'App Store and Google Play submission',
    ],
    icon: 'Smartphone',
    packagesProductSlug: 'app-development',
    contactType: 'app-development',
  },
  {
    slug: 'maintenance-packages',
    name: 'Website & Application Maintenance',
    shortName: 'Maintenance Packages',
    tagline: 'Monthly plans that keep what you launched updated, backed up, and online.',
    description:
      "Software doesn't stay finished. Dependencies go out of date, platforms change their rules, and small things break quietly. A maintenance plan covers the ongoing work so you don't have to think about it: updates, backups, security monitoring, uptime checks, and the small fixes and edits that otherwise sit on a list for months. Plans are monthly and you can cancel them.",
    examples: [
      'Software and dependency updates',
      'Scheduled backups',
      'Security monitoring',
      'Uptime checks',
      'Bug fixes and small changes',
      'Content and page edits',
      'Performance reports',
      'App store and OS compatibility updates',
    ],
    packages: [
      {
        name: 'Basic Care',
        price: '$25/mo',
        summary: 'Keeps a website current and backed up.',
        features: [
          'Monthly software updates',
          'Weekly backups',
          'Security monitoring',
          'Uptime checks',
        ],
      },
      {
        name: 'Pro Care',
        price: '$40/mo',
        summary: 'Adds hands-on edits and reporting.',
        features: [
          'Everything in Basic Care',
          '2 content edits per month',
          'Priority support',
          'Monthly performance report',
        ],
      },
      {
        name: 'Application Care',
        price: 'Custom quote',
        summary: 'For mobile, desktop, and custom applications.',
        features: [
          'App store and OS compatibility updates',
          'SDK and dependency upgrades',
          'Crash and error monitoring',
          'Backend and database maintenance',
        ],
      },
    ],
    icon: 'Wrench',
    contactType: 'maintenance-packages',
  },
];

export function getService(slug: string): MaxoraService | undefined {
  return services.find((s) => s.slug === slug);
}
