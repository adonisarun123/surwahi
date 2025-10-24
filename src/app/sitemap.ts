import { MetadataRoute } from 'next';

const URL = 'https://www.surwahi.com';

const accommodations = [
  'forest-canopy-suite',
  'river-view-suite',
  'mixed-dormitory',
  'safari-tent'
];

const blogPosts = [
  'the-magic-of-the-monsoon-forest',
  'building-with-mud-a-lesson-in-sustainability',
  'a-tiger-sighting-that-changed-my-perspective'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '/',
    '/about-us',
    '/about-us/our-story',
    '/about-us/the-lodge-and-philosophy',
    '/about-us/dining-and-local-cuisine',
    '/about-us/fact-sheet',
    '/about-us/our-residents',
    '/accommodations',
    '/accommodations/suites',
    '/accommodations/dormitory',
    '/accommodations/camping-tents',
    '/experiences',
    '/experiences/wildlife-safaris',
    '/experiences/guided-forest-trails',
    '/experiences/bird-watching-expeditions',
    '/experiences/farm-life-visit',
    '/experiences/know-your-crop',
    '/experiences/play-at-surwahi',
    '/experiences/outdoor-sports-and-nature-games',
    '/experiences/eco-volunteering-programs',
    '/experiences/cultural-immersion-and-local-life',
    '/experiences/live-tribal-cooking-experiences',
    '/sustainability',
    '/sustainability/evapo-transpiration-toilets',
    '/sustainability/tree-census-and-biodiversity-reports',
    '/sustainability/eco-friendly-construction-practices',
    '/sustainability/sustainable-development-goals-alignment',
    '/workshops',
    '/workshops/star-gazing-nights',
    '/workshops/astro-photography',
    '/workshops/earthen-pottery',
    '/workshops/gond-art-workshops',
    '/workshops/bamboo-and-lantana-crafting',
    '/workshops/forest-bathing',
    '/workshops/leaf-plate-making',
    '/workshops/food-foraging-trails',
    '/workshops/herping-walks',
    '/workshops/the-art-of-regeneration',
    '/workshops/grassroots-governance-and-local-democracy',
    '/workshops/natures-pharmacy',
    '/workshops/build-with-mud',
    '/praises',
    '/praises/awards-and-accolades',
    '/praises/press-mentions-and-recognitions',
    '/gallery',
    '/getting-here',
    '/blogs',
    '/house-rules',
    '/contact',
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
  }));

  const accommodationPages = accommodations.map((slug) => ({
    url: `${URL}/accommodations/${slug}`,
    lastModified: new Date(),
  }));

  const blogPages = blogPosts.map((slug) => ({
    url: `${URL}/blogs/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...accommodationPages, ...blogPages];
}
