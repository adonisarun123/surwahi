import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Droplets, Zap, Users, TreePine, Recycle, ArrowRight, Target, Calendar, MapPin } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Sustainability',
  'Conservation you can feel — and measure. Discover our regenerative practices, community impact, and environmental initiatives at Surwahi Eco-Lodge.',
  '/sustainability'
);

// Mock data - will be replaced with database queries
const sustainabilityMetrics = [
  {
    category: 'water',
    title: 'Water Conservation',
    value: '2,400L',
    unit: 'saved daily',
    description: 'Through rainwater harvesting and efficient systems',
    icon: Droplets,
    color: 'text-river-400'
  },
  {
    category: 'energy',
    title: 'Solar Power',
    value: '100%',
    unit: 'renewable energy',
    description: 'All operations powered by solar installations',
    icon: Zap,
    color: 'text-clay-500'
  },
  {
    category: 'waste',
    title: 'Zero Waste',
    value: '0kg',
    unit: 'to landfill',
    description: 'Complete waste segregation and composting',
    icon: Recycle,
    color: 'text-fern-300'
  },
  {
    category: 'community',
    title: 'Local Employment',
    value: '15',
    unit: 'jobs created',
    description: 'Supporting local families and artisans',
    icon: Users,
    color: 'text-moss-500'
  },
  {
    category: 'biodiversity',
    title: 'Forest Protection',
    value: '50+',
    unit: 'species recorded',
    description: 'Native flora and fauna conservation',
    icon: TreePine,
    color: 'text-forest-700'
  },
  {
    category: 'carbon',
    title: 'Carbon Negative',
    value: '-2.5T',
    unit: 'CO₂ annually',
    description: 'Through reforestation and solar power',
    icon: Leaf,
    color: 'text-fern-300'
  }
];

const initiatives = [
  {
    title: 'Rainwater Harvesting System',
    description: 'Our comprehensive rainwater collection system captures and filters monsoon water for year-round use, reducing dependency on groundwater by 80%.',
    image: '/images/sustainability/rainwater-system.jpg',
    impact: '2,400L saved daily',
    category: 'Water Conservation'
  },
  {
    title: 'Solar Power Installation',
    description: '45kW solar panel system generates all our electricity needs, with battery storage ensuring 24/7 renewable power supply.',
    image: '/images/sustainability/solar-panels.jpg',
    impact: '100% renewable energy',
    category: 'Clean Energy'
  },
  {
    title: 'Organic Waste Composting',
    description: 'All organic waste is processed through our composting system, creating nutrient-rich soil for our organic gardens.',
    image: '/images/sustainability/composting.jpg',
    impact: 'Zero waste to landfill',
    category: 'Waste Management'
  },
  {
    title: 'Local Artisan Partnerships',
    description: 'We source furniture, textiles, and crafts from local artisans, preserving traditional skills while creating sustainable livelihoods.',
    image: '/images/sustainability/artisans.jpg',
    impact: '15 families supported',
    category: 'Community Impact'
  }
];

const certifications = [
  {
    name: 'Green Tourism Certification',
    issuer: 'India Eco Tourism Board',
    year: '2023',
    description: 'Awarded for sustainable tourism practices and environmental stewardship',
    badge: '/images/badges/green-tourism.svg'
  },
  {
    name: 'Zero Waste Commitment',
    issuer: 'Zero Waste International Alliance',
    year: '2023',
    description: 'Certified for achieving zero waste to landfill status',
    badge: '/images/badges/zero-waste.svg'
  },
  {
    name: 'Wildlife Friendly Enterprise',
    issuer: 'Wildlife Conservation Society',
    year: '2022',
    description: 'Recognized for wildlife conservation and habitat protection efforts',
    badge: '/images/badges/wildlife-friendly.svg'
  }
];

const upcomingGoals = [
  {
    goal: 'Carbon Negative by 2025',
    progress: 75,
    description: 'Expanding reforestation and renewable energy initiatives'
  },
  {
    goal: 'Plastic-Free Operations',
    progress: 90,
    description: 'Eliminating single-use plastics and implementing alternatives'
  },
  {
    goal: 'Community Skills Center',
    progress: 40,
    description: 'Building training facility for sustainable livelihoods'
  }
];

export default function SustainabilityPage() {
  return (
    <div className="pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Cg fill='none' stroke='%236FA888' stroke-opacity='0.08' stroke-width='1'%3E%3Cpath d='M120 20c-40 0-80 40-80 80 0 40 40 80 80 80 40 0 80-40 80-80 0-40-40-80-80-80z'/%3E%3Cpath d='M120 40c22 8 40 30 40 60s-18 52-40 60c-22-8-40-30-40-60s18-52 40-60z'/%3E%3Ccircle cx='120' cy='120' r='6'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '240px 240px'
          }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-display-xl text-forest-900 mb-6">
              Conservation you can feel — and measure
            </h1>
            <p className="text-body-lg text-soil-700 mb-8 max-w-3xl mx-auto">
              At Surwahi, sustainability isn&apos;t just a commitment—it&apos;s measurable action. 
              Every aspect of your stay contributes to real environmental and community impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#metrics" className="btn btn-primary">
                View Our Impact
                <Target className="ml-2 h-4 w-4" />
              </Link>
              <Link href="#initiatives" className="btn btn-secondary">
                Our Initiatives
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section id="metrics" className="py-16 lg:py-24 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg text-forest-900 mb-4">
              Measurable Impact
            </h2>
            <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
              Real numbers from our sustainability initiatives. Updated monthly to ensure transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sustainabilityMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div key={index} className="bg-bone-0 rounded-card p-6 text-center group hover:shadow-elev-1 transition-all">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-sand-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`h-8 w-8 ${metric.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-forest-900 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium text-soil-700 mb-3">
                    {metric.unit}
                  </div>
                  <h3 className="font-display text-lg text-forest-900 mb-2">
                    {metric.title}
                  </h3>
                  <p className="text-sm text-soil-700">
                    {metric.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sustainability Initiatives */}
      <section id="initiatives" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg text-forest-900 mb-4">
              Our Initiatives
            </h2>
            <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
              Discover the specific programs and systems that make our operations truly sustainable.
            </p>
          </div>

          <div className="space-y-16">
            {initiatives.map((initiative, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="aspect-[4/3] relative overflow-hidden rounded-card">
                    <Image
                      src={initiative.image}
                      alt={initiative.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="inline-flex items-center gap-2 bg-fern-300/10 text-fern-300 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <Leaf className="h-4 w-4" />
                    {initiative.category}
                  </div>
                  <h3 className="font-display text-2xl text-forest-900 mb-4">
                    {initiative.title}
                  </h3>
                  <p className="text-body-lg text-soil-700 mb-6">
                    {initiative.description}
                  </p>
                  <div className="bg-sand-50 rounded-card p-4">
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-moss-500" />
                      <div>
                        <div className="font-medium text-forest-900">Impact</div>
                        <div className="text-sm text-soil-700">{initiative.impact}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 lg:py-24 bg-forest-700 text-bone-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg mb-4">
              Recognized Excellence
            </h2>
            <p className="text-body-lg opacity-90 max-w-2xl mx-auto">
              Our commitment to sustainability has been recognized by leading environmental organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-bone-0/10 rounded-card p-6 text-center backdrop-blur-sm">
                <div className="w-16 h-16 mx-auto mb-4 bg-bone-0 rounded-full flex items-center justify-center">
                  <Image
                    src={cert.badge}
                    alt={cert.name}
                    width={32}
                    height={32}
                    className="opacity-80"
                  />
                </div>
                <h3 className="font-display text-lg mb-2">{cert.name}</h3>
                <div className="text-sm opacity-80 mb-3">
                  {cert.issuer} • {cert.year}
                </div>
                <p className="text-sm opacity-90">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-16 lg:py-24 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-display-lg text-forest-900 mb-6">
                Our 2025 Goals
              </h2>
              <p className="text-body-lg text-soil-700 mb-8">
                We&apos;re constantly pushing the boundaries of sustainable hospitality. 
                Here&apos;s what we&apos;re working toward next.
              </p>
              
              <div className="space-y-6">
                {upcomingGoals.map((goal, index) => (
                  <div key={index} className="bg-bone-0 rounded-card p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-forest-900">{goal.goal}</h3>
                      <span className="text-sm font-medium text-moss-500">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-mist-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-moss-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-soil-700">{goal.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-bone-0 rounded-card p-8">
              <h3 className="font-display text-xl text-forest-900 mb-6">
                Transparency Report
              </h3>
              <p className="text-soil-700 mb-6">
                We publish detailed monthly reports on our environmental impact, 
                community contributions, and progress toward our sustainability goals.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-moss-500" />
                  <span>Updated monthly on the 15th</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-moss-500" />
                  <span>Third-party verified data</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Target className="h-4 w-4 text-moss-500" />
                  <span>Goal tracking and accountability</span>
                </div>
              </div>

              <Link href="/sustainability/reports" className="btn btn-primary w-full justify-center">
                View Latest Report
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-lg text-forest-900 mb-6">
            Be Part of Our Impact
          </h2>
          <p className="text-body-lg text-soil-700 mb-8 max-w-2xl mx-auto">
            Every stay at Surwahi contributes to conservation efforts and community development. 
            Your visit makes a measurable difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/accommodations" className="btn btn-primary">
              Book Your Sustainable Stay
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Learn More About Our Programs
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sustainability at Surwahi Eco-Lodge",
            "description": "Conservation you can feel — and measure. Discover our regenerative practices, community impact, and environmental initiatives.",
            "author": {
              "@type": "Organization",
              "name": "Surwahi Eco-Lodge"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Surwahi Eco-Lodge",
              "logo": {
                "@type": "ImageObject",
                "url": "https://surwahi.com/assets/logo.png"
              }
            },
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "mainEntityOfPage": "https://surwahi.com/sustainability"
          })
        }}
      />
    </div>
  );
}
