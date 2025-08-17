import Link from 'next/link';
import { ArrowRight, Leaf, Users, Shield } from 'lucide-react';
import BookingWidget from '@/components/BookingWidget';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Surwahi Eco-Lodge - Sustainable Forest Retreats',
  description: 'Sleep to birdsong. Wake to the forest. Experience regenerative hospitality at Surwahi Eco-Lodge - your sustainable escape in nature.',
  url: 'https://surwahi.com',
});

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-forest-700 to-moss-500">
          {/* Eco Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='0.15' stroke-width='1.5'%3E%3Cpath d='M200 50c-40 20-80 60-100 100 20 40 60 80 100 100 40-20 80-60 100-100-20-40-60-80-100-100z'/%3E%3Cpath d='M200 100c-20 10-40 30-50 50 10 20 30 40 50 50 20-10 40-30 50-50-10-20-30-40-50-50z'/%3E%3Ccircle cx='200' cy='200' r='8'/%3E%3Cpath d='M80 200c30-30 70-30 100 0'/%3E%3Cpath d='M220 200c30-30 70-30 100 0'/%3E%3Cpath d='M200 80c-30 30-30 70 0 100'/%3E%3Cpath d='M200 220c-30 30-30 70 0 100'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '400px 400px'
            }}
          />
          <div className="absolute inset-0 bg-forest-900/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="font-display text-display-xl text-bone-0 mb-6 text-balance">
                Sleep to birdsong.
                <br />
                Wake to the forest.
              </h1>
              <p className="text-body-lg text-bone-0/90 mb-8 max-w-lg mx-auto lg:mx-0">
                Experience regenerative hospitality where luxury meets conservation. 
                Your sustainable escape awaits in the heart of nature.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/accommodations" className="btn btn-primary text-base">
                  Explore Rooms
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/sustainability" className="btn btn-secondary bg-bone-0/10 border-bone-0/30 text-bone-0 hover:bg-bone-0/20">
                  Our Impact
                </Link>
              </div>
            </div>

            {/* Booking Widget */}
            <div className="flex justify-center lg:justify-end">
              <BookingWidget variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* USP Cards Section */}
      <section className="relative py-16 lg:py-24 bg-bone-0 overflow-hidden">
        {/* Subtle Leaf Pattern Background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Cg fill='none' stroke='%236FA888' stroke-opacity='0.3' stroke-width='1'%3E%3Cpath d='M150 30c-20 30-30 70-10 100 15-10 25-25 30-40 20 15 40 25 60 20-30-20-50-50-80-80z'/%3E%3Cpath d='M50 150c30-20 70-30 100-10-10 15-25 25-40 30 15 20 25 40 20 60-20-30-50-50-80-80z'/%3E%3Cpath d='M250 150c-30 20-70 30-100 10 10-15 25-25 40-30-15-20-25-40-20-60 20 30 50 50 80 80z'/%3E%3Cpath d='M150 270c20-30 30-70 10-100-15 10-25 25-30 40-20-15-40-25-60-20 30 20 50 50 80 80z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '300px 300px'
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-fern-300/10 rounded-full flex items-center justify-center group-hover:bg-fern-300/20 transition-colors">
                <Leaf className="h-8 w-8 text-fern-300" />
              </div>
              <h3 className="font-display text-xl text-forest-900 mb-3">Eco-Certified</h3>
              <p className="text-soil-700 leading-relaxed">
                Certified sustainable practices with solar power, rainwater harvesting, 
                and zero waste to landfill.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-clay-500/10 rounded-full flex items-center justify-center group-hover:bg-clay-500/20 transition-colors">
                <Users className="h-8 w-8 text-clay-500" />
              </div>
              <h3 className="font-display text-xl text-forest-900 mb-3">Community-Powered</h3>
              <p className="text-soil-700 leading-relaxed">
                Partnerships with local artisans and farmers, creating 
                economic opportunities for the surrounding community.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-river-400/10 rounded-full flex items-center justify-center group-hover:bg-river-400/20 transition-colors">
                <Shield className="h-8 w-8 text-river-400" />
              </div>
              <h3 className="font-display text-xl text-forest-900 mb-3">Wildlife-Friendly</h3>
              <p className="text-soil-700 leading-relaxed">
                Ethical wildlife viewing with responsible distances and 
                active participation in local conservation efforts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-forest-700 to-moss-500 text-bone-0 overflow-hidden">
        {/* Organic Flow Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='200' viewBox='0 0 500 200'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='0.2' stroke-width='2'%3E%3Cpath d='M0,100 Q125,20 250,100 T500,100'/%3E%3Cpath d='M0,130 Q100,50 200,130 T400,130'/%3E%3Cpath d='M100,70 Q225,150 350,70 T600,70'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '500px 200px'
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-display-lg mb-6">
            Your Forest Retreat Awaits
          </h2>
          <p className="text-body-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Book your sustainable escape and become part of our conservation story. 
            Every stay makes a difference.
          </p>
          <Link href="/accommodations" className="btn btn-secondary bg-bone-0 text-forest-700 hover:bg-bone-0/90">
            Check Availability
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
