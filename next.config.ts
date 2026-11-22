import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@headlessui/react'],
  },

  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'surwahi.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      }
    ],
  },

  async redirects() {
    return [
      // The production *.vercel.app alias serves a full duplicate of the site — send it to the real domain.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'surwahi.vercel.app' }],
        destination: 'https://surwahi.com/:path*',
        permanent: true,
      },
      // ═══ About section restructure ═══
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-us/our-story",
        destination: "/about/our-story",
        permanent: true,
      },
      {
        source: "/about-us/the-lodge-and-philosophy",
        destination: "/about/the-lodge-and-philosophy",
        permanent: true,
      },
      {
        source: "/about-us/our-residents",
        destination: "/about/our-residents",
        permanent: true,
      },

      // ═══ Stay section (formerly under About / Accommodations) ═══
      {
        source: "/accommodations",
        destination: "/stay",
        permanent: true,
      },
      {
        source: "/accommodations/suites",
        destination: "/stay/suites",
        permanent: true,
      },
      {
        source: "/accommodations/:slug*",
        destination: "/stay/:slug*",
        permanent: true,
      },
      {
        source: "/about-us/dining-and-local-cuisine",
        destination: "/stay/dining",
        permanent: true,
      },
      {
        source: "/about-us/fact-sheet",
        destination: "/stay/fact-sheet",
        permanent: true,
      },

      // ═══ Old placeholder room pages -> real rooms ═══
      { source: '/stay/forest-canopy-suite', destination: '/stay/jholar', permanent: true },
      { source: '/stay/river-view-suite', destination: '/stay/kariwah', permanent: true },
      { source: '/stay/mixed-dormitory', destination: '/stay/maikal-express', permanent: true },
      { source: '/stay/safari-tent', destination: '/stay/camping', permanent: true },

      // ═══ Stories section (replaces Praises) ═══
      {
        source: "/praises",
        destination: "/stories",
        permanent: true,
      },
      // Awards & press live under /praises/* (no /stories/awards or /stories/press routes yet)
      {
        source: "/stories/awards",
        destination: "/praises/awards-and-accolades",
        permanent: true,
      },
      {
        source: "/stories/press",
        destination: "/praises/press-mentions-and-recognitions",
        permanent: true,
      },
      {
        source: "/stories/blog",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/stories/blog/:slug*",
        destination: "/blogs/:slug*",
        permanent: true,
      },

      // ═══ Plan Your Visit (absorbing orphaned pages) ═══
      {
        source: "/itineraries",
        destination: "/plan-your-visit/itineraries",
        permanent: true,
      },
      {
        source: "/getting-here",
        destination: "/plan-your-visit/getting-here",
        permanent: true,
      },
      // /kanha-national-park is now a real pillar page (2026-11-22) - redirect removed.
      {
        source: "/plan-your-visit/curated-itineraries",
        destination: "/plan-your-visit/itineraries",
        permanent: true,
      },

      // ═══ Legacy Webflow pages (CRITICAL — these still get traffic) ═══
      {
        source: '/story-about-surwahi-social',
        destination: '/about/our-story',
        permanent: true,
      },
      {
        source: '/about-social-surwahi',
        destination: '/about/our-story',
        permanent: true,
      },
      {
        source: '/surwahi-social/experiences-within-ssek',
        destination: '/experiences',
        permanent: true,
      },
      {
        source: "/meet-the-dreamers",
        destination: "/about/our-team",
        permanent: true,
      },
      {
        source: '/surwahi-social/best-homestays-of-kanha',
        destination: '/stay',
        permanent: true,
      },
      {
        source: '/surwahi-ecoestate-house-rules',
        destination: '/house-rules',
        permanent: true,
      },
      {
        source: "/surwahi-social/:slug*",
        destination: "/experiences",
        permanent: true,
      },
      {
        source: "/knowledge-hub",
        destination: "/blogs",
        permanent: true,
      },

      // ═══ Legacy WordPress-era URLs (found as 404s in GA4, Oct 25 - Nov 21 2026) ═══
      // aocr.org and old Facebook posts still link to these. Specific matches first, catch-alls last.
      // Destinations are pages live on surwahi.com as of 2026-11-22.
      { source: '/blog', destination: '/blogs', permanent: true },
      { source: '/blog/energy-conservation', destination: '/sustainability', permanent: true },
      { source: '/blog/water-conservation', destination: '/sustainability', permanent: true },
      { source: '/blog/green-building-is-not-always-sustainable', destination: '/sustainability/eco-friendly-construction-practices', permanent: true },
      { source: '/blog/ssek-collaborative-artisanal-construction-folktale', destination: '/sustainability/eco-friendly-construction-practices', permanent: true },
      { source: '/blog/nature-tourism-and-ecotourism', destination: '/blogs/how-to-choose-a-genuine-eco-lodge-in-india', permanent: true },
      { source: '/blog/difference-between-wildlife-sanctuary-wls-vs-national-park-np-in-india', destination: '/kanha-national-park', permanent: true },
      { source: '/blog/major-districts-of-kanha-balaghat-and-mandla', destination: '/plan-your-visit/getting-here', permanent: true },
      { source: '/blog/a-webinar-at-iim-sirmaur', destination: '/praises/press-mentions-and-recognitions', permanent: true },
      { source: '/blog/best-homestays-of-kanha', destination: '/stay', permanent: true },
      { source: '/blog/:slug*', destination: '/blogs', permanent: true },

      // Old /kanha-national-park/* articles. `:slug+` needs at least one segment, so the
      // /kanha-national-park pillar page itself is NOT redirected.
      { source: '/kanha-national-park/safari-timings-and-bookings', destination: '/plan-your-visit/safari-booking-guide', permanent: true },
      { source: '/kanha-national-park/non-safari-activities-at-khatia-gate-zone-kanha', destination: '/experiences', permanent: true },
      { source: '/kanha-national-park/arriving-at-kanha-tiger-reserve-ktr-via-3-large-nearby-cities', destination: '/plan-your-visit/getting-here', permanent: true },
      { source: '/kanha-national-park/:slug+', destination: '/kanha-national-park', permanent: true },

      // Old tag archives (mostly Kanha deer species) and uncategorized posts. The Kanha National Park
      // guide covers barasingha, chital and the other deer; repoint to the barasingha post once it's published.
      { source: '/tag/:slug*', destination: '/kanha-national-park', permanent: true },
      { source: '/types-of-deer-antelopes-of-kanha', destination: '/kanha-national-park', permanent: true },
      { source: '/uncategorized/tree-life-of-surwahi-social-kanha', destination: '/sustainability/tree-census-and-biodiversity-reports', permanent: true },
      { source: '/uncategorized/:slug*', destination: '/blogs', permanent: true },

      // Old root-level posts (shared on Facebook)
      { source: '/evapotranspiration-toilet', destination: '/sustainability/evapo-transpiration-toilets', permanent: true },
      { source: '/community-building', destination: '/experiences/cultural-immersion', permanent: true },
      { source: '/consume-local', destination: '/stay/dining', permanent: true },
      { source: '/discover-landforms', destination: '/experiences/guided-forest-trails', permanent: true },
      { source: '/surwahi-social-kanha-an-alternative-tourism-concept', destination: '/about/our-story', permanent: true },

      // Shortened URL redirects as recommended
      {
        source: '/sustainability/sustainable-development-goals-alignment',
        destination: '/sustainability/sdg-alignment',
        permanent: true,
      },
      {
        source: '/experiences/cultural-immersion-and-local-life',
        destination: '/experiences/cultural-immersion',
        permanent: true,
      },
      {
        source: '/workshops/grassroots-governance-and-local-democracy',
        destination: '/workshops/grassroots-governance',
        permanent: true,
      },
    ];
  },

  // Compression
  compress: true,

  // PoweredByHeader
  poweredByHeader: false,

  // Generate robots.txt and sitemap
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/llms.txt',
        destination: '/api/llms',
      },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },


};

export default nextConfig;