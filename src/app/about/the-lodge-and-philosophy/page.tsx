import Breadcrumbs from '@/components/Breadcrumbs';
import Prose from '@/components/Prose';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  "The Estate & Our Philosophy | Mud-Built Stay Near Kanha",
  "10,000 sq ft of stabilised mud, a 7-sided rain-harvesting dining hall, rooms named after lost villages. Inside the estate and philosophy of Surwahi, Kanha.",
  "/about/the-lodge-and-philosophy",
  undefined,
  ["mud house stay near Kanha", "eco friendly accommodation Kanha National Park", "sustainable architecture homestay India", "non-AC natural cooling stay"],
  true
);

const body = `Ten acres. Two built on. Eight left alone, forever.

That ratio is the philosophy. Everything else on this page - the mud walls, the seven-sided dining hall, the rooms named after vanished villages - is just that one decision, expressed in architecture.

## Conservation First. Guests Second. (We Mean It.)

Every property says the environment matters. Here is what it actually costs us: no air conditioning anywhere. No television in any room. No chlorine pool. No plastic. No loud music after dark. Natural cracks in mud walls that we do not plaster over. Hot water that takes a little longer because it comes from wood-fired Gujarat boilers running on our own fallen forest biomass, not electricity.

We tell every guest this before they book, warmly but clearly. These are not shortcomings. They are the property. Most guests, once they understand why, don't just accept it - they come *because* of it. The rooms stay below 28°C when it's 40 outside, because half a metre of stabilised mud does what a compressor otherwise would.

## Built Around a Tree, Not Over One

The heart of the estate is the Madhuca Compound - roughly 10,000 sq ft of living space built around a 50-year-old Mahua tree (Madhuca longifolia), the tree this landscape's tribal economy and culture have revolved around for centuries. We didn't cut it. We designed around it.

Everything here is stabilised mud cob, brick masonry, bamboo, and wood reused from village homes - guided by Mrinmayee Architects and IISc Bangalore professors who have spent careers researching earthen construction. The metal roofs carry a second skin of recycled terracotta tiles salvaged from broken village houses. Local masons built it all, learning skills they now use independently.

## Satkon - A Dining Hall 
Our common space is Satkon, named for its seven sides. Its roof works like a funnel: around 700 sq ft of rooftop channels monsoon rain into a small fish pond at its centre. During the rains you sit inside and watch water fall like a private waterfall into the pond; the overflow recharges our old dug well through a pipe underneath. 
Beside it is the Kodo Kutki Kitchen - fully open, fully visible. Nothing to hide means nothing hidden: watch Pradeep Uikey cook your meal with rice from Narendra's own paddy field, wheat from the chemical-free crop we grow with a neighbouring farmer, vegetables from the kitchen garden and staff family homes.

## The Rooms:

We are an 8-bed dormitory and two suites. Deliberately. This is not a resort packing in numbers - with extra mattresses, the entire estate sleeps 28 people, and that's the ceiling.

**Maikal Express** - our earthen dormitory, named after the Maikal hills, designed like a luxurious train coach. Eight fixed beds, each with its own reading light, charging sockets, a moulded wooden window with green views, and a private rolling drawer underneath. Two lower beds are fully accessible for guests with limited mobility. It's India's first wildlife hostel of its kind - built for students, researchers, solo travellers and families who believe co-living and comfort can coexist.

**Jholar and Kariwah** - our two family suites, named after the two villages relocated out of Kanha National Park in the 1970s when the reserve was formed. We chose those names deliberately, to keep that memory alive. Each suite holds a king bed, a mezzanine that doubles as balcony or sleeping space for two, a permanent extra bed, and window sills that seat six. Washrooms are wide, wheelchair-friendly and naturally lit - you can see open sky from the shower.

Every room, washroom and pathway on the estate is wheelchair-accessible via ramps - one of the only fully accessible properties in the Kanha region.

## Beyond the Rooms

Scattered through the compound: **Chandra Taal**, a chlorine-free limestone plunge pool kept clean by natural methods. The **Parviflora Bonfire Grove**, ringed naturally by Lagerstroemia trees, where winter evenings mean lemongrass tea by the fire. **Play@Surwahi**, rides built entirely from old tyres and recycled village wood. The **Halon Tower** terrace for sundowners and star-gazing. A volleyball court on the farm patch where village players will happily join your game. And beyond the fence: the Sanduk stream trek, the Banjar river beach a kilometre away, and the Friday haat at Sarekha.

## The Philosophy, In One Line

Kanha shouldn't carry the entire weight of tourism here. By building an experience rich enough to stand on its own - forest, food, craft, culture, community - we give the park breathing space. The safari is a chapter. The place is the book.

[See the rooms in detail ->](/stay) · [Explore experiences ->](/experiences)`;

export default function Page() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>
      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-2 max-w-4xl mx-auto">The Estate and the Philosophy Behind It</h1>
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
