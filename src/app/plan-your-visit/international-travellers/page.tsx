import GuidePage, { GuideFaq } from '@/components/GuidePage';
import { generatePageMetadata, defaultMeta } from '@/lib/seo';
import { aboutUsImages } from '@/lib/images';

const PATH = '/plan-your-visit/international-travellers';

export const metadata = generatePageMetadata(
  'Kanha National Park for International Travellers: Visas, Safaris & Logistics',
  'Planning a Kanha tiger safari from abroad? Visas, safari permits for foreign nationals, flights and transfers, money, health, packing and what to expect at Surwahi Social Ecoestate.',
  PATH,
  aboutUsImages.foundersVision,
  ['Kanha National Park for foreigners', 'tiger safari India from UK', 'tiger safari India from USA', 'Kanha safari foreign nationals', 'India wildlife holiday', 'central India tiger safari', 'eco lodge India responsible travel'],
  true
);

const md = `Kanha is one of the best places in the world to see a wild tiger, and one of the least crowded of India's famous parks. It is also deep in rural central India, so a little planning goes a long way. This page brings together what international guests most often ask us, from visas to what to wear on a winter safari.

Rules and fees change. Where something depends on government policy, we have said so; always check the official source before you travel.

## Visas

Most foreign nationals need a visa to enter India. Many nationalities, including citizens of the UK, the USA, most of the EU, Canada and Australia, can apply online for an **Indian e-Visa** (e-Tourist Visa) through the Government of India's official portal, **indianvisaonline.gov.in/evisa**. Use only the official site; many look-alike sites charge extra fees.

Apply well ahead of your trip, and make sure your passport is valid for at least six months from your arrival date. Check the current rules and the list of eligible countries on the official portal, as both are revised from time to time.

## Safari permits for foreign nationals

- Kanha safari permits are issued by the MP Forest Department. **Foreign nationals pay a higher permit fee than Indian citizens.** We quote it at the current official rate.
- Each permit is linked to the traveller's ID. **Carry the original passport you used to book**; it is checked at the gate.
- Core-zone permits are limited and sell out in peak season (roughly November to May). Send us your passport details as soon as your dates are fixed, and we will book permits, jeep and guide for you.
- Children's age rules for core zones are set by the park. Tell us your children's ages and we will check.

Our [safari booking guide](/plan-your-visit/safari-booking-guide) explains zones and timings, and our [Kanha National Park guide](/kanha-national-park) covers the park itself.

## Getting to Kanha from abroad

There is no international airport near Kanha. The usual pattern is:

1. **Fly into Delhi or Mumbai** (Bengaluru and Hyderabad also work from Asia).
2. **Take a domestic flight to Jabalpur** (or Nagpur). Many guests sleep a night in the arrival city first. It makes the first safari far more enjoyable.
3. **Drive to Surwahi** - about 3.5 hours from Jabalpur or 5.5 hours from Nagpur. We arrange pickups.

Allow plenty of time between your international arrival and a domestic connection, and check domestic baggage limits, which are often lower than international ones. That matters if you are bringing long lenses.

Our blog post [How to Reach Kanha National Park from Abroad](/blogs/how-to-reach-kanha-national-park-from-abroad) walks through each route step by step.

## Combining Kanha with the rest of India

Kanha fits neatly into a longer India itinerary. Popular combinations with our guests:

- **The Golden Triangle plus tigers** - Delhi, Agra and Jaipur, then fly to Jabalpur for Kanha.
- **Central India tiger circuit** - Kanha with Bandhavgarh or Pench. Read our [comparison of the three parks](/blogs/kanha-vs-bandhavgarh-vs-pench).
- **Temples and tigers** - Khajuraho's temples combined with Bandhavgarh and Kanha.

See our [sample itineraries](/plan-your-visit/itineraries) for day-by-day ideas.

## At Surwahi: what to expect

- **Registration** - Indian law requires all accommodation to record foreign guests' passport and visa details, so we will ask for copies at check-in.
- **Rooms** - Mud-built [suites and a dormitory](/stay), without air conditioning; fans and cross-ventilation keep them comfortable.
- **Food** - All meals are included. The food is home-style central Indian, mostly vegetarian, with non-vegetarian options. Tell us how much spice you enjoy. We cater for vegan, gluten-free and other diets on request.
- **Water** - Drink only the filtered water we provide, or bottled water when travelling.
- **Connectivity** - WiFi in common areas only, and patchy mobile signal. If you need to work, tell us in advance.
- **Money** - We accept bank transfers, UPI, cards and cash. If you plan to pay by international card, tell us beforehand so we can confirm. Carry some rupees for small purchases; ATMs are scarce in rural areas.
- **Culture** - Surwahi is a working village. Ask before photographing people, dress modestly in the village, and say yes to the tea.

## Health and safety

- See a travel-health clinic before your trip for advice on vaccinations and malaria precautions for rural central India.
- Use insect repellent at dawn and dusk, and wear long sleeves in the evening.
- Pack any regular medicines in your hand luggage, with enough for the whole trip.
- Get travel insurance that covers medical evacuation. Kanha is several hours from a major city hospital.
- On safari, stay seated in the jeep and follow your guide. Wildlife viewing in Kanha is well regulated and safe when the rules are followed.

## What to pack

- **November to February** - Open jeeps at dawn are genuinely cold. Temperatures can drop to around 4°C. Bring a warm jacket, hat, gloves and a scarf or buff for dust.
- **March to June** - It gets very hot, regularly above 40°C. Pack a wide-brimmed hat, light long sleeves, sunscreen and a refillable water bottle.
- **All year** - Neutral-coloured clothing (olive, khaki, brown), binoculars, a headlamp, a camera with a zoom lens, and a power bank.`;

const faqs: GuideFaq[] = [
  { question: 'Do I need a visa to visit Kanha National Park?', answer: 'Most foreign nationals need an Indian visa. Many nationalities can apply online for an Indian e-Visa through the official Government of India portal (indianvisaonline.gov.in/evisa). Check eligibility and current rules there before booking flights.' },
  { question: 'Is the Kanha safari more expensive for foreigners?', answer: 'Yes. The MP Forest Department charges foreign nationals a higher permit fee than Indian citizens. Vehicle and guide charges are separate. We quote the full safari cost at current official rates before booking.' },
  { question: 'What ID do foreigners need for a Kanha safari?', answer: 'Your original passport, matching the details used to book the permit. It is checked at the park gate, so keep it with you on every safari.' },
  { question: 'Which airport is closest to Kanha for international visitors?', answer: 'Jabalpur (JLR) is the most convenient. Fly into Delhi or Mumbai, connect to Jabalpur, then drive about 3.5 hours to Surwahi. Nagpur (NAG) is an alternative with a longer drive of about 5.5 hours.' },
  { question: 'Is Kanha safe for foreign tourists?', answer: 'Kanha is a well-managed, well-regulated tiger reserve, and rural Madhya Pradesh is generally welcoming to visitors. Usual travel sense applies: follow your guide on safari, drink filtered water, use repellent, and carry travel insurance with medical cover.' },
  { question: 'When is the best time for an international visitor to come?', answer: 'November to February offers cool, pleasant days that suit most visitors from cooler climates, though early mornings are cold in an open jeep. March to May is hot but often best for tiger sightings. Core zones are closed from July until the October reopening.' },
];

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Kanha National Park for International Travellers: Visas, Safaris & Logistics',
    author: { '@type': 'Organization', name: defaultMeta.siteName, url: defaultMeta.url },
    publisher: { '@id': `${defaultMeta.url}/#org` },
    about: { '@id': `${defaultMeta.url}/kanha-national-park#park` },
    audience: { '@type': 'Audience', audienceType: 'International travellers' },
    mainEntityOfPage: `${defaultMeta.url}${PATH}`,
    image: aboutUsImages.foundersVision,
    inLanguage: 'en',
    dateModified: '2026-11-22',
  },
];

export default function Page() {
  return (
    <GuidePage
      title="Kanha for International Travellers"
      subtitle="Visas, safari permits for foreign nationals, flights, money, health and packing: everything you need to plan a tiger safari in central India."
      heroImage={aboutUsImages.foundersVision}
      heroAlt="Aerial view of the forest estate at Surwahi near Kanha Tiger Reserve"
      md={md}
      faqs={faqs}
      schema={schema}
      ctaTitle="Planning from abroad? Write to us"
      ctaText="Send your travel dates, the number of travellers and your arrival city. We will reply with availability, safari options, transfer timings and a full quote."
      related={[
        { label: 'How to reach Kanha from abroad', href: '/blogs/how-to-reach-kanha-national-park-from-abroad' },
        { label: 'Your first tiger safari in India', href: '/blogs/first-tiger-safari-in-india-guide' },
        { label: 'Sample itineraries', href: '/plan-your-visit/itineraries' },
        { label: 'Kanha safari packages', href: '/kanha-safari-packages' },
        { label: 'Getting here', href: '/plan-your-visit/getting-here' },
        { label: 'FAQs', href: '/plan-your-visit/faqs' },
      ]}
    />
  );
}
