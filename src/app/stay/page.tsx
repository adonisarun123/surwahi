import Breadcrumbs from '@/components/Breadcrumbs';
import Prose from '@/components/Prose';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  "Stay at Surwahi | Dorm, Suites & Camping Near Kanha",
  "An earthen dormitory built like a train coach, two family suites named after lost villages, and camping under 6,000 trees - 21 km from Kanha's Khatia gate.",
  "/stay",
  undefined,
  ["where to stay near Kanha National Park", "dormitory hostel near Kanha", "family suite Kanha Tiger Reserve", "camping near Kanha National Park", "budget eco stay Kanha", "wheelchair accessible stay Kanha"],
  true
);

const body = `We are deliberately small: an 8-bed earthen dormitory, two family suites, and a handful of camping tents in our forest camp area. This is not a resort packing in numbers - it's a home, built from stabilised mud by the hands of the village around it, 21 km from the Khatia gate of Kanha Tiger Reserve.

Every built room shares the same promise: naturally cool below 28°C when Kanha crosses 40 outside, warm when winter drops to 4 - all without a single air conditioner. Thick mud-cob walls, roofs insulated with terracotta tiles reused from village homes, and the shade of 6,000 trees do the work instead. And for those who want even less between themselves and the forest, there's canvas.

## Maikal Express - The Earthen Dormitory

**Sleeps 8 · From the budget-friendly end of our range · Fully accessible**

Named after the Maikal hills that define this landscape, and designed like a luxurious train coach - because co-living should feel like an adventure, not a compromise. Roughly 600 sq ft across three sections: the bunk space, a utility area we call the Quarter Dome, and two washrooms.

**The bunk space:** eight permanent beds under a 14-foot ceiling that keeps the room feeling open even with a full house. Six beds along one side, two on the other. Five lower beds sit at just 1.5 feet - two of them completely encumbrance-free for wheelchair users - while three upper berths are reached by classic wooden ladders, with side rails for safe sleeping at height.

Every single bed gets: two charging sockets, an individual LED reading light, a personal moulded wooden window with green views (six of them have rotating twin panels that convert into a laptop or dining table), locally spun cotton mattresses and thick quilts, and a private rolling drawer underneath for your belongings.

**The Quarter Dome:** a buffer zone between sleeping and washing, crowned by an ironless brick quarter-dome roof - a vernacular masonry design with a skylight at its vertex that photographers can't resist. It holds the shared amenities: wash basin and mirror, kettle, iron, mini fridge, electronic safe, wardrobe, tea and coffee, and clay water pots in summer.

**The washrooms:** two, with vaulted masonry roofs, rain showers, and hot water from wood-fired boilers running on our own forest biomass. The wider one is fully wheelchair-accessible - wide door, hand shower, grab bars at the shower and closet.

**Perfect for:** students, researchers, solo travellers, friend groups, and families who'd rather share stories than corridors. Also bookable on an exclusive non-sharing basis for private groups.

## Jholar & Kariwah - The Family Suites

**Each sleeps up to 6 · More privacy, same philosophy · Wheelchair-accessible washrooms**

Our two suites carry the names of two villages relocated out of Kanha National Park in the 1970s when the reserve was formed. We named them deliberately, so their memory lives in daily use.

Each suite is built around a family: a permanent king bed, a mezzanine floor that works as a balcony or sleeping space for two, a permanent extra bed, and deep window sills where six adults can comfortably sit with their evening tea. The washrooms are wide, disability-friendly and naturally lit - stand in the shower and you can see open sky.

**Perfect for:** families, couples, and elders who want quiet, space, and a private connection to the forest.

## The Camp Area - Tents Under the Trees

**Seasonal · The closest you can sleep to the forest itself**

For travellers who want nothing but canvas between themselves and the night sounds of Kanha, our camp area offers camping tents pitched within the estate - under the same canopy where 59 bird species wake you at dawn, a short walk from the Parviflora Bonfire Grove where winter evenings end with lemongrass tea by the fire.

Camping here follows the same rules as everything else at Surwahi: no plastic, no loud music after dark, no trace left behind. Campers share the estate's facilities - the eco-friendly washrooms with wood-fired hot water, the open Kodo Kutki Kitchen for fresh-cooked meals, and full access to Satkon and the grounds.



## What Every Stay Includes

Breakfast for two (suites) or per bed (dormitory), cooked fresh in the open Kodo Kutki Kitchen from village-sourced ingredients. Full access to the estate: Satkon, the seven-sided dining hall where monsoon rain falls into an indoor fish pond; Chandra Taal, the chlorine-free earthen plunge pool; the bonfire grove; Play@Surwahi; the Halon Tower terrace; and eight acres of protected regrown forest with 59 bird species for company.

## What We Don't Have - On Purpose

No air conditioning. No televisions. No chlorine pool. No plastic. No loud music after dark. We tell every guest this before booking, because these aren't missing amenities - they're the reason the forest outside your window exists. What you get instead: rooms the mud keeps cool, food cooked to order, and mornings that sound like a forest.

## Good to Know

- 21 km (about 40 minutes) from Khatia gate, Kanha Tiger Reserve
- Pet friendly, kid friendly, and one of the only fully wheelchair-accessible properties in the Kanha region
- Meals are cooked fresh to order from local sourcing - please share food preferences in advance
- MP Tourism Board approved Bed & Breakfast

[Plan your visit ->](/plan-your-visit) · [See the experiences included ->](/experiences) · [Why the rooms are built this way ->](/about/the-lodge-and-philosophy)`;

export default function Page() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>
      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-2 max-w-4xl mx-auto">Stay at Surwahi: Three Ways to Sleep Inside a Forest</h1>
        </div>
      </section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="max-w-3xl mx-auto">
          <Prose md={body} />
        </article>
      </div>
    </div>
  );
}
