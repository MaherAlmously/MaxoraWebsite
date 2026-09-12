export type PortfolioProject = {
  slug: string;
  name: string;
  domain: string;
  url: string;
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
    category: 'Informational site',
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
    category: 'E-commerce · subscriptions & payments',
    tagline: 'A clean-label supplement brand with a storefront to match.',
    problem:
      'Masuly needed an online storefront that matched the trust and simplicity of a clean-label supplement brand, built around a deliberately short, focused catalog.',
    whatWeBuilt:
      'An integrated storefront for a two-product catalog, sourcing transparency (origin, ingredients, no fillers), an embedded production video and educational blog, and a light, airy design that keeps the product the focus.',
    image: '/portfolio/masuly.png',
  },
  {
    slug: 'maherealtor',
    name: 'Maher Almously, Realtor',
    domain: 'maherealtor.com',
    url: 'https://maherealtor.com',
    category: 'Informational site',
    tagline: 'A data-driven real estate site for a fast-moving market.',
    problem:
      'A DFW-area real estate business needed a site that could route buyers and sellers to the right next step fast, backed by real numbers instead of generic listings copy.',
    whatWeBuilt:
      'Four clear entry points (buy, sell, rent, lease), a five-step buyer framework laid out visually, a live listings section with SMS, call, and form contact, and city-by-city market coverage across North Texas.',
    image: '/portfolio/maherealtor.png',
  },
];
