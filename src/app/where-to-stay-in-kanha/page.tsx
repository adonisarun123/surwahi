import GuidePage, { GuideFaq } from '@/components/GuidePage';
import { generatePageMetadata, defaultMeta } from '@/lib/seo';
import { blogImages } from '@/lib/images';

const PATH = '/where-to-stay-in-kanha';

export const metadata = generatePageMetadata(
  'Where to Stay in Kanha: Khatia vs Mukki vs a Quiet Eco Stay',
  'Choosing a resort or eco lodge near Kanha National Park? How the Khatia, Mukki and Sarhi gates compare, what to look for in a genuine eco stay, and how Surwahi fits.',
  PATH,
  blogImages.monsoonForest,
  ['where to stay in Kanha', 'best resorts in Kanha', 'eco resort near Kanha National Park', 'resort near Khatia gate', 'Kanha eco lodge', 'homestay near Kanha', 'Kanha accommodation'],
  true
);

const md = `Where you sleep shapes a Kanha trip more than almost any other decision. It decides which safari zones are practical, how early your alarm goes off, how much traffic you hear at night, and whether you meet the people who live around the park.

This guide is written by an eco stay, so we will be upfront about our own strengths and trade-offs. The aim is to help you choose well, even if that means choosing somewhere else.

## Step 1: Choose your gate before your hotel

Kanha has three entry gates, and safari permits are tied to zones that are entered through specific gates:

| Gate | Zones it serves | Character of the area |
|---|---|---|
| Khatia | Kanha and Kisli core zones; Khatia buffer | The most developed side, with the widest choice of hotels and restaurants. Busy in peak season. |
| Mukki | Mukki core zone; Khapa buffer | Quieter, more remote lodges. Mukki is about 1.5 hours' drive from Khatia. |
| Sarhi | Sarhi core zone; Sijhora buffer | Few stays and fewer vehicles. Best for a planned, quieter trip. |

If you have already booked permits for a particular zone, stay on that side of the park. If you have not, it is easiest to pick a base first and then plan zones around it. That is how we plan safaris for our own guests.

## Step 2: Decide what kind of stay you want

Kanha's accommodation falls roughly into four groups:

- **Gate-side hotels and resorts** - Walkable or a few minutes from the gate. Convenient for early starts, but the area around Khatia in particular can feel crowded, with traffic and noise in peak season.
- **Luxury safari lodges** - Spacious, polished, usually with in-house naturalists and their own vehicles. Excellent and priced accordingly.
- **Government stays** - MP Tourism runs properties near the gates. Simple, well located and good value.
- **Eco stays and homestays** - Smaller, community-rooted places that put you in a village and a landscape rather than a resort strip. Standards and authenticity vary widely, so check the details. See our checklist on [how to choose a genuine eco lodge](/blogs/how-to-choose-a-genuine-eco-lodge-in-india).

## Step 3: Check what "eco" actually means

Almost every property near a tiger reserve calls itself eco-friendly. Ask:

- Is it built from local, low-impact materials, or concrete with a thatch roof?
- Where does the water come from, and where does the wastewater go?
- Are the staff and guides from nearby villages, and do they have real responsibility?
- Is there independent recognition, such as a TOFTigers PUG rating or a responsible tourism award?
- Does the property restore habitat, or only sit next to it?

## Where Surwahi fits

[Surwahi Social Ecoestate](/about/our-story) is a ten-acre estate in Surwahi village, Balaghat district, **about 20 km from Khatia gate** and about 35 km from Mukki gate. We build on two acres. The other eight have been left to regenerate since 2015, growing from fewer than 300 trees to more than 6,000 native plants and trees, with 59 bird species recorded.

**What you get:**

- Mud-built [family suites and an earthen dormitory](/stay) that stay naturally cool without air conditioning
- All meals from our Kodo Kutki Kitchen, built around local and farm produce
- Silence at night, dark skies and a working farm and village around you
- Safari permits, jeep and guide arranged for you, plus [estate experiences](/experiences) and [workshops](/workshops) between drives
- An award-winning model: [John Wakefield Memorial Award 2024](/praises/awards-and-accolades) (TOFT Wildlife Awards), TOFTigers certified Practicing Eco Lodge, MP Tourism Best Bed and Breakfast Unit 2024-25

**The honest trade-offs:**

- You drive to the gate rather than walk, so early-morning safaris mean an earlier start than at a gate-side hotel.
- We are a small bed and breakfast, not a resort. There is no spa, gym or television, and WiFi is limited to common areas.
- Comfort comes from good design rather than air conditioning. Rooms are cool in summer and warm in winter, with fans and cross-ventilation.

If you want five-star luxury next to the gate, a big safari lodge will suit you better. If you want quiet, community, real food and a forest you can walk in, Surwahi is built for you.

## Our suggestion for most travellers

- **2-3 nights, first visit** - A Khatia-side base. Book the Kanha and Kisli core zones plus one buffer safari.
- **4+ nights or photographers** - Split your stay between the Khatia and Mukki sides, or stay with us and add Mukki-zone safaris for the longer drive.
- **Families and groups** - Choose space and food over gate distance. Children tire of back-to-back drives, and a safe, open estate makes the rest days easy.

See [our stay and safari packages](/kanha-safari-packages) or [sample itineraries](/plan-your-visit/itineraries).`;

const faqs: GuideFaq[] = [
  { question: 'Which is the best area to stay in Kanha?', answer: 'For most first-time visitors, the Khatia side, because Khatia gate serves the Kanha and Kisli core zones and the Khatia buffer. Mukki suits those booking Mukki-zone safaris who want a quieter, more remote stay. Sarhi has very few stays. Pick your gate first, then your hotel.' },
  { question: 'Is it better to stay close to the Kanha gate?', answer: 'Staying at the gate saves driving time before early safaris, but the area immediately around Khatia gate is the busiest part of Kanha. Staying a little further out, as at Surwahi (about 20 km from Khatia gate), means a longer morning drive in exchange for quiet, space and a village setting.' },
  { question: 'Does Surwahi have air conditioning?', answer: 'No. Our rooms are built from stabilised mud with insulated roofs, which keeps them cool in summer and warm in winter. Fans and cross-ventilation are provided.' },
  { question: 'Is Surwahi suitable for families and people with limited mobility?', answer: 'Yes to families: there is a play area, nature games and child-friendly workshops. Our two family suites, Jholar and Kariwah, were designed to be wheelchair-accessible. Please tell us about any specific needs when you enquire.' },
  { question: 'Are pets allowed?', answer: 'Yes, guests do bring pets. Please tell us in advance so we can plan the room and let other guests know.' },
];

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Where to Stay in Kanha: Khatia vs Mukki vs a Quiet Eco Stay',
    author: { '@type': 'Organization', name: defaultMeta.siteName, url: defaultMeta.url },
    publisher: { '@id': `${defaultMeta.url}/#org` },
    about: [{ '@id': `${defaultMeta.url}/kanha-national-park#park` }, { '@id': `${defaultMeta.url}/#lodging` }],
    mainEntityOfPage: `${defaultMeta.url}${PATH}`,
    image: blogImages.monsoonForest,
    inLanguage: 'en',
    dateModified: '2026-11-22',
  },
];

export default function Page() {
  return (
    <GuidePage
      title="Where to Stay in Kanha"
      subtitle="Khatia, Mukki or a quiet forest estate? An honest guide to choosing your base for Kanha Tiger Reserve."
      heroImage={blogImages.monsoonForest}
      heroAlt="Mud-built rooms with terracotta roofs among the trees at Surwahi near Kanha"
      md={md}
      faqs={faqs}
      schema={schema}
      related={[
        { label: 'Kanha stay + safari packages', href: '/kanha-safari-packages' },
        { label: 'Our rooms and suites', href: '/stay' },
        { label: 'Kanha National Park guide', href: '/kanha-national-park' },
        { label: 'Why Surwahi', href: '/about/why-surwahi' },
        { label: 'Getting here', href: '/plan-your-visit/getting-here' },
        { label: 'Guest reviews', href: '/stories/guest-reviews' },
      ]}
    />
  );
}
