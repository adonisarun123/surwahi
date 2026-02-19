import { NavigationItem } from '@/types';

export const mainNavigation: NavigationItem[] = [
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
            { label: "Fact Sheet & Amenities", href: '/stay/fact-sheet' },
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
            { label: "Cultural Immersion & Local Life", href: "/experiences/cultural-immersion" },
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
            { label: "Grassroots Governance", href: "/workshops/grassroots-governance" },
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
            { label: "SDGs Alignment", href: "/sustainability/sdg-alignment" },
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

export const ctaButton: NavigationItem = {
    label: "Book Your Stay",
    href: "/stay",
    isCTA: true,
};

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
            { label: "Grassroots Governance", href: "/workshops/grassroots-governance" },
            { label: "Nature's Pharmacy", href: "/workshops/natures-pharmacy" },
            { label: "Build With Mud", href: "/workshops/build-with-mud" },
        ],
    },
];
