import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Prose from '@/components/Prose';
import FAQList from '@/components/FAQList';
import JsonLd from '@/components/schema/JsonLd';
import { generateFAQSchema } from '@/lib/seo';

export interface GuideFaq { question: string; answer: string }

interface GuidePageProps {
  title: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  md: string;
  faqs?: GuideFaq[];
  /** Extra schema nodes (TouristTrip, TouristAttraction, Article...). */
  schema?: Record<string, unknown>[];
  related?: Array<{ label: string; href: string }>;
  ctaTitle?: string;
  ctaText?: string;
}

const WHATSAPP = `https://wa.me/917795207779?text=${encodeURIComponent("Hi Surwahi, I'd like to plan a stay and safari near Kanha.")}`;

export default function GuidePage({
  title, subtitle, heroImage, heroAlt, md, faqs = [], schema = [], related = [],
  ctaTitle = 'Plan your Kanha stay with us',
  ctaText = 'Tell us your dates, group size and the safaris you would like. We reply with availability, a full quote and help with safari permits and transfers.',
}: GuidePageProps) {
  // BreadcrumbList JSON-LD is already emitted by <Breadcrumbs /> - don't duplicate it here.
  const nodes: Record<string, unknown>[] = [...schema];
  if (faqs.length) nodes.push(generateFAQSchema(faqs));

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs />
      </div>
      <section className="relative min-h-[48vh] flex items-end overflow-hidden">
        <Image src={heroImage} alt={heroAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/60 to-forest-900/25" aria-hidden="true"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <div className="max-w-3xl">
            <h1 className="font-display text-display-xl text-bone-0 mb-4 drop-shadow-lg">{title}</h1>
            <p className="text-body-lg text-bone-0/90 max-w-2xl drop-shadow">{subtitle}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/contact" className="inline-block bg-clay-500 hover:bg-clay-600 text-white px-6 py-3 rounded-full font-medium">Check availability</Link>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-block bg-white/15 hover:bg-white/25 text-white border border-white/40 px-6 py-3 rounded-full font-medium">WhatsApp +91 77952 07779</a>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <article className="max-w-3xl mx-auto">
          <Prose md={md} />

          {faqs.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-2xl md:text-3xl text-forest-900 mb-6">Frequently asked questions</h2>
              <FAQList items={faqs} />
            </section>
          )}

          {related.length > 0 && (
            <nav aria-label="Related guides" className="mt-14 p-6 bg-sand-50 rounded-2xl border border-sand-200">
              <h2 className="font-display text-xl text-forest-900 mb-3">Keep planning</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {related.map((r) => (
                  <li key={r.href}><Link href={r.href} className="text-clay-600 underline underline-offset-2 hover:text-clay-500">{r.label}</Link></li>
                ))}
              </ul>
            </nav>
          )}
        </article>
      </div>

      <section className="py-16 bg-forest-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl mb-4">{ctaTitle}</h2>
          <p className="text-lg text-sand-100 mb-8 font-light">{ctaText}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-block bg-moss-500 hover:bg-moss-600 text-white px-8 py-3 rounded-full font-medium">Send an enquiry</Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-block border border-white/50 hover:bg-white/10 text-white px-8 py-3 rounded-full font-medium">Chat on WhatsApp</a>
            <Link href="/stay" className="inline-block border border-white/50 hover:bg-white/10 text-white px-8 py-3 rounded-full font-medium">See rooms</Link>
          </div>
        </div>
      </section>

      <JsonLd schema={nodes} />
    </div>
  );
}
