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
        destination: "/plan-your-visit",
        permanent: true,
      },
      {
        source: "/getting-here",
        destination: "/plan-your-visit/getting-here",
        permanent: true,
      },
      {
        source: "/kanha-national-park",
        destination: "/plan-your-visit/getting-here",
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