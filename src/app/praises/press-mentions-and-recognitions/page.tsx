import { Newspaper, MessageSquare } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Press Mentions & Recognitions',
  'See what the media and our guests are saying about our unique eco-lodge.',
  '/praises/press-mentions-and-recognitions'
);

const pressDetails = {
  title: 'In the Spotlight: Press & Testimonials',
  description: 'We are grateful for the stories shared about our journey. Here are some of the press mentions and guest testimonials that have honored and inspired us.',
  testimonials: [
    {
      name: 'Ananya Sharma',
      location: 'Mumbai, India',
      quote: 'An absolutely magical experience. The connection with nature, the warmth of the community, and the commitment to sustainability is palpable in every corner. I left with a renewed sense of purpose.',
    },
    {
      name: 'David Chen',
      location: 'California, USA',
      quote: 'I came for the wildlife, but I left with so much more. The workshops, the conversations, the food - everything was an experience in authentic, sustainable living. Highly recommended.',
    },
  ],
};

export default function PressMentionsAndRecognitionsPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {pressDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {pressDetails.description}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Story */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto bg-white rounded-card shadow-elev-1 border border-stone-100 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-moss-600 mb-3">
                <Newspaper className="h-4 w-4" /> Featured in The Better India &middot; 22 July 2026 &middot; by Shweta Dravid
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-forest-900 mb-4">
                &ldquo;This Duo Turned 10 Acres of Dry Land Into an Eco-Stay With 6000 Plants, Mud Walls &amp; Local Jobs&rdquo;
              </h3>
              <p className="text-soil-700 mb-6 leading-relaxed">
                The Better India profiles how founders Ankit Rastogi and Pradeep Vijayan transformed semi-barren land near Kanha into Surwahi Social Ecoestate &mdash; with mud-wall architecture, solar power, water conservation and 6,000+ trees &mdash; while creating livelihoods for over 50 local people through partnerships with farmers, artisans and women&rsquo;s self-help groups.
              </p>
              <a href="https://thebetterindia.com/travel/surwahi-kanha-eco-stay-forest-local-jobs-community-tourism-12185491" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Read the full story
              </a>
            </div>
          </div>
        </section>


        {/* In the Press */}
        <section className="mb-16">
          <h2 className="font-display text-3xl text-forest-900 mb-8 text-center flex items-center justify-center">
            <Newspaper className="h-8 w-8 mr-3 text-moss-500" />
            In the Press
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <a href="https://thebetterindia.com/travel/surwahi-kanha-eco-stay-forest-local-jobs-community-tourism-12185491" target="_blank" rel="noopener noreferrer" className="block p-6 bg-white rounded-card border border-stone-100 hover:shadow-lg transition-shadow">
              <div className="text-xs font-semibold uppercase tracking-wider text-moss-600 mb-1">The Better India &middot; 2026</div>
              <div className="font-display text-lg text-forest-900">Turning 10 acres of dry land into an award-winning eco-stay</div>
            </a>
            <a href="/press/outlook-india-homestay-jul2024.pdf" target="_blank" rel="noopener noreferrer" className="block p-6 bg-white rounded-card border border-stone-100 hover:shadow-lg transition-shadow">
              <div className="text-xs font-semibold uppercase tracking-wider text-moss-600 mb-1">Outlook India &middot; July 2024</div>
              <div className="font-display text-lg text-forest-900">Featured in the Special Homestay Edition (Madhya Pradesh)</div>
            </a>
            <a href="/press/better-india-top10-sep2022.jpeg" target="_blank" rel="noopener noreferrer" className="block p-6 bg-white rounded-card border border-stone-100 hover:shadow-lg transition-shadow">
              <div className="text-xs font-semibold uppercase tracking-wider text-moss-600 mb-1">The Better India &middot; 2022</div>
              <div className="font-display text-lg text-forest-900">Nominated among India&rsquo;s Top 10 Sustainable Stays</div>
            </a>
          </div>
        </section>

        {/* Guest Testimonials */}
        <section>
          <h2 className="font-display text-3xl text-forest-900 mb-8 text-center flex items-center justify-center">
            <MessageSquare className="h-8 w-8 mr-3 text-moss-500" />
            Voices from Our Guests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pressDetails.testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-sand-50 rounded-lg">
                <blockquote className="text-lg text-soil-700 italic mb-4">&quot;{testimonial.quote}&quot;</blockquote>
                <p className="font-semibold text-forest-900">{testimonial.name}</p>
                <p className="text-sm text-soil-700">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
