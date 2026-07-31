export type PortfolioProject = {
  slug: string;
  name: string;
  domain: string;
  url: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'smokin-grill',
    name: "Smokin' Grill",
    domain: 'smokingrillplano.com',
    url: 'https://smokingrillplano.com',
    category: 'Informational site',
    tagline: 'A halal smokehouse site built to sell the menu, not just show it.',
    description:
      "Smokin' Grill is a 100% Zabiha Halal smokehouse in Plano, Texas. Bold food photography and a clear halal promise get guests to a decision fast.",
    features: [
      'Full menu with signature-dish callouts and category tags',
      'Catering inquiries for groups and events',
      'One-tap "Call Now" from every section',
      'Location, hours, and directions built in',
    ],
    image: '/portfolio/smokin-grill.png',
  },
  {
    slug: 'masuly',
    name: 'Masuly',
    domain: 'masuly.com',
    url: 'https://masuly.com',
    category: 'E-commerce · subscriptions & payments',
    tagline: 'A clean-label supplement brand with a storefront to match.',
    description:
      'Masuly sells a deliberately short catalog of clean, responsibly sourced supplements. Minimalist layout and transparent sourcing build trust before a single product is added to cart.',
    features: [
      'Integrated storefront with a focused, two-product catalog',
      'Sourcing transparency (origin, ingredients, no fillers)',
      'Embedded production video and educational blog',
      'Light, airy design that keeps the product the focus',
    ],
    image: '/portfolio/masuly.png',
  },
  {
    slug: 'maherealtor',
    name: 'Maher Almously, Realtor',
    domain: 'maherealtor.com',
    url: 'https://maherealtor.com',
    category: 'Informational site',
    tagline: 'A data-driven real estate site for a fast-moving market.',
    description:
      'A DFW-area real estate site built around a simple promise: compare homes with real numbers. Buyers and sellers get routed to the right next step, backed by a clear five-step process.',
    features: [
      'Four clear entry points: buy, sell, rent, and lease',
      'Five-step buyer framework laid out visually',
      'Live listings section with SMS, call, and form contact',
      'City-by-city market coverage across North Texas',
    ],
    image: '/portfolio/maherealtor.png',
  },
];
