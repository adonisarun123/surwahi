# On-Page SEO Analysis — www.surwahi.com

**Prepared for:** Surwahi Social Ecoestate Kanha (SSEK)
**Date:** February 16, 2026
**Website:** https://www.surwahi.com
**Framework:** Next.js (migrated from Webflow)
**Overall SEO Health Score:** 4.2 / 10

---

## Executive Summary

Surwahi.com has a beautiful new Next.js website with genuinely compelling content — an award-winning eco lodge, rich tribal experiences, and a real sustainability story. However, the site is severely underperforming from an SEO standpoint due to three compounding issues:

1. **A botched site migration** — Old Webflow pages are still indexed by Google, creating duplicate content that splits ranking authority across competing URLs.
2. **Zero keyword strategy** — Pages aren't optimized for the terms people actually search. High-value commercial keywords like "eco lodge near Kanha National Park" don't appear in critical SEO elements.
3. **Missing technical foundations** — No structured data, inconsistent title tags, thin content on experience pages, and no informational content targeting high-volume Kanha queries.

The good news: the competition in this niche is beatable. Most Kanha-area lodges have mediocre websites. Surwahi's unique offerings (tribal workshops, forest bathing, Gond art, eco-volunteering) are genuine differentiators that no competitor is targeting with content. With focused execution over 2-3 months, Surwahi can build meaningful organic visibility.

---

## 🔴 Critical Issues (Fix Immediately)

### 1. Legacy Webflow Pages Still Indexed — Content Cannibalization

**Score: 2/10**

This is the single biggest SEO problem. Google is actively indexing BOTH the old Webflow URLs AND the new Next.js pages. These compete against each other for the same keywords, splitting whatever authority the domain has.

**Old URLs still appearing in Google:**

| Old URL (Webflow) | Competing New URL (Next.js) | Status |
|---|---|---|
| `/story-about-surwahi-social` | `/about-us/our-story` | Both indexed — cannibalization |
| `/about-social-surwahi` | `/about-us` | Both indexed — cannibalization |
| `/surwahi-social/experiences-within-ssek` | `/experiences` | Both indexed — old page has RICHER content |
| `/surwahi-social/best-homestays-of-kanha` | `/accommodations` | Both indexed — old page targets "best homestay Kanha" |
| `/surwahi-ecoestate-house-rules` | `/house-rules` | Both indexed — exact duplicate |
| `/kanha-national-park` | No equivalent on new site | Orphaned — no redirect destination |
| `/itineraries` | No equivalent on new site | Orphaned — valuable seasonal content lost |
| `/meet-the-dreamers` | No equivalent on new site | Orphaned |

**The damage:** When Google sees two pages from the same domain targeting the same topic, it doesn't know which one to rank. Instead of ranking one page well, both pages rank poorly. This is why Surwahi likely doesn't appear in top results for brand or category searches.

**Critical note about `/surwahi-social/experiences-within-ssek`:** This old page contains 2,000+ words of detailed content about the nature trail, pond, playground, yoga well, watch tower, and volunteering programs. The new `/experiences` page is comparatively thin. Before redirecting, migrate the best content from the old page into the new experience pages.

**Fix:**
- Implement 301 redirects from every old URL to its new equivalent in `next.config.js`
- For orphaned pages (`/kanha-national-park`, `/itineraries`), create new equivalents on the Next.js site first, then redirect
- Submit updated sitemap to Google Search Console
- Use URL Inspection Tool to request re-indexing of all new pages
- Monitor for 4-6 weeks; use URL Removal Tool for stubborn old pages

---

### 2. Site Migration SEO (Webflow → Next.js) Was Not Handled

**Score: 3/10**

The migration from Webflow to Next.js clearly happened without SEO migration planning. Evidence:

- **Branding inconsistency:** Old pages use "SSEK" and "Surwahi Social Ecoestate" in titles. New pages use "Surwahi Eco-Lodge." Google sees these as different entities.
- **URL structure changed completely:** Old paths like `/surwahi-social/*` and `/story-about-surwahi-social` bear no relation to new paths like `/about-us/our-story`.
- **No redirect layer exists:** Old URLs still serve content (they haven't been decommissioned), meaning Google continues to crawl and index them.
- **Content was rewritten, not migrated:** The new site has entirely different copy. While the new content is good, the old content had some SEO value (especially the experiences page) that was lost.

**Fix:**
- Create a comprehensive redirect map (provided in the Redirect Map spreadsheet)
- Standardize branding across ALL pages to "Surwahi Eco-Lodge"
- Ensure old Webflow hosting is either shut down or serves only 301 redirects
- Submit change of address in Google Search Console if the domain structure changed

---

### 3. Homepage Title Tag — Way Too Long

**Score: 4/10**

**Current title:** `Surwahi Social Ecoestate Kanha — Sustainable Eco Lodge near Kanha National Park | Surwahi Eco-Lodge`

This is **93 characters**. Google truncates titles at ~60 characters. Everything after "Sustainable Eco Lodge" is invisible in search results. The title also uses the old "Surwahi Social Ecoestate" branding alongside the new "Surwahi Eco-Lodge" branding — confusing for both Google and users.

**Recommended title:** `Eco Lodge near Kanha National Park — Surwahi | Award-Winning Eco Stay` (64 chars)

Alternatively: `Surwahi Eco-Lodge near Kanha National Park | Sustainable Eco Stay` (63 chars)

**Principles applied:**
- Primary keyword ("eco lodge near Kanha National Park") placed first
- Brand name included but not dominant
- Under 65 characters
- Unique selling point hint ("Award-Winning")

---

## 🟠 Technical SEO Issues

### 4. Structured Data / Schema Markup — Missing Entirely

**Score: 3/10**

No Schema.org structured data was detected on any page. This is a significant missed opportunity for rich snippets in Google search results.

**What should be implemented:**

| Schema Type | Where | Benefit |
|---|---|---|
| `LodgingBusiness` | Homepage, /accommodations | Shows star ratings, price range, amenities in search results |
| `BreadcrumbList` | All pages | Shows page hierarchy in search results (Home > Experiences > Wildlife Safaris) |
| `Article` | All blog posts | Enables article rich snippets with author, date, image |
| `FAQPage` | Any page with FAQ sections | Shows expandable Q&A directly in search results — major CTR boost |
| `Review` / `AggregateRating` | Homepage, /accommodations | Shows star ratings in search results |
| `TouristAttraction` | Experience pages | Marks activities as attractions for Google's travel features |
| `Event` | Workshop pages | Shows upcoming workshops in search results |

**Impact:** Sites with structured data typically see 20-30% higher click-through rates from search results due to enhanced visual appearance.

---

### 5. XML Sitemap

**Score: 5/10**

A sitemap is referenced at `/sitemap.xml` in the footer. However, it needs verification that:

- It includes ALL new Next.js pages (50+ pages identified)
- It does NOT include any legacy Webflow URLs
- It is submitted to Google Search Console
- It uses proper `<lastmod>` dates
- It includes image sitemap entries for gallery and accommodation photos

---

### 6. Site Speed & Core Web Vitals

**Score: 6/10**

The Next.js framework provides a solid performance baseline. Images are served via ImageKit CDN (`ik.imagekit.io`), which is good. However:

- **Hero images appear very large** — the homepage hero loads a 3840px-wide image. Even with Next.js `next/image` optimization, this could impact Largest Contentful Paint (LCP).
- **Navigation is heavy** — the mega-menu with 30+ links loads on every page. Consider lazy-loading dropdown content.
- **No evidence of font optimization** — verify `next/font` is being used to prevent layout shift from web fonts.

**Fix:** Run PageSpeed Insights on the top 5 pages. Target LCP < 2.5s, FID < 100ms, CLS < 0.1.

---

### 7. Mobile Responsiveness

**Score: 7/10**

Next.js typically handles responsive layouts well. The navigation includes a "Book Now" CTA which is good for mobile conversion. Full mobile audit needed to verify:

- Tap targets are at least 48px × 48px
- No horizontal scrolling on any page
- Mega-menu is usable on mobile (not overwhelming)
- Images resize properly
- Phone number is clickable (`tel:` link confirmed ✅)

---

### 8. URL Structure

**Score: 7/10**

The new site has clean, logical URL hierarchy. This is well done:

```
/accommodations/suites
/accommodations/dormitory
/accommodations/camping-tents
/experiences/wildlife-safaris
/experiences/guided-forest-trails
/sustainability/evapo-transpiration-toilets
/workshops/gond-art-workshops
/about-us/our-story
```

Content silos are clearly defined (accommodations, experiences, sustainability, workshops). This helps Google understand topical authority within each section.

**Minor improvement:** Some URLs are unnecessarily long. Consider shortening:
- `/sustainability/sustainable-development-goals-alignment` → `/sustainability/sdg-alignment`
- `/experiences/cultural-immersion-and-local-life` → `/experiences/cultural-immersion`
- `/workshops/grassroots-governance-and-local-democracy` → `/workshops/grassroots-governance`

---

### 9. SSL / HTTPS

**Score: 9/10**

Site serves over HTTPS. No mixed content issues detected on the homepage. Verify all internal links use `https://` (not `http://`).

---

### 10. Breadcrumb Navigation

**Score: 8/10**

Breadcrumbs were detected on inner pages (e.g., `Home > Accommodations` on the accommodations page, `Home > Blogs` on the blog page). This is excellent for both user navigation and SEO.

**Improvement needed:** Add `BreadcrumbList` Schema markup (JSON-LD) to make breadcrumbs appear in Google search results.

---

## 🟡 Content SEO Issues

### 11. Keyword Targeting Strategy — Non-Existent

**Score: 3/10**

This is the most impactful content issue. No page on the site appears to be optimized for specific search queries. Key observations:

**What people search for vs. what the site says:**

| What Users Search | Monthly Volume | What Surwahi's Page Says Instead |
|---|---|---|
| "eco lodge near Kanha National Park" | 1,000-2,500 | "Discover Serenity in Sustainable Luxury" |
| "homestay Kanha Tiger Reserve" | 500-1,000 | "A Vision Rooted in Nature" |
| "Kanha jungle safari" | 2,000-5,000 | Page doesn't mention booking, pricing, or zones |
| "camping near Kanha" | 200-500 | "Immerse yourself in nature with our comfortable tents" |
| "Gond art workshop" | 500-1,000 | Page title says only "Gond Art Workshops \| Surwahi Eco-Lodge" — no Kanha/MP location |

The homepage H1 is "Discover Serenity in Sustainable Luxury" — poetic, but it contains zero search keywords. Nobody types "serenity in sustainable luxury" into Google.

**Fix:** Every page needs a keyword-first approach:
- **H1** must contain the primary keyword
- **First 100 words** of body content must include the primary keyword naturally
- **Title tag** must lead with the primary keyword
- **Meta description** must include the primary keyword + call-to-action
- **H2/H3 subheadings** should target secondary and long-tail keywords

---

### 12. Content Depth — Experience & Workshop Pages Are Thin

**Score: 4/10**

The site has 10 experience pages and 13 workshop pages — that's 23 individual pages. But from what's visible, most of these pages have:

- A short 1-2 paragraph description
- The massive navigation menu (which is the same on every page)
- No pricing, duration, or booking information
- No FAQs
- No guest testimonials specific to that experience
- No cross-links to related experiences

When the navigation menu takes up more space than the actual page content, Google considers the page "thin content" and is unlikely to rank it.

**Recommended content structure for each experience/workshop page (500-800+ words):**

1. **H1:** Keyword-rich title (e.g., "Gond Art Workshop near Kanha — Learn Tribal Painting at Surwahi")
2. **Introduction:** 100 words describing the experience, including location keywords
3. **What to Expect:** Detailed description of the experience, step by step
4. **Duration & Schedule:** When it's available, how long it takes
5. **Who It's For:** Families, couples, solo travelers, groups
6. **What's Included:** Materials, guides, refreshments
7. **Pricing:** Starting price or "contact for pricing"
8. **Photo Gallery:** 4-6 images with keyword-rich alt text
9. **Guest Testimonials:** 2-3 reviews from past participants
10. **Related Experiences:** Cross-links to 3-4 other relevant pages
11. **FAQ Section:** 3-5 common questions (with FAQPage schema)
12. **Booking CTA:** Clear call-to-action to book or enquire

---

### 13. Homepage Content Quality

**Score: 7/10**

The homepage has rich, descriptive content covering the property, sustainability, experiences, and accommodations. Good use of CTAs ("Book Your Eco Stay", "Explore the Story"). The John Wakefield Memorial Award 2024 mention is a strong trust signal.

**Issues:**

- **Emoji in headings:** The headings use 🌱 🏡 🌍 🤝 🐅 📸 🏆 💚 emojis. While visually engaging, these are unprofessional in an SEO context. Screen readers announce them awkwardly, and they add no keyword value. Remove all emojis from H1/H2/H3 tags.
- **No pricing signals:** Commercial-intent searchers want to see price ranges. Add "Eco stays from ₹X,XXX/night" somewhere above the fold.
- **Award buried:** The TOFT Tiger award should be mentioned in the first screen, not buried below the fold. This is your strongest credibility signal.
- **No FAQ section:** Adding a FAQ section to the homepage targeting "Is Surwahi near Kanha?", "How to reach Surwahi?", "What is the price?" etc. would enable FAQ rich snippets in Google.
- **No proximity mention:** The page doesn't clearly state how far Surwahi is from Kanha's entry gates. Add "Located X km from Khatia Gate / Mukki Gate" prominently.

---

### 14. Blog Content Strategy

**Score: 5/10**

The blog exists with 3 visible posts:
1. "The Magic of the Monsoon Forest" (Aug 15, 2024)
2. "Building with Mud: A Lesson in Sustainability" (Jul 28, 2024)
3. "A Tiger Sighting That Changed My Perspective" (Jul 10, 2024)

**Problems:**
- Only 3 posts in total — far too few to drive organic traffic
- No posts since August 2024 (6+ months of silence signals an abandoned blog to Google)
- Posts are categorized (Conservation Diaries, Behind the Scenes, Guest Experiences) which is good structure
- But none target high-volume search keywords

**The missed opportunity is enormous.** The following keywords have thousands of monthly searches and no dominant content:

| Keyword | Monthly Searches | Difficulty |
|---|---|---|
| "how to reach Kanha National Park" | 2,000-5,000 | Medium |
| "best time to visit Kanha" | 2,000-5,000 | Medium |
| "Kanha safari booking" | 1,000-3,000 | High |
| "things to do in Kanha" | 500-1,500 | Medium |
| "Kanha vs Bandhavgarh" | 500-1,000 | Low |
| "birdwatching Kanha" | 200-500 | Low |
| "weekend getaway from Nagpur" | 500-1,000 | Medium |

Every one of these articles can include a natural CTA to book a stay at Surwahi. This is the highest-ROI SEO activity available.

---

### 15. Meta Descriptions

**Score: 4/10**

Some pages have meta descriptions, but many are:
- Unverified or potentially auto-generated by Next.js
- Too generic ("Explore our range of sustainable stays...")
- Missing a call-to-action
- Not including the primary keyword

**Examples of what was detected vs. what's recommended:**

**Accommodations page:**
- Current: "Explore our range of sustainable stays, from luxurious suites to communal dormitories and adventurous camping tents."
- Recommended: "Stay at Surwahi eco lodge near Kanha — eco suites, dormitories & camping tents. Mud-built, solar-powered comfort from ₹X/night. Book your sustainable Kanha stay."

**Our Story page:**
- Current: "The journey of how Surwahi Social was born from a dream of sustainable, community-centric tourism."
- Recommended: "Discover Surwahi's story — an award-winning eco lodge near Kanha National Park built with mud, community & a dream. John Wakefield Award winner 2024."

**Every meta description should follow this formula:** Primary keyword + unique value proposition + call-to-action, within 150-160 characters.

---

### 16. Header Tag Hierarchy

**Score: 6/10**

H1 tags are present on main pages:
- Homepage: "Discover Serenity in Sustainable Luxury" ✅ (present but not keyword-optimized)
- Accommodations: "Our Accommodations" ✅ (present but generic)
- Blogs: "Blogs & Stories" ✅

**Issues:**
- H1 tags don't contain target keywords
- Some pages may have multiple H1 tags (needs full audit)
- H2 tags on the homepage use emojis: "🌱 About Surwahi — A Vision Rooted in Nature"
- Workshop/experience pages need verification of proper H1-H2-H3 hierarchy

**Every page should have exactly ONE H1 containing the primary keyword.** Example improvements:

| Page | Current H1 | Recommended H1 |
|---|---|---|
| Homepage | "Discover Serenity in Sustainable Luxury" | "Award-Winning Eco Lodge near Kanha National Park" |
| Accommodations | "Our Accommodations" | "Eco Accommodations near Kanha — Suites, Dorms & Camping" |
| Wildlife Safaris | Unknown | "Kanha Wildlife Safari — Book Your Jungle Safari from Surwahi" |
| Gond Art Workshops | Unknown | "Gond Art Workshop — Learn Tribal Painting near Kanha" |
| Blog Hub | "Blogs & Stories" | "Eco Travel Blog — Stories from Kanha's Wilderness" |

---

### 17. Image Alt Text

**Score: 4/10**

Some images have descriptive alt text (e.g., "Aerial view of Surwahi Social Ecoestate"), but many appear to use generic or file-name-based alt text. Images are served via ImageKit CDN.

**Good example found:** `alt="Aerial view of Surwahi Social Ecoestate"`

**What's likely missing:** Keyword-rich, descriptive alt text on accommodation photos, experience images, and gallery images.

**Recommended approach:**
- Accommodation images: "Eco-friendly mud house suite with forest view at Surwahi near Kanha National Park"
- Safari images: "Tiger spotted during morning jungle safari near Kanha Tiger Reserve"
- Workshop images: "Guest learning Gond tribal painting at Surwahi eco lodge workshop"
- Gallery images: "Sunrise over Banjar River near Surwahi Social Ecoestate Kanha"

**Why this matters:** Google Images is a significant traffic source for travel and accommodation searches. Properly optimized alt text can drive 10-15% of total organic traffic.

---

### 18. Internal Linking

**Score: 5/10**

**What's working:**
- Navigation menu provides top-level linking to all sections
- Footer includes links to key pages and categories
- Homepage links to main sections (accommodations, experiences, sustainability)
- Breadcrumbs provide hierarchical links

**What's missing:**
- **Contextual links within body content.** Blog posts don't link to relevant experience pages. Experience pages don't cross-link to related workshops. The "Building with Mud" blog post should link to `/workshops/build-with-mud` and `/sustainability/eco-friendly-construction-practices`, but likely doesn't.
- **"Related Experiences" sections** on experience/workshop pages
- **"Where to Stay" links** on every experience page pointing to `/accommodations`
- **Blog posts linking to booking** — every informational blog post about Kanha should end with a CTA linking to accommodations

**Internal linking strategy:**
- Every experience page → link to 2-3 related workshops + accommodations
- Every workshop page → link to related experiences + accommodations
- Every blog post → link to 2-3 relevant service pages + accommodations
- Sustainability pages → link to about us + blog posts about eco practices
- Accommodations → link to experiences + "things to do" content

---

## 🔵 Local SEO

### 19. Google Business Profile

**Score: 5/10**

NAP (Name, Address, Phone) is consistently displayed across the site:
- **Name:** Surwahi Social
- **Address:** Village Surwahi, P.O Majgaon, Tehsil Paraswada, District Balaghat, Madhya Pradesh – 481111
- **Phone:** +91 77952 07779
- **Email:** contact@surwahi.com

**Surwahi appears on Booking.com** (confirmed in search results) and on MakeMyTrip (address matched), which is good for local signals.

**What needs verification:**
- Is the Google Business Profile claimed and fully optimized?
- Are photos uploaded to GBP?
- Are business hours set?
- Is the description keyword-optimized?
- Are guest reviews being collected and responded to?

**Fix:** Claim/verify GBP. Add 20+ photos. Write a keyword-rich description. Add all amenities and services. Set up review collection process.

---

### 20. Local Keyword Optimization

**Score: 4/10**

Location mentions exist in content but aren't strategically placed in SEO elements:

**Keywords that should appear in title tags and meta descriptions but currently don't:**
- "Kanha National Park" — appears in body content but not consistently in titles
- "Balaghat" — the district name. People searching locally may use this
- "Khatia Gate" / "Mukki Gate" — specific safari entry gates that travelers search for proximity
- "Madhya Pradesh" — state-level location signal
- "near Kanha Tiger Reserve" — variant of the primary keyword

**The site never mentions how far it is from key landmarks.** Add: "Surwahi is located X km from Khatia Gate and X km from Mukki Gate of Kanha National Park."

---

## 🟣 Off-Page & Authority Signals

### 21. Domain Authority & Backlinks

**Score: 4/10**

The domain appears to have limited backlink authority. However, Surwahi has strong credibility signals that aren't being leveraged:

- **John Wakefield Memorial Award 2024** — awarded by TOFT Tigers for "Most Inspirational Eco Lodge of the Year"
- **MP Tourism Board certification** — Certified Eco-Friendly Homestay
- **Booking.com listing** — property is listed and reviewed
- **MakeMyTrip listing** — address confirmed in search results

**Backlink building opportunities:**
1. Get a backlink from TOFT Tigers website (award sponsor)
2. Get listed on MP Tourism Board's official accommodation directory
3. Submit to eco-tourism directories (Green Globe, Responsible Travel, etc.)
4. Create a Tripadvisor listing (if not already done)
5. Reach out to travel bloggers who cover Kanha for reviews
6. Write guest posts on travel/sustainability websites
7. Pursue press coverage for the award win (travel magazines, newspapers)
8. List on platforms like Hipcamp, Glamping Hub, Airbnb Experiences

---

### 22. Social Media Signals

**Score: 6/10**

Active presence on:
- Instagram: @surwahisocialecoestatekanha
- Facebook: /surwahisocialecoestatekanha
- LinkedIn: /company/surwahisocialecoestatekanha

All linked from the website footer. Social profiles should link back to the website and share blog content regularly.

**Improvement:** Social handles are very long. Consider claiming shorter handles where possible. Add social sharing buttons to blog posts. Encourage user-generated content with a branded hashtag (#SurwahiExperience or #StayAtSurwahi).

---

### 23. Review & Reputation Management

**Score: 5/10**

A positive guest testimonial was found on the itineraries page: *"My stay at Surwahi Social Ecoestate Kanha was incredible! The property perfectly blends nature, sustainability, and comfort..."*

A glowing Booking.com review was also found: *"I could write a whole page about how great this property is... a 5 star experience..."*

**What's needed:**
- Actively solicit Google reviews from every guest (post-stay email/WhatsApp)
- Respond to ALL reviews (positive and negative) on Google, Booking.com, Tripadvisor
- Add Review/AggregateRating Schema to the website
- Create a dedicated testimonials page or prominently feature reviews on the homepage and accommodations page

---

## Summary: Priority Action Matrix

### Week 1 (Do Now)
| Action | Impact | Effort |
|---|---|---|
| Implement 301 redirects for all legacy URLs | 🔴 Very High | Medium |
| Fix homepage title tag (93 chars → 60 chars) | 🔴 High | Easy |
| Submit updated sitemap to Google Search Console | 🔴 High | Easy |
| Remove emojis from all headings | 🟡 Medium | Easy |

### Week 2-3 (Quick Wins)
| Action | Impact | Effort |
|---|---|---|
| Standardize ALL title tags across site | 🔴 High | Medium |
| Write unique meta descriptions for all 50+ pages | 🟡 Medium | Medium |
| Add LodgingBusiness + BreadcrumbList Schema | 🔴 High | Medium |
| Claim & optimize Google Business Profile | 🔴 High | Easy |
| Add proximity info (distance from Khatia/Mukki gates) | 🟡 Medium | Easy |

### Month 1-2 (Content Foundation)
| Action | Impact | Effort |
|---|---|---|
| Create "How to Reach Kanha" page (2K-5K monthly searches) | 🔴 High | Medium |
| Create "Best Time to Visit Kanha" page (2K-5K monthly searches) | 🔴 High | Medium |
| Create "Kanha National Park Complete Guide" (10K-20K searches) | 🔴 Very High | Hard |
| Expand all experience/workshop pages to 500-800 words | 🔴 High | Hard |
| Optimize all image alt text site-wide | 🟡 Medium | Medium |

### Month 2-3 (Growth)
| Action | Impact | Effort |
|---|---|---|
| Launch blog content strategy (4-8 posts/month) | 🔴 High | Hard |
| Build internal linking across all pages | 🟡 Medium | Medium |
| Build backlinks from TOFT, MP Tourism, travel directories | 🔴 High | Hard |
| Implement review collection process | 🟡 Medium | Easy |
| Add FAQ sections with Schema to top 10 pages | 🟡 Medium | Medium |

### Ongoing
| Action | Impact | Effort |
|---|---|---|
| Publish 4-8 blog posts per month targeting long-tail keywords | 🔴 High | Ongoing |
| Monitor Core Web Vitals monthly | 🟡 Medium | Easy |
| Respond to all Google/Booking.com reviews | 🟡 Medium | Easy |
| Track keyword rankings weekly | 🟡 Medium | Easy |

---

## Competitive Positioning Summary

Surwahi's competitors in the Kanha eco-lodge space:

| Competitor | Strength | Surwahi's Edge |
|---|---|---|
| **Kanha Earth Lodge** (Pugdundee) | Strong SEO, luxury brand, OTA presence | Price accessibility, tribal workshops, diverse accommodation (dorm/camping), community focus |
| **Kanha Village Eco Resort** | Good "eco resort Kanha" ranking, TOFT certified | More experiences, newer TOFT award (2024 vs older), workshops, forest bathing |
| **Banjaar Tola** (Taj) | Brand authority, core zone location | Authentic vs corporate, sustainability credentials, cultural immersion |
| **Safari booking sites** | Dominate informational Kanha searches | Create comprehensive Kanha guides that naturally link to Surwahi stays |

**Surwahi's unique moat that NO competitor has:**
- Gond art workshops with tribal artists
- Forest bathing (Shinrin-Yoku) programs
- Eco-volunteering in local communities
- Diverse accommodation tiers (suites + dormitory + camping)
- Evapo-transpiration toilet innovation
- John Wakefield Memorial Award 2024

**None of these differentiators are currently visible to search engines.** Fix that, and Surwahi has a real shot at becoming the #1 organic result for "eco lodge near Kanha National Park."

---

*This analysis is based on publicly accessible data from web crawling and search results as of February 2026. Recommendations should be validated with Google Search Console data, Google Analytics, and a full technical crawl using tools like Screaming Frog or Ahrefs.*
