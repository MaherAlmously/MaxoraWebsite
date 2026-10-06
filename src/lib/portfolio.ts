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
    category: 'Informational web app',
    tagline: 'A halal smokehouse site built to sell the menu, not just show it.',
    problem:
      "Smokin' Grill, a 100% Zabiha Halal smokehouse in Plano, Texas, needed a site that could get guests to a decision fast, not just describe the restaurant.",
    whatWeBuilt:
      'A full menu with signature-dish callouts and category tags, catering inquiries for groups and events, a one-tap "Call Now" from every section, and location, hours, and directions built right in.',
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
      'Masuly needed more than a storefront. It needed a real platform to run the business: sell a focused catalog, recruit affiliates, manage orders, and stay on top of customer communication.',
    whatWeBuilt:
      'An integrated storefront for a two-product catalog, an affiliate sign-up and referral system, an admin dashboard for managing orders and content, transactional and marketing email through Resend, sourcing transparency (origin, ingredients, no fillers), and an embedded production video and educational blog.',
    image: '/portfolio/masuly.png',
  },
  {
    slug: 'souqly',
    name: 'Souqly',
    domain: 'Google Play',
    url: 'https://play.google.com/store/apps/details?id=com.souqly.grocery',
    kind: 'app',
    category: 'Mobile app · Android (iOS coming soon)',
    tagline: 'Grocery lists that stay in sync for everyone in the household.',
    problem:
      'Grocery shopping gets messy once more than one person is involved. Families and roommates needed a way to build and shop a list together without duplicate trips, forgotten items, or a group text falling apart.',
    whatWeBuilt:
      'A native Android app where you create a household and invite others with a code, or just use it solo. Lists are organized by the stores people actually shop at, and every add, check-off, or edit syncs instantly across everyone’s phone. It also tracks buying habits over time, so patterns are easy to spot, plus a quick setup tutorial for new users. iOS is in progress.',
    image: '/portfolio/souqly.png',
  },
];
