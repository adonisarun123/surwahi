import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import { Badge, Card } from '@/components/admin/ui';
import { formatDateIn, toIso, todayIst } from '@/lib/booking/dates';
import { EventForm, DeleteButton } from '../ItemForms';
import { deleteEvent } from '../../../_actions/content';

export default async function EventsAdmin() {
  await requireUser('content');
  const events = await prisma.event.findMany({ orderBy: { startDate: 'desc' } });
  const today = todayIst();
  return (
    <div className="space-y-6">
      <div><Link href="/admin/content" className="text-sm text-soil-700 hover:underline">← Content</Link><h1 className="font-display text-3xl text-forest-900">Events &amp; retreats</h1>
        <p className="text-sm text-soil-700">Upcoming events appear in an &quot;Upcoming at Surwahi&quot; strip on the homepage. Recurring workshop timings are on each workshop page.</p></div>
      <Card title="Add an event"><EventForm ev={{ id: null, title: '', summary: '', startDate: '', endDate: '', linkPath: '', priceText: '', imageUrl: '', isPublished: true }} /></Card>
      <Card title="All events">
        <div className="divide-y divide-mist-200">
          {events.map((e) => (
            <details key={e.id} className="py-2 group">
              <summary className="cursor-pointer list-none flex flex-wrap items-center justify-between gap-2 text-sm">
                <span><b>{e.title}</b> · {formatDateIn(e.startDate)} – {formatDateIn(e.endDate)}</span>
                <span className="flex gap-2">{e.endDate < today ? <Badge>Past</Badge> : <Badge tone="green">Upcoming</Badge>}{!e.isPublished && <Badge tone="red">Hidden</Badge>}</span>
              </summary>
              <div className="pt-3 space-y-2">
                <EventForm ev={{ id: e.id, title: e.title, summary: e.summary, startDate: toIso(e.startDate), endDate: toIso(e.endDate), linkPath: e.linkPath ?? '', priceText: e.priceText ?? '', imageUrl: e.imageUrl ?? '', isPublished: e.isPublished }} />
                <DeleteButton action={deleteEvent.bind(null, e.id)} label="Delete event" />
              </div>
            </details>
          ))}
          {events.length === 0 && <p className="text-sm text-soil-700">No events.</p>}
        </div>
      </Card>
    </div>
  );
}
