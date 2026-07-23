import Breadcrumbs from '@/components/Breadcrumbs';
import Prose from '@/components/Prose';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  "Our Residents: The People & Wildlife of Surwahi | Kanha",
  "59 bird species, a leopard at the pond, and a team born in the village next door. Meet the people and wildlife who call Surwahi near Kanha home.",
  "/about/our-residents",
  undefined,
  ["wildlife near Kanha National Park", "birdwatching stay Kanha", "community tourism Kanha village", "local staff homestay India", "leopard sighting Kanha buffer zone"],
  true
);

const body = `Every hotel page like this lists its rooms. Ours introduces its residents - because Surwahi belongs to those who live here: the family from the villages next door who run it, the community that shaped it, and the birds, deer, snakes and leopard who moved back in as the forest returned. Guests, in the kindest sense, are the visitors.

---

# The People

## Narendra Patle - The First Resident

Narendra was our very first hire in 2015, a young man from neighbouring Sarekha village given real responsibility from day one. Ten years later he is our Estate Manager — trained at IHM Bhopal, certified in snake rescue, and the person whose knowledge is baked into how this entire property runs. He didn't just take a job at Surwahi. He helped shape what Surwahi became.

## Pradeep Uikey -The Chef the Village Made

Pradeep joined as a local lad in his early twenties with no culinary training. Today he cooks for guests from across the world - green brinjal curry, colocasia leaf rolls, fresh rice chillas, chutneys from recipes that belong to his community, made with rice from Narendra's paddy and vegetables from village farms. Every meal at Surwahi carries his community's flavours, not a hotel's approximation of them.

## Kaki Ji, Kaka, Anil -The Quiet Backbone

Kaki Ji tends the trees and welcomes guests with a connection to this land no training could teach. Kaka, our elderly nightman in his seventies, learned stabilised-mud construction here and watches over the estate after dark. Anil runs housekeeping. When occupancy rises, their families join in - Narendra's wife, Anil's mother - making Surwahi quite literally a family-run home.

## Suraj and Lokesh - The Next Generation

Both joined as interns in 2024 and grew into core roles: Suraj now drives business development, Lokesh manages reservations. Proof that careers, not just jobs, can grow in a village 21 km from the park gate.

## The Wider Family - The Village Itself

The residents don't stop at our fence. The Deetya Jagriti Self-Help Group - 40+ women organised in 2017 - saves, lends and speaks in Panchayat meetings together. Soham ji farms next door and walks guests through his fields in monsoon. Sanjay Pancheshwar teaches guests Gond art. The Boda potters, the Baiga musicians, the masons Kaka and Kaji who now build independently - every one of them is part of what you experience here, and every rupee you spend with them goes directly into their hands.

---

# The Wildlife

## The Birds - 59 Species and Counting

In 2015 this was barren scrubland with barely any birdsong. As the trees returned, the birds followed - 59 documented species now live, nest and feed across the estate. In fruiting season, the Pikdi, the Grand Mahua and the Singapore Cherry fill with birds visible from your breakfast seat. Every morning at Surwahi sounds like a forest, because now there is one.

## The Visitors at Arjun Pond - Including a Leopard

Arjun Pond, dug for rainwater conservation, became the most alive corner of the property. In summer, when water vanishes across the region, the forest comes here to drink: wild boar, sambar, barking deer - and leopard, all recorded at the water's edge. When a leopard trusts your pond, the landscape has accepted your land. That took a decade of leaving nature alone.

## The Butterflies and Insects - Nature's Honest Report Card

Butterflies only thrive where an ecosystem is genuinely healthy; you cannot fake butterflies. With them returned the bees, beetles and dragonflies - the unsung foundation proving the soil, water and vegetation can sustain complex life again.

## The Snakes - Residents, Not Intruders

Snakes live here permanently, and we consider that a badge of honour. Our team is trained at the PfA Wildlife Rescue & Conservation Centre to identify and safely handle every species -protecting guests and snakes alike, in a region where few can tell venomous from harmless. No panic, no harm, ever.

## The Trees - 6,000 Residents That Never Move

From 300 trees in 2015 to 6,000+ native plants and trees by the March 2025 census - counted by us, every year. Among them: the 50-year-old Grand Mahua our home is built around, and the giant cluster figs growing out of the old Cluster Well's walls. Outside our fence the landscape grows barer each year, which makes these eight protected acres a refuge the local ecosystem now depends on. That was never the plan. It is now a responsibility we carry daily.

---

## Meet Them All

Stay a night and the residents introduce themselves - Pradeep's cooking at dinner, Narendra's stories in the evening, birdsong at dawn, and, if the forest decides you've earned it, pugmarks by the pond in the morning.

[Book your stay ->](/stay) · [Read how this forest grew back ->](/about/our-story) · [The community as partners ->](/about/why-surwahi)`;

export default function Page() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>
      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-2 max-w-4xl mx-auto">Our Residents: The People and Wildlife Who Call This Home</h1>
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
