// Live Google reviews via the Google Places API.
// Configure GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in the environment to enable.
// Tries Places API (New) first, then falls back to the legacy endpoint, so it works
// whichever API is enabled on the key. Google returns up to 5 reviews per place.

export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
}

export interface GoogleReviewsData {
  rating: number;
  total: number;
  reviews: GoogleReview[];
}

// ---- Places API (New): GET https://places.googleapis.com/v1/places/{id} ----
interface NewReview {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
  relativePublishTimeDescription?: string;
}
interface NewResponse {
  rating?: number;
  userRatingCount?: number;
  reviews?: NewReview[];
}

async function fetchNew(key: string, placeId: string): Promise<GoogleReviewsData | null> {
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
  const res = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
    },
    next: { revalidate: 86400 },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as NewResponse;
  if (!data || (data.rating === undefined && !data.reviews)) return null;
  return {
    rating: data.rating ?? 0,
    total: data.userRatingCount ?? 0,
    reviews: (data.reviews ?? []).map((rv) => ({
      author: rv.authorAttribution?.displayName ?? 'Google guest',
      rating: rv.rating ?? 0,
      text: rv.text?.text ?? rv.originalText?.text ?? '',
      relativeTime: rv.relativePublishTimeDescription ?? '',
    })),
  };
}

// ---- Legacy Places API: place/details/json ----
interface RawReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
}
interface RawResponse {
  status: string;
  result?: { rating?: number; user_ratings_total?: number; reviews?: RawReview[] };
}

async function fetchLegacy(key: string, placeId: string): Promise<GoogleReviewsData | null> {
  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${encodeURIComponent(placeId)}` +
    `&fields=rating,user_ratings_total,reviews&reviews_sort=newest&key=${encodeURIComponent(key)}`;
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) return null;
  const data = (await res.json()) as RawResponse;
  if (data.status !== 'OK' || !data.result) return null;
  const r = data.result;
  return {
    rating: r.rating ?? 0,
    total: r.user_ratings_total ?? 0,
    reviews: (r.reviews ?? []).map((rv) => ({
      author: rv.author_name,
      rating: rv.rating,
      text: rv.text,
      relativeTime: rv.relative_time_description,
    })),
  };
}

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const viaNew = await fetchNew(key, placeId);
    if (viaNew && viaNew.reviews.length > 0) return viaNew;
    const viaLegacy = await fetchLegacy(key, placeId);
    if (viaLegacy && viaLegacy.reviews.length > 0) return viaLegacy;
    // Return whichever gave us a rating even if no review text came back.
    return viaNew ?? viaLegacy;
  } catch {
    return null;
  }
}
