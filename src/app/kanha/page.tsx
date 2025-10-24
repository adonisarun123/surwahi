import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { kanhaData } from '@/lib/kanha';

export const metadata = generatePageMetadata(
  'Kanha National Park',
  'Explore articles and information about Kanha National Park.',
  '/kanha'
);

export default function KanhaPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            Explore Kanha National Park
          </h1>
          <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
            A collection of articles and guides to help you discover the wonders of Kanha.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kanhaData.map((item) => (
              <Link href={`/kanha/${item.slug}`} key={item.slug} className="group block bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={item.thumbnailImage}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-forest-900 mb-2 group-hover:text-moss-500 transition-colors">{item.name}</h3>
                  <p className="text-soil-700 text-sm">{item.metaDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
