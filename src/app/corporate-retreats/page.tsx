import Link from 'next/link';
import Image from 'next/image';
import { Users, Leaf, Award, Heart, Shield, Sun, Check } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

// NOTE FOR SURWAHI TEAM: This page is intentionally inquiry-driven and contains
// no invented figures. To strengthen it, add once confirmed: max group capacity,
// 2-3 sample retreat packages with durations, indicative per-person pricing,
// meeting/AV facilities, and real group/retreat photos. Share these to have them built in.

export const metadata = generatePageMetadata(
  'Corporate Retreats & Team Offsites near Kanha',
  'Host a corporate retreat, team offsite or wellness retreat at Surwahi, an award-winning eco-lodge near Kanha National Park. Forest setting, sustainable stays, team workshops, safaris and farm-to-table dining, tailored to your group.',
  '/corporate-retreats',
  undefined,
  ['Corporate Retreat near Kanha', 'Team Offsite Madhya Pradesh', 'Wellness Retreat Kanha', 'Nature Offsite India', 'Group Retreat Kanha', 'Eco Retreat Venue India']
);

const reasons = [
  { icon: Sun, title: 'A true digital detox', text: 'Swap meeting rooms for sal forests. A calm, screen-light setting that resets teams and sparks real conversation.' },
  { icon: Leaf, title: 'Sustainability leadership', text: 'Mud architecture, solar power, evapo-transpiration toilets and an organic farm, a venue that lives your ESG values.' },
  { icon: Award, title: 'Award-winning', text: 'Winner of the 2024 John Wakefield Memorial Award (TOFTigers) and a certified eco-friendly homestay by MP Tourism.' },
  { icon: Heart, title: 'Rooted in community', text: 'Connect with the Gond and Baiga communities through art, craft and cuisine, meaningful, not manufactured.' },
  { icon: Shield, title: 'Exclusive & private', text: 'A secluded estate near Kanha where your group can gather, focus and unwind away from the crowds.' },
  { icon: Users, title: 'Flexible for any group', text: 'Suites, mudhouses and dormitories suit teams of varied sizes and budgets. Tell us your group and we tailor the stay.' },
];

const formats = [
  'Corporate team offsites',
  'Leadership & strategy retreats',
  'Wellness & mindfulness retreats',
  'Incentive & reward trips',
  'NGO, impact & sustainability workshops',
  'School & college nature-learning trips',
];

const activities = [
  { title: 'Team workshops', text: 'Gond art, earthen pottery, build-with-mud and leaf-plate making, hands-on sessions that bond teams.', href: '/workshops' },
  { title: 'Wildlife safaris', text: 'Guided jeep safaris into Kanha to track tigers, barasingha and birdlife.', href: '/experiences/wildlife-safaris' },
  { title: 'Forest bathing & wellness', text: 'Shinrin-yoku, guided forest trails and stargazing nights to slow the pace.', href: '/workshops/forest-bathing' },
  { title: 'Farm & food experiences', text: 'Harvest from our organic farm and share farm-to-table meals around the fire.', href: '/experiences/farm-life-visit' },
];

const inclusions = [
  'Accommodation across suites, mudhouses and dormitories',
  'Farm-to-table meals with dietary options',
  'A curated mix of workshops, safaris and nature activities',
  'On-ground coordination and a dedicated host',
  'Airport/station transfer arrangements (Jabalpur / Nagpur)',
  'Bonfires, stargazing and open-air gathering spaces',
];

export default function CorporateRetreatsPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://ik.imagekit.io/adonisarun/WhatsApp%20Image%202025-10-24%20at%2019.36.22.jpeg?updatedAt=1761321841612" alt="Aerial view of the Surwahi eco estate near Kanha, a private setting for corporate retreats" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-forest-900/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-display-xl mb-4 drop-shadow-lg">Corporate Retreats &amp; Team Offsites near Kanha</h1>
          <p className="text-body-lg max-w-2xl mx-auto text-bone-0/90 drop-shadow">
            Bring your team to an award-winning eco-lodge in the forests near Kanha National Park, for offsites, leadership retreats and wellness getaways that people actually remember.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn btn-primary bg-clay-500 hover:bg-clay-500/90 text-white border-clay-500" style={{ color: 'white' }}>Plan Your Retreat</Link>
          </div>
        </div>
      </section>

      {/* Why Surwahi */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg text-forest-900 mb-4">Why hold your retreat at Surwahi</h2>
            <p className="text-body-lg max-w-prose mx-auto text-soil-700">A rare combination of nature, purpose and comfort, about 20 km from Kanha&apos;s Khatia Gate, in Balaghat, Madhya Pradesh.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((r) => (
              <div key={r.title} className="bg-white p-6 rounded-card shadow-elev-1">
                <div className="w-12 h-12 mb-4 bg-fern-300/10 rounded-full flex items-center justify-center"><r.icon className="h-6 w-6 text-fern-300" /></div>
                <h3 className="font-ui font-bold text-lg text-forest-900 mb-2">{r.title}</h3>
                <p className="text-soil-700 text-sm">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="bg-mist-200/50 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-lg text-forest-900 mb-8">Retreats we host</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {formats.map((f) => (
              <span key={f} className="px-4 py-2 rounded-full bg-white text-forest-900 text-sm shadow-elev-1">{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg text-forest-900 mb-4">Curated group experiences</h2>
            <p className="text-body-lg max-w-prose mx-auto text-soil-700">Mix and match to build the right rhythm for your team.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {activities.map((a) => (
              <Link key={a.title} href={a.href} className="block bg-white p-6 rounded-card shadow-elev-1 hover:shadow-elev-2 transition-all">
                <h3 className="font-ui font-bold text-lg text-forest-900 mb-2">{a.title}</h3>
                <p className="text-soil-700 text-sm">{a.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions */}
      <section className="bg-sand-50 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-display-lg text-forest-900 mb-8 text-center">What a Surwahi retreat includes</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {inclusions.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-moss-500 flex-shrink-0 mt-0.5" />
                  <span className="text-soil-700">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-soil-700 mt-8">Every retreat is tailored to your group size, dates and goals. Sustainability and community are woven through, see our <Link href="/sustainability" className="text-clay-500 underline underline-offset-2">green practices</Link>.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-900 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-lg mb-4">Let&apos;s plan your retreat</h2>
          <p className="text-body-lg max-w-prose mx-auto mb-8 text-bone-0/90">Tell us your group size, preferred dates and what you&apos;d like the retreat to achieve, and we&apos;ll craft a bespoke proposal.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary bg-clay-500 hover:bg-clay-500/90 text-white border-clay-500" style={{ color: 'white' }}>Enquire About a Retreat</Link>
            <a href="tel:+917795207779" className="btn btn-secondary bg-transparent border-bone-0 text-bone-0 hover:bg-bone-0/10" style={{ color: 'white' }}>Call +91 77952 07779</a>
          </div>
        </div>
      </section>
    </div>
  );
}
