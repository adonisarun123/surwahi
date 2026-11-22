import GuidePage, { GuideFaq } from '@/components/GuidePage';
import { generatePageMetadata, defaultMeta } from '@/lib/seo';
import { galleryImages } from '@/lib/images';

const PATH = '/plan-your-visit/itineraries';

export const metadata = generatePageMetadata(
  'Kanha Itineraries: 2, 3 & 4 Days, Monsoon Stays and India Tiger Circuits',
  'Day-by-day Kanha itineraries from Surwahi Social Ecoestate: weekend safaris, a 3-night tigers-and-villages trip, a 4-night naturalist plan, monsoon estate stays and how to fit Kanha into a longer India trip.',
  PATH,
  galleryImages.forestTrail,
  ['Kanha itinerary', '2 days in Kanha', '3 days in Kanha', 'Kanha trip plan', 'central India tiger safari itinerary', 'Kanha Bandhavgarh itinerary', 'Kanha Pench itinerary'],
  true
);

const md = `These are the trips our guests most often take, written day by day so you can see how safaris, rest and estate life fit together. Every one can be adjusted. Tell us your dates and interests and we will tailor the plan, book your safari permits and arrange transfers.

A note on timing: morning safaris start around dawn, so you leave Surwahi in the dark for the roughly 20 km drive to Khatia gate. Afternoon safaris run until around sunset. The exact gate times change through the season, and core zones are closed on Wednesday afternoons, so we plan your days around both.

## Weekend in Kanha (2 nights)

**Day 1 - Arrive**
- Pickup from Jabalpur. The drive is about 3.5 hours through Mandla's farmland and forest.
- Lunch at the estate, rest, then a gentle guided walk through our regenerated forest.
- Dinner from the Kodo Kutki Kitchen and an early night.

**Day 2 - Into the jungle**
- Pre-dawn departure for a morning core-zone safari (Kanha or Kisli zone).
- Brunch and a long rest through the midday heat.
- Afternoon safari in a core or buffer zone.
- Dinner under the stars.

**Day 3 - One more drive**
- Morning safari or a birding walk on the estate (59 species recorded here).
- Brunch, then drive back to Jabalpur.

## Tigers and Villages (3 nights)

**Day 1** - Arrive, settle in and walk the estate. Sunset at Arjun Pond, where leopard, sambar and wild boar have been recorded coming to drink.

**Day 2** - Morning and afternoon safaris, ideally one core zone and one buffer zone for variety.

**Day 3** - Morning safari. In the afternoon, slow down: a [Gond art](/workshops/gond-art-workshops) or [earthen pottery](/workshops/earthen-pottery) session, a village walk, or a [farm life visit](/experiences/farm-life-visit) with our neighbouring farmers.

**Day 4** - Final morning safari, brunch and departure.

## The Naturalist's Kanha (4 nights)

**Day 1** - Arrive and take an estate orientation walk with our team.
**Day 2** - Two safaris, core and buffer.
**Day 3** - Morning safari. In the afternoon, join our [tree census and biodiversity](/sustainability/tree-census-and-biodiversity-reports) work, or try [herping](/workshops/herping-walks) with a trained handler.
**Day 4** - Two safaris, mixing zones and light. After dark, [stargazing](/workshops/star-gazing-nights) under some of central India's darkest skies, weather permitting.
**Day 5** - Final morning birding walk or safari, then depart.

**Best for:** photographers and birders, who benefit from repeat visits to the same zone in different light.

## Monsoon at Surwahi (July to September)

The core zones close for the monsoon, but the estate is at its greenest. A 2-3 night monsoon stay focuses on:

- Paddy planting and farm life with neighbouring families
- Forest walks, fungi, frogs and insects (some of the best macro photography of the year)
- Live [tribal cooking](/experiences/live-tribal-cooking-experiences), Gond art and pottery
- Buffer-zone drives, where the Forest Department keeps them open

Read [The Magic of the Monsoon Forest](/blogs/the-magic-of-the-monsoon-forest) for a taste.

## Kanha in a longer India trip

For international visitors, Kanha works well as the wild heart of a two-week trip:

- **Golden Triangle + Kanha (10-12 days)** - Delhi, Agra and Jaipur. Fly to Jabalpur for 3-4 nights at Surwahi, then fly home from Jabalpur via Delhi or Mumbai.
- **Central India tiger circuit (8-10 days)** - Kanha with Bandhavgarh or Pench, linked by road. Each transfer is a long half-day drive, so allow a travel day between parks. Our [Kanha vs Bandhavgarh vs Pench](/blogs/kanha-vs-bandhavgarh-vs-pench) guide helps you choose.
- **Temples and tigers (9-11 days)** - Khajuraho's temples, Bandhavgarh, then Kanha.

Planning from abroad? Read our [guide for international travellers](/plan-your-visit/international-travellers).`;

const faqs: GuideFaq[] = [
  { question: 'Is 2 days enough for Kanha?', answer: 'Two nights gives you three or four safaris, which is enough for a good taste of Kanha and a fair chance of a tiger sighting. Three nights is more relaxed and lets you combine core and buffer zones with a village or estate experience.' },
  { question: 'How many safaris should I book in Kanha?', answer: 'We suggest at least three, and four to six if you are keen on tigers or photography. More drives across different zones and times of day improve your chances and show you more of the forest.' },
  { question: 'Can you customise these itineraries?', answer: 'Yes. Every itinerary is a starting point. We adjust it for your dates, group, interests and safari permit availability, and we arrange transfers.' },
  { question: 'Can I visit Kanha during the monsoon?', answer: 'The core zones close from 1 July until the October reopening, but Surwahi stays open. Some buffer zones may open at the Forest Department’s discretion, and the estate offers farm, forest and cultural experiences throughout the monsoon.' },
];

const trip = (name: string, description: string, days: number, items: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name,
  description,
  url: `${defaultMeta.url}${PATH}`,
  duration: `P${days}D`,
  touristType: ['Wildlife enthusiasts', 'Families', 'International travellers', 'Photographers'],
  provider: { '@id': `${defaultMeta.url}/#org` },
  itinerary: { '@type': 'ItemList', itemListElement: items.map((n, i) => ({ '@type': 'ListItem', position: i + 1, name: n })) },
});

const schema = [
  trip('Weekend in Kanha (2 nights)', 'Two-night Kanha trip with three safaris from Surwahi Social Ecoestate.', 3, ['Arrive from Jabalpur, estate walk', 'Morning and afternoon safaris', 'Final safari or birding walk, depart']),
  trip('Tigers and Villages (3 nights)', 'Three-night Kanha itinerary combining four safaris with village and craft experiences.', 4, ['Arrive, estate walk, Arjun Pond', 'Core and buffer safaris', 'Safari and Gond art or village walk', 'Final safari, depart']),
  trip("The Naturalist's Kanha (4 nights)", 'Four-night itinerary for photographers and birders with multiple safaris, conservation activities and stargazing.', 5, ['Arrival and orientation walk', 'Two safaris', 'Safari and tree census or herping', 'Two safaris and stargazing', 'Birding walk, depart']),
  trip('Monsoon at Surwahi', 'Monsoon estate stay with farm life, forest walks, tribal cooking and crafts while Kanha core zones are closed.', 3, ['Farm life and paddy planting', 'Forest and macro walks', 'Tribal cooking, Gond art and pottery']),
];

export default function Page() {
  return (
    <GuidePage
      title="Kanha Itineraries"
      subtitle="Day-by-day plans for 2, 3 and 4 nights at Surwahi, a monsoon stay, and ideas for fitting Kanha into a longer India trip."
      heroImage={galleryImages.forestTrail}
      heroAlt="Mud-built cottage under tall trees at Surwahi near Kanha"
      md={md}
      faqs={faqs}
      schema={schema}
      related={[
        { label: 'Kanha safari packages', href: '/kanha-safari-packages' },
        { label: 'Safari booking guide', href: '/plan-your-visit/safari-booking-guide' },
        { label: 'Best time to visit', href: '/plan-your-visit/best-time-to-visit' },
        { label: 'Getting here', href: '/plan-your-visit/getting-here' },
        { label: 'Experiences at Surwahi', href: '/experiences' },
        { label: 'Workshops', href: '/workshops' },
      ]}
    />
  );
}
