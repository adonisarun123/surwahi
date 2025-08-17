import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Mountain, Binoculars, Camera, Leaf, Star, ArrowRight, Calendar, MapPin } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Things to Do',
  'Discover nature activities and experiences at Surwahi Eco-Lodge. From guided nature walks to bird watching safaris - connect with the forest responsibly.',
  '/things-to-do'
);

// Mock data - will be replaced with database queries
const activityCategories = [
  {
    name: 'Nature Walks',
    slug: 'nature-walks',
    icon: Mountain,
    description: 'Guided walks through forest trails',
    color: 'text-fern-300',
    bgColor: 'bg-fern-300/10'
  },
  {
    name: 'Wildlife Safaris',
    slug: 'wildlife-safaris', 
    icon: Binoculars,
    description: 'Ethical wildlife viewing experiences',
    color: 'text-clay-500',
    bgColor: 'bg-clay-500/10'
  },
  {
    name: 'Photography',
    slug: 'photography',
    icon: Camera,
    description: 'Capture the beauty of nature',
    color: 'text-river-400',
    bgColor: 'bg-river-400/10'
  },
  {
    name: 'Wellness',
    slug: 'wellness',
    icon: Leaf,
    description: 'Forest meditation and yoga',
    color: 'text-moss-500',
    bgColor: 'bg-moss-500/10'
  }
];

const featuredActivities = [
  {
    id: 1,
    name: 'Dawn Bird Watching Safari',
    slug: 'dawn-bird-watching-safari',
    category: 'Wildlife Safaris',
    description: 'Join our expert naturalist for an early morning bird watching expedition to spot over 200 species in their natural habitat.',
    longDescription: 'Experience the forest awakening as we venture out before sunrise to witness the incredible diversity of avian life at Surwahi. Our expert naturalist guides will help you identify and understand the behavior of over 200 bird species that call this forest home.',
    image: '/images/activities/bird-watching.jpg',
    duration: '3 hours',
    difficulty: 'Easy',
    groupSize: '2-8 people',
    price: 1200,
    rating: 4.9,
    reviewCount: 45,
    includes: ['Expert naturalist guide', 'Binoculars provided', 'Bird identification guide', 'Light refreshments'],
    bestSeason: 'October to March',
    startTime: '5:30 AM',
    ecoRating: 5,
    highlights: [
      'Spot rare Malabar Pied Hornbill',
      'Learn bird calls and behavior',
      'Photography opportunities',
      'Ethical wildlife viewing practices'
    ]
  },
  {
    id: 2,
    name: 'Forest Photography Workshop',
    slug: 'forest-photography-workshop',
    category: 'Photography',
    description: 'Learn the art of nature photography with professional guidance through diverse forest landscapes and lighting conditions.',
    longDescription: 'Master the techniques of forest and wildlife photography in this hands-on workshop. Learn to capture the interplay of light and shadow, macro details of flora, and ethical wildlife photography practices.',
    image: '/images/activities/photography-workshop.jpg',
    duration: '4 hours',
    difficulty: 'Moderate',
    groupSize: '2-6 people',
    price: 2500,
    rating: 4.8,
    reviewCount: 32,
    includes: ['Professional photographer guide', 'Equipment tips and techniques', 'Post-processing basics', 'Lunch in the forest'],
    bestSeason: 'Year-round',
    startTime: '6:00 AM',
    ecoRating: 4,
    highlights: [
      'Golden hour forest photography',
      'Macro photography techniques',
      'Wildlife photography ethics',
      'Composition and lighting workshops'
    ]
  },
  {
    id: 3,
    name: 'Guided Nature Walk',
    slug: 'guided-nature-walk',
    category: 'Nature Walks',
    description: 'Explore medicinal plants, native trees, and forest ecosystems with our experienced local guide on peaceful forest trails.',
    longDescription: 'Discover the intricate relationships within the forest ecosystem as you walk through ancient trails. Learn about medicinal plants used by local communities, identify native tree species, and understand conservation efforts.',
    image: '/images/activities/nature-walk.jpg',
    duration: '2 hours',
    difficulty: 'Easy',
    groupSize: '2-12 people',
    price: 800,
    rating: 4.7,
    reviewCount: 78,
    includes: ['Local expert guide', 'Medicinal plant guide booklet', 'Trail snacks', 'Water bottle'],
    bestSeason: 'Year-round',
    startTime: '7:00 AM or 4:00 PM',
    ecoRating: 5,
    highlights: [
      'Medicinal plant identification',
      'Forest ecosystem education',
      'Traditional knowledge sharing',
      'Peaceful forest trails'
    ]
  },
  {
    id: 4,
    name: 'Sunrise Forest Meditation',
    slug: 'sunrise-forest-meditation',
    category: 'Wellness',
    description: 'Start your day with mindful meditation in the forest, connecting with nature through guided breathing and mindfulness practices.',
    longDescription: 'Begin your day with a transformative meditation experience in the heart of the forest. Practice mindfulness techniques while surrounded by the sounds and energy of nature awakening.',
    image: '/images/activities/forest-meditation.jpg',
    duration: '1.5 hours',
    difficulty: 'Easy',
    groupSize: '2-10 people',
    price: 600,
    rating: 4.9,
    reviewCount: 56,
    includes: ['Certified meditation instructor', 'Yoga mat provided', 'Herbal tea after session', 'Meditation guide booklet'],
    bestSeason: 'Year-round',
    startTime: '6:00 AM',
    ecoRating: 5,
    highlights: [
      'Forest bathing techniques',
      'Guided breathing exercises',
      'Mindfulness in nature',
      'Stress relief and relaxation'
    ]
  },
  {
    id: 5,
    name: 'Night Safari Experience',
    slug: 'night-safari-experience',
    category: 'Wildlife Safaris',
    description: 'Discover the nocturnal wildlife of the forest with specialized guides and equipment for a safe and educational night adventure.',
    longDescription: 'Explore the forest after dark to encounter nocturnal creatures rarely seen during the day. Using specialized equipment and following strict ethical guidelines, observe the forest\'s night shift in action.',
    image: '/images/activities/night-safari.jpg',
    duration: '2.5 hours',
    difficulty: 'Moderate',
    groupSize: '2-6 people',
    price: 1800,
    rating: 4.6,
    reviewCount: 29,
    includes: ['Expert night guide', 'Red-light flashlights', 'Night vision equipment', 'Hot chocolate after safari'],
    bestSeason: 'October to April',
    startTime: '7:30 PM',
    ecoRating: 4,
    highlights: [
      'Spot nocturnal mammals',
      'Listen to night sounds',
      'Learn about night adaptations',
      'Responsible night tourism'
    ]
  },
  {
    id: 6,
    name: 'Organic Garden Tour',
    slug: 'organic-garden-tour',
    category: 'Nature Walks',
    description: 'Tour our organic gardens and learn about permaculture practices, composting, and sustainable food production methods.',
    longDescription: 'Get hands-on experience with sustainable agriculture as you tour our organic gardens. Learn about permaculture principles, composting techniques, and how we grow food in harmony with nature.',
    image: '/images/activities/garden-tour.jpg',
    duration: '1 hour',
    difficulty: 'Easy',
    groupSize: '2-15 people',
    price: 400,
    rating: 4.5,
    reviewCount: 34,
    includes: ['Garden expert guide', 'Harvest participation', 'Fresh produce tasting', 'Seed packet to take home'],
    bestSeason: 'Year-round',
    startTime: '8:00 AM or 5:00 PM',
    ecoRating: 5,
    highlights: [
      'Permaculture techniques',
      'Composting systems',
      'Organic farming methods',
      'Farm-to-table experience'
    ]
  }
];

const seasonalHighlights = [
  {
    season: 'Winter (Oct - Feb)',
    description: 'Perfect weather for all outdoor activities',
    activities: ['Bird watching at its peak', 'Clear forest views', 'Comfortable walking weather'],
    temperature: '15-25°C'
  },
  {
    season: 'Summer (Mar - May)',
    description: 'Early morning and evening activities recommended',
    activities: ['Dawn bird watching', 'Sunset photography', 'Early morning nature walks'],
    temperature: '25-35°C'
  },
  {
    season: 'Monsoon (Jun - Sep)',
    description: 'Indoor workshops and covered activities',
    activities: ['Photography workshops', 'Meditation sessions', 'Garden tours with umbrellas'],
    temperature: '20-30°C'
  }
];

interface ActivityCardProps {
  activity: typeof featuredActivities[0];
}

function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="group bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
      {/* Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={activity.image}
          alt={activity.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-fern-300 text-bone-0 px-2 py-1 rounded text-xs font-medium">
            {activity.category}
          </span>
          <div className="flex items-center gap-1 bg-bone-0/90 backdrop-blur-sm px-2 py-1 rounded">
            {[...Array(activity.ecoRating)].map((_, i) => (
              <Leaf key={i} className="h-3 w-3 fill-fern-300 text-fern-300" />
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-bone-0/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
          <Star className="h-3 w-3 fill-clay-500 text-clay-500" />
          <span className="text-xs font-medium">{activity.rating}</span>
          <span className="text-xs text-soil-700">({activity.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl text-forest-900 mb-2">{activity.name}</h3>
        <p className="text-soil-700 mb-4 line-clamp-3">{activity.description}</p>
        
        {/* Activity Details */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-soil-700">
            <Clock className="h-4 w-4" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-soil-700">
            <Users className="h-4 w-4" />
            <span>{activity.groupSize}</span>
          </div>
          <div className="flex items-center gap-2 text-soil-700">
            <Mountain className="h-4 w-4" />
            <span>{activity.difficulty}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {activity.highlights.slice(0, 2).map((highlight, index) => (
              <span key={index} className="bg-mist-200/50 text-soil-700 px-2 py-1 rounded text-xs">
                {highlight}
              </span>
            ))}
            {activity.highlights.length > 2 && (
              <span className="text-soil-700 text-xs py-1">
                +{activity.highlights.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-mist-200">
          <div>
            <span className="text-2xl font-bold text-forest-900">₹{activity.price.toLocaleString('en-IN')}</span>
            <span className="text-soil-700 text-sm"> / person</span>
            <div className="text-xs text-soil-700">Best season: {activity.bestSeason}</div>
          </div>
          <Link
            href={`/things-to-do/${activity.slug}`}
            className="btn btn-primary"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThingsToDoPage() {
  return (
    <div className="pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      {/* Header */}
      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-display-xl text-forest-900 mb-4">
              Connect with Nature
            </h1>
            <p className="text-body-lg text-soil-700 mb-8">
              Discover the forest through guided experiences that deepen your connection 
              to nature while supporting conservation efforts. All activities follow 
              ethical wildlife viewing practices and leave no trace principles.
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {activityCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.slug}
                    href={`#${category.slug}`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-input border border-mist-200 hover:border-moss-500 transition-colors ${category.bgColor}`}
                  >
                    <IconComponent className={`h-4 w-4 ${category.color}`} />
                    <span className="font-medium">{category.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Activities */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg text-forest-900 mb-4">
              Featured Experiences
            </h2>
            <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
              Carefully curated activities that showcase the best of our forest ecosystem 
              while supporting local communities and conservation efforts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Guide */}
      <section className="py-16 lg:py-24 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg text-forest-900 mb-4">
              Seasonal Activity Guide
            </h2>
            <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
              Plan your visit based on the season to make the most of your forest experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {seasonalHighlights.map((season, index) => (
              <div key={index} className="bg-bone-0 rounded-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-moss-500" />
                  <h3 className="font-display text-xl text-forest-900">{season.season}</h3>
                </div>
                <p className="text-soil-700 mb-4">{season.description}</p>
                <div className="space-y-2 mb-4">
                  {season.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-fern-300 rounded-full" />
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-soil-700">
                  <MapPin className="h-4 w-4" />
                  <span>Temperature: {season.temperature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-display-lg text-forest-900 mb-6">
                Responsible Tourism Guidelines
              </h2>
              <p className="text-body-lg text-soil-700 mb-8">
                We follow strict ethical guidelines to ensure our activities protect 
                wildlife and support conservation efforts.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Leaf className="h-5 w-5 text-fern-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-forest-900">Leave No Trace</h4>
                    <p className="text-sm text-soil-700">All activities follow leave no trace principles to minimize environmental impact.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Binoculars className="h-5 w-5 text-fern-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-forest-900">Ethical Wildlife Viewing</h4>
                    <p className="text-sm text-soil-700">Maintain respectful distances and never disturb wildlife behavior.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-fern-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-forest-900">Local Community Support</h4>
                    <p className="text-sm text-soil-700">Activities support local guides and traditional knowledge systems.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mountain className="h-5 w-5 text-fern-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-forest-900">Safety First</h4>
                    <p className="text-sm text-soil-700">All activities include safety briefings and proper equipment.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-sand-50 rounded-card p-8">
              <h3 className="font-display text-xl text-forest-900 mb-6">
                Plan Your Activities
              </h3>
              <p className="text-soil-700 mb-6">
                Need help choosing the right activities for your group? Our team can create 
                a personalized itinerary based on your interests and fitness level.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-moss-500" />
                  <span>Activities available daily 5:30 AM - 8:00 PM</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-4 w-4 text-moss-500" />
                  <span>Group sizes: 2-15 people depending on activity</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-moss-500" />
                  <span>Advance booking recommended</span>
                </div>
              </div>

              <Link href="/contact" className="btn btn-primary w-full justify-center">
                Plan My Activities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Things to Do at Surwahi Eco-Lodge",
            "description": "Discover nature activities and experiences at Surwahi Eco-Lodge",
            "itemListElement": featuredActivities.map((activity, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://surwahi.com/things-to-do/${activity.slug}`,
              "item": {
                "@type": "Product",
                "name": activity.name,
                "description": activity.description,
                "offers": {
                  "@type": "Offer",
                  "price": activity.price,
                  "priceCurrency": "INR"
                }
              }
            }))
          })
        }}
      />
    </div>
  );
}
