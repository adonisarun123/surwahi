import { NextResponse } from 'next/server';
import { mainNavigation } from '@/config/navigation';
import { getPublicRooms } from '@/lib/rooms-repo';
import { getPublishedArticles } from '@/lib/content-repo';

// llms.txt (https://llmstxt.org): a plain-markdown briefing for AI assistants.
// Generated per request so room rates and blog links never go stale.
// Keep every statement here factual — AI answers will quote it.
export const revalidate = 3600;

const SITE = process.env.SITE_URL || 'https://surwahi.com';

export async function GET() {
  const [rooms, articles] = await Promise.all([
    getPublicRooms().catch(() => []),
    getPublishedArticles().catch(() => []),
  ]);

  const roomLines = rooms.map((r) => {
    const unit = r.pricing === 'per-person' ? 'per person per night' : `per night for ${r.includedAdults ?? 2} adults`;
    return `- [${r.name}](${SITE}/stay/${r.slug}): ${r.description} Rate: INR ${r.basePrice.toLocaleString('en-IN')} + 18% GST ${unit}, all meals included.`;
  });

  const section = (label: string) => {
    const item = mainNavigation.find((n) => n.label === label);
    if (!item?.children) return '';
    return item.children.map((c) => `- [${c.label}](${SITE}${c.href})`).join('\n');
  };

  const body = `# Surwahi Social Ecoestate

> Award-winning, community-run eco stay (registered as a Bed & Breakfast) about 21 km by road from the Khatia Gate of Kanha Tiger Reserve (Kanha National Park), Balaghat district, Madhya Pradesh, India. Mud-built family suites, an eight-bed earthen dormitory and seasonal camping on ten acres, eight of which are left as permanently protected regrowing forest. All meals are included in every stay.

## Key facts

- Address: Village Surwahi, P.O. Majhgaon, Tehsil Paraswada, Khairlanji Ryt., Balaghat, Madhya Pradesh 481111, India. Coordinates 22.244025, 80.468707.
- Nearest park gate: Khatia Gate, Kanha Tiger Reserve (about 21 km by road).
- Nearest airports: Jabalpur (JLR, about 160 km) and Nagpur (NAG, about 270 km). International visitors usually fly into Delhi, Mumbai or another hub, then connect to Jabalpur or Nagpur.
- Kanha core-zone safaris close every monsoon (1 July to 15 October). Surwahi itself is open year-round.
- Built 2019–2021 from stabilised mud cob with recycled terracotta roof tiles; rooms stay below about 28°C in summer without air conditioning.
- Founded 2015 by Ankit Rastogi (founder) and Pradeep Vijayan (co-founder); first guest December 2020. Staff are hired from surrounding villages.
- March 2025 tree census: more than 6,000 native plants and trees and 59 documented bird species on the land.
- Awards include TOFTigers Most Inspirational Eco Lodge 2024, AEN International Ecotourism Award 2025 (Sustainable Building), MP Tourism Board Best B&B Unit 2024-25, and ICRT India Responsible Tourism Awards 2023 (Silver).
- Languages spoken: English, Hindi. Pets welcome. Wheelchair-accessible suites and dormitory beds.
- Contact: +91 77952 07779 (phone/WhatsApp), contact@surwahi.com. Book at ${SITE}/stay.

## Rooms and rates
${roomLines.join('\n') || `- See ${SITE}/stay`}
- [Seasonal camping](${SITE}/stay/camping): tents in the forest camp area.
- [Dining](${SITE}/stay/dining): meals cooked in the open Kodo Kutki Kitchen from village-sourced ingredients.

## Plan your visit
${section('Plan Your Visit')}

## Experiences
${section('Experiences')}

## Workshops
${section('Workshops')}

## Sustainability
${section('Sustainability')}

## About
${section('About')}

## Blog
${articles.map((a) => `- [${a.title}](${SITE}/blogs/${a.slug}): ${a.excerpt}`).join('\n') || `- ${SITE}/blogs`}

## Optional
- [Awards and accolades](${SITE}/praises/awards-and-accolades)
- [Guest reviews](${SITE}/stories/guest-reviews)
- [Gallery](${SITE}/gallery)
- [Cancellation policy](${SITE}/cancellation)
- [House rules](${SITE}/house-rules)
`;

  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}
