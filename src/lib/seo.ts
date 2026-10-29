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
  exactTitle?: boolean;
}

export const defaultMeta = {
  title: 'Surwahi Social Ecoestate',
  description: 'Award-winning sustainable Bed & Breakfast near Kanha National Park, Madhya Pradesh — mud-built rooms, a dormitory and camping, run with the local community.',
  image: 'https://ik.imagekit.io/adonisarun/surwahi-logo.png?updatedAt=1761322022431',
  url: 'https://surwahi.com',
  siteName: 'Surwahi Social Ecoestate',
  locale: 'en_IN',
};

/** Single source of truth for NAP + geo used by every schema node. */
const SITE_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Village Surwahi, P.O. Majhgaon, Tehsil Paraswada, Khairlanji Ryt.',
  addressLocality: 'Balaghat',
  addressRegion: 'Madhya Pradesh',
  postalCode: '481111',
  addressCountry: 'IN',
} as const;

const SITE_GEO = { '@type': 'GeoCoordinates', latitude: 22.244025, longitude: 80.468707 } as const;

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

  const fullTitle = (config.exactTitle || title === defaultMeta.title) ? title : `${title} | ${defaultMeta.siteName}`;
  const fullUrl = url.startsWith('http') ? url : `${defaultMeta.url}${url}`;
  const fullImage = image.startsWith('http') ? image : `${defaultMeta.url}${image}`;

  const metadata: Metadata = {
    metadataBase: new URL(defaultMeta.url),
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
      alternateLocale: ['en_US', 'en_GB'],
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
      // English-only site: declare it for all English speakers (not just en-IN)
      // and as the default for every other locale.
      languages: { en: fullUrl, 'x-default': fullUrl },
    }
  };

  return metadata;
}

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  image?: string,
  keywords?: string[],
  exactTitle?: boolean
): Metadata {
  return generateMetadata({
    title,
    description,
    url: path,
    image,
    keywords,
    exactTitle,
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
  const enhancedDescription = `${description} From ₹${price.toLocaleString('en-IN')} + 18% GST, all meals included (APAI). Book your sustainable stay at Surwahi Social Ecoestate.`;

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
    name: 'Surwahi Social Ecoestate',
    url: 'https://surwahi.com/',
    logo: 'https://ik.imagekit.io/adonisarun/surwahi-logo.png?updatedAt=1761322022431',
    sameAs: [
      'https://www.facebook.com/surwahisocialecoestatekanha/',
      'https://www.instagram.com/surwahisocialecoestatekanha/',
      'https://in.linkedin.com/company/surwahisocialecoestatekanha'
    ],
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Village Surwahi, P.O. Majhgaon, Tehsil Paraswada, Khairlanji Ryt.',
      addressLocality: 'Balaghat',
      addressRegion: 'Madhya Pradesh',
      postalCode: '481111',
      addressCountry: 'IN'
    },
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: '+91-77952-07779',
      contactType: 'reservations',
      availableLanguage: ['English', 'Hindi']
    }]
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://surwahi.com/#website',
    url: 'https://surwahi.com/',
    name: 'Surwahi Social Ecoestate',
    publisher: { '@id': 'https://surwahi.com/#org' },
    inLanguage: 'en',
  };
}

export function generateLodgingBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BedAndBreakfast',
    '@id': 'https://surwahi.com/#lodging',
    name: 'Surwahi Social Ecoestate',
    url: 'https://surwahi.com/',
    description: 'Award-winning sustainable Bed & Breakfast about 21 km from Kanha National Park (Khatia Gate), offering mud-built rooms, a dormitory and camping in Balaghat, Madhya Pradesh.',
    image: [
      'https://ik.imagekit.io/adonisarun/WhatsApp%20Image%202025-10-24%20at%2019.36.22.jpeg?updatedAt=1761321841612'
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Solar power', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Rainwater harvesting', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Evapo-transpiration toilets', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Organic farm-to-table dining', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Natural swimming pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi (common areas)', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Pet friendly', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Family friendly', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'EV charging', value: true }
    ],
    address: SITE_ADDRESS,
    geo: SITE_GEO,
    sameAs: [
      'https://www.facebook.com/surwahisocialecoestatekanha/',
      'https://www.instagram.com/surwahisocialecoestatekanha/',
      'https://in.linkedin.com/company/surwahisocialecoestatekanha'
    ],
    availableLanguage: ['English', 'Hindi'],
    containedInPlace: { '@type': 'Place', name: 'Kanha Tiger Reserve buffer zone, Madhya Pradesh, India' },
    telephone: '+91-77952-07779',
    email: 'contact@surwahi.com',
    hasMap: 'https://www.google.com/maps/search/?api=1&query=22.244025,80.468707',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Bank Transfer',
    checkinTime: '14:00',
    checkoutTime: '11:00',
    award: [
      'TOFTigers - Most Inspirational Eco Lodge 2024',
      'AEN International Ecotourism Award 2025 (Sustainable Building)',
      'Madhya Pradesh Tourism Board - Best B&B Unit 2024-25',
      'Booking.com Traveller Review Award (2023-2026)',
      'ICRT India Responsible Tourism Awards 2023 (Silver)',
      'WTCA Best Eco Homestay Award 2024'
    ],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://surwahi.com/stay',
        inLanguage: 'en',
        actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform']
      },
      result: { '@type': 'LodgingReservation', name: 'Book your stay at Surwahi Social Ecoestate' }
    },
    petsAllowed: true,
    priceRange: '₹₹₹'
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
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: room.basePrice,
        priceCurrency: 'INR',
        unitText: 'per night, all meals included',
        valueAddedTaxIncluded: false
      },
      availability: 'https://schema.org/InStock',
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
    '@id': `https://surwahi.com/blogs/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    image: post.image ? toAbsoluteSiteUrl(post.image) : defaultMeta.image,
    inLanguage: 'en',
    // "Surwahi Team" is the org, not a person — don't mislabel it as a Person.
    author: /team$/i.test(post.author.trim())
      ? { '@id': 'https://surwahi.com/#org' }
      : { '@type': 'Person', name: post.author, url: 'https://surwahi.com/about/our-team' },
    publisher: { '@id': 'https://surwahi.com/#org' },
    about: { '@id': 'https://surwahi.com/#lodging' },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://surwahi.com/blogs/${post.slug}` }
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
  exactTitle?: boolean;
}) {
  const images = Array.isArray(attraction.image)
    ? attraction.image.map(toAbsoluteSiteUrl)
    : attraction.image
      ? [toAbsoluteSiteUrl(attraction.image)]
      : [defaultMeta.image];

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
    touristType: ['Eco tourists', 'Nature lovers', 'Wildlife enthusiasts', 'Families', 'International travellers'],
    address: SITE_ADDRESS,
    geo: SITE_GEO,
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
      : [defaultMeta.image];

  // Workshops that run on request have no real date. Marking them up as Event with
  // invented dates breaks Google's event guidelines (risk: structured-data manual action),
  // so they are described as a TouristTrip offered by the lodge instead.
  if (!event.startDate) {
    const trip: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      '@id': `${defaultMeta.url}${event.path}#trip`,
      name: event.name,
      description: event.description,
      url: `${defaultMeta.url}${event.path}`,
      image: images,
      touristType: ['Eco tourists', 'Nature lovers', 'Families', 'International travellers'],
      itinerary: { '@type': 'Place', name: defaultMeta.siteName, address: SITE_ADDRESS, geo: SITE_GEO },
      provider: { '@id': `${defaultMeta.url}/#org` },
    };
    if (event.offers?.length) {
      trip.offers = event.offers.map(offer => ({
        '@type': 'Offer', name: offer.name, price: offer.price, priceCurrency: offer.priceCurrency || 'INR', url: `${defaultMeta.url}${event.path}`,
      }));
    }
    return trip;
  }

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${defaultMeta.url}${event.path}#event`,
    name: event.name,
    description: event.description,
    url: `${defaultMeta.url}${event.path}`,
    image: images,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: { '@type': 'Place', name: defaultMeta.siteName, address: SITE_ADDRESS, geo: SITE_GEO },
    organizer: { '@id': `${defaultMeta.url}/#org` },
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
