import GuidePage, { GuideFaq } from '@/components/GuidePage';
import { generatePageMetadata, defaultMeta } from '@/lib/seo';
import { aboutUsImages } from '@/lib/images';

const PATH = '/kanha-national-park';

export const metadata = generatePageMetadata(
  'Kanha National Park Guide: Zones, Safaris, Wildlife & Where to Stay',
  'A practical guide to Kanha National Park and Tiger Reserve: core and buffer safari zones, gates, seasons, wildlife including the hard-ground barasingha, how to get there and where to stay.',
  PATH,
  aboutUsImages.foundersVision,
  ['Kanha National Park', 'Kanha Tiger Reserve', 'Kanha safari', 'Kanha safari zones', 'Kanha wildlife', 'Kanha National Park travel guide', 'Kanha National Park for foreigners'],
  true
);

const md = `Kanha Tiger Reserve is one of the great wildlife landscapes of Asia: rolling sal forest, bamboo-covered hills and wide, deer-filled meadows in the Maikal range of Madhya Pradesh, almost exactly in the centre of India. It was among the first nine tiger reserves created under Project Tiger in 1973, and it is the only place in the world where the hard-ground barasingha survives in the wild in good numbers.

This guide explains how the park works, which safari zones to choose, when to go and how to get there. It is written by the team at [Surwahi Social Ecoestate](/about/our-story), an award-winning eco stay about 20 km from Kanha's Khatia gate, so where it helps we explain how a stay with us fits around the park.

## Kanha at a glance

- **Location** - Mandla and Balaghat districts, Madhya Pradesh, central India
- **Total area** - About 2,050 sq km including the buffer, according to the MP Forest Department
- **Entry gates** - Khatia, Mukki and Sarhi
- **Core safari zones** - Kanha, Kisli, Mukki and Sarhi
- **Buffer safari zones** - Khatia, Khapa, Sijhora, plus the adjoining Phen sanctuary
- **Season** - Core zones close for the monsoon from 1 July and reopen in October, on a date the Forest Department sets each year
- **Weekly closure** - Core zones are closed on Wednesday afternoons
- **Nearest airports** - Jabalpur (about 3.5 hours by road to Surwahi) and Nagpur (about 5.5 hours)

## Core and buffer zones explained

Kanha's safari area is divided into **core zones**, the protected heart of the reserve, and **buffer zones**, the forest belt around it where people and wildlife share the landscape.

The four core zones each have a strictly limited number of vehicle permits per session:

- **Kanha zone** - The classic Kanha experience: the open Kanha meadows, herds of chital and barasingha, and some of the park's most photographed tiger territories. Usually entered from Khatia gate.
- **Kisli zone** - The western core, also entered from Khatia gate. Mixed sal forest and meadow, and the core zone closest to Surwahi.
- **Mukki zone** - The southern core, entered from Mukki gate. Popular, scenic and often productive for tigers.
- **Sarhi zone** - Entered from Sarhi gate. Quieter, with fewer vehicles.

The buffer zones - **Khatia, Khapa, Sijhora and Phen** - are easier to book at short notice and are often excellent for leopard, sloth bear, gaur, wild dog and birds. Tigers are seen in the buffer too. If core permits are sold out for your dates, a buffer safari is far from a consolation prize.

One rule catches many first-time visitors: **your permit is for a zone, and each zone is entered through a specific gate.** A Mukki-zone permit cannot be used at Khatia. Choose your stay and your zones together - our [safari booking guide](/plan-your-visit/safari-booking-guide) sets out which gate serves which zone.

## What you can see in Kanha

Kanha is best known for the **Bengal tiger**, and sightings here are some of the most reliable in central India, though never guaranteed. A good safari is about the whole forest, and Kanha rewards patience:

- **Hard-ground barasingha** - The swamp deer subspecies found in the wild almost only in Kanha. Its numbers fell to around 66 animals by about 1970; decades of grassland and wetland management have brought it back, and recent reports put the Kanha population at around 1,100.
- **Leopard, dhole and sloth bear** - Often easier to find in the buffer zones.
- **Gaur** - The Indian bison, the largest wild cattle in the world, in herds along forest edges.
- **Chital, sambar, barking deer and four-horned antelope** - The deer and antelope that make Kanha's meadows feel alive.
- **Birds** - Kanha is a rewarding birding destination, with hornbills, raptors, the Indian roller, and winter visitors on the meadows and tanks.

Read more in our [wildlife safari experience](/experiences/wildlife-safaris) and [bird-watching](/experiences/bird-watching-expeditions) pages.

## When to visit Kanha

- **Mid-October to November** - Fresh green forest after the monsoon, pleasant temperatures, early-season quiet.
- **December to February** - Cold, misty mornings (bring warm layers for the open jeep), crisp light, peak travel season.
- **March to June** - Hot, dry and leafless. Animals gather at water, which is why many people consider these months the best for tiger sightings.
- **July to September** - Core zones closed for the monsoon. The forest is at its most beautiful, and some buffer areas and our estate activities remain open.

See our month-by-month [best time to visit Kanha](/plan-your-visit/best-time-to-visit) page for more detail.

## How to get to Kanha

There is no airport at the park. Most travellers fly to **Jabalpur** or **Nagpur** and drive the final stretch; some arrive via Raipur. International visitors usually connect through Delhi or Mumbai. Our [getting here guide](/plan-your-visit/getting-here) covers each route, and our [guide for international travellers](/plan-your-visit/international-travellers) covers visas, permits for foreign nationals and arrival logistics.

We arrange pickups from Jabalpur airport and railway station for our guests - ask us for a quote when you book.

## Where to stay near Kanha

Accommodation is clustered around the gates. Most lodges sit in the busy resort strip near **Khatia** or around **Mukki**. Surwahi takes a different approach: a ten-acre regenerated forest estate in Surwahi village, about 20 km from Khatia gate, outside the resort belt. You get quiet nights, a working farm, local Gond and Baiga culture and a forest that has grown from under 300 trees to more than 6,000 since 2015. The trade-off is a slightly longer drive to the gate before a morning safari.

Compare the options honestly in our guide to [where to stay in Kanha](/where-to-stay-in-kanha), or go straight to our [stay and safari packages](/kanha-safari-packages).

## Responsible safari etiquette

- Wear muted, earthy colours and keep voices low.
- Never ask your driver to chase, crowd or block an animal. Follow your guide and the park rules.
- No feeding, no littering, no drones, and no flash on nocturnal animals.
- Carry your original ID (passport for foreign nationals) - it must match your permit.
- Remember that a good safari is not only about tigers. The jungle rewards the curious.`;

const faqs: GuideFaq[] = [
  { question: 'Is Kanha National Park good for seeing tigers?', answer: 'Kanha is one of the most reliable tiger reserves in central India, especially in the core zones and in the hotter months from March to June, when animals gather near water. No reserve can guarantee a sighting; booking several safaris across different zones gives you the best chance.' },
  { question: 'Which is better, Kanha or Mukki zone?', answer: 'Both are excellent core zones. Kanha zone has the famous open meadows and barasingha herds, while Mukki is scenic and often productive for tigers. The bigger question is which gate you are staying near: Kanha and Kisli zones are entered from Khatia gate, Mukki zone from Mukki gate. Surwahi is closest to Khatia gate (about 20 km) and about 35 km from Mukki.' },
  { question: 'How many days do I need in Kanha?', answer: 'We suggest at least two nights, which gives you three or four safaris. Three or four nights lets you combine core and buffer zones, add a walk or village visit on the estate, and rest between early starts. See our sample itineraries.' },
  { question: 'When is Kanha National Park closed?', answer: 'Core zones close for the monsoon from 1 July and reopen in October; the Forest Department announces the exact opening date each year. Core zones are also closed on Wednesday afternoons and around some festivals such as Holi. Some buffer zones and all Surwahi estate activities stay open through the monsoon.' },
  { question: 'Can foreigners visit Kanha National Park?', answer: 'Yes. Foreign nationals are welcome. They pay a different safari permit fee from Indian citizens and must carry the passport used to book the permit. Most visitors need an Indian visa, which many nationalities can get as an e-Visa. Our international travellers guide covers this in detail.' },
  { question: 'Where is the barasingha found?', answer: 'The hard-ground barasingha is native to central India and survives in the wild mainly in Kanha Tiger Reserve, where it is the park mascot and the state animal of Madhya Pradesh. Small populations have recently been re-established in Satpura and Bandhavgarh tiger reserves through translocations from Kanha.' },
];

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'Park'],
    '@id': `${defaultMeta.url}${PATH}#park`,
    name: 'Kanha National Park (Kanha Tiger Reserve)',
    description: 'Tiger reserve in the Maikal hills of Madhya Pradesh, India, known for Bengal tigers, sal forests and meadows, and the hard-ground barasingha.',
    url: `${defaultMeta.url}${PATH}`,
    image: [aboutUsImages.foundersVision],
    touristType: ['Wildlife enthusiasts', 'Birdwatchers', 'Photographers', 'Families', 'International travellers'],
    address: { '@type': 'PostalAddress', addressRegion: 'Madhya Pradesh', addressCountry: 'IN' },
    isAccessibleForFree: false,
    publicAccess: true,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Kanha National Park Guide: Zones, Safaris, Wildlife & Where to Stay',
    about: { '@id': `${defaultMeta.url}${PATH}#park` },
    author: { '@type': 'Organization', name: defaultMeta.siteName, url: defaultMeta.url },
    publisher: { '@id': `${defaultMeta.url}/#org` },
    mainEntityOfPage: `${defaultMeta.url}${PATH}`,
    image: aboutUsImages.foundersVision,
    inLanguage: 'en',
    dateModified: '2026-11-22',
  },
];

export default function Page() {
  return (
    <GuidePage
      title="Kanha National Park: The Complete Guide"
      subtitle="Zones, gates, seasons, wildlife and logistics for Kanha Tiger Reserve, from a forest estate 20 km from Khatia gate."
      heroImage={aboutUsImages.foundersVision}
      heroAlt="Aerial view of forest and farmland at Surwahi, about 20 km from Kanha's Khatia gate"
      md={md}
      faqs={faqs}
      schema={schema}
      related={[
        { label: 'Kanha stay + safari packages', href: '/kanha-safari-packages' },
        { label: 'Where to stay in Kanha', href: '/where-to-stay-in-kanha' },
        { label: 'Sample Kanha itineraries', href: '/plan-your-visit/itineraries' },
        { label: 'Kanha for international travellers', href: '/plan-your-visit/international-travellers' },
        { label: 'Safari booking guide', href: '/plan-your-visit/safari-booking-guide' },
        { label: 'Kanha vs Bandhavgarh vs Pench', href: '/blogs/kanha-vs-bandhavgarh-vs-pench' },
      ]}
    />
  );
}
