import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import { todayIst } from '@/lib/booking/dates';

export default async function ContentHub() {
  await requireUser('content');
  const [posts, drafts, faqs, events] = await Promise.all([
    prisma.article.count({ where: { status: 'PUBLISHED' } }),
    prisma.article.count({ where: { status: 'DRAFT' } }),
    prisma.faq.count({ where: { isPublished: true } }),
    prisma.event.count({ where: { endDate: { gte: todayIst() }, isPublished: true } }),
  ]);
  const cards = [
    { href: '/admin/content/blog', title: 'Blog', text: `${posts} published · ${drafts} draft${drafts === 1 ? '' : 's'}` },
    { href: '/admin/content/faqs', title: 'FAQs', text: `${faqs} live questions` },
    { href: '/admin/content/events', title: 'Events & retreats', text: events ? `${events} upcoming` : 'No upcoming events' },
    { href: '/admin/content/homepage', title: 'Homepage, announcement & videos', text: 'Hero text, top banner, gallery videos' },
    { href: '/admin/photos', title: 'Photos & gallery', text: 'Upload, describe, choose what the gallery shows' },
  ];
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-forest-900">Content</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="block bg-white rounded-xl border border-mist-200 p-5 hover:shadow-md">
            <div className="font-semibold text-forest-900">{c.title}</div>
            <div className="text-sm text-soil-700 mt-1">{c.text}</div>
          </Link>
        ))}
      </div>
      <p className="text-xs text-soil-700">Page text such as About, Experiences and Workshops still lives in the website code. Ask your developer for changes there.</p>
    </div>
  );
}
