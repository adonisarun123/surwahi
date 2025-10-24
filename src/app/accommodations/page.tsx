import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { Search, Filter, Users, Bed, Eye, Leaf, Star } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import BookingWidget from '@/components/BookingWidget';
import { generatePageMetadata } from '@/lib/seo';
import { formatPrice } from '@/lib/utils';

export const metadata = generatePageMetadata(
  'Accommodations',
  'Discover our eco-friendly rooms and suites nestled in the forest. From tree houses to riverside cottages, find your perfect sustainable retreat.',
  '/accommodations'
);

// Mock data - will be replaced with database queries
const rooms = [
  {
    id: '1',
    name: 'Forest Canopy Suite',
    slug: 'forest-canopy-suite',
    description: 'Elevated suite with panoramic forest views and luxury amenities',
    shortDescription: 'Luxury suite with forest views',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    basePrice: 9500,
    maxOccupancy: 3,
    bedType: 'King Bed',
    size: '45 sqm',
    view: 'Forest Canopy',
    amenities: ['Solar Cooled', 'Private Balcony', 'Filtered Water', 'Eco Toiletries'],
    ecoFeatures: ['Solar Power', 'Rainwater Harvesting', 'Natural Ventilation'],
    accessibility: ['Ground Floor Access'],
    rating: 4.8,
    reviewCount: 42,
    isAvailable: true,
    category: 'Suite'
  },
  {
    id: '2',
    name: 'Riverside Cottage',
    slug: 'riverside-cottage',
    description: 'Cozy cottage by the flowing river with garden access',
    shortDescription: 'Riverside cottage with garden',
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    basePrice: 7200,
    maxOccupancy: 2,
    bedType: 'Queen Bed',
    size: '35 sqm',
    view: 'River & Garden',
    amenities: ['Garden Access', 'River View', 'Reading Nook', 'Natural Light'],
    ecoFeatures: ['Local Materials', 'Energy Efficient', 'Composting Toilet'],
    accessibility: ['Wide Doorways'],
    rating: 4.6,
    reviewCount: 28,
    isAvailable: true,
    category: 'Cottage'
  },
  {
    id: '3',
    name: 'Tree House Villa',
    slug: 'tree-house-villa',
    description: 'Unique treehouse experience in the canopy with luxury amenities',
    shortDescription: 'Luxury treehouse in canopy',
    images: [
      'https://images.unsplash.com/photo-1520637836862-4d197d17c15a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502780402662-acc01917603e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    basePrice: 12000,
    maxOccupancy: 4,
    bedType: 'King + Daybed',
    size: '55 sqm',
    view: 'Canopy & Wildlife',
    amenities: ['Unique Design', 'Wildlife Viewing', 'Luxury Bathroom', 'Private Deck'],
    ecoFeatures: ['Minimal Footprint', 'Bird-Friendly Design', 'Sustainable Wood'],
    accessibility: ['Tree Access Only'],
    rating: 4.9,
    reviewCount: 67,
    isAvailable: true,
    category: 'Villa'
  },
  {
    id: '4',
    name: 'Forest Floor Cabin',
    slug: 'forest-floor-cabin',
    description: 'Ground-level cabin surrounded by native trees and wildlife',
    shortDescription: 'Accessible forest cabin',
    images: [
      'https://images.unsplash.com/photo-1464822759844-d150065c142f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    basePrice: 6500,
    maxOccupancy: 2,
    bedType: 'Queen Bed',
    size: '30 sqm',
    view: 'Forest Floor',
    amenities: ['Accessible Design', 'Wildlife Viewing', 'Natural Materials', 'Quiet Location'],
    ecoFeatures: ['Natural Cooling', 'Local Stone', 'Minimal Impact'],
    accessibility: ['Wheelchair Accessible', 'Roll-in Shower', 'Wide Doorways'],
    rating: 4.7,
    reviewCount: 35,
    isAvailable: true,
    category: 'Cabin'
  }
];

interface RoomCardProps {
  room: typeof rooms[0];
}

function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="group bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
      {/* Image Gallery */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={room.images[0]}
          alt={`${room.name} - ${room.shortDescription}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-fern-300 text-bone-0 px-2 py-1 rounded text-xs font-medium">
            Eco-Certified
          </span>
          {room.accessibility.includes('Wheelchair Accessible') && (
            <span className="bg-river-400 text-bone-0 px-2 py-1 rounded text-xs font-medium">
              Accessible
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-bone-0/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
          <Star className="h-3 w-3 fill-clay-500 text-clay-500" />
          <span className="text-xs font-medium">{room.rating}</span>
          <span className="text-xs text-soil-700">({room.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl text-forest-900 mb-1 truncate">{room.name}</h3>
            <p className="text-soil-700 text-sm truncate-2-lines">{room.shortDescription}</p>
          </div>
          <span className="flex-shrink-0 bg-mist-200/50 text-soil-700 px-2 py-1 rounded text-xs whitespace-nowrap">
            {room.category}
          </span>
        </div>

        {/* Room Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2 text-soil-700">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{room.maxOccupancy} guests</span>
          </div>
          <div className="flex items-center gap-2 text-soil-700">
            <Bed className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{room.bedType}</span>
          </div>
          <div className="flex items-center gap-2 text-soil-700">
            <Eye className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{room.view}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {room.amenities.slice(0, 3).map((amenity) => (
              <span key={amenity} className="bg-mist-200/50 text-soil-700 px-2 py-1 rounded text-xs truncate max-w-[120px]">
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-soil-700 text-xs py-1 whitespace-nowrap">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Eco Features */}
        <div className="mb-4">
          <div className="flex items-start gap-2 text-sm text-fern-300">
            <Leaf className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="font-medium">Eco Features:</span>
              <span className="text-soil-700 truncate block">{room.ecoFeatures.slice(0, 2).join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-mist-200">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-2xl font-bold text-forest-900">
                {formatPrice(room.basePrice)}
              </span>
              <span className="text-soil-700 text-sm whitespace-nowrap">/ night</span>
            </div>
            <div className="text-xs text-soil-700">Includes breakfast</div>
          </div>
          <Link
            href={`/accommodations/${room.slug}`}
            className="btn btn-primary whitespace-nowrap w-full sm:w-auto justify-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

function RoomFilters() {
  return (
    <div className="bg-bone-0 rounded-card p-6 shadow-elev-1 h-fit">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-moss-500" />
        <h3 className="font-medium text-forest-900">Filter Rooms</h3>
      </div>

      <div className="space-y-6">
        {/* Dates & Guests - Connect to BookingWidget state */}
        <div>
          <label className="form-label">Check-in Date</label>
          <input type="date" className="form-input" />
        </div>
        
        <div>
          <label className="form-label">Check-out Date</label>
          <input type="date" className="form-input" />
        </div>

        <div>
          <label className="form-label">Guests</label>
          <select className="form-input">
            <option>1-2 guests</option>
            <option>3-4 guests</option>
            <option>5+ guests</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="form-label">Price Range (per night)</label>
          <div className="grid grid-cols-2 gap-2">
            <input type="number" placeholder="Min" className="form-input" />
            <input type="number" placeholder="Max" className="form-input" />
          </div>
        </div>

        {/* Room Type */}
        <div>
          <label className="form-label">Room Type</label>
          <div className="space-y-2">
            {['Suite', 'Cottage', 'Villa', 'Cabin'].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-mist-200" />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* View */}
        <div>
          <label className="form-label">View</label>
          <div className="space-y-2">
            {['Forest Canopy', 'River & Garden', 'Forest Floor'].map((view) => (
              <label key={view} className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-mist-200" />
                <span className="text-sm">{view}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Accessibility */}
        <div>
          <label className="form-label">Accessibility</label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-mist-200" />
            <span className="text-sm">Wheelchair Accessible</span>
          </label>
        </div>

        {/* Apply Filters Button */}
        <button className="btn btn-primary w-full">
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default function AccommodationsPage() {
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
              Forest Accommodations
            </h1>
            <p className="text-body-lg text-soil-700 mb-6">
              Choose from our collection of sustainable rooms and suites, each thoughtfully 
              designed to immerse you in nature while providing modern comfort.
            </p>
            
            {/* Quick Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-soil-700" />
                  <input
                    type="text"
                    placeholder="Search rooms..."
                    className="form-input pl-10 w-full"
                  />
                </div>
              </div>
              <select className="form-input sm:min-w-[150px] w-full sm:w-auto">
                <option>Sort by Price</option>
                <option>Sort by Rating</option>
                <option>Sort by Size</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Suspense fallback={<div>Loading filters...</div>}>
                <RoomFilters />
              </Suspense>
            </div>

            {/* Room Listings */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <p className="text-soil-700 truncate">
                  Showing {rooms.length} accommodations
                </p>
                <button className="lg:hidden btn btn-secondary flex-shrink-0 whitespace-nowrap">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
              </div>

              {/* Room Grid */}
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 rounded-input border border-mist-200 text-soil-700 hover:border-moss-500">
                    Previous
                  </button>
                  <button className="px-3 py-2 rounded-input bg-moss-500 text-bone-0">
                    1
                  </button>
                  <button className="px-3 py-2 rounded-input border border-mist-200 text-soil-700 hover:border-moss-500">
                    2
                  </button>
                  <button className="px-3 py-2 rounded-input border border-mist-200 text-soil-700 hover:border-moss-500">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Widget Section */}
      <section className="py-12 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <h2 className="font-display text-2xl text-forest-900 text-center mb-6">
              Ready to Book?
            </h2>
            <BookingWidget variant="page" />
          </div>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": rooms.map((room, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://surwahi.com/accommodations/${room.slug}`
            }))
          })
        }}
      />
    </div>
  );
}
