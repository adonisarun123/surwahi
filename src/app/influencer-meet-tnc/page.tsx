import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CalendarDays,
  BedDouble,
  BadgeCheck,
  Users,
  Phone,
  Mail,
  MessageCircle,
  Camera,
  Clapperboard,
  Images,
  Hash,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

// Campaign-specific terms page: shared directly with invited creators, kept out of search.
export const metadata: Metadata = {
  ...generatePageMetadata(
    'Influencer Meet Coupon – Terms & Conditions',
    'Terms, redemption steps and content deliverables for the Surwahi Social Ecoestate, Kanha influencer meet stay coupon.',
    '/influencer-meet-tnc'
  ),
  robots: { index: false, follow: true },
};

const IG_HANDLE = '@surwahisocialecoestatekanha';
const IG_URL = 'https://www.instagram.com/surwahisocialecoestatekanha';
const PHONE_DISPLAY = '+91 77952 07779';
const PHONE_TEL = '+917795207779';
const EMAIL = 'contact@surwahi.com';

const highlights = [
  { icon: BedDouble, label: 'What you get', value: '2 nights + all meals' },
  { icon: Users, label: 'Guests', value: 'You + 1 companion' },
  { icon: CalendarDays, label: 'Valid', value: '1 Oct 2026 – 1 Oct 2027' },
  { icon: BadgeCheck, label: 'Eligibility', value: '20K+ social reach' },
];

const termGroups = [
  {
    title: 'Validity & eligibility',
    items: [
      'Issued on 1 October 2026 and valid until 1 October 2027.',
      'Open only to creators with a combined social media reach of 20,000 or more. We verify your profile at the time of booking.',
      'Not valid on peak dates (20 December – 5 January), long weekends or festival dates. Blocked dates are confirmed when you book.',
    ],
  },
  {
    title: 'What the stay includes',
    items: [
      'A 2-night stay with all meals at Surwahi Social Ecoestate, Kanha.',
      'Valid for one influencer plus one companion (2 guests, 1 room). Any additional guest is charged at our standard tariff.',
      'Room category is allotted based on availability.',
      'Not included: jungle safari, travel to and from Surwahi, and paid workshops.',
    ],
  },
  {
    title: 'Booking & check-in',
    items: [
      'Book at least 7 days before your stay and quote your coupon code.',
      'Show this coupon and a valid government-issued photo ID at check-in.',
    ],
  },
  {
    title: 'Conditions of use',
    items: [
      'The coupon is non-transferable, single-use and has no cash value.',
      'Surwahi house rules apply throughout the stay.',
      "In case of any dispute, the management's decision is final.",
    ],
  },
];

const redeemSteps = [
  {
    title: 'Reach out',
    body: 'Call or WhatsApp us, or email, with your coupon code, Instagram handle and preferred dates.',
  },
  {
    title: 'Get confirmed',
    body: 'We verify your profile and confirm your dates and room in writing.',
  },
  {
    title: 'Check in',
    body: 'Show the coupon and your government photo ID at the front desk.',
  },
];

const hashtags = [
  '#SurwahiSocialEcoestate',
  '#KanhaNationalPark',
  '#MPTourism',
  '#MPTourismInfluencerMeet',
  '#EcoStayKanha',
];

export default function InfluencerMeetTncPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs
          customBreadcrumbs={[
            { name: 'Home', href: '/' },
            { name: 'Influencer Meet – Terms', href: '/influencer-meet-tnc' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-forest-700 mb-3">
            MP Tourism Influencer Meet
          </p>
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            Stay Coupon: Terms &amp; Conditions
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            Everything you need to know about redeeming your complimentary stay at Surwahi Social
            Ecoestate, Kanha, and the content we&apos;d love you to create while you&apos;re here.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
        {/* At a glance */}
        <section aria-labelledby="glance" className="mb-16">
          <h2 id="glance" className="sr-only">
            At a glance
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-mist-200 bg-white p-5 text-center shadow-sm"
              >
                <Icon className="h-7 w-7 text-moss-500 mx-auto mb-2" aria-hidden />
                <p className="text-xs uppercase tracking-wide text-soil-700/70">{label}</p>
                <p className="font-semibold text-forest-900 mt-1">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Terms */}
        <section aria-labelledby="terms" className="mb-16">
          <h2 id="terms" className="font-display text-3xl text-forest-900 mb-8">
            Terms &amp; Conditions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {termGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-semibold text-xl text-forest-900 mb-3">{group.title}</h3>
                <ul className="space-y-2 text-soil-700">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-moss-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How to redeem */}
        <section aria-labelledby="redeem" className="mb-16 rounded-3xl bg-forest-900 text-white p-8 md:p-10">
          <h2 id="redeem" className="font-display text-3xl mb-8">
            How to redeem
          </h2>
          <ol className="grid md:grid-cols-3 gap-6 mb-8">
            {redeemSteps.map((step, i) => (
              <li key={step.title}>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-moss-500 font-semibold mb-3">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-white/85">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-forest-900 hover:bg-sand-50"
            >
              <Phone className="h-4 w-4" aria-hidden /> {PHONE_DISPLAY}
            </a>
            <a
              href={`https://wa.me/${PHONE_TEL.replace('+', '')}?text=${encodeURIComponent(
                'Hi Surwahi, I would like to redeem my Influencer Meet coupon. Code: ____ | Instagram: ____ | Preferred dates: ____'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-moss-500 px-5 py-2.5 font-semibold text-white hover:bg-forest-700"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp us
            </a>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent('Influencer Meet coupon redemption')}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
            >
              <Mail className="h-4 w-4" aria-hidden /> {EMAIL}
            </a>
          </div>
        </section>

        {/* Deliverables */}
        <section aria-labelledby="deliverables" className="mb-16">
          <h2 id="deliverables" className="font-display text-3xl text-forest-900 mb-3">
            Content deliverables
          </h2>
          <p className="text-soil-700 mb-8">
            All posts go out as Instagram Collab posts with{' '}
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-forest-700 underline">
              {IG_HANDLE}
            </a>
            .
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-sm">
              <Images className="h-8 w-8 text-moss-500 mb-3" aria-hidden />
              <h3 className="font-semibold text-xl text-forest-900 mb-2">3 carousel posts</h3>
              <ul className="space-y-1.5 text-soil-700 text-sm">
                <li>6–10 slides each</li>
                <li>Cover the rooms, meals and experiences</li>
                <li>Location tag on every post</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-sm">
              <Clapperboard className="h-8 w-8 text-moss-500 mb-3" aria-hidden />
              <h3 className="font-semibold text-xl text-forest-900 mb-2">2 reels (30–90 sec)</h3>
              <ul className="space-y-1.5 text-soil-700 text-sm">
                <li>
                  <span className="font-medium text-forest-900">Reel 1:</span> mud suites, cottages
                  and the property
                </li>
                <li>
                  <span className="font-medium text-forest-900">Reel 2:</span> farm-to-table food and
                  experiences
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-sm">
              <Camera className="h-8 w-8 text-moss-500 mb-3" aria-hidden />
              <h3 className="font-semibold text-xl text-forest-900 mb-2">10 stories</h3>
              <ul className="space-y-1.5 text-soil-700 text-sm">
                <li>Posted during the stay, spread across both days</li>
                <li>Tag {IG_HANDLE} in every story</li>
                <li>Location sticker + link sticker to www.surwahi.com</li>
                <li>Tag @mptourism in at least 3 stories</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-xl text-forest-900 mb-3">
                <Hash className="h-5 w-5 text-moss-500" aria-hidden /> Hashtags (use on every post)
              </h3>
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-mist-200 px-3 py-1 text-sm font-medium text-forest-900 select-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-xl text-forest-900 mb-3">
                <Clock className="h-5 w-5 text-moss-500" aria-hidden /> Timeline
              </h3>
              <ul className="space-y-2 text-soil-700">
                <li><span className="font-medium text-forest-900">During the stay:</span> stories</li>
                <li><span className="font-medium text-forest-900">Within 15 days of check-out:</span> reels and carousels</li>
                <li><span className="font-medium text-forest-900">7 days after posting:</span> share insights (reach, views, saves)</li>
                <li><span className="font-medium text-forest-900">Minimum 6 months:</span> posts stay live</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Content usage & conduct */}
        <section aria-labelledby="conduct" className="mb-16">
          <h2 id="conduct" className="font-display text-3xl text-forest-900 mb-6">
            Content usage &amp; conduct
          </h2>
          <ul className="space-y-3 text-soil-700">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-moss-500" />
              <span>Share at least 10 raw photos or videos from your stay. Surwahi may repost them on its channels with credit to you.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-moss-500" />
              <span>Disclose the partnership clearly on every post (Collab / paid-partnership label or #Collab), in line with ASCI influencer advertising guidelines.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-moss-500" />
              <span>Respect the wildlife and the privacy of local villagers. Always ask before photographing people.</span>
            </li>
          </ul>
          <div className="mt-8 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-soil-700">
            <AlertTriangle className="h-6 w-6 flex-shrink-0 text-amber-600" aria-hidden />
            <p>
              If the agreed deliverables are not completed within the timeline, Surwahi may charge
              the stay at the standard tariff.
            </p>
          </div>
        </section>

        <p className="text-center text-sm text-soil-700/70">
          Questions? Read our{' '}
          <Link href="/house-rules" className="underline hover:text-forest-700">house rules</Link>{' '}
          or{' '}
          <Link href="/contact" className="underline hover:text-forest-700">contact us</Link>.
        </p>
      </div>
    </div>
  );
}
