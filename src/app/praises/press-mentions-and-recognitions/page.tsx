import Image from 'next/image';
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
  pressMentions: [
    {
      publication: 'Condé Nast Traveller',
      quote: '"A benchmark for sustainable tourism in India, Surwahi Social is a must-visit for the conscious traveler."',
      link: '#',
      logoUrl: 'https://placehold.co/200x100/A8BA9A/333333?text=Conde+Nast',
    },
    {
      publication: 'The Guardian',
      quote: '"More than a lodge, it\'s a living experiment in regeneration. A truly hopeful and inspiring project."',
      link: '#',
      logoUrl: 'https://placehold.co/200x100/A8BA9A/333333?text=The+Guardian',
    },
    {
      publication: 'National Geographic Traveller India',
      quote: '"Where luxury meets conservation. Surwahi shows us that a truly immersive travel experience is one that gives back to nature and the community."',
      link: '#',
      logoUrl: 'https://placehold.co/200x100/A8BA9A/333333?text=Nat+Geo',
    },
  ],
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
        {/* Press Mentions */}
        <section className="mb-16">
          <h2 className="font-display text-3xl text-forest-900 mb-8 text-center flex items-center justify-center">
            <Newspaper className="h-8 w-8 mr-3 text-moss-500" />
            As Featured In
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pressDetails.pressMentions.map((mention, index) => (
              <a key={index} href={mention.link} target="_blank" rel="noopener noreferrer" className="block p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <Image src={mention.logoUrl} alt={`${mention.publication} logo`} width={150} height={50} className="mb-4" />
                <blockquote className="text-soil-700 italic">&quot;{mention.quote}&quot;</blockquote>
              </a>
            ))}
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
                <p className="font-semibold text-forest-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
