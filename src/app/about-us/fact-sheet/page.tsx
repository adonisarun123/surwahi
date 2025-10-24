import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generatePageMetadata(
  'Fact Sheet',
  'Detailed information about our sustainability practices.',
  '/about-us/fact-sheet'
);

const factSheetSections = [
    { name: 'Water Conservation', href: '/sustainability/evapo-transpiration-toilets' },
    { name: 'Soil Conservation', href: '/sustainability/tree-census-and-biodiversity-reports' },
    { name: 'Reforestation & Green Belt', href: '/sustainability/eco-friendly-construction-practices' },
    { name: 'Energy & Power Management', href: '/sustainability/sustainable-development-goals-alignment' },
]

export default function FactSheetPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-display-xl text-forest-900 mb-8">Fact Sheet</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {factSheetSections.map((section) => (
            <Link key={section.name} href={section.href} className="block p-6 bg-sand-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="font-display text-2xl text-forest-700">{section.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
