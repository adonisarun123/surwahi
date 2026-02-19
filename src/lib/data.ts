import { blogImages, experienceImages, workshopImages } from '@/lib/images';

export const blogPosts = [
    {
        slug: 'the-magic-of-the-monsoon-forest',
        title: 'The Magic of the Monsoon Forest',
        author: 'Rhea Sharma',
        date: 'August 15, 2024',
        category: 'Conservation Diaries',
        excerpt: "The monsoon breathes new life into the forest. The landscape transforms into a vibrant green, and the air is filled with the scent of wet earth. It's a time of rejuvenation, and a magical time to witness the secrets of the jungle.",
        imageUrl: blogImages.monsoonForest,
    },
    {
        slug: 'building-with-mud-a-lesson-in-sustainability',
        title: 'Building with Mud: A Lesson in Sustainability',
        author: 'Arjun Das',
        date: 'July 28, 2024',
        category: 'Behind the Scenes',
        excerpt: 'Our buildings are more than just structures; they are a testament to our philosophy. Discover the journey of how we use the very earth we stand on to create spaces that are both beautiful and sustainable.',
        imageUrl: blogImages.mudBuilding,
    },
    {
        slug: 'a-tiger-sighting-that-changed-my-perspective',
        title: 'A Tiger Sighting That Changed My Perspective',
        author: 'A Guest Blogger',
        date: 'July 10, 2024',
        category: 'Guest Experiences',
        excerpt: 'Locking eyes with a wild tiger is an experience that words can hardly do justice. It was a moment of pure awe, a powerful reminder of the raw beauty and importance of our wild spaces.',
        imageUrl: blogImages.tigerSighting,
    },
];

export const experienceGroups = [
    {
        category: "Wildlife & Nature",
        description: "Get closer to the wild heart of Kanha.",
        items: [
            { name: 'Wildlife Safaris', href: '/experiences/wildlife-safaris', imageUrl: experienceImages.wildlifeSafaris, description: 'Track tigers and wildlife in their natural habitat.' },
            { name: 'Guided Forest Trails', href: '/experiences/guided-forest-trails', imageUrl: experienceImages.guidedForestTrails, description: 'Walk through sal and bamboo forests with expert naturalists.' },
            { name: 'Bird-watching Expeditions', href: '/experiences/bird-watching-expeditions', imageUrl: experienceImages.birdWatching, description: 'Spot 300+ species of birds around Kanha.' },
        ],
    },
    {
        category: "Culture & Community",
        description: "Connect with indigenous traditions and local life.",
        items: [
            { name: 'Cultural Immersion & Local Life', href: '/experiences/cultural-immersion', imageUrl: experienceImages.culturalImmersion, description: 'Visit local villages and experience the Gond & Baiga way of life.' },
            { name: 'Live Tribal Cooking Experiences', href: '/experiences/live-tribal-cooking-experiences', imageUrl: experienceImages.tribalCooking, description: 'Cook and dine with local communities using traditional methods.' },
            { name: 'Eco Volunteering Programs', href: '/experiences/eco-volunteering-programs', imageUrl: experienceImages.ecoVolunteering, description: 'Contribute to conservation and community development efforts.' },
        ],
    },
    {
        category: "Farm & Food",
        description: "Taste the land, learn from the soil.",
        items: [
            { name: 'Farm Life Visit', href: '/experiences/farm-life-visit', imageUrl: experienceImages.farmLife, description: 'Experience authentic rural life and organic farming.' },
            { name: 'Know Your Crop', href: '/experiences/know-your-crop', imageUrl: experienceImages.knowYourCrop, description: 'Agri-learning walks through our organic fields.' },
        ],
    },
    {
        category: "Adventure & Fun",
        description: "Fun for every age in the great outdoors.",
        items: [
            { name: 'Play @ Surwahi', href: '/experiences/play-at-surwahi', imageUrl: experienceImages.playAtSurwahi, description: 'A dedicated nature adventure zone for kids and families.' },
            { name: 'Outdoor Sports & Nature Games', href: '/experiences/outdoor-sports-and-nature-games', imageUrl: experienceImages.outdoorSports, description: 'Traditional games and sports in the open air.' },
        ],
    },
];

export const workshopGroups = [
    {
        category: "Astronomy & Night Skies",
        description: "Look up and lose yourself in the cosmos.",
        items: [
            { name: 'Star Gazing Nights', href: '/workshops/star-gazing-nights', imageUrl: workshopImages.starGazing, description: 'Explore the constellations from our dark sky location.' },
            { name: 'Astro-Photography', href: '/workshops/astro-photography', imageUrl: workshopImages.astroPhotography, description: 'Learn to capture the mesmerizing beauty of the milky way.' },
        ],
    },
    {
        category: "Arts & Traditional Crafts",
        description: "Create with your hands, inspired by tradition.",
        items: [
            { name: 'Gond Art Workshops', href: '/workshops/gond-art-workshops', imageUrl: workshopImages.gondArt, description: 'Learn the intricate dot-work styles of the Gond tribe.' },
            { name: 'Earthen Pottery', href: '/workshops/earthen-pottery', imageUrl: workshopImages.earthenPottery, description: 'Shape local clay into functional art on a traditional wheel.' },
            { name: 'Bamboo & Lantana Crafting', href: '/workshops/bamboo-and-lantana-crafting', imageUrl: workshopImages.bambooCrafting, description: 'Turn invasive plants into beautiful, sustainable furniture.' },
            { name: 'Leaf Plate Making', href: '/workshops/leaf-plate-making', imageUrl: workshopImages.leafPlate, description: 'Master the eco-friendly art of stitching Mahua leaves.' },
        ],
    },
    {
        category: "Nature & Wellness",
        description: "Healing for you and the planet.",
        items: [
            { name: 'Forest Bathing (Shinrin-Yoku)', href: '/workshops/forest-bathing', imageUrl: workshopImages.forestBathing, description: 'Immerse your senses in the healing atmosphere of the forest.' },
            { name: "Nature's Pharmacy", href: '/workshops/natures-pharmacy', imageUrl: workshopImages.naturesPharmacy, description: 'Discover the medicinal secrets of local flora.' },
            { name: 'Herping Walks', href: '/workshops/herping-walks', imageUrl: workshopImages.herping, description: 'A night walk to discover the fascinating world of amphibians.' },
        ],
    },
    {
        category: "Sustainable Living",
        description: "Skills for a greener future.",
        items: [
            { name: 'Build With Mud', href: '/workshops/build-with-mud', imageUrl: workshopImages.buildWithMud, description: 'Learn the ancient, sustainable technique of cob construction.' },
            { name: 'The Art of Regeneration', href: '/workshops/the-art-of-regeneration', imageUrl: workshopImages.regeneration, description: 'Understand how we restore degraded land to lush forest.' },
            { name: 'Food Foraging Trails', href: '/workshops/food-foraging-trails', imageUrl: workshopImages.foodForaging, description: 'Learn to identify and responsibly harvest wild edibles.' },
            { name: 'Grassroots Governance', href: '/workshops/grassroots-governance', imageUrl: workshopImages.governance, description: 'Insight into local democracy and village self-rule.' },
        ],
    },
];
