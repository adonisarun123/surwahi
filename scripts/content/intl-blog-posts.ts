// International-intent blog posts (drafted 2026-10-29). Inserted as DRAFT — review facts, then publish in /admin.
// Facts about Surwahi come only from existing site pages (our-story, stay, getting-here, safari-booking-guide).
// Park facts are general and well documented; permit fees and timetables are deliberately NOT quoted (they change).

const IK = 'https://ik.imagekit.io/adonisarun/';
const img = (p: string) => IK + encodeURI(p);

export interface SeedPost {
  slug: string; title: string; excerpt: string; category: string; author: string;
  coverUrl: string; coverAlt: string; tags: string[]; seoTitle: string; seoDescription: string; content: string;
}

export const intlBlogPosts: SeedPost[] = [
  {
    slug: 'how-to-reach-kanha-national-park-from-abroad',
    title: 'How to Reach Kanha National Park from Abroad: A Step-by-Step Route Guide',
    excerpt: 'Flying in from Europe, the US or Asia? The simplest routes to Kanha Tiger Reserve via Delhi, Mumbai, Jabalpur and Nagpur, with visas, timing and transfer tips.',
    category: 'Travel Tips',
    author: 'Surwahi Team',
    coverUrl: img('Website Photos/DJI_20250819094705_0108_D.JPG'),
    coverAlt: 'Aerial view of the forest around Surwahi Social Ecoestate near Kanha National Park',
    tags: ['Kanha National Park', 'how to reach Kanha', 'India travel', 'international travellers', 'Madhya Pradesh'],
    seoTitle: 'How to Reach Kanha National Park from Abroad | Route Guide',
    seoDescription: 'Step-by-step routes to Kanha Tiger Reserve for international visitors: which Indian hub to fly into, Jabalpur vs Nagpur, trains, road transfers and timing.',
    content: `
Kanha Tiger Reserve sits in the Maikal hills of Madhya Pradesh, right in the middle of India. That central location is part of its magic - and the reason first-time visitors from abroad often ask the same question: *how do I actually get there?*

The short answer: fly into a major Indian hub, take a domestic flight or train to **Jabalpur** or **Nagpur**, then drive. This guide walks through each leg, so you can plan the whole journey with confidence.

## Step 1: Fly into a major Indian hub

Kanha has no international airport nearby, so your long-haul flight will land at one of India's big gateways. The two most practical are:

- **Delhi (DEL)** - the widest choice of international arrivals and onward domestic flights to Jabalpur.
- **Mumbai (BOM)** - well connected to Europe, the Middle East and Africa, with domestic connections to both Jabalpur and Nagpur.

Travellers coming from South or East Asia sometimes route through **Bengaluru (BLR)** or **Hyderabad (HYD)** instead; Jabalpur has domestic flights from both.

**Tip:** leave a generous buffer between your international arrival and your domestic connection, especially if you are collecting bags and changing terminals. Many visitors spend their first night in Delhi or Mumbai and fly on the next morning, fresh.

## Step 2: Choose your nearest airport - Jabalpur or Nagpur

| | Jabalpur (JLR) | Nagpur (NAG) |
|---|---|---|
| Drive to Surwahi | ~160 km, about 3.5 hours | ~270 km, about 5.5 hours |
| Best for | The shortest road transfer | Wider flight choice, especially from South India |

For most guests, **Jabalpur is the better choice** - the drive is shorter and passes through the farmland and forests of the Mandla district. Nagpur makes sense if its flight timings suit you better.

See our [Getting Here guide](/plan-your-visit/getting-here) for current details.

## Step 3: Or take the train

India's railways are an experience in themselves. **Jabalpur Junction (JBP)** is the main railhead for Kanha and is connected to Delhi, Mumbai, Kolkata and other major cities. Overnight trains in an air-conditioned sleeper class are comfortable and let you wake up close to the forest. From Jabalpur station it is roughly a 3.5-hour drive to Surwahi.

Book train tickets well in advance during the peak season (October to March) - popular routes fill early.

## Step 4: The road transfer

The final leg is by road. Most guests drive from Jabalpur or Nagpur and continue via Mandla towards the park gates. Surwahi Social Ecoestate is about **21 km by road from the Khatia Gate** of Kanha, in the quieter buffer-zone countryside, so you get easy safari access without the bustle of the main gate.

Self-driving in India is not recommended for first-time visitors. Arrange a car with a driver in advance - [contact us](/contact) when you book and we will help you plan the transfer.

## Before you fly: visas, money and timing

**Visa.** Most nationalities need a visa for India, and many are eligible for an e-Visa that you apply for online before travel. Always check the official Indian government visa website for the current rules for your passport.

**Money.** India's currency is the rupee (INR). Carry some cash for small purchases on the road; at Surwahi you can pay by card, UPI, bank transfer or cash.

**When to go.** Kanha's core safari zones are open from mid-October to the end of June and close for the monsoon from 1 July to 15 October. October to March is cool and pleasant; March to May is hot, but animals gather at waterholes. Our [best time to visit guide](/plan-your-visit/best-time-to-visit) has the month-by-month detail.

**Safari permits.** Core-zone permits are limited and sell out in peak season, so book early. Foreign nationals need their passport details for the permit. Read our [safari booking guide](/plan-your-visit/safari-booking-guide) - and if you are staying with us, we can arrange permits for you.

## A sample itinerary from abroad

- **Day 1:** Land in Delhi or Mumbai. Rest overnight near the airport.
- **Day 2:** Morning flight to Jabalpur, then about 3.5 hours by road to Surwahi. Evening walk in the regrowing forest, dinner from the Kodo Kutki Kitchen.
- **Days 3-4:** Morning safaris in Kanha, afternoons for village walks, Gond art or simply resting in a mud-built room that stays cool without air conditioning.
- **Day 5:** Drive back to Jabalpur for your onward flight.

We suggest at least **three nights** near Kanha. It gives you several safari drives - and time to slow down, which is the point of coming this far.

## Plan your stay

Surwahi Social Ecoestate is an award-winning, community-run eco stay with mud-built family suites, an earthen dormitory and seasonal camping, with all meals included. [Explore the stays](/stay) or [send us your travel dates](/contact) and we will help you plan the route.
`,
  },
  {
    slug: 'kanha-vs-bandhavgarh-vs-pench',
    title: 'Kanha vs Bandhavgarh vs Pench: Which Tiger Reserve Should You Visit?',
    excerpt: "Central India's three best-known tiger reserves compared - landscape, wildlife, crowds and access - so you can choose the right one for your trip.",
    category: 'Wildlife',
    author: 'Surwahi Team',
    coverUrl: img('Website Photos/IMG20231020171008.jpg'),
    coverAlt: 'Sal forest near Kanha Tiger Reserve, Madhya Pradesh',
    tags: ['Kanha vs Bandhavgarh', 'Pench National Park', 'tiger reserves India', 'tiger safari', 'Madhya Pradesh'],
    seoTitle: 'Kanha vs Bandhavgarh vs Pench: Which Tiger Reserve?',
    seoDescription: 'Kanha, Bandhavgarh or Pench? An honest comparison of central India’s tiger reserves - landscapes, wildlife, crowds and access - to help you choose.',
    content: `
If you are planning a tiger safari in India, three names come up again and again: **Kanha**, **Bandhavgarh** and **Pench**. All three are in Madhya Pradesh, all three have tigers, and all three are worth visiting. They are also genuinely different. Here is how they compare, so you can pick the one that fits your trip.

*Full disclosure: we live next to Kanha, so we are biased. We have tried to be fair anyway.*

## Kanha: the classic, big-landscape reserve

Kanha is one of India's largest and best-known tiger reserves, and one of the original reserves under Project Tiger. Its landscape is what most people picture when they imagine central India: tall sal forests opening into wide grassy meadows, with bamboo on the slopes of the Maikal hills.

**What makes it special**

- **The barasingha.** Kanha is home to the hard-ground swamp deer, Madhya Pradesh's state animal. This subspecies was brought back from the brink of extinction inside Kanha - one of India's great conservation stories.
- **Space.** The meadows make for long sightlines and beautiful photography, and the reserve is big enough that it rarely feels crowded.
- **Variety.** Beyond tigers, visitors regularly see gaur (Indian bison), sambar, chital, wild boar and a rich birdlife; leopards and sloth bears are seen too, more often in the buffer zones.

**Best for:** first-time visitors who want the full central Indian forest experience, photographers, and anyone staying three nights or more.

## Bandhavgarh: high density, dramatic scenery

Bandhavgarh is smaller than Kanha and famous for its high density of tigers, which is why it is so popular with visitors focused on a sighting. An ancient hill fort rises above the forest, giving the park a dramatic backdrop.

**Best for:** travellers with limited time whose single priority is maximising the chance of seeing a tiger.

**Trade-offs:** its popularity means safari vehicles can bunch up at sightings, and permits sell out quickly in peak season.

## Pench: teak forests and The Jungle Book country

Pench straddles the border between Madhya Pradesh and Maharashtra, named after the river that runs through it. Its teak-dominated forests and the surrounding Seoni hills are the landscape Rudyard Kipling wrote about in *The Jungle Book*.

**Best for:** families and travellers flying into Nagpur, which is the closest of the three to a major airport.

## At a glance

| | Kanha | Bandhavgarh | Pench |
|---|---|---|---|
| Landscape | Sal forest and open meadows | Hills, cliffs, fort | Teak forest, river |
| Signature species | Barasingha (hard-ground swamp deer) | High tiger density | Wild dogs, leopards |
| Feel | Vast, less crowded | Busy, tiger-focused | Relaxed, accessible |
| Nearest airports | Jabalpur, Nagpur | Jabalpur, Khajuraho | Nagpur |

## Can you combine them?

Yes - many international visitors do a central India circuit, typically **Kanha with Bandhavgarh** or **Kanha with Pench**. Allow a full day for the drive between parks, and at least two or three nights in each so you have several safari drives.

## Our honest advice

If you only have time for one reserve, and you want the classic experience of India's forests rather than a single checklist sighting, **choose Kanha**. The landscape is unforgettable, the barasingha are found nowhere else in the wild, and the buffer-zone villages give you a real sense of how people and wildlife share this land.

Wherever you go, remember that sightings are never guaranteed. That is what makes them meaningful.

## Staying near Kanha

Surwahi Social Ecoestate is about 21 km from Kanha's Khatia Gate - an award-winning, community-run eco stay on ten acres of regrowing forest. Read our [Kanha safari booking guide](/plan-your-visit/safari-booking-guide), see [how to get here](/plan-your-visit/getting-here), or [explore our stays](/stay).
`,
  },
  {
    slug: 'first-tiger-safari-in-india-guide',
    title: "Your First Tiger Safari in India: A Practical Guide to Kanha",
    excerpt: 'What a safari in Kanha is really like - zones, timings, what to wear, what you might see, and the etiquette that keeps the forest wild.',
    category: 'Wildlife',
    author: 'Surwahi Team',
    coverUrl: img('Website Photos/IMG20231020170019.jpg'),
    coverAlt: 'Forest track in the Kanha landscape, Madhya Pradesh',
    tags: ['tiger safari India', 'Kanha safari', 'first safari tips', 'wildlife India', 'Kanha Tiger Reserve'],
    seoTitle: 'First Tiger Safari in India? A Practical Guide to Kanha',
    seoDescription: 'First tiger safari in India? How Kanha safaris work - core and buffer zones, timings, what to wear and pack, what you might see, and safari etiquette.',
    content: `
A tiger safari in India is unlike a safari in Africa. The forest is denser, the animals are more secretive, and much of the excitement comes from reading the jungle - an alarm call from a langur, fresh pugmarks on a dusty track - long before you see anything. Here is what to expect on your first safari in Kanha.

## How Kanha safaris work

Safaris in Kanha Tiger Reserve run in open 4x4 vehicles (usually called Gypsys) with a registered driver and a forest-department guide. Each vehicle enters through a specific gate into a specific **zone**, and the number of vehicles per zone is capped each day. That cap is why permits sell out.

### Core zones and buffer zones

- **Core zones** - Khatia, Kanha, Mukki and Sarhi - are the heart of the reserve. They need advance booking and are closed during the monsoon (1 July to 15 October).
- **Buffer zones** - such as Khatia Buffer, Khapa and Sijhora - surround the core. Permits are easier to get, and they can be good for leopards and sloth bears.

Khatia is the gate closest to Surwahi, about 21 km by road.

### Morning or afternoon?

There are two safaris a day: an early-morning drive starting around dawn and an afternoon drive ending around sunset. The exact times change with the season and are set by the Madhya Pradesh Forest Department - see our [safari booking guide](/plan-your-visit/safari-booking-guide) for the current timetable.

Morning safaris generally offer the best chance of tiger sightings, with cool air, soft light and animals on the move. If you can, book at least three drives over two or three days.

## How to book permits as a foreign visitor

Permits are booked through the official Madhya Pradesh Forest Department portal, and foreign nationals need their passport details. Fees are different for Indian and foreign visitors and change from time to time, so always check the official portal for current prices.

If you are staying with us, we can arrange permits for confirmed guests - the hassle-free option, especially in peak season. [Ask us when you book](/contact).

## What you might see

Tigers are the headline, but Kanha is a whole ecosystem. On a typical drive you might see:

- **Barasingha** - the hard-ground swamp deer, saved from extinction in Kanha
- **Gaur** - the Indian bison, the largest wild cattle in the world
- **Chital and sambar** deer, wild boar and langur monkeys
- **Leopard, sloth bear and dhole** (Indian wild dog), seen less often
- Hundreds of bird species, from crested serpent eagles to Indian rollers

Sightings are never guaranteed. Go in with curiosity, not a checklist, and the forest rarely disappoints.

## What to wear and pack

- **Layers.** Winter mornings in an open vehicle are genuinely cold (single digits °C, around 40°F, in December and January). Bring a warm jacket, hat and gloves. Summer afternoons are hot.
- **Muted colours.** Khaki, olive and brown. Avoid bright colours and white.
- **A scarf or buff** for the dust.
- **Binoculars** - the single best upgrade to any safari.
- **Camera** with a zoom lens (a 100-400mm range is ideal), plus spare batteries.
- **Sunscreen, a hat and water.**
- **Your passport** - you may need it at the gate.

## Safari etiquette

- **Stay quiet.** Voices carry, and silence is how you hear the alarm calls that lead to sightings.
- **Stay in the vehicle** at all times, and never ask your driver to leave the track or crowd an animal.
- **No food scraps or plastic** in the forest.
- **Respect the rules** on timings and speed - they protect the animals and the guides' livelihoods.

## Beyond the safari

The safari is a few hours of your day. The rest is where a place like Kanha gets under your skin: walking through village farmland, learning Gond art from a local artist, eating food cooked with local grains, or watching birds from a forest that has regrown around you.

At Surwahi Social Ecoestate, about 21 km from the Khatia Gate, the land we have left alone for ten years now records 59 bird species and visits from leopard, sambar and barking deer at our rainwater pond. [Explore our experiences](/experiences) or [plan your stay](/stay).
`,
  },
  {
    slug: 'how-to-choose-a-genuine-eco-lodge-in-india',
    title: 'How to Choose a Genuine Eco Lodge in India: A Checklist for Responsible Travellers',
    excerpt: '"Eco" is on every resort sign. Eight questions to ask before you book, so your stay actually helps the forest and the community around it.',
    category: 'Sustainability',
    author: 'Surwahi Team',
    coverUrl: img('Surwahi Social Photos/A.jpg'),
    coverAlt: 'Mud-built structure at Surwahi Social Ecoestate near Kanha',
    tags: ['eco lodge India', 'responsible travel India', 'sustainable tourism', 'greenwashing', 'Kanha eco stay'],
    seoTitle: 'How to Choose a Genuine Eco Lodge in India: 8 Questions',
    seoDescription: 'Avoid greenwashing: eight questions to ask before booking an eco lodge in India - construction, land, water, local jobs and wildlife - with real answers.',
    content: `
Search for an eco lodge in India and you will find hundreds of them. Some are doing remarkable work. Others have simply painted a resort green. If you care about where your travel money goes, a few pointed questions will quickly tell them apart.

We run an eco stay near Kanha Tiger Reserve, so we know these questions are fair - we ask them of ourselves. Here is the checklist, with our own answers as examples.

## 1. What is it built from?

Concrete and glass in a forest is hard to call sustainable. Look for local, low-carbon materials and building methods suited to the climate.

*At Surwahi:* our buildings are made from stabilised mud cob - about 10,000 sq ft of it - with minimal steel, glass or cement, and roofs insulated with terracotta tiles salvaged from village homes. Rooms stay below about 28°C when Kanha crosses 40°C outside, without air conditioning.

## 2. How much of the land is built on?

A genuinely low-impact property leaves most of its land alone.

*At Surwahi:* we own ten acres and build on two. The other eight are fenced and permanently untouched.

## 3. Is the land getting wilder or tamer?

Ask whether there is any evidence: tree counts, bird lists, wildlife records.

*At Surwahi:* the land held fewer than 300 trees when we bought it in 2015. By the March 2025 tree census it held more than 6,000 native plants and trees, and 59 documented bird species. [See the tree census](/sustainability/tree-census-and-biodiversity-reports).

## 4. What happens to water and waste?

Water is the hidden pressure point in most tourist areas. Ask about rainwater harvesting, sanitation and what leaves the property.

*At Surwahi:* we use a zero-discharge [evapotranspiration toilet system](/sustainability/evapo-transpiration-toilets), and our rainwater pond has become a summer water source for wild boar, sambar, barking deer and leopard.

## 5. Who works there - and who benefits?

The most important question. Are staff hired from nearby villages, trained and promoted - or brought in from the city?

*At Surwahi:* every person we employ directly comes from a surrounding village. Our estate manager was our first hire, ten years ago. Local masons trained here in earthen construction now work independently, and in 2017 we helped more than 40 village women organise a self-help group.

## 6. Is the culture shared or performed?

There is a difference between a dance show at dinner and learning from people on their own terms.

*At Surwahi:* Gond artist Sanjay Pancheshwar teaches guests rather than performing for them, and our neighbouring farmer takes guests into his fields in the monsoon. [See our workshops](/workshops).

## 7. How does it treat wildlife?

Be wary of anywhere offering guaranteed sightings, animal feeding or night drives where they are not permitted.

*At Surwahi:* our team is trained in snake rescue, and the animals on our land arrived because it became safe - not because we baited them.

## 8. Can it show independent recognition?

Awards are not everything, but third-party assessment is better than self-description.

*At Surwahi:* recognitions include TOFTigers Most Inspirational Eco Lodge 2024 and the AEN International Ecotourism Award 2025 for sustainable building. [See all our awards](/praises/awards-and-accolades).

## The bottom line

A genuine eco lodge should be able to answer every question above specifically, with numbers and names - not just adjectives. If the answers are vague, the "eco" probably is too.

If our answers convinced you, [explore our stays near Kanha](/stay) or [read our story](/about/our-story).
`,
  },
];
