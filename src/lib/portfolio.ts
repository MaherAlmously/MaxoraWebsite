export type PortfolioProject = {
  slug: string;
  name: string;
  /** For 'app' projects, the store/platform label shown in place of a domain. */
  domain: string;
  url: string;
  /** Defaults to 'web'. 'app' renders a phone mockup and a store CTA instead of a browser mockup. */
  kind?: 'web' | 'app';
  category: string;
  tagline: string;
  problem: string;
  whatWeBuilt: string;
  /** Only set when there is a real, verifiable result. Omit rather than invent one. */
  result?: string;
  image: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'smokin-grill',
    name: "Smokin' Grill",
    domain: 'smokingrillplano.com',
    url: 'https://smokingrillplano.com',
    category: 'Web app · online ordering & catering',
    tagline: 'A halal smokehouse platform built to sell the menu, not just show it.',
    problem:
      "Smokin' Grill, a 100% Zabiha Halal smokehouse in Plano, Texas, needed more than a brochure site — a platform that could get guests to a decision fast and handle catering requests without a phone call.",
    whatWeBuilt:
      'A full menu with signature-dish callouts and category tags, an online catering request flow for groups and events, a one-tap "Call Now" from every section, and location, hours, and directions built right in.',
    image: '/portfolio/smokin-grill.png',
  },
  {
    slug: 'masuly',
    name: 'Masuly',
    domain: 'masuly.com',
    url: 'https://masuly.com',
    category: 'Web app · e-commerce, affiliates & admin',
    tagline: 'A clean-label supplement brand with a full platform behind it.',
    problem:
      'Masuly needed more than a storefront — a real platform to run the business: sell a focused catalog, recruit affiliates, manage orders, and stay on top of customer communication.',
    whatWeBuilt:
      'An integrated storefront for a two-product catalog, an affiliate sign-up and referral system, an admin dashboard for managing orders and content, transactional and marketing email through Resend, sourcing transparency (origin, ingredients, no fillers), and an embedded production video and educational blog.',
    image: '/portfolio/masuly.png',
  },
  {
    slug: 'souqly',
    name: 'Souqly',
    domain: 'Google Play',
    url: '#',
    kind: 'app',
    category: 'Mobile app · Android (iOS coming soon)',
    tagline: 'A marketplace app built mobile-first, from listing to sale.',
    problem:
      'Souqly needed a native mobile marketplace experience, not a website squeezed onto a phone screen, with the account and compliance plumbing a real app store listing requires.',
    whatWeBuilt:
      'A native Android marketplace app for buying and selling, with account management, in-app account deletion, and the privacy and terms pages required for store compliance. iOS is in progress.',
    image: '/souqly-icon.png',
  },
];
