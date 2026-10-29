import { getImageKitUrl } from './images';

/**
 * Real inventory: two family suites (Jholar, Kariwah) and one dormitory (Maikal Express).
 * Descriptions use only facts stated elsewhere on the site (stay page, our-story, lodge-and-philosophy).
 * Prices are PRE-GST tariffs; GST is added on top. Plan: APAI (all meals included).
 */

export const GST_RATE = 0.18;
export const MEAL_PLAN = 'APAI - all meals included';

export type RoomCategory = 'Suites' | 'Dormitory';

export interface Room {
  id: string;
  name: string;
  slug: string;
  category: RoomCategory;
  description: string;
  longDescription: string;
  images: { url: string; alt: string; caption: string }[];
  /** Pre-GST tariff per night. Suites: for 2 adults. Dormitory: per person. */
  basePrice: number;
  pricing: 'double-occupancy' | 'per-person';
  /** Pre-GST tariff per extra adult per night (suites only). */
  extraAdultPrice?: number;
  /** Adults covered by basePrice (suites). */
  includedAdults?: number;
  maxOccupancy: number;
  bedConfiguration: string;
  size?: string;
  view: string;
  amenities: string[];
  ecoFeatures: string[];
  included: string[];
  accessibility: string[];
  location: string;
  policies: { pets: string; extraBed: string; children: string };
  keywords: string[];
}

const suiteEcoFeatures = [
  'Thick mud-cob walls keep the room below 28°C without air conditioning',
  'Roof insulated with terracotta tiles reused from village homes',
  'Shaded by a regrown forest of 6,000 trees',
  'Naturally lit washroom - open sky visible from the shower',
];

const included = [
  `Meal plan: ${MEAL_PLAN} (breakfast, lunch and dinner)`,
  'Meals cooked fresh in the open Kodo Kutki Kitchen from village-sourced ingredients',
  'Satkon dining hall, Chandra Taal earthen plunge pool and the bonfire grove',
  'Play@Surwahi, the Halon Tower terrace and eight acres of regrown forest',
];

const suiteImages = {
  bed: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Bed_Portrait.JPG'),
  mezzanine: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Couch_Bed_Mezzanine_from_Entrance_Landscape.JPG'),
  washroom: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Washroom.JPG'),
  fullView: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Full_Suite_view_from_mezzanine_landscape (2) - Copy.JPG'),
  interior: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Room_Interior.JPG'),
  almirah: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Bed_Almirah_from_Couch_Landscape.JPG'),
  workTable: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Work_Table_Couch_from_Bed_Portrait.JPG'),
};

function familySuite(id: string, name: string, slug: string, images: Room['images'], extraKeywords: string[]): Room {
  return {
    id,
    name,
    slug,
    category: 'Suites',
    description: `${name} is one of our two family suites - a king bed, a mezzanine that sleeps two, a permanent extra bed and room for up to six.`,
    longDescription: `${name} carries the name of one of the two villages relocated out of Kanha National Park in the 1970s when the reserve was formed. We named our suites deliberately, so their memory lives in daily use.

The suite is built around a family: a permanent king bed, a mezzanine floor that works as a balcony or sleeping space for two, a permanent extra bed, and deep window sills where six adults can comfortably sit with their evening tea.

The washroom is wide, wheelchair-friendly and naturally lit - stand in the shower and you can see open sky. There is no air conditioning, on purpose: the mud walls keep the room cool when Kanha crosses 40°C outside.`,
    images,
    basePrice: 10800,
    pricing: 'double-occupancy',
    extraAdultPrice: 4000,
    includedAdults: 2,
    maxOccupancy: 6,
    bedConfiguration: 'King bed + mezzanine (sleeps 2) + extra bed',
    view: 'Regrown forest',
    amenities: [
      'Permanent king bed',
      'Mezzanine floor - balcony or sleeping space for two',
      'Permanent extra bed',
      'Deep window sills that seat six',
      'Wide, naturally lit washroom',
    ],
    ecoFeatures: suiteEcoFeatures,
    included,
    accessibility: ['Wheelchair-friendly washroom', 'Wide washroom door'],
    location: 'Family Suites',
    policies: {
      pets: 'Pet friendly - tell us when you book',
      extraBed: 'Extra adult: ₹4,000 + 18% GST per night, all meals included',
      children: 'Kid friendly - children\'s rates confirmed at booking',
    },
    keywords: ['family suite Kanha', 'family stay Kanha National Park', 'wheelchair accessible stay Kanha', ...extraKeywords],
  };
}

export const rooms: Record<string, Room> = {
  jholar: familySuite(
    '1',
    'Jholar',
    'jholar',
    [
      { url: suiteImages.bed, alt: 'King bed in the Jholar family suite', caption: 'The permanent king bed' },
      { url: suiteImages.mezzanine, alt: 'Mezzanine and couch seen from the entrance of Jholar', caption: 'The mezzanine sleeps two' },
      { url: suiteImages.washroom, alt: 'Wide, naturally lit washroom in Jholar', caption: 'Open sky from the shower' },
      { url: suiteImages.fullView, alt: 'Jholar suite seen from the mezzanine', caption: 'The suite from the mezzanine' },
    ],
    ['Jholar suite Surwahi']
  ),
  kariwah: familySuite(
    '2',
    'Kariwah',
    'kariwah',
    // TODO: replace with Kariwah's own photos - these show Jholar, which shares the same layout
    [
      { url: suiteImages.interior, alt: 'Family suite interior at Surwahi (Jholar shown - Kariwah shares the layout)', caption: 'Same layout as Jholar' },
      { url: suiteImages.almirah, alt: 'King bed and almirah in a Surwahi family suite', caption: 'King bed and storage' },
      { url: suiteImages.workTable, alt: 'Work table and couch in a Surwahi family suite', caption: 'Work table and couch' },
      { url: suiteImages.washroom, alt: 'Wide, naturally lit family suite washroom', caption: 'Open sky from the shower' },
    ],
    ['Kariwah suite Surwahi']
  ),
  'maikal-express': {
    id: '3',
    name: 'Maikal Express',
    slug: 'maikal-express',
    category: 'Dormitory',
    description: 'Our earthen dormitory, designed like a luxurious train coach - eight beds, each with its own window, reading light and charging sockets.',
    longDescription: `Named after the Maikal hills that define this landscape, and designed like a luxurious train coach - because co-living should feel like an adventure, not a compromise. Roughly 600 sq ft across three sections: the bunk space, a utility area we call the Quarter Dome, and two washrooms.

Eight permanent beds sit under a 14-foot ceiling. Five lower beds are just 1.5 feet high - two of them completely encumbrance-free for wheelchair users - and three upper berths are reached by wooden ladders with side rails. Every bed gets two charging sockets, an LED reading light, its own moulded wooden window with green views, cotton mattresses and thick quilts, and a private rolling drawer.

The Quarter Dome, crowned by an ironless brick roof with a skylight, holds the shared amenities. The two washrooms have vaulted masonry roofs, rain showers and hot water from wood-fired boilers running on our own forest biomass; the wider one is fully wheelchair-accessible. Also bookable on an exclusive basis for private groups.`,
    images: [
      { url: getImageKitUrl('Surwahi Social Photos/Dormitory/Maikal_full_length_Landscape_1 - Copy.JPG'), alt: 'Full length of the Maikal Express dormitory', caption: 'Eight beds under a 14-foot ceiling' },
      { url: getImageKitUrl('Surwahi Social Photos/Dormitory/Maikal_Bunk_Beds_with_Open_Window - Copy.JPG'), alt: 'Maikal Express bunk beds with their own windows', caption: 'Every bed has its own window' },
      { url: getImageKitUrl('Surwahi Social Photos/Dormitory/Maikal_Quarter_Dome_1.JPG'), alt: 'The brick Quarter Dome in Maikal Express', caption: 'The Quarter Dome' },
    ],
    basePrice: 4000,
    pricing: 'per-person',
    maxOccupancy: 8,
    bedConfiguration: '8 beds (5 lower, 3 upper berths)',
    size: '~600 sq ft',
    view: 'Green views from every bed',
    amenities: [
      'Two charging sockets and an LED reading light per bed',
      'Personal wooden window per bed',
      'Private rolling drawer per bed',
      'Wash basin, kettle, iron and mini fridge',
      'Electronic safe and wardrobe',
      'Tea and coffee',
      'Two washrooms with rain showers',
    ],
    ecoFeatures: [
      'Mud-cob walls - no air conditioning needed',
      'Ironless brick quarter-dome roof with skylight',
      'Hot water from wood-fired boilers on estate biomass',
      'Terracotta roof tiles reused from village homes',
    ],
    included,
    accessibility: ['Two encumbrance-free lower beds for wheelchair users', 'Fully wheelchair-accessible washroom with grab bars'],
    location: 'Maikal Express Dormitory',
    policies: {
      pets: 'Pet friendly - tell us when you book',
      extraBed: 'Bookable on an exclusive, non-sharing basis for private groups',
      children: 'Families welcome - priced per person',
    },
    keywords: ['dormitory near Kanha', 'hostel near Kanha National Park', 'budget stay Kanha', 'wildlife hostel India', 'Maikal Express Surwahi'],
  },
};

/** "₹10,800 + 18% GST" */
export function priceWithGstLabel(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')} + 18% GST`;
}

/** "per night · 2 adults" / "per person per night" */
export function priceBasisLabel(room: Room): string {
  return room.pricing === 'per-person' ? 'per person per night' : `per night · ${room.includedAdults ?? 2} adults`;
}

export interface StayQuote {
  nights: number;
  lines: { label: string; amount: number }[];
  subtotal: number;
  gst: number;
  total: number;
  note?: string;
}

/** Pre-GST subtotal + 18% GST. Children are not priced for suites (confirmed at booking). */
export function quoteStay(room: Room, adults: number, children: number, nights: number): StayQuote {
  const lines: StayQuote['lines'] = [];
  let note: string | undefined;

  if (room.pricing === 'per-person') {
    const people = adults + children;
    lines.push({ label: `${priceWithGstLabel(room.basePrice).split(' +')[0]} × ${people} guest${people !== 1 ? 's' : ''} × ${nights} night${nights !== 1 ? 's' : ''}`, amount: room.basePrice * people * nights });
  } else {
    const included = room.includedAdults ?? 2;
    lines.push({ label: `Suite (${included} adults) × ${nights} night${nights !== 1 ? 's' : ''}`, amount: room.basePrice * nights });
    const extra = Math.max(0, adults - included);
    if (extra > 0 && room.extraAdultPrice) {
      lines.push({ label: `Extra adult × ${extra} × ${nights} night${nights !== 1 ? 's' : ''}`, amount: room.extraAdultPrice * extra * nights });
    }
    if (children > 0) note = 'Children\'s rates are confirmed at booking.';
  }

  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const gst = Math.round(subtotal * GST_RATE);
  return { nights, lines, subtotal, gst, total: subtotal + gst, note };
}

