import { Metadata } from 'next';

export interface SEOConfig {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export const defaultMeta = {
  title: 'Surwahi Eco-Lodge',
  description: 'Eco-lodge offering sustainable stays near the forest. Experience regenerative hospitality in harmony with nature.',
  image: '/images/og-default.jpg',
  url: 'https://surwahi.com',
  siteName: 'Surwahi Eco-Lodge',
  locale: 'en_IN',
};

export function generateMetadata(config: SEOConfig = {}): Metadata {
  const {
    title = defaultMeta.title,
    description = defaultMeta.description,
    image = defaultMeta.image,
    url = defaultMeta.url,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    tags,
  } = config;

  const fullTitle = title === defaultMeta.title ? title : `${title} | ${defaultMeta.siteName}`;
  const fullUrl = url.startsWith('http') ? url : `${defaultMeta.url}${url}`;
  const fullImage = image.startsWith('http') ? image : `${defaultMeta.url}${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: tags?.join(', '),
    authors: authors?.map(name => ({ name })),
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: defaultMeta.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: defaultMeta.locale,
      type,
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: fullUrl,
    },
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Surwahi Social Eco-Lodge',
      description: 'A sustainable eco-lodge offering immersive nature experiences at the edge of Kanha National Park.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Surwahi Social, Village Surwahi, P.O Majgaon, Tehsil Paraswada',
        addressLocality: 'Balaghat',
        addressRegion: 'Madhya Pradesh',
        postalCode: '481111',
        addressCountry: 'IN'
      },
      telephone: '+919744844777',
      email: 'contact@surwahi.com',
      url: 'https://www.surwahi.com',
      image: 'https://www.surwahi.com/og-image.jpg', // URL to a representative image
      priceRange: '₹₹ - ₹₹₹',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '22.2587', // Replace with actual latitude
        longitude: '80.1829' // Replace with actual longitude
      },
      hasMap: 'https://www.google.com/maps/place/Surwahi+Social+Ecoestate+Kanha', // Link to Google Maps
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          ],
          opens: '00:00',
          closes: '23:59'
        }
      ],
    })
  };

  return metadata;
}

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  image?: string
): Metadata {
  return generateMetadata({
    title,
    description,
    url: path,
    image,
  });
}

export function generateBlogMetadata(
  title: string,
  description: string,
  slug: string,
  publishedTime: string,
  modifiedTime?: string,
  authors?: string[],
  tags?: string[],
  image?: string
): Metadata {
  return generateMetadata({
    title,
    description,
    url: `/blog/${slug}`,
    type: 'article',
    publishedTime,
    modifiedTime,
    authors,
    tags,
    image,
  });
}

export function generateRoomMetadata(
  roomName: string,
  description: string,
  slug: string,
  price: number,
  image?: string
): Metadata {
  const title = `${roomName} - Book Your Stay`;
  const enhancedDescription = `${description} Starting from ₹${price.toLocaleString('en-IN')} per night. Book your sustainable stay at Surwahi Eco-Lodge.`;
  
  return generateMetadata({
    title,
    description: enhancedDescription,
    url: `/accommodations/${slug}`,
    image,
  });
}

// JSON-LD structured data generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://surwahi.com/#org',
    name: 'Surwahi Eco-Lodge',
    url: 'https://surwahi.com/',
    logo: 'https://surwahi.com/assets/logo.png',
    sameAs: [
      'https://www.facebook.com/surwahi',
      'https://www.instagram.com/surwahi',
      'https://www.linkedin.com/company/surwahi'
    ],
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Forest Road, Surwahi',
      addressLocality: 'Surwahi',
      addressRegion: 'Madhya Pradesh',
      postalCode: '480001',
      addressCountry: 'IN'
    },
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: '+91-9876543210',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi']
    }]
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://surwahi.com/#website',
    url: 'https://surwahi.com/',
    name: 'Surwahi Eco-Lodge',
    publisher: { '@id': 'https://surwahi.com/#org' },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://surwahi.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateLodgingBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': 'https://surwahi.com/#lodging',
    name: 'Surwahi Eco-Lodge',
    url: 'https://surwahi.com/',
    description: 'Eco-lodge offering sustainable stays near the forest.',
    image: [
      'https://surwahi.com/images/hero.jpg',
      'https://surwahi.com/images/room-forest.jpg'
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Solar power', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Rainwater harvesting', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'EV charging', value: true }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Forest Road, Surwahi',
      addressLocality: 'Surwahi',
      addressRegion: 'Madhya Pradesh',
      postalCode: '480001',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.1765,
      longitude: 79.9385
    },
    telephone: '+91-9876543210',
    checkinTime: '14:00',
    checkoutTime: '11:00',
    petsAllowed: false,
    starRating: { '@type': 'Rating', ratingValue: '4.6' },
    priceRange: '₹₹₹',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '168'
    }
  };
}

export function generateRoomSchema(room: {
  name: string;
  description: string;
  slug: string;
  bedType: string;
  maxOccupancy: number;
  basePrice: number;
  images: string[];
  amenities: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    '@id': `https://surwahi.com/accommodations/${room.slug}#room`,
    name: room.name,
    description: room.description,
    bed: room.bedType,
    occupancy: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: room.maxOccupancy
    },
    amenityFeature: room.amenities.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true
    })),
    image: room.images,
    isPartOf: { '@id': 'https://surwahi.com/#lodging' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: room.basePrice.toString(),
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
      url: `https://surwahi.com/accommodations/${room.slug}#book`
    }
  };
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image || `https://surwahi.com/images/blog/${post.slug}.jpg`,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Surwahi Eco-Lodge',
      logo: {
        '@type': 'ImageObject',
        url: 'https://surwahi.com/assets/logo.png'
      }
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: `https://surwahi.com/blog/${post.slug}`
  };
}
