export type Billing = 'one_time' | 'monthly';

export type ProductTier = {
  id: string;
  name: string;
  priceCents: number;
  billing: Billing;
  /** For monthly plans: committed length of the plan in months. */
  termMonths?: number;
  /** Stripe recurring interval for monthly-billed tiers. Defaults to 'month'. */
  interval?: 'day' | 'month';
  /** If set, the subscription auto-cancels after this many billing cycles. */
  cancelAfterCycles?: number;
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
  description: string;
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
    description:
      'A custom-built, mobile-first website designed around your brand and your goals. Choose Informative for a professional presence, or Ecommerce to sell your products online.',
    icon: 'Globe',
    category: 'development',
    quoteOnly: false,
    featured: true,
    tags: ['best-seller'],
    tiers: [
      {
        id: 'informative',
        name: 'Informative',
        priceCents: 18000,
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
        priceCents: 25000,
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
    description:
      'Professional logo design built for your brand. Delivered in every format you need for print, web, and social, with full ownership of the final files.',
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
    description:
      'We plan, design, and publish content for your social channels so your brand stays active and growing. Billed monthly for the length of your plan; the longer commitment gets the better rate.',
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
    description:
      'Flyers for promotions, events, and campaigns, designed fresh each month for the length of your plan. Ready for print and social.',
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
    description:
      'Ongoing care for your website: software updates, backups, security checks, and small content edits whenever you need them. Cancel anytime.',
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
    description:
      'We design and build apps for iOS and Android, from a first version to a full product. Every project is different, so tell us what you want to build and we will send you a quote.',
    icon: 'Smartphone',
    category: 'development',
    quoteOnly: true,
    tiers: [],
  },
  {
    slug: 'saas-development',
    name: 'Custom SaaS Development',
    tagline: 'Cloud-based software built for your business.',
    description:
      'We design and develop custom software tailored to your business: a CRM, employee management system, scheduling platform, inventory tracker, customer portal, or a complete business management solution. Every build includes a custom web application with responsive design, secure login and authentication, database integration, an admin dashboard, user management, API integrations, and analytics and reporting, with ongoing support available. Every project is different, so tell us what you want to build and we will send you a quote.',
    icon: 'Cloud',
    category: 'development',
    quoteOnly: true,
    tags: ['new'],
    tiers: [],
  },
  {
    slug: 'video-production',
    name: 'Video Production',
    tagline: 'Commercial videos and whiteboard animations that make your brand memorable.',
    description:
      'Scripted, shot, and edited video for your brand: commercials, whiteboard animations, product promos, and social ads. Pricing depends on scope, so reach out for a quote.',
    icon: 'Clapperboard',
    category: 'media',
    quoteOnly: true,
    tiers: [],
  },
  {
    slug: 'content-editing',
    name: 'Content Editing',
    tagline: 'Raw footage turned into polished, ready-to-use videos and posts.',
    description:
      'Send us your raw footage or drafts and get back clean, professional edits: reels, YouTube videos, podcasts, and marketing materials. Contact us for a quote.',
    icon: 'Scissors',
    category: 'media',
    quoteOnly: true,
    tiers: [],
  },
  {
    slug: 'test-subscription',
    name: 'Test Subscription',
    tagline: 'A small recurring plan for testing checkout.',
    description: 'Internal test product used to verify recurring payments end-to-end.',
    icon: 'FlaskConical',
    category: 'development',
    quoteOnly: false,
    tiers: [
      {
        id: 'daily',
        name: 'Daily',
        priceCents: 500,
        billing: 'monthly',
        interval: 'day',
        termMonths: 1,
        cancelAfterCycles: 2,
        features: ['Charges today, then once more tomorrow, then stops'],
      },
    ],
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

/** "Starting at $180" / "$125/mo" style label for cards. */
export function startingPriceLabel(product: Product): string {
  if (product.quoteOnly || product.tiers.length === 0) return 'Custom quote';
  const cheapest = [...product.tiers].sort((a, b) => a.priceCents - b.priceCents)[0];
  const base = formatPrice(cheapest.priceCents);
  if (cheapest.billing !== 'monthly') return `From ${base}`;
  return `From ${base}/${cheapest.interval === 'day' ? 'day' : 'mo'}`;
}

export function tierPriceLabel(tier: ProductTier): string {
  const base = formatPrice(tier.priceCents);
  if (tier.billing !== 'monthly') return base;
  return `${base}/${tier.interval === 'day' ? 'day' : 'mo'}`;
}
