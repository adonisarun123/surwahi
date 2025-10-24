import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Users, 
  Bed, 
  Maximize, 
  Eye, 
  Leaf,
  Star,
  Check,
  MapPin
} from 'lucide-react';
import Breadcrumbs, { BreadcrumbJsonLd } from '@/components/Breadcrumbs';
import BookingWidget from '@/components/BookingWidget';
import { generateRoomMetadata } from '@/lib/seo';
import { formatPrice } from '@/lib/utils';
import { rooms } from '@/lib/accommodations';

interface RoomPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = rooms[slug as keyof typeof rooms];
  
  if (!room) {
    return {
      title: 'Room Not Found',
      description: 'The requested room could not be found.'
    };
  }

  return generateRoomMetadata(
    room.name,
    room.description,
    room.slug,
    room.basePrice,
    room.images[0]?.url
  );
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = rooms[slug as keyof typeof rooms];

  if (!room) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Accommodations', href: '/accommodations' },
    { name: room.name, href: `/accommodations/${room.slug}` }
  ];

  return (
    <div className="pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs customBreadcrumbs={breadcrumbs} />
          <Link
            href="/accommodations"
            className="flex items-center gap-2 text-moss-500 hover:text-forest-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Rooms
          </Link>
        </div>
      </div>

      {/* Room Gallery */}
      <section className="mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-4 h-[60vh]">
            {/* Main Image */}
            <div className="md:col-span-2 relative overflow-hidden rounded-card">
              <Image
                src={room.images[0]?.url}
                alt={room.images[0]?.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Thumbnail Grid */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {room.images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-card">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* View All Photos Button */}
          <div className="mt-4 text-center">
            <button className="btn btn-secondary">
              View All {room.images.length} Photos
            </button>
          </div>
        </div>
      </section>

      {/* Room Details */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="font-display text-display-lg text-forest-900 mb-2">
                      {room.name}
                    </h1>
                    <div className="flex items-center gap-4 text-soil-700 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{room.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-clay-500 text-clay-500" />
                        <span className="font-medium">{room.rating}</span>
                        <span>({room.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-forest-900">
                      {formatPrice(room.basePrice)}
                    </div>
                    <div className="text-soil-700">per night</div>
                  </div>
                </div>

                {/* Quick Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-sand-50 rounded-card">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-moss-500" />
                    <div>
                      <div className="font-medium text-forest-900">{room.maxOccupancy} guests</div>
                      <div className="text-sm text-soil-700">Maximum</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-moss-500" />
                    <div>
                      <div className="font-medium text-forest-900">{room.bedConfiguration}</div>
                      <div className="text-sm text-soil-700">Sleeping</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize className="h-5 w-5 text-moss-500" />
                    <div>
                      <div className="font-medium text-forest-900">{room.size}</div>
                      <div className="text-sm text-soil-700">Room size</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-moss-500" />
                    <div>
                      <div className="font-medium text-forest-900">{room.view}</div>
                      <div className="text-sm text-soil-700">View</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="font-display text-2xl text-forest-900 mb-4">About This Room</h2>
                <div className="prose prose-lg">
                  {room.longDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-ink-900 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h3 className="font-display text-xl text-forest-900 mb-4">Room Amenities</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-fern-300 flex-shrink-0" />
                      <span className="text-ink-900">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eco Features */}
              <div className="mb-8">
                <h3 className="font-display text-xl text-forest-900 mb-4 flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-fern-300" />
                  Sustainability Features
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {room.ecoFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Leaf className="h-4 w-4 text-fern-300 flex-shrink-0" />
                      <span className="text-ink-900">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h3 className="font-display text-xl text-forest-900 mb-4">What&apos;s Included</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {room.included.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-moss-500 flex-shrink-0" />
                      <span className="text-ink-900">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div className="mb-8">
                <h3 className="font-display text-xl text-forest-900 mb-4">Room Policies</h3>
                <div className="bg-sand-50 rounded-card p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-forest-900 mb-2">Check-in / Check-out</h4>
                      <p className="text-sm text-soil-700">Check-in: {room.checkIn}</p>
                      <p className="text-sm text-soil-700">Check-out: {room.checkOut}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-forest-900 mb-2">Cancellation</h4>
                      <p className="text-sm text-soil-700">{room.policies.cancellation}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-forest-900 mb-2">Additional Information</h4>
                      <p className="text-sm text-soil-700">{room.policies.pets}</p>
                      <p className="text-sm text-soil-700">{room.policies.smoking}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-forest-900 mb-2">Extra Services</h4>
                      <p className="text-sm text-soil-700">{room.policies.extraBed}</p>
                      <p className="text-sm text-soil-700">{room.policies.children}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BookingWidget variant="page" room={room} className="mb-6" />
                
                {/* Contact Info */}
                <div className="bg-sand-50 rounded-card p-6">
                  <h4 className="font-medium text-forest-900 mb-3">Need Help Booking?</h4>
                  <p className="text-sm text-soil-700 mb-4">
                    Our team is here to help you plan the perfect forest retreat.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Phone:</span>
                      <Link href="tel:+919744844777" className="text-moss-500 hover:underline">
                        +919744844777
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <Link href="mailto:contact@surwahi.com" className="text-moss-500 hover:underline">
                        contact@surwahi.com
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Rooms */}
      <section className="py-12 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-forest-900 mb-8">Other Accommodations</h2>
          <div className="text-center">
            <Link href="/accommodations" className="btn btn-primary">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <BreadcrumbJsonLd breadcrumbs={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HotelRoom",
            "@id": `https://surwahi.com/accommodations/${room.slug}#room`,
            "name": room.name,
            "description": room.description,
            "bed": room.bedConfiguration,
            "occupancy": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": room.maxOccupancy
            },
            "amenityFeature": room.amenities.map(amenity => ({
              "@type": "LocationFeatureSpecification",
              "name": amenity,
              "value": true
            })),
            "image": room.images.map(img => img.url),
            "isPartOf": { "@id": "https://surwahi.com/#lodging" },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": room.basePrice.toString(),
              "availability": "https://schema.org/InStock",
              "validFrom": new Date().toISOString().split('T')[0],
              "url": `https://surwahi.com/accommodations/${room.slug}#book`
            }
          })
        }}
      />
    </div>
  );
}
