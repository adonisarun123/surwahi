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
  keywords?: string[];
}

export const defaultMeta = {
  title: 'Surwahi Eco-Lodge',
  description: 'Eco-lodge offering sustainable stays near the forest. Experience regenerative hospitality in harmony with nature.',
  image: '/images/og-default.jpg',
  url: 'https://surwahi.com',
  siteName: 'Surwahi Eco-Lodge',
  locale: 'en_IN',
};

/** Absolute URL for Open Graph / JSON-LD (handles ImageKit and other absolute URLs). */
export function toAbsoluteSiteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('https://') || pathOrUrl.startsWith('http://')) {
    return pathOrUrl;
  }
  const base = defaultMeta.url.replace(/\/$/, '');
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}

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
    keywords,
  } = config;

  const fullTitle = title === defaultMeta.title ? title : `${title} | ${defaultMeta.siteName}`;
  const fullUrl = url.startsWith('http') ? url : `${defaultMeta.url}${url}`;
  const fullImage = image.startsWith('http') ? image : `${defaultMeta.url}${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords?.join(', ') || tags?.join(', '),
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
    }
  };

  return metadata;
}

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  image?: string,
  keywords?: string[]
): Metadata {
  return generateMetadata({
    title,
    description,
    url: path,
    image,
    keywords,
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
  image?: string,
  keywords?: string[]
): Metadata {
  return generateMetadata({
    title,
    description,
    url: `/blogs/${slug}`,
    type: 'article',
    publishedTime,
    modifiedTime,
    authors,
    tags,
    image: image ? toAbsoluteSiteUrl(image) : undefined,
    keywords: keywords || tags,
  });
}

export function generateRoomMetadata(
  roomName: string,
  description: string,
  slug: string,
  price: number,
  image?: string,
  keywords?: string[]
): Metadata {
  const title = `${roomName} - Book Your Stay`;
  const enhancedDescription = `${description} Starting from ₹${price.toLocaleString('en-IN')} per night. Book your sustainable stay at Surwahi Eco-Lodge.`;

  return generateMetadata({
    title,
    description: enhancedDescription,
    url: `/stay/${slug}`,
    image: image ? toAbsoluteSiteUrl(image) : undefined,
    keywords,
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
      telephone: '+91-77952-07779',
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
    telephone: '+91-77952-07779',
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
    '@id': `https://surwahi.com/stay/${room.slug}#room`,
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
      url: `https://surwahi.com/stay/${room.slug}#book`
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
    image: post.image
      ? toAbsoluteSiteUrl(post.image)
      : `https://surwahi.com/images/blog/${post.slug}.jpg`,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://surwahi.com/about/our-team',
    },
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
    mainEntityOfPage: `https://surwahi.com/blogs/${post.slug}`
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateTouristAttractionSchema(attraction: {
  name: string;
  description: string;
  path: string;
  image?: string | string[];
  keywords?: string[];
}) {
  const images = Array.isArray(attraction.image)
    ? attraction.image.map(toAbsoluteSiteUrl)
    : attraction.image
      ? [toAbsoluteSiteUrl(attraction.image)]
      : [`${defaultMeta.url}/images/og-default.jpg`];

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${defaultMeta.url}${attraction.path}#attraction`,
    name: attraction.name,
    description: attraction.description,
    url: `${defaultMeta.url}${attraction.path}`,
    image: images,
    keywords: attraction.keywords?.join(', '),
    isAccessibleForFree: false,
    touristType: ['Eco tourists', 'Nature lovers', 'Wildlife enthusiasts', 'Families'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Near Kanha National Park',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.3344,
      longitude: 80.6115,
    },
    isPartOf: { '@id': `${defaultMeta.url}/#lodging` },
    provider: { '@id': `${defaultMeta.url}/#org` },
  };
}

export function generateEventSchema(event: {
  name: string;
  description: string;
  path: string;
  image?: string | string[];
  startDate?: string;
  endDate?: string;
  recurring?: boolean;
  offers?: Array<{ name?: string; price: string; priceCurrency?: string }>;
}) {
  const images = Array.isArray(event.image)
    ? event.image.map(toAbsoluteSiteUrl)
    : event.image
      ? [toAbsoluteSiteUrl(event.image)]
      : [`${defaultMeta.url}/images/og-default.jpg`];

  // For recurring workshops without a fixed date, use a forward-looking date
  // so the schema validates while still signalling availability.
  const today = new Date();
  const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
  const fallbackStart = today.toISOString().split('T')[0];
  const fallbackEnd = nextYear.toISOString().split('T')[0];

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${defaultMeta.url}${event.path}#event`,
    name: event.name,
    description: event.description,
    url: `${defaultMeta.url}${event.path}`,
    image: images,
    startDate: event.startDate || fallbackStart,
    endDate: event.endDate || (event.recurring ? fallbackEnd : event.startDate || fallbackStart),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'Surwahi Social Eco Estate',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Near Kanha National Park',
        addressRegion: 'Madhya Pradesh',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 22.3344,
        longitude: 80.6115,
      },
    },
    organizer: {
      '@type': 'Organization',
      '@id': `${defaultMeta.url}/#org`,
      name: defaultMeta.siteName,
      url: defaultMeta.url + '/',
    },
  };

  if (event.offers?.length) {
    schema.offers = event.offers.map(offer => ({
      '@type': 'Offer',
      name: offer.name,
      price: offer.price,
      priceCurrency: offer.priceCurrency || 'INR',
      availability: 'https://schema.org/InStock',
      url: `${defaultMeta.url}${event.path}`,
    }));
  }

  return schema;
}
