// Live Google reviews via the Google Places API.
// Configure GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in the environment to enable.
// Google returns up to 5 reviews per place; results are cached for 24h.

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

interface RawReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

interface RawResponse {
  status: string;
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: RawReview[];
  };
}

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${encodeURIComponent(placeId)}` +
      `&fields=rating,user_ratings_total,reviews` +
      `&reviews_sort=newest&key=${encodeURIComponent(key)}`;

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
  } catch {
    return null;
  }
}
