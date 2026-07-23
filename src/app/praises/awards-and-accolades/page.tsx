import { Trophy, Star, Award, Leaf, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Awards & Accolades',
  'Surwahi Social Ecoestate is an award-winning eco-lodge near Kanha — TOFTigers Most Inspirational Eco Lodge 2024, AEN International Ecotourism Award 2025, MP Tourism Best B&B 2024-25, Booking.com Traveller Review Awards 2023-2026, plus Ministry of Tourism recognition and published research.',
  '/praises/awards-and-accolades'
);

const recognitions = [
  { icon: Trophy, title: 'Most Inspirational Eco Lodge 2024', by: 'TOFTigers Wildlife Travel Awards', description: 'Winner of the Quality PUG Eco Rating for the most inspirational eco lodge — recognising our model for wildlife-positive, community-first tourism around Kanha.' },
  { icon: Award, title: 'Best Bed & Breakfast Unit 2024–25', by: 'Madhya Pradesh Tourism Board', description: 'A Certificate of Excellence for immersive tourism experiences and high-quality hospitality in Madhya Pradesh.' },
  { icon: Star, title: 'AEN International Ecotourism Award 2025', by: 'Asia Ecotourism Network', description: 'Winner in the Sustainable Building category — for mud-built, low-impact architecture that works with the land, not over it.' },
  { icon: Leaf, title: 'Booking.com Traveller Review Award', by: '2023 · 2024 · 2025 · 2026', description: 'Four consecutive years of recognition driven by a 9.6/10 guest score — earned directly from real guest reviews.' },
];

const certificates = [
  { src: '/awards/toftigers-2024.jpg', title: 'Most Inspirational Eco Lodge', meta: 'TOFTigers Wildlife Travel Awards · 2024' },
  { src: '/awards/mp-tourism-2025.jpg', title: 'Best Bed & Breakfast Unit 2024–25', meta: 'MP Tourism Board' },
  { src: '/awards/aen-2025.jpg', title: 'Winner — Sustainable Building', meta: 'AEN Intl. Ecotourism Awards · 2025' },
  { src: '/awards/booking-2026.png', title: 'Traveller Review Award 2026', meta: 'Booking.com' },
  { src: '/awards/booking-2025.png', title: 'Traveller Review Award 2025', meta: 'Booking.com · 9.6/10' },
  { src: '/awards/booking-2024.png', title: 'Traveller Review Award 2024', meta: 'Booking.com' },
  { src: '/awards/booking-2023.png', title: 'Traveller Review Award 2023', meta: 'Booking.com' },
  { src: '/awards/irta-outlook-silver-2023.jpg', title: 'Silver — B&Bs & Guesthouses', meta: 'IRTA / Outlook Traveller · 2023' },
  { src: '/awards/woloo-wah-2022.jpeg', title: 'WAH Hygiene Certification', meta: 'Woloo · Toilet Board Coalition · 2022' },
];

const recognitionGroups = [
  {
    heading: 'Government & Industry Recognition',
    items: [
      { label: 'Showcase B&B on the NIDHI+ national portal', source: 'Ministry of Tourism, Govt. of India', url: 'https://nidhi.tourism.gov.in/home/details/d7cce69d-f737-4019-903f-60cf5ee7c8df' },
      { label: 'Rural Tourism listing', source: 'Ministry of Tourism, Govt. of India', url: 'https://www.rural.tourism.gov.in/Surwahi-Social-homestay.html' },
      { label: 'Sustainable Tourism newsletter feature (Apr 2023)', source: 'Central Nodal Agency for Sustainable Tourism, Ministry of Tourism', url: 'https://drive.google.com/file/d/1LjxiWmUQdA8xyQC3cYs84gcCR-4G9mJw/view' },
      { label: 'Recognised homestay at Kanha Tiger Reserve', source: 'Madhya Pradesh Tourism Board', url: 'https://www.mptourism.com/homestays/index.php?route=hotel/details&product_id=190' },
      { label: 'Responsible Tourism Awards 2023', source: 'ICRT India', url: 'https://responsibletourismpartnership.org/india-icrt-awards-2023/' },
      { label: 'Best Eco-friendly Homestay 2024', source: 'WTCA, Mumbai', url: 'https://travellersworldonline.com/the-wildlife-tourism-conclave-and-awards-2024-is-set-to-begin-inmumbai/' },
    ],
  },
  {
    heading: 'Media & Editorial',
    items: [
      { label: 'Building a sustainable homestay near Kanha — feature', source: 'The Better India', url: 'https://www.thebetterindia.com/305324/entrepreneur-builds-sustainable-homestay-resort-inkanha-national-park-travel-plans/' },
      { label: 'India Responsible Travel Awards 2023 — Silver, Sustainable Leadership (Small Stays / B&B)', source: 'Outlook Traveller', url: 'https://www.outlookindia.com/outlooktraveller/explore/story/73209/for-the-responsible-traveller' },
      { label: 'A New Model of Ecotourism', source: 'Youth For India (YFN) Magazine', url: 'https://yfnmagazine.wordpress.com/2023/03/05/surwahi-a-new-model-of-ecotourism/' },
    ],
  },
  {
    heading: 'Research & Academic',
    items: [
      { label: 'International research paper on sustainability (IIM Sirmaur)', source: 'SSRN', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4160675' },
      { label: 'Sustainable Strategies of Ecotourism in Conservation Areas — SSEK case study (TERI & IIM Sirmaur, 2024)', source: 'Allied Business Academies Journal', url: 'https://www.abacademies.org/articles/sustainable-strategies-of-ecotourism-enterprises-inconservation-areas-a-case-study-of-surwahi-social-ecoestate-kanha-national-par-16479.html' },
    ],
  },
];

export default function AwardsAndAccoladesPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">Awards &amp; Accolades</h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            Our model for sustainable, community-first tourism near Kanha has been recognised by national and international bodies, the Government of India, academic researchers — and, year after year, by our guests.
          </p>
        </div>
      </section>

      {/* Marquee recognitions */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {recognitions.map((r, i) => (
            <div key={i} className="bg-white border border-stone-100 shadow-elev-1 p-6 rounded-card flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 bg-clay-500/10 rounded-full flex items-center justify-center"><r.icon className="h-6 w-6 text-clay-500" /></div>
              <div>
                <h3 className="font-display text-xl text-forest-900 mb-1">{r.title}</h3>
                <p className="font-semibold text-moss-500 text-sm mb-2">{r.by}</p>
                <p className="text-soil-700 text-sm leading-relaxed">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate gallery */}
      <section className="bg-mist-200/40 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Award className="h-8 w-8 text-moss-500 mx-auto mb-3" />
            <h2 className="font-display text-3xl text-forest-900">Certificates &amp; Badges</h2>
            <p className="text-soil-700 mt-2">The recognitions, in full.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((c, i) => (
              <figure key={i} className="bg-white rounded-card shadow-elev-1 border border-stone-100 overflow-hidden flex flex-col">
                <div className="relative aspect-[4/5] bg-sand-50">
                  <Image src={c.src} alt={c.title} fill className="object-contain p-3" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <figcaption className="p-4 border-t border-stone-100 text-center">
                  <div className="font-ui font-bold text-forest-900 text-sm">{c.title}</div>
                  <div className="text-xs text-soil-600 mt-1">{c.meta}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Recognitions, media & research */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-forest-900 mb-10 text-center">Recognitions, Media &amp; Research</h2>
          <div className="space-y-10">
            {recognitionGroups.map((g, gi) => (
              <div key={gi}>
                <h3 className="font-ui font-bold text-forest-900 text-sm uppercase tracking-wider border-b border-stone-200 pb-2 mb-4">{g.heading}</h3>
                <ul className="space-y-3">
                  {g.items.map((it, ii) => (
                    <li key={ii}>
                      <a href={it.url} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-soil-700 hover:text-forest-900 transition-colors">
                        <ExternalLink className="h-4 w-4 text-moss-500 flex-shrink-0 mt-1" />
                        <span>
                          <span className="font-medium">{it.label}</span>
                          <span className="text-soil-500"> — {it.source}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-soil-500 mt-8 text-center">Also certified: Bio-Digester Implementation (2022) and Woloo WAH Assurance of Hygiene (2022).</p>
        </div>
      </div>
    </div>
  );
}
