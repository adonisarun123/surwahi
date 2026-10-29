import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import { Badge, Card } from '@/components/admin/ui';
import { FaqForm, DeleteButton } from '../ItemForms';
import { deleteFaq } from '../../../_actions/content';

export default async function FaqsAdmin() {
  await requireUser('content');
  const faqs = await prisma.faq.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] });
  const categories = Array.from(new Set(faqs.map((f) => f.category)));
  const next = (faqs.at(-1)?.sortOrder ?? 0) + 10;
  return (
    <div className="space-y-6">
      <div><Link href="/admin/content" className="text-sm text-soil-700 hover:underline">← Content</Link><h1 className="font-display text-3xl text-forest-900">FAQs</h1>
        <p className="text-sm text-soil-700">Shown on <a className="underline" href="/plan-your-visit/faqs" target="_blank" rel="noreferrer">Plan your visit → FAQs</a> and in Google&apos;s FAQ results.</p></div>
      {categories.map((cat) => (
        <Card key={cat} title={cat}>
          <div className="divide-y divide-mist-200">
            {faqs.filter((f) => f.category === cat).map((f) => (
              <details key={f.id} className="py-2 group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{f.question}</span>
                  <span className="flex items-center gap-2 shrink-0">{!f.isPublished && <Badge>Hidden</Badge>}<span className="text-xs text-forest-700 group-open:hidden">Edit</span></span>
                </summary>
                <div className="pt-3 space-y-2">
                  <FaqForm faq={{ id: f.id, category: f.category, question: f.question, answer: f.answer, sortOrder: f.sortOrder, isPublished: f.isPublished }} categories={categories} />
                  <DeleteButton action={deleteFaq.bind(null, f.id)} label="Delete this FAQ" />
                </div>
              </details>
            ))}
          </div>
        </Card>
      ))}
      <Card title="Add a question">
        <FaqForm faq={{ id: null, category: categories[0] ?? '', question: '', answer: '', sortOrder: next, isPublished: true }} categories={categories} />
      </Card>
    </div>
  );
}
