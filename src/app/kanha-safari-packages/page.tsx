import GuidePage, { GuideFaq } from '@/components/GuidePage';
import { generatePageMetadata, defaultMeta } from '@/lib/seo';
import { aboutUsImages } from '@/lib/images';

const PATH = '/kanha-safari-packages';

export const metadata = generatePageMetadata(
  'Kanha Safari Packages: Eco Stay + Tiger Safari near Khatia Gate',
  'Kanha safari packages at Surwahi Social Ecoestate: 2, 3 and 4-night stays with all meals, safari permits, jeep and guide arranged, airport transfers and village experiences. Get a full quote.',
  PATH,
  aboutUsImages.lodgeToday,
  ['Kanha safari package', 'Kanha tour package', 'Kanha jungle safari package', 'Kanha National Park package with safari', 'Kanha resort with safari', 'tiger safari package India'],
  true
);

const md = `Most Kanha packages sell you a room near a gate and a jeep seat. Ours are built the other way round: a quiet, award-winning forest estate as your base, safaris planned around the zones that suit your dates, and the time in between spent with the people and the land that make central India special.

Every package is planned and quoted individually, because safari permits, zones and availability change by date. Tell us when you want to travel and how many of you there are, and we will come back with a full, itemised quote.

## What every package includes

- **Your room** - A [family suite](/stay/suites) (Jholar or Kariwah) or a bed in our earthen [Maikal Express dormitory](/stay/mudhouses), built from stabilised mud and naturally cool without air conditioning.
- **All meals** - Breakfast, lunch and dinner from the Kodo Kutki Kitchen, cooked with produce from our farm and neighbouring villages. Vegetarian, vegan, Jain and gluten-free diets are catered for on request.
- **Safari planning and permits** - We book your Kanha safari permits, open 4x4 jeep and forest guide for the zones you choose, and confirm the full safari cost before booking anything.
- **An estate experience** - A guided walk through our ten-acre regenerated forest, where 59 bird species have been recorded.
- **Help from people who live here** - Local hosts from Surwahi and nearby villages, and a team that has run this estate since 2015.

**Add-ons on request:** pickup and drop from Jabalpur airport or railway station (Nagpur on request), extra safaris, Gond art and pottery [workshops](/workshops), [tribal cooking](/experiences/live-tribal-cooking-experiences), [farm life visits](/experiences/farm-life-visit) and stargazing.

## Package 1: Kanha Safari Escape (2 nights, 3 safaris)

The shortest trip that still does Kanha justice.

- **Day 1** - Arrive from Jabalpur (about 3.5 hours). Settle in, then take an evening walk on the estate. Dinner by the fire.
- **Day 2** - Early morning core-zone safari from Khatia gate. Rest through the afternoon, then an afternoon safari in a core or buffer zone.
- **Day 3** - Morning safari, brunch, depart.

**Best for:** short breaks and travellers combining Kanha with another park.

## Package 2: Tigers and Villages (3 nights, 4 safaris)

Our most popular shape. You get enough safaris for a strong chance of a tiger sighting, plus one slow day.

- **Day 1** - Arrive, estate walk, sunset at Arjun Pond.
- **Day 2** - Morning and afternoon safaris, ideally one core zone and one buffer zone.
- **Day 3** - Morning safari, then a slow afternoon: a Gond art session, a village walk or a farm visit.
- **Day 4** - Final morning safari or a birding walk, then depart.

**Best for:** first-time visitors, couples and families.

## Package 3: The Naturalist's Kanha (4 nights, 5-6 safaris)

For photographers, birders and anyone who wants to see Kanha properly.

- Five or six safaris across Kanha, Kisli and the buffer zones, mixing morning and afternoon light.
- Birding walks on the estate and around village tanks.
- A night under the stars with our [stargazing workshop](/workshops/star-gazing-nights) (weather permitting).
- Time with our team on [conservation work](/sustainability/tree-census-and-biodiversity-reports) - the tree census, the pond and the regenerating forest.

**Best for:** photographers, birdwatchers and repeat visitors.

## Groups, families and corporate teams

We regularly host extended families, school groups and teams. The whole estate can be booked for exclusive use. See our [corporate and group retreats](/corporate-retreats) page or tell us your group size when you enquire.

## Why book your Kanha safari with Surwahi

- **Award-winning and certified** - Winner of the John Wakefield Memorial Award for Most Inspirational Lodge of the Year 2024 at the TOFT Wildlife Awards, a TOFTigers certified Practicing Eco Lodge, and MP Tourism's Best Bed and Breakfast Unit 2024-25. See all our [awards](/praises/awards-and-accolades).
- **Quiet, outside the resort strip** - About 20 km from Khatia gate, away from the traffic of the gate-side hotels.
- **Your stay supports the village** - Our team is local, and the estate works with the women's self-help group and artisans of Surwahi.
- **Honest advice** - If a different zone, gate or month will give you a better trip, we will tell you.`;

const faqs: GuideFaq[] = [
  { question: 'How much does a Kanha safari package cost?', answer: 'It depends on your room, the number of nights, how many safaris you want, whether you choose core or buffer zones, and whether you need airport transfers. Safari permit fees are set by the MP Forest Department and are higher for foreign nationals. Send us your dates and group size and we will send a full, itemised quote before you commit.' },
  { question: 'Are meals included?', answer: 'Yes. Our room rates are on an all-meals basis: breakfast, lunch and dinner are included. We cater for vegetarian, vegan, Jain, gluten-free and other diets on request.' },
  { question: 'How far is Surwahi from the Kanha safari gate?', answer: 'Surwahi is about 20 km by road from Khatia gate, which serves the Kanha and Kisli core zones and the Khatia buffer zone, and about 35 km from Mukki gate. We plan departure times so you reach the gate in good time for your safari.' },
  { question: 'Can you book safari permits for us?', answer: 'Yes. We book permits, the jeep and the forest guide for our in-house guests. Core-zone permits are limited and sell out in peak season, so please send your dates and each traveller’s ID or passport details as early as possible.' },
  { question: 'Do you arrange airport pickup?', answer: 'Yes. We arrange pickup and drop from Jabalpur airport and railway station, and from Nagpur on request. Jabalpur is about 3.5 hours by road from Surwahi and Nagpur about 5.5 hours. The cost depends on the vehicle; we include it in your quote.' },
  { question: 'Is a Kanha package suitable for children?', answer: 'Yes. Families are very welcome, and the estate has a dedicated play area, nature games and child-friendly workshops. Age rules for core-zone safaris are set by the park, so please tell us your children’s ages when you enquire and we will check the current regulations.' },
  { question: 'What is your payment and cancellation policy?', answer: 'We accept UPI, bank transfer, cards and cash. A 50% advance confirms the booking. Safari permits are usually non-refundable once booked. See our cancellation policy page for full details.' },
];

const trip = (name: string, description: string, nights: number, items: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name,
  description,
  url: `${defaultMeta.url}${PATH}`,
  touristType: ['Wildlife enthusiasts', 'Families', 'Couples', 'International travellers'],
  duration: `P${nights + 1}D`,
  provider: { '@id': `${defaultMeta.url}/#org` },
  itinerary: {
    '@type': 'ItemList',
    itemListElement: items.map((n, i) => ({ '@type': 'ListItem', position: i + 1, name: n })),
  },
});

const schema = [
  trip('Kanha Safari Escape (2 nights)', 'Two nights at Surwahi Social Ecoestate with three Kanha safaris and all meals.', 2, ['Arrive from Jabalpur and estate walk', 'Morning and afternoon Kanha safaris', 'Final morning safari and departure']),
  trip('Tigers and Villages (3 nights)', 'Three nights with four Kanha safaris, all meals and a village or Gond art experience.', 3, ['Arrival and estate walk', 'Core and buffer zone safaris', 'Morning safari and village or Gond art afternoon', 'Final safari or birding walk']),
  trip("The Naturalist's Kanha (4 nights)", 'Four nights with five to six safaris across core and buffer zones, birding walks and stargazing.', 4, ['Arrival and estate walk', 'Safaris across Kanha, Kisli and buffer zones', 'Birding walks and stargazing', 'Conservation time on the estate', 'Departure']),
];

export default function Page() {
  return (
    <GuidePage
      title="Kanha Safari Packages"
      subtitle="Stay at an award-winning forest estate 20 km from Khatia gate. We plan your safaris, permits and transfers; you get the jungle and the village."
      heroImage={aboutUsImages.lodgeToday}
      heroAlt="Aerial view of Surwahi Social Ecoestate's regenerated forest near Kanha Tiger Reserve"
      md={md}
      faqs={faqs}
      schema={schema}
      ctaTitle="Get your Kanha package quote"
      related={[
        { label: 'Kanha National Park guide', href: '/kanha-national-park' },
        { label: 'Sample itineraries', href: '/plan-your-visit/itineraries' },
        { label: 'Rooms and suites', href: '/stay' },
        { label: 'Safari booking guide', href: '/plan-your-visit/safari-booking-guide' },
        { label: 'Guest reviews', href: '/stories/guest-reviews' },
        { label: 'International travellers', href: '/plan-your-visit/international-travellers' },
      ]}
    />
  );
}
