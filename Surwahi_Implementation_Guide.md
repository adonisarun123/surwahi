# Surwahi Social Ecoestate — Complete Website Implementation Guide

> **Project:** surwahi.com IA Overhaul & Enhancement
> **Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, ImageKit (CDN)
> **Date:** February 2026
> **Purpose:** This is a vibe-coding-ready spec. Every section contains enough detail for an AI coding assistant (Cursor, Copilot, Claude Code, etc.) to implement directly.

---

## Table of Contents

1. [Navigation Restructure](#1-navigation-restructure)
2. [URL & Routing Changes](#2-url--routing-changes)
3. [301 Redirects](#3-301-redirects)
4. [New Pages to Build](#4-new-pages-to-build)
5. [Home Page Overhaul](#5-home-page-overhaul)
6. [About Section Restructure](#6-about-section-restructure)
7. [Stay Section (New Top-Level)](#7-stay-section-new-top-level)
8. [Experiences Section Enhancement](#8-experiences-section-enhancement)
9. [Workshops Section Enhancement](#9-workshops-section-enhancement)
10. [Sustainability Section Enhancement](#10-sustainability-section-enhancement)
11. [Plan Your Visit (New Section)](#11-plan-your-visit-entirely-new-section)
12. [Stories Section (Replaces Praises)](#12-stories-section-replaces-praises)
13. [Gallery Enhancement](#13-gallery-enhancement)
14. [Contact Page Enhancement](#14-contact-page-enhancement)
15. [Global Components](#15-global-components)
16. [Schema Markup (JSON-LD)](#16-schema-markup-json-ld)
17. [SEO — Meta Tags, OG, Sitemap](#17-seo--meta-tags-og-tags-sitemap)
18. [Performance & Core Web Vitals](#18-performance--core-web-vitals)
19. [Analytics & Conversion Tracking](#19-analytics--conversion-tracking)
20. [Content Checklist](#20-content-checklist)
21. [Implementation Phases & Priority](#21-implementation-phases--priority)

---

## 1. Navigation Restructure

### Current Navigation (PROBLEM)

```
About Us → Our Story, Lodge & Philosophy, Accommodations, Dining, Fact Sheet, Our Residents
Experiences → (10 sub-items)
Sustainability → (4 sub-items)
Workshops & Learning → (13 sub-items)
Praises → Awards, Press
Gallery
Blogs
Contact
[Book Now] → /accommodations
```

**Issues:**
- Accommodations is buried under "About Us" — it's the #1 conversion page
- "Praises" is an unusual label that visitors don't instinctively understand
- No "Plan Your Visit" section — massive gap for trip planners
- No "Why Surwahi" differentiation page
- 13 workshops in a single dropdown = overwhelming on mobile

### New Navigation (TARGET)

```
About → Our Story, The Lodge & Philosophy, Why Surwahi (NEW), Our Team, Our Residents
Stay (NEW top-level) → Suites, Mudhouses & Dormitories, Camping, Dining & Local Cuisine, Fact Sheet
Experiences → (10 sub-items, unchanged)
Workshops → grouped in nav as: Nature & Night Sky, Arts & Crafts, Knowledge & Learning
Sustainability → Our Approach (NEW landing), ETT, Tree Census, Eco Construction, SDGs
Plan Your Visit (NEW) → Getting Here, Best Time to Visit, Itineraries, Safari Booking Guide, FAQs
Stories (replaces Praises) → Blog, Guest Reviews (NEW), Awards, Press & Media
Gallery
Contact
[Book Your Stay] → /stay (sticky CTA)
```

### Implementation — Navigation Component

**File:** `src/components/layout/Navbar.tsx` (or wherever your nav lives)

Replace the current navigation config object/array with the new structure. Here's the exact data shape:

```typescript
// src/config/navigation.ts

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isNew?: boolean;      // for internal tracking during dev
  isCTA?: boolean;      // for "Book Your Stay" button
}

export const mainNavigation: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about/our-story" },
      { label: "The Lodge & Philosophy", href: "/about/the-lodge-and-philosophy" },
      { label: "Why Surwahi", href: "/about/why-surwahi", isNew: true },
      { label: "Our Team", href: "/about/our-team" },
      { label: "Our Residents (Flora & Fauna)", href: "/about/our-residents" },
    ],
  },
  {
    label: "Stay",
    href: "/stay",
    children: [
      { label: "Suites", href: "/stay/suites" },
      { label: "Mudhouses & Dormitories", href: "/stay/mudhouses" },
      { label: "Camping & Tents", href: "/stay/camping" },
      { label: "Dining & Local Cuisine", href: "/stay/dining" },
      { label: "Fact Sheet & Amenities", href: "/stay/fact-sheet" },
    ],
  },
  {
    label: "Experiences",
    href: "/experiences",
    children: [
      { label: "Wildlife Safaris", href: "/experiences/wildlife-safaris" },
      { label: "Guided Forest Trails", href: "/experiences/guided-forest-trails" },
      { label: "Bird-watching Expeditions", href: "/experiences/bird-watching-expeditions" },
      { label: "Farm Life Visit", href: "/experiences/farm-life-visit" },
      { label: "Know Your Crop", href: "/experiences/know-your-crop" },
      { label: "Play @ Surwahi", href: "/experiences/play-at-surwahi" },
      { label: "Outdoor Sports & Nature Games", href: "/experiences/outdoor-sports-and-nature-games" },
      { label: "Eco Volunteering Programs", href: "/experiences/eco-volunteering-programs" },
      { label: "Cultural Immersion & Local Life", href: "/experiences/cultural-immersion-and-local-life" },
      { label: "Live Tribal Cooking", href: "/experiences/live-tribal-cooking-experiences" },
    ],
  },
  {
    label: "Workshops",
    href: "/workshops",
    children: [
      // Group 1: Nature & Night Sky
      { label: "Star Gazing Nights", href: "/workshops/star-gazing-nights" },
      { label: "Astro-Photography", href: "/workshops/astro-photography" },
      { label: "Forest Bathing (Shinrin-Yoku)", href: "/workshops/forest-bathing" },
      { label: "Herping Walks", href: "/workshops/herping-walks" },
      // Group 2: Arts & Crafts
      { label: "Earthen Pottery", href: "/workshops/earthen-pottery" },
      { label: "Gond Art Workshops", href: "/workshops/gond-art-workshops" },
      { label: "Bamboo & Lantana Crafting", href: "/workshops/bamboo-and-lantana-crafting" },
      { label: "Leaf Plate Making", href: "/workshops/leaf-plate-making" },
      // Group 3: Knowledge & Learning
      { label: "Food Foraging Trails", href: "/workshops/food-foraging-trails" },
      { label: "The Art of Regeneration", href: "/workshops/the-art-of-regeneration" },
      { label: "Grassroots Governance", href: "/workshops/grassroots-governance-and-local-democracy" },
      { label: "Nature's Pharmacy", href: "/workshops/natures-pharmacy" },
      { label: "Build With Mud", href: "/workshops/build-with-mud" },
    ],
  },
  {
    label: "Sustainability",
    href: "/sustainability",
    children: [
      { label: "Our Approach", href: "/sustainability", isNew: true },
      { label: "Evapo-Transpiration Toilets", href: "/sustainability/evapo-transpiration-toilets" },
      { label: "Tree Census & Biodiversity", href: "/sustainability/tree-census-and-biodiversity-reports" },
      { label: "Eco-Friendly Construction", href: "/sustainability/eco-friendly-construction-practices" },
      { label: "SDGs Alignment", href: "/sustainability/sustainable-development-goals-alignment" },
    ],
  },
  {
    label: "Plan Your Visit",
    href: "/plan-your-visit",
    children: [
      { label: "Getting Here", href: "/plan-your-visit/getting-here", isNew: true },
      { label: "Best Time to Visit", href: "/plan-your-visit/best-time-to-visit", isNew: true },
      { label: "Curated Itineraries", href: "/plan-your-visit/itineraries" },
      { label: "Safari Booking Guide", href: "/plan-your-visit/safari-booking-guide", isNew: true },
      { label: "FAQs", href: "/plan-your-visit/faqs", isNew: true },
    ],
  },
  {
    label: "Stories",
    href: "/stories",
    children: [
      { label: "Blog", href: "/stories/blog" },
      { label: "Guest Reviews", href: "/stories/guest-reviews", isNew: true },
      { label: "Awards & Accolades", href: "/stories/awards" },
      { label: "Press & Media", href: "/stories/press" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const ctaButton: NavItem = {
  label: "Book Your Stay",
  href: "/stay",
  isCTA: true,
};
```

### Mobile Navigation — Grouped Workshops Mega Menu

The 13 workshops are too many for a flat mobile dropdown. Build a grouped accordion:

```typescript
// For mobile nav, group workshops into categories
export const workshopGroups = [
  {
    groupLabel: "Nature & Night Sky",
    items: [
      { label: "Star Gazing Nights", href: "/workshops/star-gazing-nights" },
      { label: "Astro-Photography", href: "/workshops/astro-photography" },
      { label: "Forest Bathing", href: "/workshops/forest-bathing" },
      { label: "Herping Walks", href: "/workshops/herping-walks" },
    ],
  },
  {
    groupLabel: "Arts & Crafts",
    items: [
      { label: "Earthen Pottery", href: "/workshops/earthen-pottery" },
      { label: "Gond Art Workshops", href: "/workshops/gond-art-workshops" },
      { label: "Bamboo & Lantana Crafting", href: "/workshops/bamboo-and-lantana-crafting" },
      { label: "Leaf Plate Making", href: "/workshops/leaf-plate-making" },
    ],
  },
  {
    groupLabel: "Knowledge & Learning",
    items: [
      { label: "Food Foraging Trails", href: "/workshops/food-foraging-trails" },
      { label: "Art of Regeneration", href: "/workshops/the-art-of-regeneration" },
      { label: "Grassroots Governance", href: "/workshops/grassroots-governance-and-local-democracy" },
      { label: "Nature's Pharmacy", href: "/workshops/natures-pharmacy" },
      { label: "Build With Mud", href: "/workshops/build-with-mud" },
    ],
  },
];
```

### Desktop Nav — Mega Menu for Workshops

On desktop, render workshops in a 3-column mega dropdown:

```tsx
// Inside your desktop dropdown component for Workshops
<div className="grid grid-cols-3 gap-6 p-6 min-w-[600px]">
  {workshopGroups.map((group) => (
    <div key={group.groupLabel}>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
        {group.groupLabel}
      </h4>
      <ul className="space-y-2">
        {group.items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-stone-700 hover:text-green-700 transition-colors">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>
```

### Social Icons in Header

Add social media icons to the right side of the header, before the Book CTA:

```tsx
// In your header component, before the CTA button
<div className="hidden lg:flex items-center gap-3 mr-4">
  <a href="https://www.instagram.com/surwahisocialecoestatekanha" target="_blank" rel="noopener noreferrer"
     className="text-stone-400 hover:text-green-700 transition-colors" aria-label="Instagram">
    <Instagram className="w-4 h-4" />
  </a>
  <a href="https://www.facebook.com/surwahisocialecoestatekanha/" target="_blank" rel="noopener noreferrer"
     className="text-stone-400 hover:text-green-700 transition-colors" aria-label="Facebook">
    <Facebook className="w-4 h-4" />
  </a>
  <a href="https://in.linkedin.com/company/surwahisocialecoestatekanha" target="_blank" rel="noopener noreferrer"
     className="text-stone-400 hover:text-green-700 transition-colors" aria-label="LinkedIn">
    <Linkedin className="w-4 h-4" />
  </a>
</div>
```

---

## 2. URL & Routing Changes

### New App Router File Structure

```
src/app/
├── page.tsx                                          # Home (existing, modify)
├── about/
│   ├── page.tsx                                      # About landing (NEW — optional, can redirect to /about/our-story)
│   ├── our-story/page.tsx                            # Move from /about-us/our-story
│   ├── the-lodge-and-philosophy/page.tsx              # Move from /about-us/the-lodge-and-philosophy
│   ├── why-surwahi/page.tsx                           # ★ NEW PAGE
│   ├── our-team/page.tsx                              # ★ NEW (consolidate /meet-the-dreamers)
│   └── our-residents/page.tsx                         # Move from /about-us/our-residents
├── stay/
│   ├── page.tsx                                       # ★ NEW — Accommodations landing (replaces /accommodations)
│   ├── suites/page.tsx                                # Move from /accommodations/suites
│   ├── mudhouses/page.tsx                             # ★ NEW or move existing dormitory content
│   ├── camping/page.tsx                               # ★ NEW (if camping offered)
│   ├── dining/page.tsx                                # Move from /about-us/dining-and-local-cuisine
│   └── fact-sheet/page.tsx                            # Move from /about-us/fact-sheet
├── experiences/
│   ├── page.tsx                                       # Existing landing (enhance)
│   ├── wildlife-safaris/page.tsx                      # Existing (enhance)
│   ├── guided-forest-trails/page.tsx                  # Existing (no change)
│   ├── bird-watching-expeditions/page.tsx             # Existing (no change)
│   ├── farm-life-visit/page.tsx                       # Existing (no change)
│   ├── know-your-crop/page.tsx                        # Existing (no change)
│   ├── play-at-surwahi/page.tsx                       # Existing (no change)
│   ├── outdoor-sports-and-nature-games/page.tsx       # Existing (no change)
│   ├── eco-volunteering-programs/page.tsx             # Existing (no change)
│   ├── cultural-immersion-and-local-life/page.tsx     # Existing (no change)
│   └── live-tribal-cooking-experiences/page.tsx       # Existing (no change)
├── workshops/
│   ├── page.tsx                                       # Existing landing (enhance with grouping)
│   ├── star-gazing-nights/page.tsx                    # Existing (no URL change)
│   ├── astro-photography/page.tsx                     # ...
│   ├── earthen-pottery/page.tsx
│   ├── gond-art-workshops/page.tsx
│   ├── bamboo-and-lantana-crafting/page.tsx
│   ├── forest-bathing/page.tsx
│   ├── leaf-plate-making/page.tsx
│   ├── food-foraging-trails/page.tsx
│   ├── herping-walks/page.tsx
│   ├── the-art-of-regeneration/page.tsx
│   ├── grassroots-governance-and-local-democracy/page.tsx
│   ├── natures-pharmacy/page.tsx
│   └── build-with-mud/page.tsx
├── sustainability/
│   ├── page.tsx                                       # ENHANCE — add landing overview with metrics
│   ├── evapo-transpiration-toilets/page.tsx           # Existing (no change)
│   ├── tree-census-and-biodiversity-reports/page.tsx  # Existing (no change)
│   ├── eco-friendly-construction-practices/page.tsx   # Existing (no change)
│   └── sustainable-development-goals-alignment/page.tsx # Existing (no change)
├── plan-your-visit/
│   ├── page.tsx                                       # ★ NEW — Landing page
│   ├── getting-here/page.tsx                          # ★ NEW
│   ├── best-time-to-visit/page.tsx                    # ★ NEW
│   ├── itineraries/page.tsx                           # Move from /itineraries
│   ├── safari-booking-guide/page.tsx                  # ★ NEW
│   └── faqs/page.tsx                                  # ★ NEW
├── stories/
│   ├── page.tsx                                       # ★ NEW — Landing page
│   ├── blog/
│   │   ├── page.tsx                                   # Move from /blogs (add category filters)
│   │   └── [slug]/page.tsx                            # Individual blog posts
│   ├── guest-reviews/page.tsx                         # ★ NEW
│   ├── awards/page.tsx                                # Move from /praises/awards-and-accolades
│   └── press/page.tsx                                 # Move from /praises/press-mentions-and-recognitions
├── gallery/page.tsx                                   # Existing (enhance)
├── contact/page.tsx                                   # Existing (enhance)
├── privacy/page.tsx                                   # Existing (no change)
├── terms/page.tsx                                     # Existing (no change)
├── cancellation/page.tsx                              # Existing (no change)
├── house-rules/page.tsx                               # Existing (no change)
├── accessibility/page.tsx                             # Existing (no change)
└── sitemap.xml/route.ts                               # Dynamic sitemap generator
```

**Total new pages to build: 11**
**Total pages moved/restructured: 8**
**Total pages enhanced in-place: ~8**
**Total pages untouched: ~27**

---

## 3. 301 Redirects

### Implementation in `next.config.js`

```javascript
// next.config.js (or next.config.ts)
module.exports = {
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
      {
        source: "/praises/awards-and-accolades",
        destination: "/stories/awards",
        permanent: true,
      },
      {
        source: "/praises/press-mentions-and-recognitions",
        destination: "/stories/press",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/stories/blog",
        permanent: true,
      },
      {
        source: "/blogs/:slug*",
        destination: "/stories/blog/:slug*",
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
      {
        source: "/kanha-national-park",
        destination: "/plan-your-visit/getting-here",
        permanent: true,
      },

      // ═══ Legacy Webflow pages (CRITICAL — these still get traffic) ═══
      {
        source: "/about-social-surwahi",
        destination: "/about/our-story",
        permanent: true,
      },
      {
        source: "/story-about-surwahi-social",
        destination: "/about/our-story",
        permanent: true,
      },
      {
        source: "/meet-the-dreamers",
        destination: "/about/our-team",
        permanent: true,
      },
      {
        source: "/surwahi-ecoestate-house-rules",
        destination: "/house-rules",
        permanent: true,
      },
      {
        source: "/surwahi-social/experiences-within-ssek",
        destination: "/experiences",
        permanent: true,
      },
      {
        source: "/surwahi-social/:slug*",
        destination: "/experiences",
        permanent: true,
      },
      {
        source: "/knowledge-hub",
        destination: "/stories/blog",
        permanent: true,
      },
    ];
  },
};
```

---

## 4. New Pages to Build

### Summary of all 11 new pages:

| # | Page | URL | Priority | Content Source |
|---|------|-----|----------|---------------|
| 1 | Why Surwahi | `/about/why-surwahi` | P0 — Week 1 | Write new |
| 2 | Our Team | `/about/our-team` | P1 — Week 2 | Consolidate /meet-the-dreamers |
| 3 | Stay Landing | `/stay` | P0 — Week 1 | Restructure /accommodations |
| 4 | Plan Your Visit Landing | `/plan-your-visit` | P1 — Week 3 | Write new |
| 5 | Getting Here | `/plan-your-visit/getting-here` | P0 — Week 3 | Write new (absorb /kanha-national-park) |
| 6 | Best Time to Visit | `/plan-your-visit/best-time-to-visit` | P1 — Week 3 | Write new |
| 7 | Safari Booking Guide | `/plan-your-visit/safari-booking-guide` | P1 — Week 4 | Write new |
| 8 | FAQs | `/plan-your-visit/faqs` | P0 — Week 2 | Compile from existing content |
| 9 | Stories Landing | `/stories` | P2 — Week 5 | Write new |
| 10 | Guest Reviews | `/stories/guest-reviews` | P1 — Week 5 | Aggregate from itineraries + Google |
| 11 | Sustainability Landing | `/sustainability` (enhance) | P1 — Week 4 | Enhance existing |

---

## 5. Home Page Overhaul

### Current Home Page Issues:
1. "About Surwahi" section's CTA ("Know Our Story") incorrectly links to `/sustainability` instead of `/about/our-story`
2. No "Why Surwahi" differentiation section
3. No itinerary/trip planning teaser
4. No testimonials/reviews section with star ratings
5. No structured FAQ accordion for schema capture
6. Awards section shows only 2 awards with no links
7. Newsletter section has no lead magnet incentive
8. Hero CTA says "Book Your Eco Stay" → should be consistent "Book Your Stay"
9. Remove emojis from section headings (🌱 🏡 🌍 etc.) — they look unprofessional and don't render consistently

### New Home Page Section Order:

Build these as individual components so they can be reordered easily:

```tsx
// src/app/page.tsx

import { HeroSection } from "@/components/home/HeroSection";
import { WhySurwahiStrip } from "@/components/home/WhySurwahiStrip";
import { AccommodationTeaser } from "@/components/home/AccommodationTeaser";
import { ExperiencesCarousel } from "@/components/home/ExperiencesCarousel";
import { SustainabilitySnapshot } from "@/components/home/SustainabilitySnapshot";
import { ItineraryPreviews } from "@/components/home/ItineraryPreviews";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { AwardsBar } from "@/components/home/AwardsBar";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero — full-bleed image, tagline, dual CTAs */}
      <HeroSection />

      {/* 2. Why Surwahi — 4 USP cards in a horizontal strip */}
      <WhySurwahiStrip />

      {/* 3. Accommodation teaser — room type cards with price indicators */}
      <AccommodationTeaser />

      {/* 4. Experiences carousel — top 6 experiences, swipeable */}
      <ExperiencesCarousel />

      {/* 5. Sustainability snapshot — impact metrics + CTA */}
      <SustainabilitySnapshot />

      {/* 6. Itinerary previews — 2-3 curated trip plans */}
      <ItineraryPreviews />

      {/* 7. Gallery teaser — masonry grid, 8 images */}
      <GalleryTeaser />

      {/* 8. Awards bar — logo strip */}
      <AwardsBar />

      {/* 9. Testimonials — 3 rotating reviews with star ratings */}
      <TestimonialsSection />

      {/* 10. Newsletter — email capture with lead magnet */}
      <NewsletterSignup />
    </main>
  );
}
```

### Section 1: Hero Section

```tsx
// src/components/home/HeroSection.tsx

export function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center">
      {/* Background image — use Next/Image with priority loading */}
      <Image
        src="https://ik.imagekit.io/adonisarun/WhatsApp%20Image%202025-10-24%20at%2019.36.22.jpeg"
        alt="Aerial view of Surwahi Social Ecoestate nestled in the forests near Kanha National Park"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Sustainable Luxury at the Edge of Kanha
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Award-winning eco lodge near Kanha Tiger Reserve. Immerse yourself in
          nature, tribal culture, and the art of regenerative living.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/stay"
            className="inline-flex items-center justify-center px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors text-lg"
          >
            Book Your Stay
          </Link>
          <Link
            href="/about/our-story"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/40 transition-colors text-lg"
          >
            Explore Our Story
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>
  );
}
```

### Section 2: Why Surwahi Strip (NEW)

This is the biggest missing piece on the current homepage — instant differentiation.

```tsx
// src/components/home/WhySurwahiStrip.tsx

const usps = [
  {
    icon: "Award",  // lucide-react icon name
    title: "Award-Winning",
    description: "John Wakefield Memorial Award 2024 by TOFT Tigers for Most Inspirational Eco Lodge",
  },
  {
    icon: "TreePine",
    title: "100% Eco-Built",
    description: "Mud walls, solar energy, rainwater harvesting — built with nature, not over it",
  },
  {
    icon: "MapPin",
    title: "Edge of Kanha",
    description: "Steps from Kanha Tiger Reserve — India's premier tiger habitat and biodiversity hotspot",
  },
  {
    icon: "Users",
    title: "Community-Driven",
    description: "Local artisans, tribal cooking, Gond art — tourism that empowers the village",
  },
];

export function WhySurwahiStrip() {
  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-stone-800 mb-4">
          Why Surwahi?
        </h2>
        <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
          What makes us different from every other lodge near Kanha
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp) => (
            <div key={usp.title} className="text-center">
              {/* Render lucide icon dynamically */}
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <DynamicIcon name={usp.icon} className="w-7 h-7 text-green-700" />
              </div>
              <h3 className="font-semibold text-lg text-stone-800 mb-2">{usp.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{usp.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/about/why-surwahi" className="text-green-700 font-medium hover:underline">
            Learn more about what makes us unique →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

### Section 9: Testimonials Section (NEW)

```tsx
// src/components/home/TestimonialsSection.tsx
// Pull real reviews from the itineraries page or Google reviews

const testimonials = [
  {
    name: "Guest Name",
    rating: 5,
    text: "My stay at Surwahi was incredible! The property perfectly blends nature, sustainability, and comfort. Ankit, the host, ensured everything was seamless.",
    source: "Google Reviews",
    date: "2024",
  },
  // Add 2 more
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-stone-800 mb-12">
          What Our Guests Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-stone-700 mb-4 italic">"{t.text}"</p>
              <div className="text-sm text-stone-500">
                <span className="font-medium text-stone-700">{t.name}</span>
                <span className="mx-2">·</span>
                <span>{t.source}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/stories/guest-reviews" className="text-green-700 font-medium hover:underline">
            Read all guest reviews →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

### Section 10: Newsletter with Lead Magnet

```tsx
// src/components/home/NewsletterSignup.tsx

export function NewsletterSignup() {
  return (
    <section className="py-16 bg-green-800 text-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Get Your Free Kanha Safari Planning Guide
        </h2>
        <p className="text-green-100 mb-8">
          Download our comprehensive guide to planning the perfect Kanha safari — best zones,
          timings, what to pack, and insider tips. Plus get seasonal offers and conservation updates.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            required
            className="flex-1 px-4 py-3 rounded-lg text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-green-400 outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-stone-900 font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            Get Free Guide
          </button>
        </form>
        <p className="text-xs text-green-200 mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
```

### Home Page SEO Metadata

```tsx
// src/app/page.tsx — metadata export

export const metadata: Metadata = {
  title: "Surwahi Eco Lodge Kanha | Sustainable Stay Near Kanha Tiger Reserve",
  description:
    "Award-winning eco lodge near Kanha National Park. Experience sustainable luxury, tribal culture, wildlife safaris, and regenerative living at Surwahi Social Ecoestate.",
  keywords: [
    "eco lodge Kanha",
    "sustainable stay Kanha National Park",
    "surwahi eco lodge",
    "eco friendly homestay Kanha Tiger Reserve",
    "best eco lodge near Kanha",
    "wildlife lodge Madhya Pradesh",
  ],
  openGraph: {
    title: "Surwahi Eco Lodge — Sustainable Luxury Near Kanha Tiger Reserve",
    description:
      "Award-winning eco lodge at the edge of Kanha National Park. Mud-built rooms, tribal experiences, wildlife safaris.",
    url: "https://www.surwahi.com",
    siteName: "Surwahi Social Ecoestate Kanha",
    images: [
      {
        url: "https://ik.imagekit.io/adonisarun/WhatsApp%20Image%202025-10-24%20at%2019.36.22.jpeg",
        width: 1200,
        height: 630,
        alt: "Aerial view of Surwahi Social Ecoestate near Kanha National Park",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surwahi Eco Lodge Kanha | Sustainable Stay",
    description: "Award-winning eco lodge near Kanha National Park.",
  },
  alternates: {
    canonical: "https://www.surwahi.com",
  },
};
```

---

## 6. About Section Restructure

### /about/why-surwahi — NEW PAGE (Priority: P0)

This is the highest-impact new page. It gives visitors a single, compelling answer to "why should I choose Surwahi over 50 other lodges near Kanha?"

**Content structure:**

```
Hero: "What Makes Surwahi Different"
Subhead: "We're not just a place to stay — we're a movement for sustainable tourism"

Section 1: TOFT Tigers Award Winner
- John Wakefield Memorial Award 2024
- What it means, why it matters
- Photo of award ceremony

Section 2: Built By and For the Community
- Local artisans built the lodge
- Staff are all from surrounding villages
- Revenue stays in the community
- Photos of local team

Section 3: 100% Eco-Constructed
- Mud walls, not concrete
- Solar-powered
- Rainwater harvesting
- Evapo-transpiration toilets
- Link → /sustainability

Section 4: At the Edge of Kanha
- Location advantage: steps from the buffer zone
- Banjar River bordering the property
- Private nature trails within the estate
- Link → /plan-your-visit/getting-here

Section 5: Immersive, Not Passive
- Not just a room — 23 curated experiences and workshops
- Tribal cooking, Gond art, forest bathing
- Link → /experiences + /workshops

Section 6: Comparison Table
- Table comparing Surwahi vs "Typical Luxury Lodge" vs "Budget Homestay"
- Columns: Sustainability, Community Impact, Experiences, Price Range, Location

CTA: "Ready to experience the difference?"
→ Book Your Stay | Explore Itineraries
```

**SEO targets:** `best eco lodge near Kanha`, `why surwahi eco lodge`, `award winning eco lodge India`, `TOFT certified lodge Kanha`

### /about/our-team — NEW PAGE (Priority: P1)

Consolidate the existing `/meet-the-dreamers` page content into the About section.

```
Hero: "The People Behind Surwahi"

Section 1: Founder Story
- Founder name, photo, vision statement
- Personal connection to Kanha and conservation

Section 2: The Team
- Grid of team members with photos, names, roles
- Include local staff — this reinforces the community narrative

Section 3: Community Partners
- Local villages, artisan groups, tribal communities
- How tourism revenue is distributed

CTA: Read Our Full Story → /about/our-story
```

### /about/our-story — MOVE from /about-us/our-story

Move existing content. Enhance with:
- Timeline/milestone visual showing the journey from vision to award
- Embedded video if available
- Cross-links to Lodge & Philosophy and Sustainability

### /about/our-residents — MOVE from /about-us/our-residents

Move existing content. Add:
- Downloadable species checklist PDF (lead magnet!)
- Seasonal sighting calendar
- Cross-link to Bird-watching Expeditions and Wildlife Safaris

---

## 7. Stay Section (New Top-Level)

### /stay — NEW Landing Page (Priority: P0)

This replaces `/accommodations` as the primary booking entry point.

```tsx
// src/app/stay/page.tsx

export const metadata: Metadata = {
  title: "Eco Accommodations Near Kanha | Suites, Mudhouses & Camping | Surwahi",
  description:
    "Stay in eco-friendly suites, traditional mudhouses, or under the stars near Kanha Tiger Reserve. Sustainable accommodation crafted from local materials.",
  alternates: { canonical: "https://www.surwahi.com/stay" },
};
```

**Page structure:**

```
Hero: Interior photo of best suite
H1: "Your Eco Stay at Surwahi"
Subhead: "Rooms crafted from mud, bamboo, stone — and love"

Room Comparison Grid:
┌──────────────────┬──────────────────┬──────────────────┐
│ Suites           │ Mudhouses & Dorm │ Camping & Tents  │
│ [Photo]          │ [Photo]          │ [Photo]          │
│ From ₹X,XXX/night│ From ₹X,XXX/night│ From ₹X,XXX/night│
│ 2 guests         │ 2-8 guests       │ 2 guests         │
│ Private bathroom  │ Shared/Private   │ Shared facilities │
│ Forest view       │ Courtyard        │ Under the stars  │
│ [Book This →]    │ [Book This →]    │ [Book This →]    │
└──────────────────┴──────────────────┴──────────────────┘

Section: What's Included
- Organic meals (link to /stay/dining)
- Nature trails access
- Stargazing from watchtower
- Yoga well access
- Common areas (Satkone)

Section: Amenities & Facilities
- Grid/icons: Solar power, Natural ventilation, Hot water, etc.

Section: Dining Preview
- 2-3 food photos
- "Experience tribal cuisine and farm-to-table meals"
- Link → /stay/dining

CTA: Can't decide? See our curated itineraries → /plan-your-visit/itineraries
CTA: Download our Fact Sheet → /stay/fact-sheet
```

### /stay/dining — MOVE from /about-us/dining-and-local-cuisine

Move existing content. Enhance with:
- Sample menu (seasonal)
- Dietary accommodation notes (vegetarian, vegan, Jain options)
- Photos of food preparation, tribal cooking
- Cross-link to Live Tribal Cooking Experiences

### /stay/fact-sheet — MOVE from /about-us/fact-sheet

Move existing content. Add:
- Downloadable PDF version (for travel agents and group planners)
- Quick-reference format: check-in/check-out times, policies, what's included

---

## 8. Experiences Section Enhancement

### /experiences — Landing Page Enhancement

Currently lists all 10 experiences. Enhance by grouping them visually:

```tsx
// Group experiences for the landing page display
const experienceGroups = [
  {
    category: "Wildlife & Nature",
    description: "Get closer to the wild heart of Kanha",
    items: [
      { slug: "wildlife-safaris", title: "Wildlife Safaris", tagline: "Track tigers in their natural habitat" },
      { slug: "guided-forest-trails", title: "Guided Forest Trails", tagline: "Walk through sal and bamboo forests" },
      { slug: "bird-watching-expeditions", title: "Bird-watching Expeditions", tagline: "Spot 300+ species around Kanha" },
    ],
  },
  {
    category: "Farm & Food",
    description: "Taste the land, learn from the soil",
    items: [
      { slug: "farm-life-visit", title: "Farm Life Visit", tagline: "Experience rural life firsthand" },
      { slug: "know-your-crop", title: "Know Your Crop", tagline: "Agri-learning walks through fields" },
      { slug: "live-tribal-cooking-experiences", title: "Live Tribal Cooking", tagline: "Cook with Gond and Baiga communities" },
    ],
  },
  {
    category: "Culture & Community",
    description: "Connect with indigenous traditions",
    items: [
      { slug: "cultural-immersion-and-local-life", title: "Cultural Immersion", tagline: "Live the local way" },
      { slug: "eco-volunteering-programs", title: "Eco Volunteering", tagline: "Give back to the community" },
    ],
  },
  {
    category: "Family & Adventure",
    description: "Fun for every age",
    items: [
      { slug: "play-at-surwahi", title: "Play @ Surwahi", tagline: "Family & kids adventure zone" },
      { slug: "outdoor-sports-and-nature-games", title: "Outdoor Sports", tagline: "Games in the great outdoors" },
    ],
  },
];
```

### Individual Experience Page Enhancement Template

Add these fields to every experience page (create a shared layout/component):

```tsx
// src/components/experiences/ExperiencePageTemplate.tsx

interface ExperiencePageProps {
  title: string;
  heroImage: string;
  description: string;        // Main content
  // NEW metadata fields:
  duration: string;            // e.g., "2-3 hours"
  difficulty: string;          // "Easy" | "Moderate" | "Challenging"
  bestSeason: string;          // e.g., "October–June"
  groupSize: string;           // e.g., "2-12 people"
  ageGroup: string;            // e.g., "All ages" or "12+"
  whatToBring: string[];       // e.g., ["Comfortable walking shoes", "Binoculars", "Water bottle"]
  included: string[];          // e.g., ["Expert naturalist guide", "Refreshments"]
  // Cross-links:
  relatedExperiences: string[];  // slugs
  relatedWorkshops: string[];    // slugs
}
```

Each experience page should have:
- Quick info bar at top (duration, difficulty, best season, group size)
- Main descriptive content (existing)
- "What to Bring" checklist
- "What's Included" list
- Photo gallery (3-5 images)
- Related Experiences section (2-3 cards)
- Related Workshops section (1-2 cards)
- Booking/Enquiry CTA
- Internal link to Accommodations: "After your experience, return to your eco-suite..."

---

## 9. Workshops Section Enhancement

Same template approach as Experiences. Each workshop page gets:

```tsx
interface WorkshopPageProps {
  title: string;
  heroImage: string;
  description: string;
  duration: string;            // e.g., "90 minutes"
  ageGroup: string;            // e.g., "8+ years"
  groupSize: string;           // e.g., "4-15 people"
  materialsProvided: string[]; // e.g., ["Clay", "Potter's wheel", "Glazing tools"]
  seasonalAvailability: string; // e.g., "Year-round" or "October–March"
  skillLevel: string;          // "Beginner-friendly" | "Intermediate"
  relatedExperiences: string[];
  relatedWorkshops: string[];
}
```

### Workshops Landing Page — Grouped Layout

```tsx
// src/app/workshops/page.tsx
// Render 3 groups with visual section dividers

<section className="py-20">
  <h1>Workshops & Learning at Surwahi</h1>
  <p>Hands-on workshops taught by local artisans, naturalists, and community leaders</p>

  {workshopGroups.map((group) => (
    <div key={group.groupLabel} className="mb-16">
      <h2 className="text-2xl font-bold text-green-800 mb-2">{group.groupLabel}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {group.items.map((workshop) => (
          <WorkshopCard key={workshop.href} {...workshop} />
        ))}
      </div>
    </div>
  ))}
</section>
```

---

## 10. Sustainability Section Enhancement

### /sustainability — Enhanced Landing Page

Currently exists but needs an overview/metrics section before linking to sub-pages.

**Add at the top of the existing page:**

```tsx
// Impact metrics section
const impactMetrics = [
  { number: "500+", label: "Trees in Census", icon: "TreePine" },
  { number: "100%", label: "Solar Powered", icon: "Sun" },
  { number: "Zero", label: "Waste to Landfill", icon: "Recycle" },
  { number: "30+", label: "Local Jobs Created", icon: "Users" },
  { number: "4", label: "UN SDGs Aligned", icon: "Globe" },
];

// Render as a hero metrics bar
<section className="py-16 bg-green-800 text-white">
  <h1 className="text-center text-3xl font-bold mb-4">Sustainability at Surwahi</h1>
  <p className="text-center text-green-100 mb-12 max-w-2xl mx-auto">
    Sustainability isn't a feature — it's our foundation. Every decision at Surwahi
    is made with the earth, the community, and future generations in mind.
  </p>
  <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
    {impactMetrics.map((m) => (
      <div key={m.label} className="text-center">
        <div className="text-4xl font-bold mb-1">{m.number}</div>
        <div className="text-sm text-green-200">{m.label}</div>
      </div>
    ))}
  </div>
</section>
```

Then below, card links to each of the 4 sub-pages (ETT, Tree Census, Eco Construction, SDGs).

---

## 11. Plan Your Visit (Entirely New Section)

### /plan-your-visit — Landing Page

```
Hero: Scenic road/path photo leading to Surwahi
H1: "Plan Your Visit to Surwahi"
Subhead: "Everything you need to know before your eco-escape"

Quick Links Grid (5 cards):
├── Getting Here → /plan-your-visit/getting-here
│   Icon: MapPin | "Airports, trains, roads & pickup service"
├── Best Time to Visit → /plan-your-visit/best-time-to-visit
│   Icon: Calendar | "Season guide & weather expectations"
├── Curated Itineraries → /plan-your-visit/itineraries
│   Icon: Route | "Weekend, 5-day, and festive trip plans"
├── Safari Booking Guide → /plan-your-visit/safari-booking-guide
│   Icon: Binoculars | "Zones, timings, costs & permits"
└── FAQs → /plan-your-visit/faqs
    Icon: HelpCircle | "Common questions answered"

CTA: Ready to book? → /stay
CTA: Need help planning? → /contact (or WhatsApp)
```

### /plan-your-visit/getting-here — NEW PAGE (Priority: P0)

This is the single most important missing page. People searching "how to reach Kanha" need this.

```markdown
# How to Reach Surwahi Eco Lodge, Kanha

## By Air
- **Jabalpur Airport (JLR)** — 160 km / ~3.5 hours drive
  - Flights from Delhi, Mumbai, Bangalore, Hyderabad
  - Airlines: IndiGo, SpiceJet, Air India
- **Nagpur Airport (NAG)** — 270 km / ~5.5 hours drive
  - Better connectivity for South India travelers
  - Airlines: IndiGo, SpiceJet, Air India, Vistara

## By Train
- **Jabalpur Junction** — Main railhead, well connected to all major cities
- **Gondia Junction** — Alternative for travelers from Nagpur/South
- **Balaghat Station** — Nearest small station (limited trains)

## By Road
| From | Distance | Drive Time | Route |
|------|----------|------------|-------|
| Jabalpur | 160 km | 3.5 hrs | NH30 via Mandla |
| Nagpur | 270 km | 5.5 hrs | NH44 → NH30 |
| Bhopal | 480 km | 9 hrs | NH46 → NH30 |
| Delhi | 1050 km | 16 hrs | NH44 via Jabalpur |
| Mumbai | 1100 km | 18 hrs | NH48 → NH44 via Nagpur |

## Surwahi Pickup Service
We offer pickup and drop from Jabalpur Airport/Station.
- **Jabalpur:** ₹X,XXX one way
- **Advance booking required:** Contact us at +91 77952 07779

## Exact Location
Surwahi Social, Village Surwahi, P.O Majgaon,
Tehsil Paraswada, District Balaghat,
Madhya Pradesh – 481111

[Embed Google Maps iframe here]

## Last Mile
The final stretch from Kanha village to Surwahi is an unpaved forest road.
We recommend arriving before sunset for the best experience.
```

**SEO metadata:**

```tsx
export const metadata: Metadata = {
  title: "How to Reach Surwahi Eco Lodge Near Kanha National Park",
  description:
    "Directions to Surwahi from Jabalpur, Nagpur, Bhopal & Delhi. Nearest airports, train stations, road routes, and pickup service to our eco lodge near Kanha Tiger Reserve.",
  alternates: { canonical: "https://www.surwahi.com/plan-your-visit/getting-here" },
};
```

### /plan-your-visit/best-time-to-visit — NEW PAGE

```markdown
# Best Time to Visit Surwahi & Kanha National Park

## Quick Summary
- **Best overall:** October–March (cool, dry, excellent wildlife sighting)
- **Peak tiger sighting:** March–May (animals come to waterholes)
- **Park closed:** July 1 – October 15 (monsoon season)
- **Surwahi open:** Year-round (estate activities available even when park is closed)

## Month-by-Month Guide

| Month | Temp (°C) | Safari | Highlights |
|-------|-----------|--------|------------|
| Oct | 20-30 | ✅ Opens mid-Oct | Lush green, fewer crowds, fresh after monsoon |
| Nov | 15-28 | ✅ | Pleasant weather, good sighting, Diwali special itinerary |
| Dec | 8-25 | ✅ | Peak tourist season, cold mornings, excellent safaris |
| Jan | 5-22 | ✅ | Coldest month, misty mornings, bird watching at best |
| Feb | 10-28 | ✅ | Warming up, sal trees in bloom, great photography |
| Mar | 15-35 | ✅ | Holi festival, trees shedding, tiger sighting improves |
| Apr | 22-40 | ✅ | Hot days, best tiger sighting, waterholes active |
| May | 28-42 | ✅ | Hottest, water scarcity brings animals to open areas |
| Jun | 30-40 | ⚠️ Closes end June | Last chance before monsoon |
| Jul | 25-35 | ❌ Closed | Monsoon, heavy rains, park closed |
| Aug | 24-33 | ❌ Closed | Peak monsoon |
| Sep | 23-32 | ❌ Closed | Rains easing, park still closed |

## What to Pack
- **Oct–Feb:** Light layers, warm jacket for morning safaris, comfortable shoes
- **Mar–Jun:** Light cotton clothes, hat, sunscreen, plenty of water
- **Year-round:** Binoculars, camera with zoom lens, insect repellent, neutral-colored clothing for safaris

## Festivals at Surwahi
- **Holi (March):** Special itinerary with tribal celebrations
- **Diwali (Oct/Nov):** Lantern-lit evenings, rangoli workshops
- **New Year:** Bonfire celebrations under the stars
```

### /plan-your-visit/safari-booking-guide — NEW PAGE

```markdown
# Kanha Safari Booking Guide

## Safari Zones
Kanha has multiple entry gates/zones:
- **Khatia Gate** (most popular, closest to Surwahi)
- **Mukki Gate** (southern entrance)
- **Sarhi Gate** (buffer zone)
- **Khapa Gate** (buffer zone)

## Safari Timings (2024-25 Season)

| Season | Morning Safari | Afternoon Safari |
|--------|---------------|-----------------|
| Oct 16 – Nov 15 | 6:00 AM – 11:00 AM | 2:30 PM – 5:30 PM |
| Nov 16 – Feb 15 | 6:30 AM – 11:00 AM | 2:00 PM – 5:30 PM |
| Feb 16 – Mar 31 | 5:30 AM – 11:00 AM | 2:30 PM – 6:00 PM |
| Apr 1 – Jun 30 | 5:00 AM – 10:30 AM | 3:00 PM – 6:30 PM |

*Note: Timings may change. Verify on the official MP Forest Department website.*

## How to Book
1. **Online:** Through the MP Forest Department portal (mponline.gov.in)
2. **Through Surwahi:** We can arrange safari permits for our guests (advance booking recommended)
3. **On-site:** Limited availability at the gate — not recommended for peak season

## Safari Costs (Approximate)

| Vehicle Type | Zone | Indian Tourist | Foreign Tourist |
|-------------|------|---------------|-----------------|
| Gypsy (6-seater) | Core | ₹X,XXX per vehicle | ₹X,XXX per vehicle |
| Canter (20-seater) | Core | ₹XXX per person | ₹X,XXX per person |
| Gypsy | Buffer | ₹X,XXX per vehicle | ₹X,XXX per vehicle |

*Prices include vehicle, driver, guide, and park entry. Prices updated for current season.*

## Tips for a Great Safari
- Book morning safaris for best tiger sighting chances
- Wear neutral colors (olive, khaki, brown) — avoid bright colors
- Carry binoculars and a camera with 200mm+ lens
- Stay quiet and patient — wildlife rewards the calm
- Listen to your naturalist guide — they know the forest intimately
- Never litter or use flash photography

## Surwahi's Safari Advantage
We're located just X km from the Khatia gate. Our in-house naturalists can arrange:
- Expert naturalist-accompanied safaris
- Pre-dawn pickup for morning safaris
- Post-safari debriefs with tea and snacks
- Multi-day safari packages with room + meals + permits

CTA: Book a Safari Package → Contact us
```

### /plan-your-visit/faqs — NEW PAGE (Priority: P0)

**CRITICAL for SEO — add FAQPage schema (see Section 16)**

```tsx
// src/app/plan-your-visit/faqs/page.tsx

// FAQ data structure
interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // ─── Booking & Payments ───
  {
    category: "Booking & Payments",
    question: "How do I book a stay at Surwahi?",
    answer: "You can book directly through our website or contact us via WhatsApp at +91 77952 07779 or email contact@surwahi.com. We recommend booking at least 2 weeks in advance during peak season (November–March).",
  },
  {
    category: "Booking & Payments",
    question: "What is the cancellation policy?",
    answer: "Please refer to our detailed cancellation policy page. Generally, cancellations made 15+ days before check-in receive a full refund. See /cancellation for complete details.",
  },
  {
    category: "Booking & Payments",
    question: "What payment methods do you accept?",
    answer: "We accept UPI, bank transfers, credit/debit cards, and cash on arrival. A 50% advance is required at the time of booking.",
  },

  // ─── Getting Here ───
  {
    category: "Getting Here",
    question: "What is the nearest airport to Surwahi?",
    answer: "Jabalpur Airport (JLR) is the nearest at ~160 km / 3.5 hours by road. Nagpur Airport (NAG) is an alternative at ~270 km / 5.5 hours. We offer pickup services from both airports.",
  },
  {
    category: "Getting Here",
    question: "Do you provide pickup from the airport or train station?",
    answer: "Yes, we arrange pickup and drop from Jabalpur Airport/Station. Please book in advance. The cost is approximately ₹X,XXX one way.",
  },
  {
    category: "Getting Here",
    question: "Is the road to Surwahi suitable for regular cars?",
    answer: "Yes, the main road to Kanha is well-maintained. The last stretch is an unpaved forest road but is accessible by all vehicle types. We recommend arriving before sunset.",
  },

  // ─── Safari & Wildlife ───
  {
    category: "Safari & Wildlife",
    question: "Can you arrange safari permits for us?",
    answer: "Yes, we can arrange Kanha safari permits for our in-house guests. We recommend informing us at least 1 week in advance, especially during peak season when permits sell out quickly.",
  },
  {
    category: "Safari & Wildlife",
    question: "What wildlife can I expect to see?",
    answer: "Kanha is home to Bengal tigers, leopards, wild dogs (dhole), barasingha (hard ground swamp deer), gaur (Indian bison), sloth bears, and 300+ bird species. Tiger sightings are most common in March–May.",
  },
  {
    category: "Safari & Wildlife",
    question: "Is Kanha National Park open year-round?",
    answer: "No. Kanha closes during monsoon from July 1 to October 15 approximately. However, Surwahi estate remains open year-round with estate-based activities and workshops available even when the park is closed.",
  },

  // ─── Accommodation ───
  {
    category: "Accommodation",
    question: "What types of rooms are available?",
    answer: "We offer eco-built suites with forest views, traditional mudhouses and dormitories for groups, and (seasonal) camping options. All rooms feature natural ventilation, solar-powered amenities, and organic toiletries.",
  },
  {
    category: "Accommodation",
    question: "Is WiFi available?",
    answer: "Limited WiFi is available in common areas. We encourage guests to disconnect and enjoy the natural surroundings. If you need reliable connectivity for work, please let us know in advance.",
  },
  {
    category: "Accommodation",
    question: "Do rooms have air conditioning?",
    answer: "No. Our mud-built architecture is naturally climate-responsive — rooms stay cool in summer and warm in winter. Fans and cross-ventilation are provided in all rooms.",
  },

  // ─── Food & Dietary ───
  {
    category: "Food & Dietary",
    question: "What kind of food is served?",
    answer: "We serve organic, locally sourced meals featuring tribal and regional cuisine. Meals are primarily vegetarian with some non-vegetarian options available. Our farm-to-table approach means ingredients come from our own gardens and local farms.",
  },
  {
    category: "Food & Dietary",
    question: "Can you accommodate dietary restrictions?",
    answer: "Yes. We can accommodate vegetarian, vegan, Jain, gluten-free, and other dietary requirements. Please inform us at the time of booking so our kitchen can prepare accordingly.",
  },

  // ─── Children & Families ───
  {
    category: "Children & Families",
    question: "Is Surwahi suitable for children?",
    answer: "Absolutely! We have a dedicated Play @ Surwahi zone, family-friendly workshops (pottery, leaf plate making), and nature walks suitable for all ages. Children must be supervised at all times, especially near water bodies.",
  },
  {
    category: "Children & Families",
    question: "Is there a minimum age for safari?",
    answer: "Children above 5 years are generally allowed on safaris. Infants and toddlers may not be permitted in core zones. Buffer zone safaris are more flexible. Check with us for the latest park regulations.",
  },

  // ─── Sustainability ───
  {
    category: "Sustainability",
    question: "What makes Surwahi eco-friendly?",
    answer: "Everything — from our mud-built architecture and solar power to evapo-transpiration toilets, rainwater harvesting, organic farming, and zero-waste practices. We're certified by TOFT Tigers and aligned with 4 UN Sustainable Development Goals.",
  },
];

// Build the page with accordion UI and FAQ schema
```

**FAQ Accordion Component:**

```tsx
// src/components/FAQAccordion.tsx

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="border border-stone-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50 transition-colors"
            aria-expanded={openIndex === index}
          >
            <span className="font-medium text-stone-800 pr-4">{item.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-stone-400 transition-transform flex-shrink-0 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4 text-stone-600 leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## 12. Stories Section (Replaces Praises)

### /stories/guest-reviews — NEW PAGE

```tsx
// Aggregate reviews from Google, TripAdvisor, and direct submissions
// Include AggregateRating schema (see Section 16)

// Page structure:
// 1. Aggregate stats bar (X reviews, Y.Z average rating)
// 2. Filter by source (All | Google | TripAdvisor | Direct)
// 3. Grid of review cards with star ratings
// 4. CTA: "Share your experience" → links to Google review page
```

### /stories/blog — Enhanced from /blogs

Add category filtering:

```tsx
const blogCategories = [
  { slug: "wildlife-conservation", label: "Wildlife & Conservation" },
  { slug: "sustainable-living", label: "Sustainable Living" },
  { slug: "local-culture", label: "Local Culture & Tribes" },
  { slug: "travel-guides", label: "Travel Guides" },
  { slug: "guest-stories", label: "Guest Stories" },
];

// URL pattern: /stories/blog?category=wildlife-conservation
// Or use route segments: /stories/blog/category/[slug]
```

---

## 13. Gallery Enhancement

Current gallery is a single page. Enhance with:

```tsx
// Category tabs/filters
const galleryCategories = [
  "All",
  "The Estate",
  "Accommodations",
  "Experiences",
  "Workshops",
  "Wildlife",
  "Food",
  "People & Community",
];

// Masonry grid layout with lightbox
// Lazy-load images using Next/Image with blur placeholder
// Each image should have descriptive alt text for SEO
```

---

## 14. Contact Page Enhancement

Add to existing contact page:

```
- Google Maps embed (interactive)
- WhatsApp direct message button
- Contact form (Name, Email, Phone, Check-in Date, Check-out Date, Guests, Message)
- Quick links: "Looking for..." → Getting Here | FAQs | Book a Stay
```

---

## 15. Global Components

### 15.1 Floating WhatsApp Button

```tsx
// src/components/global/WhatsAppButton.tsx

export function WhatsAppButton() {
  const phone = "917795207779";
  const message = encodeURIComponent(
    "Hi, I'm interested in staying at Surwahi Eco Lodge. Can you help me plan my visit?"
  );
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp SVG icon */}
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// Add to src/app/layout.tsx:
// <WhatsAppButton />
```

### 15.2 Mobile Sticky Booking Bar

```tsx
// src/components/global/MobileBookingBar.tsx

export function MobileBookingBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 p-3 flex gap-3 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <Link
        href="/stay"
        className="flex-1 bg-green-700 hover:bg-green-800 text-white text-center py-3 rounded-lg font-semibold transition-colors"
      >
        Book Your Stay
      </Link>
      <a
        href="https://wa.me/917795207779"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
}

// Add to layout.tsx
// Also add pb-20 to main content on mobile to prevent content being hidden behind the bar
```

### 15.3 Breadcrumbs Component

```tsx
// src/components/global/Breadcrumbs.tsx

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm text-stone-500" itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link href="/" itemProp="item" className="hover:text-green-700">
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <ChevronRight className="w-3 h-3" />
            {item.href ? (
              <Link href={item.href} itemProp="item" className="hover:text-green-700">
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span itemProp="name" className="text-stone-800 font-medium">{item.label}</span>
            )}
            <meta itemProp="position" content={String(index + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

### 15.4 Cross-Link Section Component

Reusable "Related Content" section for experience/workshop pages:

```tsx
// src/components/global/RelatedContent.tsx

interface RelatedItem {
  title: string;
  href: string;
  image: string;
  tagline: string;
  type: "experience" | "workshop" | "stay";
}

export function RelatedContent({
  title = "You Might Also Like",
  items,
}: {
  title?: string;
  items: RelatedItem[];
}) {
  return (
    <section className="py-12 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-stone-800 mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-green-700 text-white text-xs px-2 py-1 rounded">
                    {item.type === "experience" ? "Experience" : item.type === "workshop" ? "Workshop" : "Stay"}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-stone-800 group-hover:text-green-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-500 mt-1">{item.tagline}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 15.5 Footer Update

Update the footer to reflect the new IA:

```tsx
const footerLinks = {
  explore: [
    { label: "Stay", href: "/stay" },
    { label: "Experiences", href: "/experiences" },
    { label: "Workshops", href: "/workshops" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/stories/blog" },
  ],
  about: [
    { label: "Our Story", href: "/about/our-story" },
    { label: "Why Surwahi", href: "/about/why-surwahi" },
    { label: "The Lodge & Philosophy", href: "/about/the-lodge-and-philosophy" },
    { label: "Our Team", href: "/about/our-team" },
    { label: "Press & Media", href: "/stories/press" },
    { label: "Awards", href: "/stories/awards" },
  ],
  planYourVisit: [
    { label: "Getting Here", href: "/plan-your-visit/getting-here" },
    { label: "Best Time to Visit", href: "/plan-your-visit/best-time-to-visit" },
    { label: "Safari Booking Guide", href: "/plan-your-visit/safari-booking-guide" },
    { label: "Itineraries", href: "/plan-your-visit/itineraries" },
    { label: "FAQs", href: "/plan-your-visit/faqs" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cancellation Policy", href: "/cancellation" },
    { label: "House Rules", href: "/house-rules" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};
```

---

## 16. Schema Markup (JSON-LD)

### 16.1 LodgingBusiness Schema — Home Page & Stay Pages

```tsx
// src/components/schema/LodgingBusinessSchema.tsx

export function LodgingBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Surwahi Social Ecoestate Kanha",
    alternateName: "SSEK",
    description:
      "Award-winning eco lodge near Kanha National Park offering sustainable accommodation, wildlife safaris, tribal experiences, and nature workshops.",
    url: "https://www.surwahi.com",
    telephone: "+917795207779",
    email: "contact@surwahi.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Village Surwahi, P.O Majgaon, Tehsil Paraswada",
      addressLocality: "Balaghat",
      addressRegion: "Madhya Pradesh",
      postalCode: "481111",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.0707,   // Verify exact coordinates
      longitude: 80.6100,  // Verify exact coordinates
    },
    image: "https://ik.imagekit.io/adonisarun/WhatsApp%20Image%202025-10-24%20at%2019.36.22.jpeg",
    priceRange: "₹₹",
    starRating: {
      "@type": "Rating",
      ratingValue: "4",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Solar Power", value: true },
      { "@type": "LocationFeatureSpecification", name: "Organic Meals", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wildlife Safaris", value: true },
      { "@type": "LocationFeatureSpecification", name: "Nature Workshops", value: true },
      { "@type": "LocationFeatureSpecification", name: "Yoga Space", value: true },
    ],
    award: [
      "John Wakefield Memorial Award 2024 — TOFT Tigers",
      "Certified Eco-Friendly Homestay — Madhya Pradesh Tourism Board",
    ],
    sameAs: [
      "https://www.instagram.com/surwahisocialecoestatekanha",
      "https://www.facebook.com/surwahisocialecoestatekanha/",
      "https://in.linkedin.com/company/surwahisocialecoestatekanha",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 16.2 FAQPage Schema — FAQs Page

```tsx
// src/components/schema/FAQSchema.tsx

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 16.3 Article/BlogPosting Schema — Blog Posts

```tsx
export function BlogPostSchema({
  title, description, datePublished, dateModified, author, image, url,
}: BlogPostSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Organization", name: author || "Surwahi Social Ecoestate" },
    publisher: {
      "@type": "Organization",
      name: "Surwahi Social Ecoestate Kanha",
      logo: { "@type": "ImageObject", url: "https://ik.imagekit.io/adonisarun/surwahi-logo.png" },
    },
    image,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
```

### 16.4 TouristAttraction Schema — Experience & Workshop Pages

```tsx
export function ExperienceSchema({ title, description, duration, image, url }: ExperienceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: title,
    description,
    image,
    url,
    isAccessibleForFree: false,
    touristType: ["Eco-tourist", "Nature lover", "Family"],
    availableLanguage: ["en", "hi"],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.0707,
      longitude: 80.6100,
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
```

---

## 17. SEO — Meta Tags, OG Tags, Sitemap

### 17.1 Dynamic Metadata Pattern

Create a centralized SEO config:

```tsx
// src/config/seo.ts

export const siteConfig = {
  name: "Surwahi Eco-Lodge",
  fullName: "Surwahi Social Ecoestate Kanha",
  url: "https://www.surwahi.com",
  description: "Award-winning eco lodge near Kanha National Park. Sustainable luxury, tribal experiences, wildlife safaris.",
  ogImage: "https://ik.imagekit.io/adonisarun/WhatsApp%20Image%202025-10-24%20at%2019.36.22.jpeg",
  phone: "+917795207779",
  email: "contact@surwahi.com",
};

// Page-level SEO mapping
export const pageSEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  "/": {
    title: "Surwahi Eco Lodge Kanha | Sustainable Stay Near Kanha Tiger Reserve",
    description: "Award-winning eco lodge near Kanha National Park. Experience sustainable luxury, tribal culture, wildlife safaris, and regenerative living.",
    keywords: ["eco lodge Kanha", "sustainable stay Kanha National Park", "surwahi eco lodge"],
  },
  "/about/why-surwahi": {
    title: "Why Surwahi | Best Eco Lodge Near Kanha National Park",
    description: "Discover what makes Surwahi the award-winning eco lodge near Kanha — 100% eco-built, community-driven, TOFT certified, at the edge of the tiger reserve.",
    keywords: ["best eco lodge Kanha", "why surwahi", "award winning eco lodge India"],
  },
  "/stay": {
    title: "Eco Accommodations | Suites, Mudhouses & Camping Near Kanha",
    description: "Stay in eco-friendly suites, traditional mudhouses, or under the stars near Kanha Tiger Reserve. Sustainable rooms crafted from mud, bamboo, and stone.",
    keywords: ["eco lodge accommodation Kanha", "mudhouse stay Kanha", "sustainable rooms Kanha National Park"],
  },
  "/stay/dining": {
    title: "Tribal Cuisine & Farm-to-Table Dining | Surwahi Eco Lodge Kanha",
    description: "Experience organic, locally-sourced tribal cuisine at Surwahi. Farm-to-table meals featuring Gond and Baiga recipes from Madhya Pradesh.",
    keywords: ["tribal food Kanha", "organic dining eco lodge", "local cuisine Madhya Pradesh"],
  },
  "/experiences/wildlife-safaris": {
    title: "Kanha Wildlife Safari | Tiger Safari from Surwahi Eco Lodge",
    description: "Book wildlife safaris in Kanha Tiger Reserve from Surwahi Eco Lodge. Morning and afternoon jeep safaris with expert naturalist guides.",
    keywords: ["Kanha wildlife safari", "tiger safari Kanha", "Kanha jeep safari booking"],
  },
  "/plan-your-visit/getting-here": {
    title: "How to Reach Surwahi Eco Lodge Near Kanha National Park",
    description: "Directions to Surwahi from Jabalpur, Nagpur, Delhi & Mumbai. Nearest airports, train stations, road routes and pickup service.",
    keywords: ["how to reach Kanha National Park", "nearest airport Kanha", "Jabalpur to Kanha distance"],
  },
  "/plan-your-visit/best-time-to-visit": {
    title: "Best Time to Visit Kanha National Park & Surwahi Eco Lodge",
    description: "Month-by-month guide to visiting Kanha. Safari season, weather, what to pack, and festival dates at Surwahi Eco Lodge.",
    keywords: ["best time visit Kanha", "Kanha park open months", "Kanha weather season guide"],
  },
  "/plan-your-visit/safari-booking-guide": {
    title: "Kanha Safari Booking Guide | Zones, Timings, Costs & Tips",
    description: "Complete guide to booking Kanha National Park safaris. Entry gates, morning/afternoon timings, permit costs, and insider tips from Surwahi.",
    keywords: ["Kanha safari booking", "Kanha safari cost", "Kanha safari zones timings"],
  },
  "/plan-your-visit/faqs": {
    title: "FAQs | Surwahi Eco Lodge Near Kanha National Park",
    description: "Frequently asked questions about staying at Surwahi — booking, getting here, safaris, food, families, sustainability and more.",
    keywords: ["Surwahi eco lodge FAQ", "Kanha lodge questions", "is Kanha safe for families"],
  },
  "/sustainability": {
    title: "Our Sustainability Practices | Surwahi Eco Lodge Kanha",
    description: "How Surwahi practices sustainable tourism — solar power, evapo-transpiration toilets, tree census, eco-construction, and UN SDG alignment.",
    keywords: ["sustainable tourism Kanha", "eco friendly lodge India", "green tourism Madhya Pradesh"],
  },
  // Add more pages as needed
};
```

### 17.2 Dynamic Sitemap Generator

```tsx
// src/app/sitemap.ts

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.surwahi.com";
  const now = new Date().toISOString();

  // Static pages
  const staticPages = [
    { url: "/", changeFrequency: "weekly" as const, priority: 1.0 },
    { url: "/about/our-story", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/about/the-lodge-and-philosophy", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/about/why-surwahi", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/about/our-team", changeFrequency: "monthly" as const, priority: 0.5 },
    { url: "/about/our-residents", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/stay", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/stay/suites", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/stay/mudhouses", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/stay/camping", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/stay/dining", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/stay/fact-sheet", changeFrequency: "monthly" as const, priority: 0.5 },
    // All 10 experience pages
    ...["wildlife-safaris", "guided-forest-trails", "bird-watching-expeditions",
        "farm-life-visit", "know-your-crop", "play-at-surwahi",
        "outdoor-sports-and-nature-games", "eco-volunteering-programs",
        "cultural-immersion-and-local-life", "live-tribal-cooking-experiences"
    ].map(slug => ({
      url: `/experiences/${slug}`, changeFrequency: "monthly" as const, priority: 0.7,
    })),
    // All 13 workshop pages
    ...["star-gazing-nights", "astro-photography", "earthen-pottery",
        "gond-art-workshops", "bamboo-and-lantana-crafting", "forest-bathing",
        "leaf-plate-making", "food-foraging-trails", "herping-walks",
        "the-art-of-regeneration", "grassroots-governance-and-local-democracy",
        "natures-pharmacy", "build-with-mud"
    ].map(slug => ({
      url: `/workshops/${slug}`, changeFrequency: "monthly" as const, priority: 0.6,
    })),
    // Sustainability
    { url: "/sustainability", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/sustainability/evapo-transpiration-toilets", changeFrequency: "yearly" as const, priority: 0.6 },
    { url: "/sustainability/tree-census-and-biodiversity-reports", changeFrequency: "yearly" as const, priority: 0.6 },
    { url: "/sustainability/eco-friendly-construction-practices", changeFrequency: "yearly" as const, priority: 0.6 },
    { url: "/sustainability/sustainable-development-goals-alignment", changeFrequency: "yearly" as const, priority: 0.6 },
    // Plan Your Visit
    { url: "/plan-your-visit", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/plan-your-visit/getting-here", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/plan-your-visit/best-time-to-visit", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/plan-your-visit/itineraries", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/plan-your-visit/safari-booking-guide", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/plan-your-visit/faqs", changeFrequency: "monthly" as const, priority: 0.7 },
    // Stories
    { url: "/stories/blog", changeFrequency: "weekly" as const, priority: 0.7 },
    { url: "/stories/guest-reviews", changeFrequency: "weekly" as const, priority: 0.6 },
    { url: "/stories/awards", changeFrequency: "yearly" as const, priority: 0.5 },
    { url: "/stories/press", changeFrequency: "yearly" as const, priority: 0.5 },
    // Other
    { url: "/gallery", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/contact", changeFrequency: "yearly" as const, priority: 0.5 },
  ];

  return staticPages.map(page => ({
    url: `${baseUrl}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // TODO: Also dynamically add blog post URLs from CMS
}
```

### 17.3 Robots.txt

```tsx
// src/app/robots.ts

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://www.surwahi.com/sitemap.xml",
  };
}
```

---

## 18. Performance & Core Web Vitals

### Targets
- LCP (Largest Contentful Paint): < 2.5 seconds
- CLS (Cumulative Layout Shift): < 0.1
- INP (Interaction to Next Paint): < 200ms

### Implementation Checklist

```
□ Hero images: Use Next/Image with priority={true} and sizes="100vw"
□ All images: Use ImageKit transformations for responsive sizes
   - Example: ?tr=w-800,q-80 for card images
   - Example: ?tr=w-1920,q-85 for hero images
□ Font loading: Use next/font with display: swap
□ Above-the-fold: No lazy loading for hero section
□ Below-the-fold: All other images use loading="lazy" (Next/Image default)
□ JS bundles: Ensure no client components in above-fold sections unless necessary
□ Prefetch: Add prefetch to primary nav links
□ Image dimensions: Always specify width and height to prevent CLS
□ Third-party scripts: Load WhatsApp widget, analytics after page load
   - Use next/script with strategy="lazyOnload" for non-critical scripts
```

```tsx
// Example: Optimized hero image
<Image
  src="https://ik.imagekit.io/adonisarun/hero-image.jpeg?tr=w-1920,q-85"
  alt="Aerial view of Surwahi Social Ecoestate near Kanha"
  fill
  priority
  sizes="100vw"
  className="object-cover"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQ..." // Generate tiny blur placeholder
/>
```

---

## 19. Analytics & Conversion Tracking

### Google Analytics 4 Events to Track

```typescript
// src/lib/analytics.ts

// Track these custom events:
export const trackEvent = (eventName: string, params?: Record<string, string>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};

// Key events:
// 1. CTA clicks
trackEvent("cta_click", { cta_location: "hero", cta_text: "Book Your Stay", page: "/" });
trackEvent("cta_click", { cta_location: "mobile_bar", cta_text: "Book Your Stay", page: "/experiences/wildlife-safaris" });

// 2. WhatsApp clicks
trackEvent("whatsapp_click", { page: "/stay/suites" });

// 3. Form submissions
trackEvent("form_submit", { form_type: "newsletter", page: "/" });
trackEvent("form_submit", { form_type: "contact", page: "/contact" });
trackEvent("form_submit", { form_type: "booking_enquiry", page: "/stay" });

// 4. Content engagement
trackEvent("faq_expand", { question: "How do I book a stay?", page: "/plan-your-visit/faqs" });
trackEvent("gallery_view", { category: "Wildlife", page: "/gallery" });
trackEvent("itinerary_download", { itinerary: "Weekend Escape", page: "/plan-your-visit/itineraries" });

// 5. Navigation patterns
trackEvent("nav_click", { section: "Plan Your Visit", item: "Getting Here" });
```

---

## 20. Content Checklist

### New Content to Write (by priority)

| Priority | Page | Content Needed | Word Count (est.) | Owner |
|----------|------|----------------|-------------------|-------|
| P0 | Why Surwahi | 5-7 USPs, comparison table, CTAs | 800-1000 | Content team |
| P0 | Getting Here | Transport options, directions, map, pickup info | 600-800 | Content team |
| P0 | FAQs | 15-20 Q&As across 6 categories | 2000-2500 | Content team |
| P0 | Stay Landing | Room comparison grid, amenities, pricing indicators | 500-700 | Content team |
| P1 | Best Time to Visit | Month-by-month guide, packing list, festival dates | 800-1000 | Content team |
| P1 | Safari Booking Guide | Zones, timings, costs, tips, booking process | 1000-1200 | Content team |
| P1 | Guest Reviews | Aggregate 10-15 reviews from Google/TA + direct | Curate existing | Content team |
| P1 | Our Team | Founder bio, 5-10 team profiles, community story | 600-800 | Content team |
| P2 | Plan Your Visit Landing | Overview text + links | 200-300 | Content team |
| P2 | Stories Landing | Overview text + links | 200-300 | Content team |
| P2 | Sustainability Landing | Impact metrics, overview narrative | 400-600 | Content team |

### Content Enhancement for Existing Pages

```
□ Every Experience page: Add duration, difficulty, best season, group size, what to bring
□ Every Workshop page: Add duration, age group, materials provided, seasonal availability
□ Every page: Add 2-3 internal cross-links to related pages (see Internal Linking Rules below)
□ All pages: Remove emoji from H2/H3 headings (🌱 🏡 🌍 🤝 🐅 📸 🏆 💚)
□ Home page: Fix "Know Our Story" link (currently goes to /sustainability, should go to /about/our-story)
□ Blog posts: Add category tags, author, reading time
□ Gallery: Add alt text to every image (descriptive, keyword-relevant)
```

### Internal Linking Rules

When writing or editing content, follow these cross-linking rules:

```
Experience page → mention 1-2 related Workshops → link to them
Experience page → mention returning to lodge → link to /stay
Workshop page → mention 1-2 related Experiences → link to them
Workshop page → mention accommodation → link to /stay
Stay page → mention safari/activities → link to /experiences
Stay page → mention getting here → link to /plan-your-visit/getting-here
Sustainability page → mention lodge design → link to /about/the-lodge-and-philosophy
Blog post → link to at least 2 service pages (experiences, workshops, or stay)
Getting Here → link to /plan-your-visit/itineraries and /stay
FAQ answers → link to the relevant service page for each answer
```

---

## 21. Implementation Phases & Priority

### Phase 1: Foundation (Week 1-2) — CRITICAL

```
□ Set up all 301 redirects in next.config.js
□ Restructure navigation component with new config
□ Create /stay route (move /accommodations content)
□ Create /about/why-surwahi page
□ Add WhatsApp floating button globally
□ Add mobile sticky booking bar
□ Fix homepage "Know Our Story" broken link
□ Remove emojis from section headings sitewide
□ Update footer links to new URL structure
```

### Phase 2: New Pages (Week 3-4)

```
□ Build /plan-your-visit section (all 5 pages)
□ Build /stories section (landing + guest reviews)
□ Build /about/our-team page
□ Add FAQ schema to FAQs page
□ Add breadcrumbs component to all sub-pages
□ Add LodgingBusiness schema to home page
□ Enhance sustainability landing page with metrics
```

### Phase 3: Enhancement (Week 5-6)

```
□ Add metadata template to all Experience pages (duration, difficulty, etc.)
□ Add metadata template to all Workshop pages
□ Group workshops on landing page (3-column layout)
□ Group experiences on landing page (4 categories)
□ Add RelatedContent cross-link sections to all experience/workshop pages
□ Enhance gallery with category filters
□ Add blog category architecture
```

### Phase 4: SEO & Performance (Week 7-8)

```
□ Implement pageSEO config for all pages
□ Generate dynamic sitemap
□ Add all schema types (FAQ, Article, TouristAttraction, Review)
□ Optimize all images with ImageKit transformations
□ Add blur placeholders for hero images
□ Set up GA4 custom events
□ Test Core Web Vitals on all key pages
□ Submit updated sitemap to Google Search Console
□ Request indexing for all new pages
```

### Phase 5: Content & Growth (Ongoing)

```
□ Write and publish 2-4 blog posts per month
□ Create seasonal landing pages (monsoon special, winter wildlife)
□ Build downloadable PDF assets (Kanha Safari Guide, Species Checklist)
□ Collect and add guest reviews monthly
□ Monitor Search Console for new keyword opportunities
□ Quarterly IA review based on analytics data
```

---

## Quick Reference: File Changes Summary

| Action | Count | Details |
|--------|-------|---------|
| New route files to create | 11 | why-surwahi, our-team, stay landing, plan-your-visit (5 pages), stories (2 pages), sustainability landing |
| Route files to move/rename | 8 | accommodations→stay, about-us→about, praises→stories, blogs→stories/blog, etc. |
| Route files to enhance | 8 | Home, experiences landing, workshops landing, sustainability landing, gallery, contact, individual exp/workshop templates |
| Global components to build | 5 | WhatsAppButton, MobileBookingBar, Breadcrumbs, RelatedContent, FAQAccordion |
| Config files to create/update | 4 | navigation.ts, seo.ts, next.config.js (redirects), sitemap.ts |
| Schema components to build | 4 | LodgingBusiness, FAQPage, BlogPosting, TouristAttraction |
| 301 redirects to configure | 22 | See Section 3 |
| Pages untouched (no changes) | ~27 | Individual experience, workshop, sustainability sub-pages, legal pages |

---

*End of implementation guide. This document should be kept alongside the codebase and updated as changes are deployed.*
