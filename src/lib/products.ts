export type Billing = 'one_time' | 'monthly' | 'daily';

export type ProductTier = {
  id: string;
  name: string;
  priceCents: number;
  /** If set, this tier is on a limited-time sale: priceCents is the sale price, this is the original. */
  originalPriceCents?: number;
  billing: Billing;
  /** For monthly plans: committed length of the plan in months. */
  termMonths?: number;
  features: string[];
};

export type ProductTag = 'best-seller' | 'new' | 'popular' | 'limited-time';

export const productTagLabels: Record<ProductTag, string> = {
  'best-seller': 'Best Seller',
  new: 'New',
  popular: 'Popular',
  'limited-time': 'Limited Time',
};

export const categoryLabels: Record<Product['category'], string> = {
  development: 'Development',
  design: 'Design',
  marketing: 'Marketing',
  media: 'Media',
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  /** 2-3 word summary shown on mobile cards where space is tight. */
  shortTagline: string;
  description: string;
  /** Example builds shown on the single service page, e.g. "Booking system" for custom software. */
  examples?: string[];
  icon: string; // lucide icon name, resolved in components
  category: 'development' | 'design' | 'marketing' | 'media';
  quoteOnly: boolean;
  featured?: boolean;
  tags?: ProductTag[];
  tiers: ProductTier[];
};

export const products: Product[] = [
  {
    slug: 'website-development',
    name: 'Website Development',
    tagline: 'Sleek, responsive websites that capture attention and perform on every device.',
    shortTagline: 'Custom websites',
    description:
      'A custom-built, mobile-first website designed around your brand and your goals, not a template. We handle design, development, copy placement, and launch from start to finish. Choose Informative for a professional presence that explains who you are and turns visitors into leads, or Ecommerce for a full online store with product listings, cart, and secure checkout. Every site is responsive, fast, and set up with basic SEO so people can actually find it.',
    icon: 'Globe',
    category: 'development',
    quoteOnly: false,
    featured: true,
    tags: ['best-seller', 'limited-time'],
    tiers: [
      {
        id: 'informative',
        name: 'Informative',
        priceCents: 9900,
        originalPriceCents: 19900,
        billing: 'one_time',
        features: [
          'Professional site that presents your business',
          'Up to 5 custom-designed pages',
          'Mobile-first responsive build',
          'Contact form setup',
          'Basic SEO setup',
        ],
      },
      {
        id: 'ecommerce',
        name: 'Ecommerce',
        priceCents: 19900,
        originalPriceCents: 24900,
        billing: 'one_time',
        features: [
          'Online store with product listings and cart',
          'Secure checkout setup',
          'Mobile-first responsive build',
          'Full on-page SEO and analytics',
          'Speed optimization',
        ],
      },
    ],
  },
  {
    slug: 'logo-design',
    name: 'Logo Design',
    tagline: 'Logos that give your brand a unique and memorable identity.',
    shortTagline: 'Custom logos',
    description:
      'Professional logo design built around your brand, not a generic template pack. We start from your industry, colors, and personality, then design concepts you actually pick between. Delivered in every format you need for print, web, and social (PNG, JPG, and vector for the Pro tier), with full ownership of the final files, so you can use it anywhere without asking us again.',
    icon: 'PenTool',
    category: 'design',
    quoteOnly: false,
    featured: true,
    tiers: [
      {
        id: 'basic',
        name: 'Basic Logo',
        priceCents: 2000,
        billing: 'one_time',
        features: ['1 logo concept', '2 revision rounds', 'PNG + JPG delivery', 'Social media sizes'],
      },
      {
        id: 'pro',
        name: 'Pro Logo',
        priceCents: 5000,
        billing: 'one_time',
        features: [
          '3 logo concepts',
          'Unlimited revisions',
          'Full vector files (SVG, AI)',
          'Brand color palette',
          'Social media kit',
        ],
      },
    ],
  },
  {
    slug: 'social-media-management',
    name: 'Social Media Management',
    tagline: 'Posting, content creation, and engagement that keeps your brand visible online.',
    shortTagline: 'Social growth',
    description:
      'We plan, design, and publish content for your social channels so your brand stays active and growing, without you having to think about it every day. Each month you get a content calendar, custom graphics and captions written for your audience, and 12 posts published on schedule, plus a performance recap so you can see what is working. Billed monthly for the length of your plan; the longer commitment gets the better rate.',
    icon: 'Share2',
    category: 'marketing',
    quoteOnly: false,
    tags: ['popular'],
    tiers: [
      {
        id: '1-month',
        name: '1-Month Plan',
        priceCents: 15000,
        billing: 'monthly',
        termMonths: 1,
        features: [
          '12 posts per month',
          'Custom graphics + captions',
          'Content calendar',
          'Monthly performance recap',
        ],
      },
      {
        id: '6-month',
        name: '6-Month Plan',
        priceCents: 12500,
        billing: 'monthly',
        termMonths: 6,
        features: [
          '12 posts per month',
          'Custom graphics + captions',
          'Content calendar',
          'Monthly performance recap',
        ],
      },
      {
        id: '1-year',
        name: '1-Year Plan',
        priceCents: 10000,
        billing: 'monthly',
        termMonths: 12,
        features: [
          '12 posts per month',
          'Custom graphics + captions',
          'Content calendar',
          'Monthly performance recap',
          'Best monthly rate',
        ],
      },
    ],
  },
  {
    slug: 'flyer-design',
    name: 'Flyer Design',
    tagline: 'Print-ready flyers, delivered on a schedule.',
    shortTagline: 'Print flyers',
    description:
      'Flyers for promotions, events, and campaigns, designed fresh each month for the length of your plan. You send the details, we handle the layout, copy fit, and revisions, and deliver files ready for both print and social. No design software or back-and-forth freelancers needed.',
    icon: 'FileImage',
    category: 'design',
    quoteOnly: false,
    tiers: [
      {
        id: '1-month',
        name: '1-Month Plan',
        priceCents: 3000,
        billing: 'monthly',
        termMonths: 1,
        features: ['4 flyer designs per month', 'Print + digital formats', '2 revision rounds each'],
      },
      {
        id: '6-month',
        name: '6-Month Plan',
        priceCents: 2500,
        billing: 'monthly',
        termMonths: 6,
        features: ['4 flyer designs per month', 'Print + digital formats', '2 revision rounds each'],
      },
      {
        id: '1-year',
        name: '1-Year Plan',
        priceCents: 2000,
        billing: 'monthly',
        termMonths: 12,
        features: [
          '4 flyer designs per month',
          'Print + digital formats',
          '2 revision rounds each',
          'Best monthly rate',
        ],
      },
    ],
  },
  {
    slug: 'website-care-plan',
    name: 'Website Care Plan',
    tagline: 'We keep your website updated, backed up, and running smoothly.',
    shortTagline: 'Site maintenance',
    description:
      'Ongoing care for your website so it stays fast, secure, and online without you having to manage it: software updates, weekly backups, security monitoring, and uptime checks, plus content edits on the Pro plan whenever you need a page updated. Cancel anytime, no long-term contract.',
    icon: 'Wrench',
    category: 'development',
    quoteOnly: false,
    tiers: [
      {
        id: 'basic-care',
        name: 'Basic Care',
        priceCents: 2500,
        billing: 'monthly',
        features: [
          'Monthly software updates',
          'Weekly backups',
          'Security monitoring',
          'Uptime checks',
        ],
      },
      {
        id: 'pro-care',
        name: 'Pro Care',
        priceCents: 4000,
        billing: 'monthly',
        features: [
          'Everything in Basic Care',
          '2 content edits per month',
          'Priority support',
          'Monthly performance report',
        ],
      },
    ],
  },
  {
    slug: 'app-development',
    name: 'Mobile App Development',
    tagline: 'Custom iOS and Android apps that engage your users and simplify your business.',
    shortTagline: 'Mobile apps',
    description:
      'We design and build native-feeling apps for iOS and Android, from a first version to a full product with backend, accounts, and payments built in. We handle UI/UX design, development, App Store/Play Store submission, and ongoing updates. Every project is different, so tell us what you want to build and we will send you a quote.',
    examples: [
      'Marketplace or listings app',
      'Booking / appointment app',
      'Delivery or on-demand service app',
      'Social or community app',
      'Loyalty / rewards app',
      'Internal tool for your team',
    ],
    icon: 'Smartphone',
    category: 'development',
    quoteOnly: true,
    tiers: [],
  },
  {
    slug: 'saas-development',
    name: 'Software Development',
    tagline: 'Custom software built for your business, from web apps to full platforms.',
    shortTagline: 'Custom software',
    description:
      'We design and develop custom software tailored to your business, whether that is a simple internal tool or a full SaaS platform you sell to customers. Every build includes a custom web application with responsive design, secure login and authentication, database integration, an admin dashboard, user management, API integrations, and analytics and reporting, with ongoing support available after launch. If you can describe the workflow, we can build it: not limited to the examples below, so tell us what you want to build and we will send you a quote.',
    examples: [
      'Ticket management system',
      'Booking / reservation system',
      'CRM or sales pipeline tool',
      'Employee management system',
      'Scheduling platform',
      'Inventory tracker',
      'Customer portal',
      'Full SaaS product for your customers',
    ],
    icon: 'Cloud',
    category: 'development',
    quoteOnly: true,
    tags: ['new'],
    tiers: [],
  },
  {
    slug: 'subscription-test',
    name: 'Subscription Test',
    tagline: 'Internal test product for checking the recurring payment flow.',
    shortTagline: 'Test plan',
    description:
      'A $1/day test plan used to verify that recurring subscriptions actually charge on schedule. Not a real service, safe to ignore.',
    icon: 'Wrench',
    category: 'development',
    quoteOnly: false,
    tiers: [
      {
        id: 'daily-test',
        name: 'Daily Test',
        priceCents: 100,
        billing: 'daily',
        features: [
          'Charges $1 today, then $1 again in 24 hours',
          'Cancels itself automatically after that, no third charge',
        ],
      },
    ],
  },
  {
    slug: 'video-production',
    name: 'Video Production',
    tagline: 'Commercial videos and whiteboard animations that make your brand memorable.',
    shortTagline: 'Video production',
    description:
      'Scripted, shot, and edited video for your brand: commercials, whiteboard animations, product promos, and social ads, handled end to end from concept and script to final export. Pricing depends on scope (length, style, and turnaround), so reach out with what you have in mind and we will send you a quote.',
    icon: 'Clapperboard',
    category: 'media',
    quoteOnly: true,
    tiers: [],
  },
  {
    slug: 'content-editing',
    name: 'Content Editing',
    tagline: 'Raw footage turned into polished, ready-to-use videos and posts.',
    shortTagline: 'Video editing',
    description:
      'Send us your raw footage or drafts and get back clean, professional edits: reels, YouTube videos, podcasts, and marketing materials, with color correction, sound cleanup, captions, and pacing handled for you. Contact us with your footage and turnaround needs for a quote.',
    icon: 'Scissors',
    category: 'media',
    quoteOnly: true,
    tiers: [],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getTier(productSlug: string, tierId: string): ProductTier | undefined {
  return getProduct(productSlug)?.tiers.find((t) => t.id === tierId);
}

export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

const billingSuffix: Record<Billing, string> = {
  one_time: '',
  monthly: '/mo',
  daily: '/day',
};

/** "Starting at $180" / "$125/mo" style label for cards. */
export function startingPriceLabel(product: Product): string {
  if (product.quoteOnly || product.tiers.length === 0) return 'Custom quote';
  const cheapest = [...product.tiers].sort((a, b) => a.priceCents - b.priceCents)[0];
  const base = formatPrice(cheapest.priceCents);
  const suffix = billingSuffix[cheapest.billing];
  return suffix ? `From ${base}${suffix}` : `From ${base}`;
}

export function tierPriceLabel(tier: ProductTier): string {
  const base = formatPrice(tier.priceCents);
  return `${base}${billingSuffix[tier.billing]}`;
}

/** Whole-percent discount, e.g. 50 for "50% off". */
export function tierDiscountPercent(tier: ProductTier): number | null {
  if (!tier.originalPriceCents || tier.originalPriceCents <= tier.priceCents) return null;
  return Math.round((1 - tier.priceCents / tier.originalPriceCents) * 100);
}
