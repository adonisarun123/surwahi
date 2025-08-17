'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Search, Filter, Eye, Camera, Calendar, Download } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

// Mock data - will be replaced with database queries
const galleryCategories = [
  { name: 'All', slug: 'all', count: 156 },
  { name: 'Accommodations', slug: 'accommodations', count: 32 },
  { name: 'Wildlife', slug: 'wildlife', count: 45 },
  { name: 'Landscapes', slug: 'landscapes', count: 38 },
  { name: 'Activities', slug: 'activities', count: 28 },
  { name: 'Sustainability', slug: 'sustainability', count: 13 }
];

const galleryImages = [
  {
    id: 1,
    url: '/images/gallery/forest-canopy-morning.jpg',
    title: 'Forest Canopy at Dawn',
    description: 'Golden hour light filtering through the sal forest canopy',
    category: 'landscapes',
    photographer: 'Surwahi Team',
    capturedDate: '2024-01-15',
    location: 'Main Forest Trail',
    camera: 'Canon EOS R5',
    settings: 'f/8, 1/125s, ISO 400',
    isHighlighted: true
  },
  {
    id: 2,
    url: '/images/gallery/tree-house-villa-exterior.jpg',
    title: 'Tree House Villa',
    description: 'Our signature tree house villa nestled in the canopy',
    category: 'accommodations',
    photographer: 'Surwahi Team',
    capturedDate: '2024-01-20',
    location: 'Tree House Villa',
    camera: 'Sony A7IV',
    settings: 'f/5.6, 1/200s, ISO 200',
    isHighlighted: true
  },
  {
    id: 3,
    url: '/images/gallery/malabar-hornbill.jpg',
    title: 'Malabar Pied Hornbill',
    description: 'Rare hornbill spotted during morning bird watching',
    category: 'wildlife',
    photographer: 'Guest Contributor',
    capturedDate: '2024-02-05',
    location: 'Near River Trail',
    camera: 'Nikon D850',
    settings: 'f/6.3, 1/500s, ISO 800',
    isHighlighted: false
  },
  {
    id: 4,
    url: '/images/gallery/solar-panel-installation.jpg',
    title: 'Solar Power System',
    description: 'Our 45kW solar installation powering the entire lodge',
    category: 'sustainability',
    photographer: 'Surwahi Team',
    capturedDate: '2024-01-10',
    location: 'Lodge Rooftop',
    camera: 'DJI Mavic 3',
    settings: 'f/2.8, 1/320s, ISO 100',
    isHighlighted: false
  },
  {
    id: 5,
    url: '/images/gallery/nature-walk-group.jpg',
    title: 'Guided Nature Walk',
    description: 'Guests learning about medicinal plants with local guide',
    category: 'activities',
    photographer: 'Surwahi Team',
    capturedDate: '2024-02-12',
    location: 'Medicinal Plant Trail',
    camera: 'Canon EOS R6',
    settings: 'f/4, 1/250s, ISO 400',
    isHighlighted: false
  },
  {
    id: 6,
    url: '/images/gallery/misty-forest-path.jpg',
    title: 'Misty Forest Path',
    description: 'Early morning mist creating ethereal atmosphere',
    category: 'landscapes',
    photographer: 'Surwahi Team',
    capturedDate: '2024-01-25',
    location: 'Main Trail',
    camera: 'Fujifilm X-T5',
    settings: 'f/8, 1/60s, ISO 200',
    isHighlighted: true
  },
  {
    id: 7,
    url: '/images/gallery/riverside-cottage-deck.jpg',
    title: 'Riverside Cottage Deck',
    description: 'Peaceful morning on the riverside cottage deck',
    category: 'accommodations',
    photographer: 'Surwahi Team',
    capturedDate: '2024-02-01',
    location: 'Riverside Cottage',
    camera: 'Sony A7III',
    settings: 'f/5.6, 1/125s, ISO 100',
    isHighlighted: false
  },
  {
    id: 8,
    url: '/images/gallery/spotted-deer-family.jpg',
    title: 'Spotted Deer Family',
    description: 'Family of spotted deer grazing near the lodge',
    category: 'wildlife',
    photographer: 'Guest Contributor',
    capturedDate: '2024-02-08',
    location: 'Lodge Perimeter',
    camera: 'Canon EOS 90D',
    settings: 'f/5.6, 1/400s, ISO 640',
    isHighlighted: false
  },
  {
    id: 9,
    url: '/images/gallery/rainwater-harvesting.jpg',
    title: 'Rainwater Harvesting',
    description: 'Our rainwater collection and filtration system',
    category: 'sustainability',
    photographer: 'Surwahi Team',
    capturedDate: '2024-01-30',
    location: 'Lodge Grounds',
    camera: 'iPhone 14 Pro',
    settings: 'f/1.8, 1/240s, ISO 125',
    isHighlighted: false
  },
  {
    id: 10,
    url: '/images/gallery/bird-watching-safari.jpg',
    title: 'Dawn Bird Watching',
    description: 'Guests enjoying early morning bird watching safari',
    category: 'activities',
    photographer: 'Surwahi Team',
    capturedDate: '2024-02-15',
    location: 'Bird Watching Trail',
    camera: 'Nikon Z6',
    settings: 'f/4, 1/200s, ISO 800',
    isHighlighted: false
  },
  {
    id: 11,
    url: '/images/gallery/sunset-forest-view.jpg',
    title: 'Sunset Through Trees',
    description: 'Spectacular sunset viewed from the lodge terrace',
    category: 'landscapes',
    photographer: 'Surwahi Team',
    capturedDate: '2024-02-10',
    location: 'Lodge Terrace',
    camera: 'Sony A7R5',
    settings: 'f/11, 1/30s, ISO 100',
    isHighlighted: true
  },
  {
    id: 12,
    url: '/images/gallery/organic-garden.jpg',
    title: 'Organic Garden',
    description: 'Fresh vegetables growing in our permaculture garden',
    category: 'sustainability',
    photographer: 'Surwahi Team',
    capturedDate: '2024-02-20',
    location: 'Organic Garden',
    camera: 'Canon EOS M50',
    settings: 'f/5.6, 1/160s, ISO 200',
    isHighlighted: false
  }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleImageClick = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

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
              Gallery
            </h1>
            <p className="text-body-lg text-soil-700 mb-8">
              Explore the beauty of Surwahi through our curated collection of photographs 
              showcasing the forest, wildlife, accommodations, and our sustainability initiatives.
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-soil-700" />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-soil-700" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-input min-w-[150px]"
                >
                  {galleryCategories.map(category => (
                    <option key={category.slug} value={category.slug}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Images */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg text-forest-900 mb-4">
              Featured Photographs
            </h2>
            <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
              Highlights from our collection showcasing the best of Surwahi&apos;s 
              natural beauty and sustainable practices.
            </p>
          </div>

          {/* Hero Image Grid */}
          <div className="grid lg:grid-cols-4 gap-4 mb-12">
            {galleryImages.filter(img => img.isHighlighted).slice(0, 4).map((image, index) => (
              <div 
                key={image.id} 
                className={`group relative overflow-hidden rounded-card cursor-pointer ${
                  index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
                onClick={() => handleImageClick(image)}
              >
                <div className={`aspect-square ${index === 0 ? 'lg:aspect-[2/2]' : ''} relative overflow-hidden`}>
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/20 transition-colors" />
                  <div className="absolute inset-0 flex items-end p-4">
                    <div className="bg-bone-0/90 backdrop-blur-sm rounded-input p-3 w-full">
                      <h3 className="font-medium text-forest-900 mb-1">{image.title}</h3>
                      <p className="text-sm text-soil-700">{image.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Gallery */}
      <section className="py-16 lg:py-24 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl text-forest-900">
              All Photos ({filteredImages.length})
            </h2>
            
            <div className="flex items-center gap-4">
              <select className="form-input">
                <option>Latest First</option>
                <option>Oldest First</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div 
                key={image.id}
                className="group relative overflow-hidden rounded-card cursor-pointer bg-bone-0 shadow-elev-1 hover:shadow-elev-2 transition-all"
                onClick={() => handleImageClick(image)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/20 transition-colors" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="h-5 w-5 text-bone-0" />
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-forest-900 mb-1 line-clamp-1">{image.title}</h3>
                  <p className="text-sm text-soil-700 mb-2 line-clamp-2">{image.description}</p>
                  <div className="flex items-center justify-between text-xs text-soil-700">
                    <span>{image.photographer}</span>
                    <span>{new Date(image.capturedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn btn-secondary">
              Load More Photos
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[70] bg-forest-900/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-6xl max-h-[90vh] bg-bone-0 rounded-card overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-forest-900/80 hover:bg-forest-900 rounded-full flex items-center justify-center text-bone-0 transition-colors"
            >
              ×
            </button>

            <div className="grid lg:grid-cols-3">
              {/* Image */}
              <div className="lg:col-span-2 relative">
                <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[60vh] relative">
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Image Details */}
              <div className="p-6 lg:p-8">
                <h3 className="font-display text-xl text-forest-900 mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-soil-700 mb-6">
                  {selectedImage.description}
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Camera className="h-4 w-4 text-moss-500" />
                    <div>
                      <div className="text-sm font-medium">Photographer</div>
                      <div className="text-sm text-soil-700">{selectedImage.photographer}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-moss-500" />
                    <div>
                      <div className="text-sm font-medium">Date</div>
                      <div className="text-sm text-soil-700">
                        {new Date(selectedImage.capturedDate).toLocaleDateString('en-IN', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Eye className="h-4 w-4 text-moss-500" />
                    <div>
                      <div className="text-sm font-medium">Location</div>
                      <div className="text-sm text-soil-700">{selectedImage.location}</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-mist-200 pt-4">
                  <h4 className="text-sm font-medium text-forest-900 mb-2">Camera Details</h4>
                  <div className="text-sm text-soil-700 space-y-1">
                    <div>{selectedImage.camera}</div>
                    <div>{selectedImage.settings}</div>
                  </div>
                </div>

                <button className="btn btn-secondary w-full mt-6">
                  <Download className="h-4 w-4 mr-2" />
                  Download High Resolution
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photography Guidelines */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sand-50 rounded-card p-8">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl text-forest-900 mb-4">
                Photography at Surwahi
              </h2>
              <p className="text-soil-700 max-w-2xl mx-auto">
                We encourage photography to capture and share the beauty of our forest. 
                Please follow these guidelines to respect wildlife and other guests.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-moss-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera className="h-6 w-6 text-moss-500" />
                </div>
                <h3 className="font-medium text-forest-900 mb-2">Respectful Wildlife Photography</h3>
                <p className="text-sm text-soil-700">Maintain safe distances and never disturb wildlife</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-moss-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="h-6 w-6 text-moss-500" />
                </div>
                <h3 className="font-medium text-forest-900 mb-2">Guest Privacy</h3>
                <p className="text-sm text-soil-700">Ask permission before photographing other guests</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-moss-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Filter className="h-6 w-6 text-moss-500" />
                </div>
                <h3 className="font-medium text-forest-900 mb-2">Share Your Photos</h3>
                <p className="text-sm text-soil-700">Tag @surwahi to be featured in our gallery</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-moss-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Download className="h-6 w-6 text-moss-500" />
                </div>
                <h3 className="font-medium text-forest-900 mb-2">High Resolution Available</h3>
                <p className="text-sm text-soil-700">Request full resolution images for personal use</p>
              </div>
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
            "@type": "ImageGallery",
            "name": "Surwahi Eco-Lodge Photo Gallery",
            "description": "Photo gallery showcasing the natural beauty and sustainable practices at Surwahi Eco-Lodge",
            "url": "https://surwahi.com/gallery",
            "mainEntity": galleryImages.slice(0, 10).map(image => ({
              "@type": "ImageObject",
              "contentUrl": `https://surwahi.com${image.url}`,
              "name": image.title,
              "description": image.description,
              "uploadDate": image.capturedDate,
              "creator": {
                "@type": "Person",
                "name": image.photographer
              }
            }))
          })
        }}
      />
    </div>
  );
}
