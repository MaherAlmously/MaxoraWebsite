import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    // The three B2B service slugs changed when the offering narrowed to web,
    // app, and maintenance. These old URLs are still in the published sitemap
    // and in the wild, so point them at their closest replacement.
    return [
      { source: '/services/ai-automation', destination: '/services', permanent: true },
      {
        source: '/services/custom-software',
        destination: '/services/web-development',
        permanent: true,
      },
      {
        source: '/services/web-mobile-apps',
        destination: '/services/app-development',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
