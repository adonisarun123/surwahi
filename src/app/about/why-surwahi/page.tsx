import Breadcrumbs from '@/components/Breadcrumbs';
import Prose from '@/components/Prose';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  "Why Surwahi? Carbon-Negative, Community-Run Stay Near Kanha",
  "5x more CO2 captured than emitted, 6,000+ trees regrown, 45+ local livelihoods. Why Surwahi is Kanha's proof that responsible tourism needs no entry fee.",
  "/about/why-surwahi",
  undefined,
  ["responsible tourism Kanha", "carbon negative resort India", "affordable eco stay Kanha", "sustainable homestay near Kanha Tiger Reserve"],
  true
);

const body = `Most places near a tiger reserve exist to serve the safari. Surwahi exists to be the experience itself.

Built on ten acres of once-degraded land near Kanha Tiger Reserve, and run almost entirely by people from the village next door, Surwahi is proof of a simple, stubborn idea: that tourism can give back more than it takes - and that doing it right shouldn't cost the earth, or cost a fortune.

We don't ask you to sacrifice comfort. We ask you to redefine it.

## By the Numbers

- **Carbon Negative** - ~5x more CO2 captured than emitted
- **6,000+** native trees and plants grown since 2015
- **45+** local livelihoods supported
- **59+** bird species recorded on the estate

From 300 trees in 2015 to over 6,000 native plants and trees by 2025 - counted every year in our own tree census.

## Regeneration, Not Consumption

A conventional resort consumes a landscape. Surwahi rebuilds one.

We generate our own solar power, harvest rain from our rooftops into ponds and recharge old wells, compost our food and leaf waste into the soil, and grow much of what lands on your plate. The buildings themselves are made of stabilised mud-cob, brick, bamboo and reused wood - walls that keep rooms below 28°C without air conditioning, even when the world outside touches 40.

The result isn't a brochure claim. It's a forest that compounds every year: more canopy, more birds, more insects, more snakes who live here permanently rather than passing through, and a pond at Arjun that leopard, sambar and deer now trust enough to drink from. When you stay here, your visit funds that regeneration directly. The land was given safety, water and shelter - and the wildlife came back on its own.

## Carbon Negative - and We've Done the Maths

A lot of properties call themselves "green." We measured it.

Across our 3.94 hectares of restored woodland and scrubland, Surwahi captures around 21.8 tonnes of CO2e every year. Everything we burn or consume to run the place - diesel for the generator, fuel for safari vehicles, cooking gas, grid power, the firewood for boilers and bonfires - adds up to just 4.5 tonnes. That leaves a net 17.3 tonnes of CO2e drawn down from the atmosphere each year: roughly five times more carbon captured than released.

What that means for you is unusually simple. Every night you spend here removes a net 173 kg of CO2 equivalent from the air, rather than adding to it. Your holiday doesn't just tread lightly - it leaves the planet a little lighter than it found it.

## Community at the Core - As Partners, Not Beneficiaries

We arrived in Surwahi as outsiders. The Baiga, Gond and farming communities around us welcomed us, and we have never taken that welcome for granted. So we made a deliberate choice early on: to build with the community, not around it.

The difference is visible in real people, not in a CSR line:

- **Narendra Patle** began as a caretaker and is now our Estate Manager - he didn't just take a job here, he helped shape what Surwahi became.
- **Pradeep Uikey** had no culinary training and now cooks for guests from across the world, bringing his community's flavours and traditions to every meal.
- **The Deetya Jagriti Women's Self-Help Group** - 40+ women we helped organise in 2017 - now run micro-savings, take loans, and walk into Panchayat meetings with a confidence they never had before.
- **Sanjay Pancheshwar**, a local Gond artist, doesn't perform for guests - he teaches them.

Eat a meal in a tribal home, buy a piece of Gond art, learn a craft, share a story over food cooked that morning - and the money goes straight into the hands of the people who made this place possible. Beneficiaries depend on you. Partners outlast you. We chose partners.

## Responsible Travel Without an Entry Fee

The biggest myth in sustainable tourism is that it's only for people who can afford Rs 10,000–25,000 a night. We don't believe that, and we've built Surwahi to prove it wrong.

You can stay in the Maikal Express - our accessible, train-coach-inspired co-living dormitory designed for students, researchers, solo travellers and budget-conscious families - or in a Family Suite with more privacy and comfort. Same values. Same philosophy. Two price points. Sustainability shouldn't have an entry fee, and here it doesn't.

## We Experiment Where Others Play It Safe

A typical wildlife resort sticks to what's known. We do the opposite - whenever new sustainability research emerges in India, we try to bring it to life on the ground, and we treat failure as part of learning. That mindset gave us:

- A **1,500-litre bio-digester** built with KK Nag (a DRDO technology partner), treating sewage sustainably on site - a first in Madhya Pradesh's hospitality sector.
- An **EvapoTranspiration (EVT) Toilet**, developed with Safalgram and Marta Vanduzer-Snow (USA) - a complete zero-discharge sanitation system, the first of its kind in the state.
- **Rooftop rainwater harvesting** designed with Mrinmayee Architects, channelling rain into a fish pond and recharging a neighbouring well.

Nobody asked us to do any of this. We did it because it was right.

## A Model, Not Just a Story

We don't want Surwahi to be something people admire and call impossible to replicate. We document everything, open our doors to interns and researchers, and run inter-homestay workshops so other properties can learn what we've learned.

That openness has been recognised by the people who study and judge this for a living. In 2024 alone: **The John Wakefield Memorial Award for Most Inspirational Lodge of the Year** at the TOFT Wildlife Awards, **Best Bed & Breakfast Unit 2024–25** from the Madhya Pradesh Tourism Board, **Best Eco-friendly Homestay** at WTCA Mumbai, and the **Asian Ecotourism Network's Best Sustainable Building** recognition. Earlier honours include a Silver Medal at the Outlook Traveller Responsible Travel Awards 2023, ICRT India recognition, Ministry of Tourism features under Rural Tourism and NIDHI+, a TOFTigers PUG Quality certification, two international research papers by IIM Sirmaur and TERI, and a place among TheBetterIndia's Top 10 sustainable organisations in the country.

If a small homestay in a remote village can do this with personal savings and local hands, the message to the rest of the industry is simple: so can you.

## Become Part of the Solution

Come for the tiger. Stay for the forest, the food, the people and the quiet proof that travel can be a force for good.

[Book Your Conscious Stay ->](/stay)`;

export default function Page() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>
      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-2 max-w-4xl mx-auto">Why Surwahi? Because Your Stay Is Never Just a Stay</h1>
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
