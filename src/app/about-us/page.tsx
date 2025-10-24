import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { BookOpen, Building, Bed, Utensils, FileText, PawPrint } from 'lucide-react';

export const metadata = generatePageMetadata(
  'About Us',
  'Learn about the story, philosophy, and team behind Surwahi Eco Lodge.',
  '/about-us'
);

const subSections = [
    { name: 'Our Story', href: '/about-us/our-story', description: 'The journey of how our dream took root.', icon: BookOpen },
    { name: 'The Lodge & Philosophy', href: '/about-us/the-lodge-and-philosophy', description: 'Our principles of eco-friendly design and conscious hospitality.', icon: Building },
    { name: 'Accommodations', href: '/accommodations', description: 'Explore our sustainable and comfortable living spaces.', icon: Bed },
    { name: 'Dining & Local Cuisine', href: '/about-us/dining-and-local-cuisine', description: 'Experience our farm-to-table, hyperlocal culinary delights.', icon: Utensils },
    { name: 'Fact Sheet', href: '/about-us/fact-sheet', description: 'Detailed information about our sustainability practices.', icon: FileText },
    { name: 'Our Residents (Flora & Fauna)', href: '/about-us/our-residents', description: 'Meet the diverse wildlife that calls Surwahi home.', icon: PawPrint },
]

export default function AboutUsPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-display-xl text-forest-900 mb-4">
                About Surwahi Social
            </h1>
            <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
                Discover the heart and soul behind our eco-lodge. Learn about our journey, our philosophy of regenerative tourism, and the vibrant ecosystem we are a part of.
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subSections.map((section) => (
            <Link key={section.name} href={section.href} className="group block p-6 bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all text-center">
              <div className="flex justify-center mb-4">
                <section.icon className="h-12 w-12 text-moss-500" />
              </div>
              <h2 className="font-display text-2xl text-forest-800 mb-2">{section.name}</h2>
              <p className="text-soil-700 text-sm">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
