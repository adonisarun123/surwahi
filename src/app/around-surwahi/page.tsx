import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Clock, 
  Star, 
  ArrowRight,
  Sun,
  Cloud,
  CloudRain
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Around Surwahi',
  'Explore the region around Surwahi Eco-Lodge. Discover ancient temples, pristine waterfalls, wildlife sanctuaries, and cultural attractions in Madhya Pradesh.',
  '/around-surwahi'
);

// Mock data - will be replaced with database queries
const mainAttractions = [
  {
    id: 1,
    name: 'Dhuandhar Falls',
    category: 'Natural Wonder',
    distance: '25 km',
    duration: '30 minutes',
    description: 'Spectacular waterfall where the Narmada River plunges through marble rocks creating misty spray.',
    longDescription: 'The "smoke cascade" of Dhuandhar Falls is one of India\'s most dramatic waterfalls. The Narmada River crashes down through marble rocks, creating a perpetual mist that gives the falls their name. The thunderous roar and rainbow mists create an unforgettable natural spectacle.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    highlights: ['30-meter waterfall', 'Marble rock gorge', 'Boat rides available', 'Best during monsoon'],
    bestTime: 'July to March',
    entryFee: '₹30 per person',
    timings: '8:00 AM - 6:00 PM',
    rating: 4.6,
    difficulty: 'Easy',
    activities: ['Photography', 'Boat rides', 'Scenic walks']
  },
  {
    id: 2,
    name: 'Bhedaghat Marble Rocks',
    category: 'Geological Marvel',
    distance: '30 km',
    duration: '35 minutes',
    description: 'Famous marble cliffs rising 100 feet high along the Narmada River, best explored by boat.',
    longDescription: 'The magnificent marble rocks at Bhedaghat are a geological wonder carved by the Narmada River over millions of years. These pristine white and cream-colored cliffs tower 100 feet above the water, creating a serene and otherworldly landscape that has inspired poets and artists for centuries.',
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    highlights: ['100-foot marble cliffs', 'Moonlight boat rides', 'Cable car rides', 'Ancient rock formations'],
    bestTime: 'October to March',
    entryFee: '₹50 + boat charges',
    timings: '7:00 AM - 7:00 PM',
    rating: 4.8,
    difficulty: 'Easy',
    activities: ['Boat rides', 'Cable car', 'Photography', 'Shopping']
  },
  {
    id: 3,
    name: 'Chausath Yogini Temple',
    category: 'Historical Site',
    distance: '35 km',
    duration: '40 minutes',
    description: '10th century circular temple dedicated to 64 Yoginis, architectural inspiration for Indian Parliament.',
    longDescription: 'This ancient 10th-century temple is a remarkable example of medieval Indian architecture. The circular structure, dedicated to the 64 Yoginis (female mystic divinities), is said to have inspired the design of the Indian Parliament building. The temple stands as a testament to the region\'s rich spiritual heritage.',
    image: 'https://images.unsplash.com/photo-1541048500262-9e72c2fe1e06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    highlights: ['10th century architecture', 'Circular temple design', 'Historical significance', 'Panoramic views'],
    bestTime: 'October to March',
    entryFee: '₹25 per person',
    timings: '6:00 AM - 6:00 PM',
    rating: 4.4,
    difficulty: 'Easy',
    activities: ['Historical exploration', 'Architecture study', 'Meditation', 'Photography']
  },
  {
    id: 4,
    name: 'Kanha National Park',
    category: 'Wildlife Sanctuary',
    distance: '120 km',
    duration: '2.5 hours',
    description: 'Famous tiger reserve and the inspiration for Rudyard Kipling\'s "The Jungle Book".',
    longDescription: 'One of India\'s premier tiger reserves, Kanha National Park is the inspiration behind Rudyard Kipling\'s "The Jungle Book." This pristine wilderness is home to tigers, leopards, wild dogs, and the rare barasingha deer. The park\'s sal and bamboo forests provide a perfect habitat for diverse wildlife.',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    highlights: ['Tiger sightings', 'Barasingha deer habitat', 'Diverse bird life', 'Jungle Book inspiration'],
    bestTime: 'October to June',
    entryFee: '₹1,800+ per safari',
    timings: 'Morning & Evening safaris',
    rating: 4.7,
    difficulty: 'Moderate',
    activities: ['Tiger safari', 'Bird watching', 'Nature photography', 'Wildlife education']
  },
  {
    id: 5,
    name: 'Balancing Rock',
    category: 'Natural Wonder',
    distance: '15 km',
    duration: '20 minutes',
    description: 'Unique rock formation that appears to defy gravity, perched precariously on a hillside.',
    longDescription: 'This fascinating geological formation consists of a massive boulder balanced on a much smaller rock base, creating an optical illusion that seems to defy gravity. The formation has been naturally sculpted over millions of years and stands as a testament to the power of natural forces.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    highlights: ['Unique rock formation', 'Geological wonder', 'Photography spot', 'Easy accessibility'],
    bestTime: 'Year-round',
    entryFee: 'Free',
    timings: 'Sunrise to sunset',
    rating: 4.2,
    difficulty: 'Easy',
    activities: ['Photography', 'Geological study', 'Short hikes', 'Picnicking']
  },
  {
    id: 6,
    name: 'Madan Mahal Fort',
    category: 'Historical Fort',
    distance: '40 km',
    duration: '45 minutes',
    description: 'Ancient hilltop fort offering panoramic views of Jabalpur city and surrounding landscape.',
    longDescription: 'Built by the Gond ruler Raja Madan Shah in 1116 AD, this hilltop fort offers spectacular panoramic views of Jabalpur and the surrounding countryside. The fort\'s strategic location and ancient architecture provide insights into medieval military engineering and regional history.',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    highlights: ['11th century fort', 'Panoramic city views', 'Gond architecture', 'Historical significance'],
    bestTime: 'October to March',
    entryFee: '₹15 per person',
    timings: '9:00 AM - 5:00 PM',
    rating: 4.3,
    difficulty: 'Moderate',
    activities: ['Historical exploration', 'Photography', 'Sightseeing', 'Heritage walks']
  }
];

const seasonalGuide = [
  {
    season: 'Winter (October - February)',
    icon: Sun,
    temperature: '15-25°C',
    description: 'Perfect weather for all outdoor activities and sightseeing',
    recommendations: [
      'Best time for waterfalls (post-monsoon flow)',
      'Ideal for tiger safaris in Kanha',
      'Comfortable temple visits',
      'Great for photography'
    ],
    pros: ['Clear skies', 'Pleasant temperatures', 'Good wildlife sightings'],
    cons: ['Peak tourist season', 'Higher accommodation rates']
  },
  {
    season: 'Summer (March - June)',
    icon: Cloud,
    temperature: '25-40°C',
    description: 'Hot weather, best for early morning and evening activities',
    recommendations: [
      'Early morning temple visits',
      'Evening boat rides at marble rocks',
      'Indoor activities during midday',
      'Carry sun protection'
    ],
    pros: ['Fewer crowds', 'Better wildlife sightings', 'Lower accommodation rates'],
    cons: ['Hot weather', 'Limited midday activities']
  },
  {
    season: 'Monsoon (July - September)',
    icon: CloudRain,
    temperature: '20-30°C',
    description: 'Dramatic landscapes but some activities may be restricted',
    recommendations: [
      'Spectacular waterfalls at full flow',
      'Lush green landscapes',
      'Indoor cultural activities',
      'Monsoon photography'
    ],
    pros: ['Dramatic waterfalls', 'Lush greenery', 'Cool temperatures'],
    cons: ['Some parks closed', 'Road travel challenges', 'Limited boat rides']
  }
];

const travelTips = [
  {
    title: 'Transportation',
    tips: [
      'Hire a local driver familiar with routes',
      'GPS may not work in remote areas',
      'Keep emergency contacts handy',
      'Fuel up before long journeys'
    ]
  },
  {
    title: 'What to Carry',
    tips: [
      'Sun hat and sunscreen',
      'Comfortable walking shoes',
      'Camera with extra batteries',
      'Water bottles and snacks',
      'First aid kit'
    ]
  },
  {
    title: 'Safety & Etiquette',
    tips: [
      'Respect local customs and traditions',
      'Don\'t feed wildlife',
      'Stay on designated paths',
      'Carry identification documents'
    ]
  },
  {
    title: 'Photography',
    tips: [
      'Golden hour lighting is best',
      'Respect photography restrictions',
      'Ask permission before photographing people',
      'Bring weather protection for equipment'
    ]
  }
];

interface AttractionCardProps {
  attraction: typeof mainAttractions[0];
}

function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <div className="group bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
      {/* Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={attraction.image}
          alt={attraction.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-moss-500 text-bone-0 px-2 py-1 rounded text-xs font-medium">
            {attraction.category}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-bone-0/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
          <Star className="h-3 w-3 fill-clay-500 text-clay-500" />
          <span className="text-xs font-medium">{attraction.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl text-forest-900 mb-2">{attraction.name}</h3>
        <p className="text-soil-700 mb-4">{attraction.description}</p>
        
        {/* Distance & Duration */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-soil-700">
            <MapPin className="h-4 w-4" />
            <span>{attraction.distance}</span>
          </div>
          <div className="flex items-center gap-2 text-soil-700">
            <Clock className="h-4 w-4" />
            <span>{attraction.duration}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {attraction.highlights.slice(0, 2).map((highlight, index) => (
              <span key={index} className="bg-mist-200/50 text-soil-700 px-2 py-1 rounded text-xs">
                {highlight}
              </span>
            ))}
            {attraction.highlights.length > 2 && (
              <span className="text-soil-700 text-xs py-1">
                +{attraction.highlights.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Entry Fee and Timings */}
        <div className="flex items-center justify-between pt-4 border-t border-mist-200">
          <div>
            <div className="font-medium text-forest-900">{attraction.entryFee}</div>
            <div className="text-xs text-soil-700">{attraction.timings}</div>
          </div>
          <Link
            href={`/around-surwahi/${attraction.id}`}
            className="btn btn-secondary"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AroundSurwahiPage() {
  return (
    <div className="pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      {/* Header */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='200' viewBox='0 0 600 200'%3E%3Cg fill='none' stroke='%234886A8' stroke-opacity='0.16' stroke-width='1.4'%3E%3Cpath d='M0,80 C60,100 120,60 180,80 240,100 300,60 360,80 420,100 480,60 540,80 600,100 660,60 720,80'/%3E%3Cpath d='M0,130 C60,150 120,110 180,130 240,150 300,110 360,130 420,150 480,110 540,130 600,150 660,110 720,130'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '600px 200px'
          }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-display-xl text-forest-900 mb-6">
              Explore the Region
            </h1>
            <p className="text-body-lg text-soil-700 mb-8 max-w-3xl mx-auto">
              Discover the rich tapestry of natural wonders, ancient temples, and cultural treasures 
              that surround Surwahi Eco-Lodge. From dramatic waterfalls to historic forts, 
              the region offers unforgettable experiences for every traveler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#attractions" className="btn btn-primary">
                View Attractions
                <MapPin className="ml-2 h-4 w-4" />
              </Link>
              <Link href="#seasonal-guide" className="btn btn-secondary">
                Seasonal Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Attractions */}
      <section id="attractions" className="py-16 lg:py-24 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg text-forest-900 mb-4">
              Must-Visit Attractions
            </h2>
            <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
              Explore the diverse attractions within easy reach of Surwahi, 
              from ancient temples to pristine national parks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Guide */}
      <section id="seasonal-guide" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg text-forest-900 mb-4">
              When to Visit
            </h2>
            <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
              Each season offers unique experiences and attractions. Plan your visit 
              based on your interests and preferred activities.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {seasonalGuide.map((season, index) => {
              const IconComponent = season.icon;
              return (
                <div key={index} className="bg-bone-0 rounded-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-river-400/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-river-400" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-forest-900">{season.season}</h3>
                      <p className="text-sm text-soil-700">{season.temperature}</p>
                    </div>
                  </div>
                  
                  <p className="text-soil-700 mb-4">{season.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-forest-900 mb-2">Recommended Activities</h4>
                    <ul className="space-y-1">
                      {season.recommendations.map((rec, recIndex) => (
                        <li key={recIndex} className="flex items-start gap-2 text-sm text-soil-700">
                          <div className="w-1.5 h-1.5 bg-moss-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-forest-900 mb-1">Pros</h5>
                      <ul className="space-y-1">
                        {season.pros.map((pro, proIndex) => (
                          <li key={proIndex} className="text-success">• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-forest-900 mb-1">Considerations</h5>
                      <ul className="space-y-1">
                        {season.cons.map((con, conIndex) => (
                          <li key={conIndex} className="text-warning">• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-16 lg:py-24 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg text-forest-900 mb-4">
              Travel Tips & Guidelines
            </h2>
            <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
              Make the most of your regional exploration with these practical tips 
              and local insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {travelTips.map((tipCategory, index) => (
              <div key={index} className="bg-bone-0 rounded-card p-6">
                <h3 className="font-display text-lg text-forest-900 mb-4">{tipCategory.title}</h3>
                <ul className="space-y-3">
                  {tipCategory.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-fern-300 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-soil-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-forest-700 to-moss-500 rounded-card p-8 lg:p-12 text-center text-bone-0">
            <h2 className="font-display text-2xl lg:text-3xl mb-4">
              Ready to Explore the Region?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Let us help you plan the perfect day trips and excursions. 
              Our team can arrange transportation and guided tours to all major attractions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn btn-secondary bg-bone-0 text-forest-700 hover:bg-bone-0/90">
                Plan My Excursions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/accommodations" className="btn bg-bone-0/10 border-bone-0/30 text-bone-0 hover:bg-bone-0/20">
                Book Your Stay
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
            "@type": "TouristDestination",
            "name": "Surwahi Region, Madhya Pradesh",
            "description": "Explore the region around Surwahi Eco-Lodge with ancient temples, waterfalls, and wildlife sanctuaries",
            "touristType": "Nature tourism, Cultural tourism, Adventure tourism",
            "includesAttraction": mainAttractions.map(attraction => ({
              "@type": "TouristAttraction",
              "name": attraction.name,
              "description": attraction.description,
              "touristType": attraction.category,
              "image": `https://surwahi.com${attraction.image}`
            }))
          })
        }}
      />
    </div>
  );
}
