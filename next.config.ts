import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // NOTE: do not add `images: { formats: ['image/avif', ...] }` until Next is
  // upgraded. next@15.5.20 is affected by GHSA-2xp9-vwfh-vxw4, an
  // unauthenticated RCE in the Image Optimization API that is only reachable
  // when AVIF is enabled (fixed in 15.5.24). The default WebP-only pipeline
  // already takes the 2.4 MB flyer down to ~82 KB, so this costs little.
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
