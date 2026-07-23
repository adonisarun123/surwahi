import Breadcrumbs from '@/components/Breadcrumbs';
import Prose from '@/components/Prose';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  "Kanha Jungle Safari & Eco Experiences | Surwahi",
  "Tiger safaris, forest trails with naturalists, tribal cooking, farm walks and stargazing skies. Ten eco experiences at Surwahi near Kanha's Khatia gate.",
  "/experiences",
  undefined,
  ["Kanha jungle safari", "things to do near Kanha National Park", "bird watching Kanha", "tribal cooking experience", "eco volunteering India", "nature walks Kanha"],
  true
);

const body = `Go beyond the safari. Embrace the rhythm of village life, learn from the land, and build relationships with the people who call Kanha home. Every experience below is run by or with our neighbours - the artisans, farmers, chefs and naturalists of the villages around us - so your journey supports Kanha's living story instead of just passing through it.

Most experiences need a day's advance notice so we can coordinate with our local hosts and artists. Tell us when you book, or over dinner the evening before.

## Wildlife & Nature

Get closer to the wild heart of Kanha.

### Wildlife Safaris
Track tigers, leopards, barasingha and wild dogs in one of India's finest-managed tiger reserves. We handle your permits, vehicle and timing for morning or evening drives from the Khatia gate — and help you plan rest days rich enough that the park gets breathing space too.
[Explore Wildlife Safaris ->](/experiences/wildlife-safaris)

### Guided Forest Trails
Walk the sal and bamboo forests on the edge of Kanha's buffer with Narendra Ji - our Estate Manager, snake-rescue trained, and a man who reads this landscape like a first language. Two hours of tracks, calls, medicinal plants and stories, best in the cool of early morning.
[Explore Guided Forest Trails ->](/experiences/guided-forest-trails)

### Bird-watching Expeditions
The Kanha landscape hosts 300+ recorded species - and over 60 of them live right on our regrown estate, visible from your breakfast seat in fruiting season. Guided dawn and dusk walks teach you calls, behaviours and habitats, from residents to winter migrants.
[Explore Bird-watching Expeditions ->](/experiences/bird-watching-expeditions)

## Culture & Community

Connect with indigenous traditions and local life.

### Cultural Immersion & Local Life
Walk neighbouring Khairlanji village, share a meal inside a Gond or Baiga family home, catch the Friday haat at Sarekha, learn Gond and Warli painting with our master artist Sanjay, and hear Baiga folk music performed live. Real village life -  never a performance of it.
[Explore Cultural Immersion ->](/experiences/cultural-immersion)

### Live Tribal Cooking Experiences
Cook alongside Gond families on traditional clay stoves - gathering fresh ingredients, lighting the fire, learning ancestral recipes that celebrate forest produce, then eating the meal you made together. Two to three unhurried hours that directly support local women and tribal households.
[Explore Tribal Cooking ->](/experiences/live-tribal-cooking-experiences)

### Eco Volunteering Programs
Join the work that makes this place what it is: tree census counts, waste-management systems, school visits, earth-construction skilling and our women's Self-Help Group initiatives. For students, researchers and travellers who want their trip to leave something behind - in the good sense.
[Explore Eco Volunteering ->](/experiences/eco-volunteering-programs)

## Farm & Food

Taste the land, learn from the soil.

### Farm Life Visit
During monsoon, walk into Soham ji's fields next door and join real farming - sowing paddy, understanding the rhythms that feed this region. The rice on your plate at dinner grew in the paddy you stood in.
[Explore Farm Life Visit ->](/experiences/farm-life-visit)

### Know Your Crop
Agri-learning walks through our organic fields and kitchen garden: kodo and kutki millets, chemical-free wheat we grow with a neighbouring farmer, seasonal greens and the compost that feeds them. Every grain of food has a story; here you learn to read it.
[Explore Know Your Crop ->](/experiences/know-your-crop)

## Adventure & Fun

Fun for every age in the great outdoors.

### Play @ Surwahi
A dedicated nature adventure zone built entirely from old tyres and recycled village wood logs - rides and climbs for kids (and adults who forget themselves) amid the greens of our regrown forest.
[Explore Play @ Surwahi ->](/experiences/play-at-surwahi)

### Outdoor Sports & Nature Games
Volleyball on the farm-patch court with genuinely talented village players, the family swing, board games in Satkon, the boundary walk, and starlit evenings under Bortle-2 dark skies made for stargazing. Traditional fun, open air, no screens required.
[Explore Outdoor Sports & Nature Games ->](/experiences/outdoor-sports-and-nature-games)

---

Whether you come to learn, relax, or simply breathe in the wild beauty of Kanha, every experience supports sustainable tourism and the people who call this place home.

[Book your stay ->](/stay) · [Hands-on workshops ->](/workshops) · [Plan your visit ->](/plan-your-visit)`;

export default function Page() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>
      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-2 max-w-4xl mx-auto">Kanha Jungle Safari &amp; Eco Experiences</h1>
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
