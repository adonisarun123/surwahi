import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = generatePageMetadata(
  'Praises',
  'See our awards, accolades, and press mentions.',
  '/praises'
);

const praises = [
    {
        name: 'Awards & Accolades',
        href: '/praises/awards-and-accolades',
        imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Awards',
        description: 'Recognized for our commitment to sustainability.'
    },
    {
        name: 'Press Mentions & Recognitions',
        href: '/praises/press-mentions-and-recognitions',
        imageUrl: 'https://placehold.co/600x400/A8BA9A/333333?text=Press',
        description: 'Featured in leading publications.'
    }
];

export default function PraisesPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-display-xl text-forest-900 mb-8 text-center">Praises & Recognitions</h1>
        <p className="text-center text-body-lg text-soil-700 max-w-2xl mx-auto mb-12">
            We are honored to be recognized for our efforts in sustainable tourism and community empowerment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {praises.map((praise) => (
                <Link href={praise.href} key={praise.name} className="group block bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
                    <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                        <Image
                            src={praise.imageUrl}
                            alt={praise.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="p-6">
                        <h3 className="font-display text-2xl text-forest-900 mb-2">{praise.name}</h3>
                        <p className="text-soil-700 text-sm">{praise.description}</p>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
