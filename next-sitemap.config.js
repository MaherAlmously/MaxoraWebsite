/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  // Legacy shop catalog: kept fully working for direct links, intentionally
  // unlisted and not promoted for SEO (see robots: { index: false } on the page).
  // Dated promo landing page: noindex on the page itself, so keep it out of
  // the sitemap too rather than advertising a URL that expires.
  exclude: ['/store', '/black-friday'],
};
