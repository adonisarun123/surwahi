import Link from 'next/link';
import Image from 'next/image';
import { Bed, Users, Eye, Star } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { rooms } from '@/lib/accommodations';
import { formatPrice } from '@/lib/utils';

export const metadata = generatePageMetadata(
  'Dormitory',
  'Affordable and social, our dormitory is ideal for solo travelers and groups.',
  '/accommodations/dormitory'
);

const dormitories = Object.values(rooms).filter(room => room.category === 'Dormitory');

export default function DormitoryPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            Our Dormitory
          </h1>
          <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
            A vibrant and comfortable space for travelers to connect and share experiences.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {dormitories.map((room) => (
              <Link href={`/accommodations/${room.slug}`} key={room.id} className="group block bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={room.images[0].url}
                    alt={room.images[0].alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-forest-900 mb-2">{room.name}</h3>
                  <p className="text-soil-700 mb-4 text-sm">{room.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div className="flex items-center gap-2"><Users className="h-4 w-4 text-moss-500" />{room.maxOccupancy} guests</div>
                    <div className="flex items-center gap-2"><Bed className="h-4 w-4 text-moss-500" />{room.bedConfiguration}</div>
                    <div className="flex items-center gap-2"><Eye className="h-4 w-4 text-moss-500" />{room.view}</div>
                    <div className="flex items-center gap-2"><Star className="h-4 w-4 text-moss-500" />{room.rating} ({room.reviewCount})</div>
                  </div>
                  <div className="pt-4 border-t border-mist-200 text-right">
                    <span className="text-2xl font-bold text-forest-900">{formatPrice(room.basePrice)}</span>
                    <span className="text-soil-700 text-sm"> / person / night</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
