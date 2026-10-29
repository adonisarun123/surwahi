// International-intent blog posts (drafted 2026-10-29, expanded to 1,200+ words each).
// Inserted as DRAFT — review facts, then publish in /admin.
// Facts about Surwahi come only from existing site pages (our-story, stay, getting-here, safari-booking-guide, sustainability).
// Park facts are general and well documented; permit fees and exact timetables are deliberately NOT quoted (they change).

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
Kanha Tiger Reserve sits in the Maikal hills of Madhya Pradesh, almost exactly in the middle of India. That central location is part of its magic: it is far from the coastal tourist trail, wrapped in sal forest and farmland, and still feels like the India of the old natural-history books. It is also the reason first-time visitors from abroad ask the same question before anything else: *how do I actually get there?*

The short answer is simple. Fly into a major Indian hub, take a domestic flight or an overnight train to **Jabalpur** or **Nagpur**, then drive the last few hours by road. The longer answer, below, walks through each leg in order, with the small practical details that make the difference between an exhausting journey and an easy one.

## Step 1: Fly into a major Indian hub

There is no international airport close to Kanha, so your long-haul flight will land at one of India's big gateways. The two most practical choices are:

- **Delhi (DEL)** - the widest choice of international arrivals from Europe, North America and the Middle East, and frequent domestic flights onward to Jabalpur.
- **Mumbai (BOM)** - very well connected to Europe, the Gulf and Africa, with domestic connections to both Jabalpur and Nagpur.

Travellers coming from South-East or East Asia sometimes route through **Bengaluru (BLR)** or **Hyderabad (HYD)** instead, and both have domestic flights to Jabalpur.

When you compare fares, compare the *whole* journey rather than just the long-haul ticket. A slightly more expensive international flight that lands in the morning, with an easy same-day connection to Jabalpur, can save you a hotel night and most of a day.

### Give yourself a buffer

Leave a generous gap between your international arrival and your domestic connection. Immigration queues at Indian hubs vary a lot, you will usually need to collect your bags and re-check them, and the domestic terminal may be in a different building. Many of our international guests choose to spend their first night in Delhi or Mumbai, sleep off the long flight, and fly on the next morning. It makes the first day in the forest far more enjoyable.

Remember too that **domestic baggage allowances in India are often lower than international ones**. Check your domestic airline's rules before you pack, particularly if you are bringing heavy camera equipment.

## Step 2: Choose your nearest airport - Jabalpur or Nagpur

Two airports serve Kanha. Here is how they compare for a stay at Surwahi:

| | Jabalpur (JLR) | Nagpur (NAG) |
|---|---|---|
| Drive to Surwahi | ~160 km, about 3.5 hours | ~270 km, about 5.5 hours |
| Best for | The shortest road transfer | Wider flight choice, especially from South India |
| The drive | Farmland, villages and forest via Mandla | Longer highway stretches, then rural roads |

For most guests, **Jabalpur is the better choice**. The drive is shorter and genuinely beautiful, passing through the farmland and forests of the Mandla district on the way to the park. Nagpur makes sense if its flight timings work better for you, or if you are combining Kanha with Pench Tiger Reserve, which lies closer to Nagpur.

Our [Getting Here guide](/plan-your-visit/getting-here) has the current details for each route.

## Step 3: Or take the train

India's railways are an experience in their own right, and many travellers from abroad love them. **Jabalpur Junction (JBP)** is the main railhead for Kanha and is connected to Delhi, Mumbai, Kolkata and other major cities.

An overnight train in an air-conditioned sleeper class is comfortable, safe and surprisingly restful. You board in the evening, sleep through the journey, and wake up a few hours' drive from the forest. From Jabalpur station it is roughly a 3.5-hour drive to Surwahi.

A few tips for the train:

- **Book early.** Popular routes fill weeks ahead during the peak season from October to March.
- **Choose air-conditioned classes** for an overnight journey; bedding is usually provided.
- **Keep a small day bag** with water, snacks, a light layer and your passport within reach.

## Step 4: The road transfer

The final leg is always by road. Most guests drive from Jabalpur or Nagpur and continue via Mandla towards the park gates. Surwahi Social Ecoestate is about **21 km by road from the Khatia Gate** of Kanha, in the quieter buffer-zone countryside. That means easy access to safaris without the bustle of the hotels clustered right at the gate.

**We do not recommend self-driving** for first-time visitors to India. Rural roads are shared with bicycles, bullock carts, cattle and village life, and the rules of the road take some getting used to. Arrange a car with an experienced local driver in advance - [contact us](/contact) when you book and we will help you plan the transfer.

Try to schedule the drive so you arrive in daylight. The countryside is a large part of the experience, and driving on unfamiliar rural roads after dark is best avoided.

## Before you fly: visas, money, connectivity and health

**Visa.** Most nationalities need a visa to visit India, and many are eligible for an e-Visa that you apply for online before you travel. Rules change and differ by passport, so always check the official Indian government visa website rather than a third-party agent.

**Money.** India's currency is the rupee (INR). Cards are widely accepted in cities, but carry some cash for tea stops, tips and small purchases on the road. At Surwahi you can pay by card, UPI, bank transfer or cash.

**Staying connected.** Local SIM cards and eSIM plans for visitors are widely available and usually inexpensive, and you will typically need your passport and visa to buy one. At Surwahi, Wi-Fi is available in the common areas - though we hope you will spend most of your time looking up at the trees rather than down at a screen.

**Health.** Visit a travel health clinic a few weeks before your trip for advice on vaccinations and any medication appropriate for central India. Drink bottled or filtered water, and pack insect repellent and sunscreen.

## When to plan your trip

Kanha's core safari zones are open from mid-October to the end of June and **close for the monsoon from 1 July to 15 October**. Surwahi itself is open all year, and the monsoon months have their own quiet beauty - green, misty and full of birdsong.

- **October to March** is cool, dry and pleasant, and the most popular time to visit. December and January mornings are genuinely cold in an open safari vehicle.
- **March to May** is hot, but animals gather around the remaining water, which can improve sightings.

Our [best time to visit guide](/plan-your-visit/best-time-to-visit) has the month-by-month detail, including temperatures and festivals.

### Safari permits

Core-zone safari permits are limited and sell out early in peak season, so book them as soon as your dates are fixed. Foreign nationals need their passport details for the permit. Read our [safari booking guide](/plan-your-visit/safari-booking-guide) for zones and timings - and if you are staying with us, we can arrange permits for you.

## A sample itinerary from abroad

- **Day 1:** Land in Delhi or Mumbai. Rest overnight near the airport.
- **Day 2:** Morning flight to Jabalpur, then about 3.5 hours by road to Surwahi. Evening walk in the regrowing forest, dinner cooked in the Kodo Kutki Kitchen.
- **Days 3-4:** Morning safaris in Kanha. Afternoons for village walks, a Gond art session, birdwatching, or simply resting in a mud-built room that stays cool without air conditioning.
- **Day 5:** A final morning in the forest, then the drive back to Jabalpur for your onward flight.

We suggest staying **at least three nights** near Kanha. It gives you several safari drives, which matters because sightings are never guaranteed - and it gives you time to slow down, which is really the point of coming this far.

## Frequently asked questions

**What is the nearest airport to Kanha National Park?**
Jabalpur (JLR) is the most convenient, about 160 km from Surwahi. Nagpur (NAG) is the alternative, about 270 km away.

**Can I fly directly to Kanha from abroad?**
No. International flights land at major hubs such as Delhi or Mumbai, and you connect onwards by domestic flight or train to Jabalpur or Nagpur.

**How long does the whole journey take?**
From Delhi, allow most of a day: a domestic flight to Jabalpur and a drive of about 3.5 hours. Many guests break the journey with a night in Delhi or Mumbai after their long-haul flight.

**Is it safe to travel to Kanha as a foreign tourist?**
Kanha has welcomed international wildlife travellers for decades. Use a reputable driver, travel by day, and follow the usual precautions you would take anywhere unfamiliar.

## Plan your stay

Surwahi Social Ecoestate is an award-winning, community-run eco stay with mud-built family suites, an earthen dormitory and seasonal camping, with all meals included. [Explore the stays](/stay), or [send us your travel dates](/contact) and we will help you plan the route from wherever in the world you are starting.
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
If you are planning a tiger safari in India, three names come up again and again: **Kanha**, **Bandhavgarh** and **Pench**. All three are in Madhya Pradesh, often called the tiger state of India. All three have healthy tiger populations, experienced guides and a long history of welcoming visitors. And all three are genuinely different places, with different landscapes, different strengths and different trade-offs.

This guide compares them honestly, so you can choose the one that fits your trip - or decide how to combine them.

*Full disclosure: we live next to Kanha, so we are biased. We have tried hard to be fair anyway, and we will tell you when another park is the better choice.*

## First, how tiger reserves work

Before comparing the parks, it helps to understand how safaris are organised in all three.

Each tiger reserve has a protected **core** - the prime wildlife habitat - surrounded by a **buffer zone** where villages, farmland and forest meet. The core is divided into safari **zones**, each entered through a specific gate. The number of vehicles allowed into each zone is capped every day, and you book a permit for a particular zone, date and time slot.

This system protects the animals, but it has one important consequence for visitors: **the zone you get matters as much as the park you choose**. Book early, stay several nights, and plan on several drives rather than one.

## Kanha: the classic, big-landscape reserve

Kanha is one of India's largest and best-known tiger reserves, and one of the original reserves set up under Project Tiger in 1973. Its landscape is what most people picture when they imagine the forests of central India: tall, straight sal trees opening into wide grassy meadows, with bamboo on the slopes of the Maikal hills and mist hanging low on winter mornings.

### What makes Kanha special

- **The barasingha.** Kanha is home to the hard-ground swamp deer, Madhya Pradesh's state animal. This subspecies was brought back from the brink of extinction inside Kanha, and it is one of the great conservation success stories in India. The reserve even adopted the barasingha as its mascot, Bhoorsingh.
- **Space and light.** The open meadows give long sightlines, which means beautiful wildlife photography and a sense of scale you do not get in denser forest.
- **Rarely crowded.** The reserve is big enough that even in peak season it seldom feels busy.
- **Variety.** Beyond tigers, visitors regularly see gaur (the Indian bison), sambar and chital deer, wild boar, langur monkeys and a wonderful range of birds. Leopards, sloth bears and dhole (Indian wild dogs) are seen too, with leopards and sloth bears often easier to find in the buffer zones.

**Best for:** first-time visitors who want the full central Indian forest experience, photographers, families, and anyone staying three nights or more.

**Trade-offs:** distances inside the park are large, so some drives involve a lot of forest between sightings. For many visitors that is part of the pleasure; for a visitor with only one safari, it can feel like a gamble.

## Bandhavgarh: high density, dramatic scenery

Bandhavgarh is smaller than Kanha and famous for its high density of tigers, which is why it is so popular with visitors whose top priority is a sighting. An ancient hill fort rises above the forest, and the rocky ridges, cliffs and old cave shelters give the park a dramatic backdrop quite unlike Kanha's rolling meadows.

**Best for:** travellers with limited time whose single priority is maximising the chance of seeing a tiger, and photographers who want tigers against rocky, dramatic scenery.

**Trade-offs:** Bandhavgarh's popularity has a cost. Safari vehicles can bunch up at sightings, which detracts from the sense of wilderness, and core-zone permits sell out very quickly in peak season.

## Pench: teak forests and Jungle Book country

Pench straddles the border between Madhya Pradesh and Maharashtra and takes its name from the Pench River, which winds through the reserve. Its teak-dominated forests and the surrounding Seoni hills are the landscape Rudyard Kipling wrote about in *The Jungle Book*, so for many international visitors it carries a special literary charm.

**Best for:** families, travellers flying in or out of Nagpur (the closest of the three to a major airport), and anyone looking for a more relaxed safari rhythm.

**Trade-offs:** Pench's teak forest becomes very dry and open in the summer heat, and it does not have the sweeping meadows that make Kanha so photogenic.

## At a glance

| | Kanha | Bandhavgarh | Pench |
|---|---|---|---|
| Landscape | Sal forest, bamboo and open meadows | Hills, cliffs and an ancient fort | Teak forest along the Pench River |
| Signature species | Barasingha (hard-ground swamp deer) | Known for high tiger density | Leopard, dhole |
| Feel | Vast, less crowded | Busy, tiger-focused | Relaxed, accessible |
| Nearest airports | Jabalpur, Nagpur | Jabalpur, Khajuraho | Nagpur |
| Ideal stay | 3+ nights | 2-3 nights | 2-3 nights |

## What about the other parks?

Madhya Pradesh has more tiger reserves than these three. **Satpura** is excellent for walking and canoe safaris and has a quieter, wilder feel. **Panna** is a remarkable recovery story and pairs well with a visit to the temples of Khajuraho. Neither is usually a first-timer's choice, but both reward a second trip.

## Can you combine them?

Yes - many international visitors do a central India circuit, and two parks in one trip is a very good idea. The most common combinations are:

- **Kanha and Bandhavgarh** - the classic pairing: Kanha's landscapes and variety, plus Bandhavgarh's tiger density.
- **Kanha and Pench** - convenient if you are flying in or out of Nagpur.

Allow a full day for the road journey between parks, and plan at least two or three nights in each, so you have several safari drives in each place. Trying to "tick off" three parks in five days usually means more time in a car than in the forest.

## How to decide: three quick questions

1. **How many nights do you have?** With only two nights, Bandhavgarh's density helps. With three or more, Kanha's scale comes into its own.
2. **What matters more: the tiger, or the forest?** If it is one perfect tiger photograph, Bandhavgarh. If it is the whole experience - meadows, deer, birds, mist and the occasional tiger - Kanha.
3. **Where are you flying from?** Nagpur makes Pench (and Kanha) easy; Jabalpur makes Kanha and Bandhavgarh easy.

## Our honest advice

If you only have time for one reserve, and you want the classic experience of India's forests rather than a single checklist sighting, **choose Kanha**. The landscape is unforgettable, the barasingha survive in the wild nowhere else, and the buffer-zone villages give you a real sense of how people and wildlife share this land.

Wherever you go, remember that sightings are never guaranteed. That is exactly what makes them so meaningful.

## Frequently asked questions

**Which is better for seeing tigers, Kanha or Bandhavgarh?**
Bandhavgarh is known for its high tiger density, so short visits there often have good odds. Kanha offers a larger, less crowded landscape and more variety. Over three or more nights, both give excellent chances.

**Is Kanha the Jungle Book forest?**
Kipling's stories are set in the Seoni hills, which are closest to Pench. Kanha shares the same kind of central Indian forest, and many visitors find it matches the book's descriptions just as well.

**How many days do I need for a tiger safari?**
We recommend at least three nights in one park, which gives you four to six safari drives depending on your bookings.

## Staying near Kanha

Surwahi Social Ecoestate is about 21 km from Kanha's Khatia Gate - an award-winning, community-run eco stay on ten acres of regrowing forest. Read our [Kanha safari booking guide](/plan-your-visit/safari-booking-guide), see [how to get here](/plan-your-visit/getting-here), or [explore our stays](/stay).
`,
  },
  {
    slug: 'first-tiger-safari-in-india-guide',
    title: 'Your First Tiger Safari in India: A Practical Guide to Kanha',
    excerpt: 'What a safari in Kanha is really like - zones, timings, what to wear, what you might see, and the etiquette that keeps the forest wild.',
    category: 'Wildlife',
    author: 'Surwahi Team',
    coverUrl: img('Website Photos/IMG20231020170019.jpg'),
    coverAlt: 'Forest track in the Kanha landscape, Madhya Pradesh',
    tags: ['tiger safari India', 'Kanha safari', 'first safari tips', 'wildlife India', 'Kanha Tiger Reserve'],
    seoTitle: 'First Tiger Safari in India? A Practical Guide to Kanha',
    seoDescription: 'First tiger safari in India? How Kanha safaris work - core and buffer zones, timings, what to wear and pack, what you might see, and safari etiquette.',
    content: `
A tiger safari in India is unlike a safari in Africa. The forest is denser, the animals are more secretive, and much of the excitement comes from reading the jungle long before you see anything: an alarm call from a langur high in a tree, the sharp bark of a startled chital, fresh pugmarks pressed into the dust of the track. When a tiger does step out, it feels earned.

If this is your first safari in India, this guide explains how it works in Kanha Tiger Reserve, what a safari day actually looks like, what to wear and bring, what you might see, and how to behave so the forest stays wild for the next visitor.

## How Kanha safaris work

Safaris in Kanha run in open 4x4 vehicles, usually called Gypsys, each with a registered driver and a forest-department guide. Each vehicle enters through a particular gate into a particular **zone**, and the number of vehicles allowed into each zone is capped every day. That cap keeps disturbance low - and it is the reason permits sell out.

### Core zones and buffer zones

- **Core zones** - Khatia, Kanha, Mukki and Sarhi - are the heart of the reserve and the prime tiger habitat. They need advance booking and are closed during the monsoon, from 1 July to 15 October.
- **Buffer zones** - such as Khatia Buffer, Khapa and Sijhora - surround the core. Permits are easier to get, the drives are often quieter, and they can be very good for leopards and sloth bears.

Many experienced visitors mix the two: a couple of core-zone drives for the classic Kanha meadows, and a buffer-zone drive for a different, often more intimate, forest.

Khatia is the gate closest to Surwahi, about 21 km by road.

### Morning or afternoon?

There are two safaris a day: an early-morning drive starting around dawn and an afternoon drive ending around sunset. The exact times change through the season and are set by the Madhya Pradesh Forest Department - our [safari booking guide](/plan-your-visit/safari-booking-guide) has the current timetable.

Morning safaris generally offer the best chance of tiger sightings. The air is cool, the light is soft and golden, and animals are on the move after the night. Afternoon drives are warmer and often good for birds and deer, with beautiful evening light at the end.

**How many drives should you book?** If you can, book at least three over two or three days. A single safari is a lottery; several give the forest a fair chance to show you what it holds.

## What a safari day looks like

A typical morning safari from Surwahi goes something like this:

- **Before dawn:** a wake-up call, a hot drink and a quick bite. You leave in the dark, wrapped up warmly in winter.
- **At the gate:** your guide checks permits and identification. Vehicles enter in order once the gate opens.
- **In the forest:** you drive slowly along forest tracks, stopping often to listen. Your guide reads alarm calls, tracks and the behaviour of deer and monkeys to work out where a predator might be.
- **Mid-morning:** a short break at a designated rest point inside the park.
- **Late morning:** you exit the park as the heat builds, and return for a late breakfast and a rest.

The rhythm of a Kanha day - early start, rest through the heat, a second outing in the afternoon - quickly becomes one of the pleasures of the trip.

## How to book permits as a foreign visitor

Permits are booked through the official Madhya Pradesh Forest Department portal, and foreign nationals need their passport details. Fees differ for Indian and foreign visitors and are revised from time to time, so always check the official portal for current prices rather than relying on figures quoted online.

Permits for core zones open well in advance and sell out early for peak dates, especially weekends, holidays and the period from December to May. Book as soon as your travel dates are fixed.

If you are staying with us, we can arrange permits for confirmed guests - the hassle-free option, especially in peak season. [Ask us when you book](/contact).

## What you might see

Tigers are the headline, but Kanha is a whole living system, and the best safaris are the ones where you enjoy all of it. On a typical drive you might see:

- **Barasingha** - the hard-ground swamp deer, saved from extinction in Kanha and found in the wild nowhere else
- **Gaur** - the Indian bison, the largest wild cattle in the world
- **Chital and sambar** deer, wild boar and langur monkeys
- **Leopard, sloth bear and dhole** (Indian wild dogs), seen less often
- **Birds** - hundreds of species, from crested serpent eagles and Indian rollers to paradise flycatchers

Sightings are never guaranteed. Go in with curiosity rather than a checklist, and the forest rarely disappoints.

## What to wear and pack

- **Layers.** Winter mornings in an open vehicle are genuinely cold - temperatures can fall to single digits in °C (the 40s °F) in December and January. Bring a warm jacket, hat and gloves. Summer afternoons, by contrast, are very hot.
- **Muted colours.** Khaki, olive, brown and grey. Avoid bright colours and white, which stand out in the forest.
- **A scarf or buff** to keep the dust out of your nose and mouth.
- **Binoculars** - the single best upgrade to any safari, for birds as much as mammals.
- **A camera with a zoom lens.** A telephoto zoom in the 100-400mm range is ideal. Bring spare batteries and memory cards.
- **Sunscreen, a hat and water.**
- **Your passport or the ID used for your permit** - you may need it at the gate.

### Photography tips

- **Set up before you leave.** Switch on burst mode and a fast shutter speed in advance; sightings are often brief.
- **Use a beanbag**, not a tripod, to steady a long lens on the side of the vehicle.
- **Shoot the whole story.** Deer in the mist, a serpent eagle on a dead branch, dust in the morning light - these are often the photographs you treasure most.

## Safari etiquette

- **Stay quiet.** Voices carry, and silence is how you hear the alarm calls that lead to sightings.
- **Stay in the vehicle** at all times, and never ask your driver to leave the track, speed or crowd an animal.
- **Do not feed animals or leave anything behind** - no food scraps, no plastic.
- **Respect the rules** on timings, routes and speed. They protect the wildlife, and the livelihoods of the guides and drivers.
- **Be patient with other vehicles** at a sighting, and let everyone have a fair view.

## Frequently asked questions

**Is a tiger sighting guaranteed?**
No. Kanha has a healthy tiger population, but these are wild animals in a large forest. Booking several drives over a few days gives you the best chance.

**Are safaris suitable for children?**
Yes - many families visit Kanha. Morning drives are long and start early, so plan rest time in the afternoon.

**Can I visit during the monsoon?**
The core zones close from 1 July to 15 October. Surwahi stays open all year, and the green monsoon months are wonderful for birds, farm life and the forest itself.

## Beyond the safari

The safari is a few hours of your day. The rest is where a place like Kanha gets under your skin: walking through village farmland, learning Gond art from a local artist, eating food cooked from local grains, or watching birds from a forest that has regrown around you.

At Surwahi Social Ecoestate, about 21 km from the Khatia Gate, the land we have left alone for ten years now records 59 bird species, and leopard, sambar and barking deer have all been recorded drinking at our rainwater pond. [Explore our experiences](/experiences) or [plan your stay](/stay).
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
Search for an eco lodge in India and you will find hundreds of them. Some are doing remarkable, patient work: regrowing forests, training local people, building with earth and protecting wildlife corridors. Others have simply painted a conventional resort green, added a jute rug and a "save water" card in the bathroom, and put "eco" in the name.

If you care about where your travel money goes, you do not need to be an expert to tell them apart. A handful of pointed questions will do it.

We run an eco stay near Kanha Tiger Reserve, so we know these questions are fair - we ask them of ourselves. Below is the checklist, with what to look for, the red flags to watch out for, and our own answers as worked examples.

## Why "eco" is so hard to judge

There is no single, universally recognised eco-certification for accommodation in India, and the word "eco" on a website costs nothing. International frameworks such as the criteria published by the Global Sustainable Tourism Council exist, and some properties are assessed against them, but most travellers will never see that paperwork.

That is why specific questions work better than labels. A genuine eco lodge can answer them with numbers, names and dates. A greenwashed one answers with adjectives.

## 1. What is it built from?

Concrete and glass in a forest is hard to call sustainable, however many plants are placed around it. Look for local, low-carbon materials and building methods that suit the climate, so the building itself does some of the work that machines would otherwise do.

**Red flag:** "eco cottages" that turn out to be standard concrete rooms with air conditioning running day and night.

*At Surwahi:* our buildings are made from stabilised mud cob - about 10,000 sq ft of it - with minimal baked brick, steel, glass or cement. Roofs are insulated with terracotta tiles salvaged from village homes. Rooms stay below about 28°C when Kanha crosses 40°C outside, without a single air conditioner. Read more about our [eco-friendly construction](/sustainability/eco-friendly-construction-practices).

## 2. How much of the land is built on?

A genuinely low-impact property leaves most of its land alone. Ask what proportion is built on, and what happens to the rest.

**Red flag:** manicured lawns, imported ornamental plants and every corner developed for "activities".

*At Surwahi:* we own ten acres and build on two. The other eight are fenced and left permanently untouched.

## 3. Is the land getting wilder or tamer?

This is the question almost nobody asks, and it is one of the most revealing. Is there evidence that nature is recovering on the property - tree counts, bird lists, wildlife records - or is the claim just a nice photograph?

**Red flag:** "surrounded by nature" with no evidence of what the property has done for that nature.

*At Surwahi:* the land held fewer than 300 trees when we bought it in 2015. We fenced it and left it alone for three years before building anything. By the March 2025 tree census it held more than 6,000 native plants and trees, over 3,500 of them taller than five feet, and 59 documented bird species. [See the tree census and biodiversity reports](/sustainability/tree-census-and-biodiversity-reports).

## 4. What happens to water and waste?

Water is the hidden pressure point in most tourist areas, and rural India is no exception. A single resort can draw heavily on the same groundwater a village depends on. Ask about rainwater harvesting, sanitation and what leaves the property.

**Red flag:** a large swimming pool and lush watered gardens in a region where the village around it struggles for water in summer.

*At Surwahi:* we use a zero-discharge [evapotranspiration toilet system](/sustainability/evapo-transpiration-toilets). Arjun Pond, a rainwater reservoir dug as a water-conservation measure, has become a summer water source for wild boar, sambar, barking deer and leopard. In 2017 we also began pushing for a stop dam through the local panchayat, which eventually gave the village a more reliable water source.

## 5. Who works there - and who benefits?

This is the most important question of all. Are staff hired from nearby villages, trained and promoted into real responsibility - or brought in from the city while locals fill only the lowest-paid roles?

**Red flag:** a management team with no local faces, and "community" mentioned only in the context of donations.

*At Surwahi:* every person we employ directly comes from a surrounding village. Narendra Patle was our first hire, given real responsibility from the start, and is now our Estate Manager after ten years. Two local masons trained here in earthen construction and now use those skills independently. In 2017 we helped more than 40 village women organise the Deetya Jagriti Self-Help Group, so they could save, borrow and be heard together.

## 6. Is the culture shared or performed?

There is a big difference between a dance show staged at dinner and learning from people on their own terms. Ask how cultural experiences are run, and who earns from them.

**Red flag:** "tribal experiences" where the community has no say and sees little of the fee.

*At Surwahi:* Gond artist Sanjay Pancheshwar teaches guests rather than performing for them. Our neighbouring farmer takes guests into his fields in the monsoon, and our cook prepares food that carries the actual flavours and traditions of his community. [See our workshops](/workshops).

## 7. How does it treat wildlife?

Responsible lodges reduce their impact on wildlife; irresponsible ones turn wildlife into a product.

**Red flags:** guaranteed sightings, animal feeding or baiting, captive animals for photographs, and night drives where they are not permitted.

*At Surwahi:* our team is trained in snake rescue at the PfA Wildlife Rescue & Conservation Centre. The animals on our land arrived because it became safe for them - not because we baited them. As we like to say: this is their home, and we are all visitors.

## 8. Can it show independent recognition?

Awards are not everything, and plenty of excellent small lodges have none. But third-party assessment is always better than self-description, and it is worth asking who has looked closely at the property.

*At Surwahi:* recognitions include TOFTigers Most Inspirational Eco Lodge 2024, the AEN International Ecotourism Award 2025 for sustainable building, Madhya Pradesh Tourism Board's Best B&B Unit 2024-25 and the ICRT India Responsible Tourism Awards 2023 (Silver). [See all our awards](/praises/awards-and-accolades).

## What you can do as a guest

Choosing well is the biggest step, but how you travel matters too:

- **Stay longer.** Fewer, longer trips mean less travel per night of experience, and more of your spending stays local.
- **Eat what the kitchen grows and sources locally**, rather than asking for imported dishes.
- **Use water and power the way the village does** - mindfully.
- **Buy directly from artists and makers**, and pay a fair price.
- **Leave reviews that mention the specifics** - local staff, conservation work, food - so good practice is rewarded.

## Frequently asked questions

**What is the difference between an eco lodge and an eco resort?**
The labels are used loosely. What matters is not the name but the answers to the questions above.

**Are eco lodges in India comfortable?**
The best ones are very comfortable - just in a different way. At Surwahi, for example, comfort comes from thick mud walls and shade rather than air conditioning.

**Is responsible travel more expensive?**
Not necessarily. Small, locally run properties often offer excellent value, and more of what you pay stays in the local economy.

## The bottom line

A genuine eco lodge should be able to answer every question above specifically, with numbers and names - not just adjectives. If the answers are vague, the "eco" probably is too.

If our answers convinced you, [explore our stays near Kanha](/stay) or [read our story](/about/our-story).
`,
  },
];
