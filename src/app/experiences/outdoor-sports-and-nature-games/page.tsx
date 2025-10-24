import Image from 'next/image';
import { Check, Users, Sun, Zap } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Outdoor Sports & Nature Games',
  'Engage in a variety of outdoor sports and games in a natural setting.',
  '/experiences/outdoor-sports-and-nature-games'
);

const sportsDetails = {
  title: 'Outdoor Sports & Nature Games',
  description: 'Unleash your playful side amidst nature. Our expansive grounds offer the perfect setting for a variety of sports and traditional games that promise fun, fitness, and a healthy dose of friendly competition.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Volleyball', alt: 'Guests playing a lively game of volleyball' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Archery', alt: 'A guest taking aim during an archery session' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Badminton', alt: 'A game of badminton with the forest in the background' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Traditional+Games', alt: 'Guests learning a traditional Indian outdoor game' },
  ],
  keyHighlights: [
    'Wide range of activities for all ages and fitness levels.',
    'Well-maintained equipment and playing areas.',
    'A great way to stay active and energized during your stay.',
    'Rediscover the joy of classic outdoor games.',
    'Perfect for team-building and family bonding.',
  ],
  whatToExpect: 'Whether you\'re looking for an energetic workout or some lighthearted fun, we have something for everyone. All equipment is provided, and our team can help organize games for groups. It\'s a wonderful opportunity to disconnect from screens and reconnect with the simple joy of playing outdoors.',
  sportsAndGames: [
    { name: 'Volleyball', description: 'A full-sized court for an energetic match.', icon: Zap },
    { name: 'Badminton', description: 'Enjoy a classic game amidst the fresh air.', icon: Sun },
    { name: 'Archery', description: 'Test your focus and precision with our safe archery setup.', icon: Users },
    { name: 'Kabbadi & Kho-Kho', description: 'Learn and play these exciting traditional Indian team games.', icon: Users },
    { name: 'Nature Scavenger Hunt', description: 'A fun and educational game for kids and adults alike.', icon: Check },
  ],
  bestSuitedFor: {
    text: 'Families, groups of friends, corporate teams, and anyone with a playful spirit.',
    icon: Users,
  },
};

export default function OutdoorSportsPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {sportsDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {sportsDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={sportsDetails.images[0].src} alt={sportsDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {sportsDetails.images.slice(1).map((image, index) => (
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
              {sportsDetails.keyHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-lg text-soil-700">{highlight}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-3xl text-forest-900 mb-6">What to Expect</h2>
            <p className="text-lg text-soil-700 mb-8">{sportsDetails.whatToExpect}</p>
            
            <div className="bg-sand-50 p-8 rounded-lg">
              <h3 className="font-display text-2xl text-forest-900 mb-6">Available Sports & Games</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {sportsDetails.sportsAndGames.map((game, index) => (
                  <div key={index} className="flex items-start">
                    <game.icon className="h-8 w-8 text-moss-500 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-xl text-forest-800">{game.name}</h4>
                      <p className="text-sm text-soil-700">{game.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-bone-0 p-6 rounded-lg shadow-lg">
                <h3 className="font-display text-xl text-forest-900 mb-4">Ready to Play?</h3>
                <p className="text-soil-700 mb-4 text-sm">All sports facilities are available for our guests. Contact our front desk to borrow equipment or organize a game.</p>
                <a href="/contact" className="btn btn-primary w-full">Contact Front Desk</a>
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
