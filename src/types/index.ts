// Database types (matching Prisma schema)
export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  bedType: string;
  maxOccupancy: number;
  basePrice: number;
  size?: string;
  view?: string;
  images: ImageObject[];
  amenities: string[];
  policies?: Record<string, unknown>;
  isActive: boolean;
  sortOrder: number;
  ecoFeatures: string[];
  accessibility: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  totalPrice: number;
  status: BookingStatus;
  specialRequests?: string;
  source?: string;
  roomId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  message: string;
  inquiryType: ContactType;
  preferredDates?: string;
  partySize?: number;
  status: FormStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ContactType {
  GENERAL = 'GENERAL',
  BOOKING = 'BOOKING',
  SUSTAINABILITY = 'SUSTAINABILITY',
  ACTIVITIES = 'ACTIVITIES',
  PRESS = 'PRESS'
}

export enum FormStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  SPAM = 'SPAM'
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: ImageObject;
  author: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  readingTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: ActivityCategory;
  duration: string;
  difficulty: DifficultyLevel;
  price?: number;
  included: string[];
  toBring: string[];
  images: ImageObject[];
  isActive: boolean;
  bestSeason?: string;
  maxParticipants?: number;
  ecoRating?: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum ActivityCategory {
  NATURE_WALKS = 'NATURE_WALKS',
  SAFARIS = 'SAFARIS',
  CULTURAL = 'CULTURAL',
  WELLNESS = 'WELLNESS',
  ADVENTURE = 'ADVENTURE'
}

export enum DifficultyLevel {
  EASY = 'EASY',
  MODERATE = 'MODERATE',
  CHALLENGING = 'CHALLENGING'
}

export interface Review {
  id: string;
  guestName: string;
  rating: number;
  title?: string;
  content: string;
  isPublished: boolean;
  source?: string;
  stayDate?: Date;
  roomId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SustainabilityMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  description?: string;
  category: SustainabilityCategory;
  period: string;
  lastUpdated: Date;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum SustainabilityCategory {
  WATER = 'WATER',
  ENERGY = 'ENERGY',
  WASTE = 'WASTE',
  COMMUNITY = 'COMMUNITY',
  BIODIVERSITY = 'BIODIVERSITY',
  CARBON = 'CARBON'
}

export interface Itinerary {
  id: string;
  fromCity: string;
  toDestination: string;
  title: string;
  description: string;
  mode: TravelMode;
  steps: TravelStep[];
  duration: string;
  estimatedCost: string;
  co2Emissions?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum TravelMode {
  AIR = 'AIR',
  RAIL = 'RAIL',
  ROAD = 'ROAD',
  MIXED = 'MIXED'
}

export interface TravelStep {
  id: string;
  type: string; // 'flight', 'train', 'bus', 'taxi'
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  provider?: string;
  price?: string;
  notes?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  altText: string;
  caption?: string;
  category: string;
  season?: string;
  photographer?: string;
  location?: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

// UI Component Types
export interface ImageObject {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
  description?: string;
  icon?: string;
}

export interface Breadcrumb {
  name: string;
  href: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface SearchFilters {
  checkIn?: Date;
  checkOut?: Date;
  adults?: number;
  children?: number;
  priceRange?: [number, number];
  amenities?: string[];
  view?: string;
  bedType?: string;
  accessibility?: boolean;
}

export interface BookingFormData {
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  message: string;
  inquiryType: ContactType;
  preferredDates?: string;
  partySize?: number;
}

export interface NewsletterFormData {
  email: string;
  source?: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  error?: string;
  message?: string;
  data: {
    items: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

// Search and Filter Types
export interface SearchParams {
  query?: string;
  category?: string;
  tags?: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface RoomFilters extends SearchParams {
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  view?: string;
  bedType?: string;
  accessibility?: boolean;
}

export interface ActivityFilters extends SearchParams {
  category?: ActivityCategory;
  difficulty?: DifficultyLevel;
  duration?: string;
  season?: string;
  maxPrice?: number;
}

// Site Configuration Types
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

// Analytics Types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Form Validation Types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface FormTouched {
  [key: string]: boolean | undefined;
}

// Utility Types
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
