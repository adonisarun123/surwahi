import Image from 'next/image';
import { Check, Clock, Sun, Shield, Leaf, Smile } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Play @ Surwahi',
  'A dedicated space for families and children to play and learn in nature.',
  '/experiences/play-at-surwahi'
);

const playDetails = {
  title: 'Play @ Surwahi: Family & Kids Zone',
  description: 'Childhood is a time for exploration and wonder. Our dedicated Kids Zone is a safe, nature-inspired space designed to spark curiosity, encourage creativity, and let children connect with the natural world through play.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Kids+Playing', alt: 'Children laughing and playing in a natural playground' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Nature+Crafts', alt: 'A child engaged in a nature craft activity with leaves and twigs' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Tree+House', alt: 'A rustic, safe-to-climb tree house for kids' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Family+Fun', alt: 'A family enjoying a game together in the kids zone' },
  ],
  keyHighlights: [
    'Safe and supervised environment for children to play freely.',
    'Activities designed to be both fun and educational.',
    'Focus on nature-based play, using natural materials.',
    'Encourages teamwork, creativity, and a love for the outdoors.',
    'A space for families to bond and create lasting memories.',
  ],
  whatToExpect: 'Our Kids Zone is more than just a playground. It\'s an outdoor classroom where children learn through doing. From building mud castles to identifying insects, every activity is an adventure. Our trained staff ensure a safe and engaging experience, giving parents peace of mind to relax and unwind.',
  activities: [
    { name: 'Nature Art & Craft', description: 'Create masterpieces using leaves, flowers, twigs, and clay.', icon: Leaf },
    { name: 'Little Explorers Trail', description: 'A guided, child-friendly walk to discover the wonders of the forest.', icon: Smile },
    { name: 'Gardening for Kids', description: 'Get hands-on experience planting seeds and caring for plants.', icon: Sun },
    { name: 'Storytelling Sessions', description: 'Listen to fascinating stories about the forest and its creatures.', icon: Clock },
  ],
  safetyFirst: {
    text: 'Your child\'s safety is our top priority. The play area is designed with natural, child-safe materials, and is regularly inspected. All activities are conducted under the supervision of our trained and background-checked staff.',
    icon: Shield,
  },
};

export default function PlayAtSurwahiPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {playDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {playDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={playDetails.images[0].src} alt={playDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {playDetails.images.slice(1).map((image, index) => (
              <div key={index}>
                <Image src={image.src} alt={image.alt} width={800} height={600} className="rounded-lg object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl text-forest-900 mb-6">Key Highlights</h2>
            <ul className="space-y-4 mb-8">
              {playDetails.keyHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-lg text-soil-700">{highlight}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-3xl text-forest-900 mb-6">What to Expect</h2>
            <p className="text-lg text-soil-700 mb-8">{playDetails.whatToExpect}</p>
            
            <div className="bg-sand-50 p-8 rounded-lg mb-8">
              <h3 className="font-display text-2xl text-forest-900 mb-6">Fun-filled Activities</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {playDetails.activities.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <activity.icon className="h-8 w-8 text-moss-500 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-xl text-forest-800">{activity.name}</h4>
                      <p className="text-sm text-soil-700">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start bg-blue-50 p-6 rounded-lg">
              <playDetails.safetyFirst.icon className="h-10 w-10 text-blue-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-display text-2xl text-blue-800 mb-2">Safety First</h3>
                <p className="text-blue-700">{playDetails.safetyFirst.text}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-bone-0 p-6 rounded-lg shadow-lg">
                <h3 className="font-display text-xl text-forest-900 mb-4">Family Fun Awaits</h3>
                <p className="text-soil-700 mb-4 text-sm">The Kids Zone is open daily for our guests. Some activities may require advance booking. Please contact reception for the weekly schedule.</p>
                <a href="/contact" className="btn btn-primary w-full">Contact Reception</a>
              </div>
              <div className="mt-6 text-center">
                <a href="/experiences" className="text-moss-600 hover:underline">Explore other experiences</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
