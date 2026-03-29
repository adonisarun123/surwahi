import Image from 'next/image';
import { Noto_Sans_Devanagari } from 'next/font/google';
import Breadcrumbs from '@/components/Breadcrumbs';
import VannVibeBookingForm from '@/components/VannVibeBookingForm';
import { generatePageMetadata } from '@/lib/seo';

const notoDeva = Noto_Sans_Devanagari({
  weight: ['600', '700'],
  subsets: ['devanagari'],
  display: 'swap',
});

export const metadata = generatePageMetadata(
  'Vann Vibe (वन VIBE) | Nature Retreat at Surwahi, Kanha',
  'Immersive 3-night retreat near Kanha National Park: forest bathing, ethno astronomy, sound meditation, Gond art, mindful making, and vegan fusion meals. 3–6 April 2026.',
  '/workshops/vann-vibe',
  '/images/workshops/vann-vibe-poster.jpg',
  [
    'Vann Vibe Kanha',
    'Nature retreat Madhya Pradesh',
    'Forest bathing Kanha',
    'Surwahi retreat',
    'Kanha National Park workshop',
    'Sustainable living retreat India',
    'Gond art Kanha',
  ]
);

const experiences = [
  'Forest Bathing',
  'Ethno Astronomy',
  'Sound Meditation',
  'Gond Art Design',
  'Kanji Making',
  'Vegan Fusion Meals',
] as const;

function TreeSilhouetteBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 rounded-full bg-[#7a5c45]/[0.14]"
          style={{
            left: `${(i * 3.8 + (i % 3) * 2) % 102}%`,
            width: `${10 + (i % 4) * 3}px`,
            height: `${38 + (i % 7) * 7}%`,
            transform: 'translateX(-50%)',
          }}
        />
      ))}
    </div>
  );
}

function FolkMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden
    >
      <circle cx="24" cy="24" r="3.5" fill="currentColor" />
      <path
        d="M24 6v10M24 32v10M6 24h10M32 24h10M11 11l7 7M30 30l7 7M37 11l-7 7M11 37l7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Vann Vibe (वन VIBE)',
  description:
    'Immersive retreat reconnecting guests with nature, culture, community, and self through mindful rituals and forest-rooted living at Surwahi Social Eco Estate, Kanha.',
  startDate: '2026-04-03',
  endDate: '2026-04-06',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'Surwahi Social Eco Estate',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Near Kanha National Park',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Surwahi Eco-Lodge',
    url: 'https://surwahi.com',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Double sharing',
      price: '30000',
      priceCurrency: 'INR',
    },
    {
      '@type': 'Offer',
      name: 'Community dorm',
      price: '23000',
      priceCurrency: 'INR',
    },
  ],
};

export default function VannVibePage() {
  return (
    <div className="relative min-h-screen bg-[#F4EDE4] pt-20 text-[#4B3A2B]">
      <TreeSilhouetteBackdrop />

      <div className="relative z-10">
        <div className="border-b border-[#9a6b47]/25 bg-[#F4EDE4]/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs />
          </div>
        </div>

        <main className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 pb-20">
          {/* Poster-style header */}
          <header className="relative mb-12 text-center">
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-2 sm:px-8">
              <div className="flex flex-col gap-6 text-[#8B5E3C]">
                <FolkMotif className="h-9 w-9 sm:h-11 sm:w-11" />
                <FolkMotif className="h-9 w-9 sm:h-11 sm:w-11" />
              </div>
              <div className="flex flex-col gap-6 text-[#8B5E3C]">
                <FolkMotif className="h-9 w-9 sm:h-11 sm:w-11" />
                <FolkMotif className="h-9 w-9 sm:h-11 sm:w-11" />
              </div>
            </div>

            <h1 className="font-display text-5xl font-bold tracking-[0.12em] text-[#1E5741] sm:text-6xl md:text-7xl">
              <span
                className={`${notoDeva.className} mr-1 inline-block tracking-tight`}
              >
                वन
              </span>
              VIBE
            </h1>
            <p className="mt-4 font-ui text-lg font-medium tracking-wide text-[#8B5E3C] sm:text-xl">
              Live Like Nature Intended
            </p>
          </header>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left column */}
            <div>
              <p className="mb-10 border-l-4 border-[#9a6b47] pl-5 text-base leading-relaxed text-[#4B3A2B] sm:text-lg">
                Leave the noise behind and enter a world that moves slower.{' '}
                <strong className="font-semibold text-[#1E5741]">Vann Vibe</strong>{' '}
                is an immersive retreat designed to reconnect you with nature,
                culture, community, and self, through mindful rituals, and
                forest-rooted living.
              </p>

              <h2 className="mb-6 font-display text-2xl font-semibold tracking-[0.2em] text-[#1E5741]">
                EXPERIENCES
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {experiences.map((label) => (
                  <li
                    key={label}
                    className="rounded-2xl border-2 border-[#9a6b47] bg-[#faf6f0] px-4 py-4 text-center font-ui text-sm font-medium text-[#1E5741] shadow-sm sm:text-base"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column */}
            <div className="flex flex-col justify-start lg:pt-4">
              <p className="font-display text-4xl font-bold leading-none text-[#1E5741] sm:text-5xl md:text-6xl">
                3 – 6
                <br />
                APRIL
                <br />
                2026
              </p>
              <p className="mt-8 max-w-sm font-ui text-base leading-relaxed text-[#5c4a3a] sm:text-lg">
                <span className="font-semibold text-[#8B5E3C]">@</span>{' '}
                Surwahi Social Eco Estate, Kanha National Park, Madhya Pradesh.
              </p>
            </div>
          </div>

          {/* Retreat fee */}
          <section className="mt-16 border-t-2 border-[#9a6b47]/30 pt-12">
            <h2 className="mb-2 font-display text-2xl font-semibold tracking-[0.2em] text-[#1E5741]">
              RETREAT FEE
            </h2>
            <p className="mb-8 text-sm text-[#6b5a4a] sm:text-base">
              ( 3 Nights 4 Days Stay • Meals • Workshops • Experiences )
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-[#9a6b47] bg-[#faf6f0] px-6 py-8 text-center shadow-sm">
                <p className="font-display text-3xl font-bold text-[#1E5741] sm:text-4xl">
                  30,000 INR
                </p>
                <p className="mt-2 text-sm font-medium text-[#5c4a3a] sm:text-base">
                  / person (Double Sharing)
                </p>
              </div>
              <div className="rounded-2xl border-2 border-[#9a6b47] bg-[#faf6f0] px-6 py-8 text-center shadow-sm">
                <p className="font-display text-3xl font-bold text-[#1E5741] sm:text-4xl">
                  23,000 INR
                </p>
                <p className="mt-2 text-sm font-medium text-[#5c4a3a] sm:text-base">
                  / person (Community Dorm)
                </p>
              </div>
            </div>
          </section>

          {/* Bookings */}
          <section className="mt-16 border-t-2 border-[#9a6b47]/30 pt-12">
            <h2 className="mb-8 font-display text-2xl font-semibold tracking-[0.2em] text-[#1E5741]">
              BOOKINGS
            </h2>

            <VannVibeBookingForm />

            <div className="mt-10 rounded-2xl border-2 border-[#9a6b47]/60 bg-[#faf6f0] px-6 py-6 sm:px-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#8B5E3C]">
                Or call directly
              </p>
              <p className="mt-3 text-lg text-[#4B3A2B]">
                <span className="font-semibold text-[#1E5741]">Rushant Dhanwatay</span>
              </p>
              <p className="mt-1 text-lg">
                <a
                  href="tel:+917875586863"
                  className="text-[#8B5E3C] underline decoration-[#9a6b47]/60 underline-offset-4 hover:text-[#1E5741]"
                >
                  +91 78755 86863
                </a>
              </p>
            </div>

            <div className="mt-12 border-t border-[#9a6b47]/25 pt-10">
              <p className="mb-8 text-center font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#8B5E3C]">
                Partners
              </p>
              <div className="grid gap-10 sm:grid-cols-3 sm:items-center sm:justify-items-center">
                <div className="flex flex-col items-center rounded-xl border border-[#9a6b47]/40 bg-white/80 px-6 py-8 text-center shadow-sm">
                  <Image
                    src="/images/partners/mp-tourism-logo.png"
                    alt="Madhya Pradesh Tourism logo"
                    width={128}
                    height={128}
                    className="h-28 w-28 object-contain"
                  />
                  <span className="mt-3 text-xs font-medium text-[#5c4a3a]">
                    Madhya Pradesh Tourism
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-xl border border-[#9a6b47]/40 bg-white/80 px-6 py-8 text-center shadow-sm">
                  <Image
                    src="/images/partners/surwahi-social-logo.png"
                    alt="Surwahi Social — co-living in wilderness"
                    width={280}
                    height={112}
                    className="h-auto max-h-24 w-full max-w-[240px] object-contain object-center"
                  />
                  <span className="mt-2 text-xs italic text-[#8B5E3C]">
                    co-living in wilderness
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-xl border border-[#9a6b47]/40 bg-white/80 px-6 py-8 text-center shadow-sm">
                  <Image
                    src="/images/partners/rustain-earth-logo.jpg"
                    alt="Rustain Earth — sustainability redefined"
                    width={200}
                    height={200}
                    className="h-24 w-auto max-w-full object-contain"
                  />
                  <span className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[#5c4a3a]">
                    Sustainability redefined
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Reference poster */}
          <section className="mt-16 border-t border-[#9a6b47]/25 pt-12">
            <h2 className="mb-6 text-center font-display text-xl text-[#1E5741]">
              Event poster
            </h2>
            <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border-2 border-[#9a6b47]/50 shadow-elev-2">
              <Image
                src="/images/workshops/vann-vibe-poster.jpg"
                alt="Vann Vibe retreat poster: वन VIBE, 3–6 April 2026 at Surwahi Social Eco Estate, Kanha — experiences, fees, and booking contact"
                width={819}
                height={1024}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </section>
        </main>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
    </div>
  );
}
