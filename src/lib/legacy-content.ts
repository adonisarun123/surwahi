// Content that used to be hard-coded in page files. Seeded into the database by scripts/db-seed-content.ts
// and used as a fallback if the database is unreachable. Edit content in /admin, not here.
import { getImageKitUrl, galleryImages } from '@/lib/images';

export const legacyBlogPosts = {
  'the-magic-of-the-monsoon-forest': {
    id: 1,
    title: 'The Magic of the Monsoon Forest',
    slug: 'the-magic-of-the-monsoon-forest',
    excerpt: 'The monsoon breathes new life into the forest, transforming the landscape into a vibrant green and filling the air with the scent of wet earth.',
    content: `The forest awakens in a riot of green when the monsoon arrives. After months of dry heat, the first rains are a celebration. The dusty brown landscape transforms into a lush, vibrant paradise, and the air is thick with the petrichor, the scent of wet earth. This is the forest's time of rejuvenation, a magical period that reveals its deepest secrets.

## A Symphony of Life

The monsoon is a sensory explosion. The constant drumming of rain is a backdrop to a symphony of life. Frogs of all shapes and sizes emerge, their croaks filling the nights. The bird calls are different now - more urgent, more joyful. This is the breeding season for many species, and the forest is alive with courtship displays and the frantic activity of nest building.

## The World in a Droplet

It's a time to appreciate the small wonders. A raindrop clinging to a spider's web, a mushroom sprouting from a decaying log, a caterpillar munching on a fresh leaf. The macro world comes alive, offering endless opportunities for photographers and nature lovers to observe the intricate details of the ecosystem. Our guided herping walks are particularly exciting during this season, revealing the hidden world of amphibians and reptiles.

## A Different Kind of Safari

While the core zones of the national parks are closed during the monsoon, the buffer zones offer a unique safari experience. The forest is less crowded, and the landscape is breathtakingly beautiful. It's a chance to see the jungle in its most raw and untamed state. The rain-washed trees, the misty mornings, and the dramatic skies create a mystical atmosphere that is a world away from the dry heat of summer.`,
    category: 'Conservation Diaries',
    author: 'Surwahi Team',
    publishedAt: '2024-08-15',
    updatedAt: '2026-03-15',
    readingTime: 4,
    featuredImage: {
      url: getImageKitUrl('Website Photos/IMG20231020171008.jpg'),
      alt: 'A lush green forest during the monsoon season',
      caption: 'The vibrant green of the monsoon forest'
    },
    tags: ['monsoon', 'forest', 'conservation', 'nature', 'rejuvenation'],
    isPublished: true,
    seoTitle: 'The Magic of the Monsoon Forest',
    seoDescription: 'Discover the beauty and secrets of the forest during the monsoon season.'
  },
  'building-with-mud-a-lesson-in-sustainability': {
    id: 2,
    title: 'Building with Mud: A Lesson in Sustainability',
    slug: 'building-with-mud-a-lesson-in-sustainability',
    excerpt: 'Our buildings are more than just structures; they are a testament to our philosophy of sustainable living. Discover how we use the very earth we stand on to create beautiful, comfortable, and eco-friendly spaces.',
    content: `From the very beginning, our vision for Surwahi was to create a space that is in harmony with its surroundings. This philosophy is most tangible in our architecture. We chose to build with mud, one of the oldest and most sustainable building materials known to humankind.

## The Wisdom of the Earth

Building with mud is a tradition that has been practiced in this region for centuries. It is a technique that is both eco-friendly and climate-responsive. Our cob walls, made from a mixture of local soil, straw, and water, provide excellent thermal insulation. They keep the interiors cool in the scorching summer and warm during the chilly winter nights, drastically reducing our need for artificial heating and cooling.

## A Labor of Love and Community

The process of building with mud is a labor of love. Each wall is built by hand, layer by layer. We worked with local artisans who possess the traditional knowledge of this craft, passed down through generations. This not only ensured the authenticity of our structures but also provided meaningful employment to the local community, making them an integral part of our story.

## More Than Just a Building

Our mud structures are living, breathing entities. The natural materials allow the walls to 'breathe', regulating humidity and creating a healthy indoor environment. By choosing to build with mud, we have minimized our carbon footprint, reduced construction waste, and created a space that is truly connected to the land. Our "Build With Mud" workshop offers guests a chance to experience this ancient craft firsthand.`,
    category: 'Behind the Scenes',
    author: 'Surwahi Team',
    publishedAt: '2024-07-28',
    updatedAt: '2026-03-15',
    readingTime: 3,
    featuredImage: {
      url: getImageKitUrl('Surwahi Social Photos/A.jpg'),
      alt: 'A beautiful structure built with mud',
      caption: 'The art of building with mud'
    },
    tags: ['sustainability', 'eco-architecture', 'mud-building', 'community', 'behind-the-scenes'],
    isPublished: true,
    seoTitle: 'Building with Mud: A Lesson in Sustainability',
    seoDescription: 'Learn about our philosophy of sustainable architecture and the art of building with mud.'
  },
  'a-tiger-sighting-that-changed-my-perspective': {
    id: 3,
    title: 'A Tiger Sighting That Changed My Perspective',
    slug: 'a-tiger-sighting-that-changed-my-perspective',
    excerpt: 'Locking eyes with a wild tiger is an experience that words can hardly do justice. It was a moment of pure awe, a powerful reminder of the raw beauty and importance of our wild spaces.',
    content: `I had been on several safaris before, but nothing could have prepared me for this moment. We were driving through the buffer zone of Kanha, the forest bathed in the golden light of the late afternoon. Our naturalist, with his keen eyes, suddenly stopped the jeep and pointed towards a thicket of bamboo.

## The Majestic Presence

And then I saw her. A tigress, majestic and powerful, emerged from the bamboo. She walked with a silent grace, her stripes a perfect camouflage in the dappled light. She was so close that I could see the twitch of her whiskers and the intensity in her amber eyes. For a few breathtaking moments, our worlds converged. She looked at us, not with aggression, but with a calm, regal indifference.

## A Lesson in Humility

In that moment, I felt a profound sense of humility. I was a guest in her kingdom, a fleeting visitor in a world that has existed for millennia. It was a powerful reminder that these wild spaces do not belong to us. We are merely custodians, with a responsibility to protect them for generations to come.

## The Importance of Conservation

This experience reinforced the importance of the conservation work being done by places like Surwahi Social and the forest department. Every effort to protect these habitats, to create corridors for wildlife, and to mitigate human-animal conflict is a step towards ensuring that future generations can also experience this sense of awe and wonder. My safari was not just a tour; it was a life-altering lesson in the importance of coexistence.`,
    category: 'Guest Experiences',
    author: 'Surwahi Team',
    publishedAt: '2024-07-10',
    updatedAt: '2026-03-15',
    readingTime: 3,
    featuredImage: {
      url: getImageKitUrl('Website Photos/IMG_5090.JPG'),
      alt: 'A majestic tiger in the wild',
      caption: 'A moment of awe in the jungle'
    },
    tags: ['tiger', 'safari', 'wildlife', 'conservation', 'guest-experience', 'kanha'],
    // First-person 'guest' story without a verifiable author - unpublished (decision 2026-10-29)
    isPublished: false,
    seoTitle: 'A Tiger Sighting That Changed My Perspective',
    seoDescription: 'A firsthand account of a life-changing tiger sighting experience near Surwahi.'
  }
};

export const legacyFaqs: { question: string; answer: string; category: string }[] = [
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
        answer: "Yes, we arrange pickup and drop from Jabalpur Airport/Station. Please book in advance. The cost is approximately ₹4,000 - ₹6,000 one way depending on the vehicle.",
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

export const legacyGallery = [
  { src: galleryImages.lodgeExterior, alt: 'Exterior view of Surwahi Social Ecoestate built with traditional mud architecture', category: 'Lodge & Architecture' },
  { src: galleryImages.riverSuite, alt: 'Interior of the Jholar family suite at Surwahi Social Ecoestate', category: 'Lodge & Architecture' },
  { src: galleryImages.hornbill, alt: 'Malabar Pied Hornbill spotted near Kanha National Park', category: 'Flora & Fauna' },
  { src: galleryImages.tigerSafari, alt: 'Tiger sighting during a wildlife safari in Kanha Tiger Reserve', category: 'Experiences' },
  { src: galleryImages.diningExperience, alt: 'Farm-to-table dining experience with local cuisine', category: 'Cuisine' },
  { src: galleryImages.forestTrail, alt: 'Guided nature walk on a forest trail near Surwahi', category: 'Experiences' },
  { src: galleryImages.commonArea, alt: 'Cozy common area and library at Surwahi Social Ecoestate', category: 'Lodge & Architecture' },
  { src: galleryImages.wildMushrooms, alt: 'Wild mushrooms growing in the forest floor at Surwahi', category: 'Flora & Fauna' },
  { src: galleryImages.gondArt, alt: 'Guests participating in a Gond art workshop with local artisans', category: 'Experiences' },
  { src: galleryImages.organicFarm, alt: 'Fresh organic vegetables from Surwahi\'s kitchen garden', category: 'Cuisine' },
  { src: galleryImages.starryNight, alt: 'Stargazing night sky view from Surwahi Social Ecoestate', category: 'Experiences' },
  { src: galleryImages.earthenPottery, alt: 'Pottery workshop experience with local potters', category: 'Experiences' },
];
