import Link from 'next/link';
import { Leaf, Users, Shield, Star, Award, Heart, PawPrint, Sprout, ChefHat, Trees } from 'lucide-react';
import Image from 'next/image';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Award-Winning Eco Lodge near Kanha National Park',
  description: 'Stay at Surwahi Eco-Lodge near Kanha National Park. Award-winning sustainable mud cottages, dorms & camping. About 20 km from Khatia Gate.',
  url: 'https://surwahi.com',
  keywords: ['Eco Lodge Kanha', 'Sustainable Resort India', 'Kanha National Park Hotels', 'Mud House Stay', 'Wildlife Resort Kanha', 'Surwahi Eco-Lodge', 'Ecotourism Madhya Pradesh'],
});

export default function HomePage() {
  return (
    <main id="main">
      <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://ik.imagekit.io/adonisarun/WhatsApp%20Image%202025-10-24%20at%2019.36.22.jpeg?updatedAt=1761321841612"
            alt="Aerial view of Surwahi Eco-Lodge and sustainable estate near Kanha National Park"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/50 via-forest-900/60 to-forest-900/70 z-10"></div>
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="font-display text-display-xl text-bone-0 mb-6 animate-fade-up drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Award-Winning Eco Lodge near Kanha National Park
          </h1>
          <p className="text-body-lg text-bone-0 mb-8 max-w-2xl mx-auto animate-fade-up drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '0.2s' }}>
            Nestled about 20km from Kanha National Park (Khatia Gate), Surwahi Eco-Lodge invites you to slow down, reconnect with nature, and experience the art of sustainable living.
            <span className="block mt-4 text-sm font-bold bg-forest-900/40 py-1 px-3 rounded-full inline-block backdrop-blur-sm border border-bone-0/20">
              🏆 Winner: John Wakefield Memorial Award 2024
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Link href="/stay" className="btn btn-primary text-base bg-moss-500 hover:bg-moss-600 text-white border-2 border-white shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)] transition-all" style={{ color: 'white' }}>
              Book Your Eco Stay
            </Link>
            <Link
              href="/about/our-story"
              className="btn btn-secondary bg-bone-0 hover:bg-bone-0/95 border-2 border-white text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)] transition-all"
            >
              Explore the Story
            </Link>
          </div>
        </div>
      </section>

      {/* About Surwahi */}
      <section id="about" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-lg text-forest-900 mb-4">About Surwahi — A Vision Rooted in Nature</h2>
          <p className="text-body-lg max-w-prose mx-auto mb-6">
            At Surwahi Eco-Lodge, we believe in living gently — where nature, people, and architecture coexist in harmony. What began as a small idea to build responsibly has now become a vibrant community of travelers, artisans, and changemakers who share one dream: <strong>a greener tomorrow.</strong>
          </p>
          <p className="text-body-md max-w-prose mx-auto">
            From earthen walls to solar lighting and natural ventilation, every corner at Surwahi celebrates <strong>eco-conscious design</strong> — built <em>with</em> nature, not <em>over</em> it.
          </p>
          <div className="mt-8">
            <Link href="/about/our-story" className="btn btn-secondary text-clay-500 border-clay-500/50 hover:bg-clay-500/10">
              Know Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Eco Accommodations */}
      <section className="bg-mist-200/50 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-lg text-forest-900 mb-4">Eco Accommodations — Designed for Comfort, Crafted for the Earth</h2>
          <p className="text-body-lg max-w-prose mx-auto mb-8">
            Stay in thoughtfully designed spaces made from local materials — mud, bamboo, stone, and love. Each room offers comfort without compromise, blending traditional craftsmanship with minimal modern amenities.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <Link href="/stay/suites" className="block bg-white p-6 rounded-card shadow-elev-1 hover:shadow-elev-2 transition-all">
              <h3 className="font-ui font-bold text-forest-900 mb-1">Forest &amp; River Suites</h3>
              <p className="text-sm text-soil-700">Private mud-built suites with forest and river views.</p>
            </Link>
            <Link href="/stay/mudhouses" className="block bg-white p-6 rounded-card shadow-elev-1 hover:shadow-elev-2 transition-all">
              <h3 className="font-ui font-bold text-forest-900 mb-1">Mudhouses &amp; Dormitories</h3>
              <p className="text-sm text-soil-700">Traditional earthen cottages and dorms for groups and solo travelers.</p>
            </Link>
            <Link href="/stay/camping" className="block bg-white p-6 rounded-card shadow-elev-1 hover:shadow-elev-2 transition-all">
              <h3 className="font-ui font-bold text-forest-900 mb-1">Safari Tents &amp; Camping</h3>
              <p className="text-sm text-soil-700">Comfortable tented stays under starlit skies, close to nature.</p>
            </Link>
            <Link href="/stay/dining" className="block bg-white p-6 rounded-card shadow-elev-1 hover:shadow-elev-2 transition-all">
              <h3 className="font-ui font-bold text-forest-900 mb-1">Farm-to-Table Dining</h3>
              <p className="text-sm text-soil-700">Seasonal meals from our organic farm and local kitchens.</p>
            </Link>
          </div>
          <div className="mt-12">
            <Link href="/stay" className="btn btn-primary text-base bg-forest-700 hover:bg-forest-900 text-white"
              style={{ color: 'white' }}
            >
              Explore Stays
            </Link>
            <p className="mt-4 text-sm"><Link href="/corporate-retreats" className="text-clay-500 underline underline-offset-2">Planning a group or corporate retreat? &rarr;</Link></p>
          </div>
        </div>
      </section>

      {/* Sustainability at the Core */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-lg text-forest-900 mb-4">Sustainability at the Core</h2>
          <p className="text-body-lg max-w-prose mx-auto mb-12">
            Sustainability is not a feature here — it’s our foundation. We practice what we preach, from water and waste management to organic farming and community building.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-fern-300/10 rounded-full flex items-center justify-center"><Leaf className="h-8 w-8 text-fern-300" /></div>
              <h3 className="font-ui font-bold text-lg text-forest-900">Eco-friendly construction</h3>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-river-400/10 rounded-full flex items-center justify-center"><Shield className="h-8 w-8 text-river-400" /></div>
              <h3 className="font-ui font-bold text-lg text-forest-900">Water conservation</h3>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-clay-500/10 rounded-full flex items-center justify-center"><Star className="h-8 w-8 text-clay-500" /></div>
              <h3 className="font-ui font-bold text-lg text-forest-900">Energy conservation</h3>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-fern-300/10 rounded-full flex items-center justify-center"><Heart className="h-8 w-8 text-fern-300" /></div>
              <h3 className="font-ui font-bold text-lg text-forest-900">Evapotranspiration toilets</h3>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-clay-500/10 rounded-full flex items-center justify-center"><Users className="h-8 w-8 text-clay-500" /></div>
              <h3 className="font-ui font-bold text-lg text-forest-900">Community partnerships</h3>
            </div>
          </div>
          <div className="mt-12">
            <Link href="/sustainability" className="btn btn-secondary text-clay-500 border-clay-500/50 hover:bg-clay-500/10">
              Explore Our Green Practices
            </Link>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="bg-mist-200/50 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-lg text-forest-900 mb-4">Experiences that Connect You to the Wild and Within</h2>
          <p className="text-body-lg max-w-prose mx-auto mb-12">
            At Surwahi, every experience brings you closer — to nature, to people, and to yourself.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/experiences/wildlife-safaris" className="block bg-white/70 hover:bg-white p-6 rounded-card transition-colors text-center group">
              <div className="w-14 h-14 mx-auto mb-4 bg-clay-500/10 rounded-full flex items-center justify-center"><PawPrint className="h-7 w-7 text-clay-500" /></div>
              <h3 className="font-ui font-bold text-forest-900 mb-1">Wildlife Safaris</h3>
              <p className="text-soil-700 text-sm">Track tigers and barasingha on guided jeep safaris in Kanha Tiger Reserve.</p>
            </Link>
            <Link href="/experiences/farm-life-visit" className="block bg-white/70 hover:bg-white p-6 rounded-card transition-colors text-center group">
              <div className="w-14 h-14 mx-auto mb-4 bg-moss-500/10 rounded-full flex items-center justify-center"><Sprout className="h-7 w-7 text-moss-500" /></div>
              <h3 className="font-ui font-bold text-forest-900 mb-1">Farm Life</h3>
              <p className="text-soil-700 text-sm">Sow, nurture, and harvest on our organic farm.</p>
            </Link>
            <Link href="/experiences/live-tribal-cooking-experiences" className="block bg-white/70 hover:bg-white p-6 rounded-card transition-colors text-center group">
              <div className="w-14 h-14 mx-auto mb-4 bg-river-400/10 rounded-full flex items-center justify-center"><ChefHat className="h-7 w-7 text-river-400" /></div>
              <h3 className="font-ui font-bold text-forest-900 mb-1">Tribal Cooking &amp; Culture</h3>
              <p className="text-soil-700 text-sm">Cook and connect with Gond and Baiga families.</p>
            </Link>
            <Link href="/experiences/guided-forest-trails" className="block bg-white/70 hover:bg-white p-6 rounded-card transition-colors text-center group">
              <div className="w-14 h-14 mx-auto mb-4 bg-fern-300/10 rounded-full flex items-center justify-center"><Trees className="h-7 w-7 text-fern-300" /></div>
              <h3 className="font-ui font-bold text-forest-900 mb-1">Guided Forest Trails</h3>
              <p className="text-soil-700 text-sm">Walk ancient sal forests with expert naturalist guides.</p>
            </Link>
          </div>
          <div className="mt-12">
            <Link href="/experiences" className="btn btn-primary text-base bg-forest-700 hover:bg-forest-900 text-white"
              style={{ color: 'white' }}
            >
              Experience Surwahi
            </Link>
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-lg text-forest-900 mb-4">Hands-On Workshops</h2>
          <p className="text-body-lg max-w-prose mx-auto mb-8">
            Learn from local artisans and the land itself — tribal art, natural building, and mindful time in the forest.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Link href="/workshops/gond-art-workshops" className="px-4 py-2 rounded-full bg-mist-200/60 hover:bg-mist-200 text-forest-900 text-sm transition-colors">Gond Art</Link>
            <Link href="/workshops/earthen-pottery" className="px-4 py-2 rounded-full bg-mist-200/60 hover:bg-mist-200 text-forest-900 text-sm transition-colors">Earthen Pottery</Link>
            <Link href="/workshops/build-with-mud" className="px-4 py-2 rounded-full bg-mist-200/60 hover:bg-mist-200 text-forest-900 text-sm transition-colors">Build with Mud</Link>
            <Link href="/workshops/forest-bathing" className="px-4 py-2 rounded-full bg-mist-200/60 hover:bg-mist-200 text-forest-900 text-sm transition-colors">Forest Bathing</Link>
            <Link href="/workshops/star-gazing-nights" className="px-4 py-2 rounded-full bg-mist-200/60 hover:bg-mist-200 text-forest-900 text-sm transition-colors">Star Gazing Nights</Link>
          </div>
          <Link href="/workshops" className="btn btn-secondary text-clay-500 border-clay-500/50 hover:bg-clay-500/10">
            View All Workshops
          </Link>
        </div>
      </section>

      {/* Kanha & Surroundings */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-lg text-forest-900 mb-4">Kanha & Surroundings — Nature’s Grand Theatre</h2>
          <p className="text-body-lg max-w-prose mx-auto mb-8">
            Explore the mystical beauty of <strong>Kanha Tiger Reserve</strong>, one of India’s most biodiverse landscapes. From <Link href="/experiences/wildlife-safaris" className="text-clay-500 underline underline-offset-2">early morning jungle safaris</Link> to quiet village walks, Surwahi is your perfect gateway to the wild heart of India. Plan around the <Link href="/plan-your-visit/best-time-to-visit" className="text-clay-500 underline underline-offset-2">best time to visit</Link> and our <Link href="/plan-your-visit/safari-booking-guide" className="text-clay-500 underline underline-offset-2">safari booking guide</Link>.
          </p>
          <Link href="/plan-your-visit/getting-here" className="btn btn-secondary text-clay-500 border-clay-500/50 hover:bg-clay-500/10">
            Plan Your Kanha Journey
          </Link>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-forest-900 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-lg mb-4">Gallery — The Soul of Surwahi</h2>
          <p className="text-body-lg max-w-prose mx-auto mb-8 text-bone-0/80">
            Every photograph tells a story — of sunlit mornings, tribal art, forest trails, and quiet nights filled with stars.
          </p>
          <Link href="/gallery" className="btn btn-secondary bg-transparent border-bone-0 text-bone-0 hover:bg-bone-0/10"
            style={{ color: 'white' }}
          >
            View Gallery
          </Link>
        </div>
      </section>

      {/* Recognitions & Accreditations */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-lg text-forest-900 mb-8">Recognitions & Accreditations</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
            <div className="text-center">
              <Award className="h-12 w-12 mx-auto text-clay-500 mb-4" />
              <p className="font-bold text-lg">John Wakefield Memorial Award 2024</p>
              <p className="text-sm">Most Inspirational Eco Lodge of the Year by TOFT Tigers.</p>
            </div>
            <div className="w-px h-24 bg-mist-200 hidden md:block"></div>
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto text-fern-300 mb-4" />
              <p className="font-bold text-lg">Certified Eco-Friendly Homestay</p>
              <p className="text-sm">by the Madhya Pradesh Tourism Board.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-canopy-dawn text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-lg mb-4">Join the Movement for a Greener Tomorrow</h2>
          <p className="text-body-lg max-w-prose mx-auto mb-8 text-bone-0/90">
            Surwahi isn’t just a destination — it’s an invitation. Come be part of a community that’s redefining what sustainable living means.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/stay" className="btn btn-primary text-base bg-clay-500 hover:bg-clay-500/90 text-white border-clay-500"
              style={{ color: 'white' }}
            >
              Book Your Stay
            </Link>
            <Link href="/contact" className="btn btn-secondary bg-transparent border-bone-0 text-bone-0 hover:bg-bone-0/10"
              style={{ color: 'white' }}
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
