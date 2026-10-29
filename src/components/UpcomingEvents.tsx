import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

type Ev = { id: string; title: string; summary: string; startDate: Date; endDate: Date; linkPath: string | null; priceText: string | null };

const fmt = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' });

export default function UpcomingEvents({ events }: { events: Ev[] }) {
  return (
    <section className="bg-forest-900 text-bone-0 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl mb-6 flex items-center gap-2"><CalendarDays className="h-6 w-6" /> Upcoming at Surwahi</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {events.map((e) => {
            const body = (
              <div className="h-full rounded-card bg-white/10 p-5 hover:bg-white/15 transition">
                <div className="text-sm text-fern-300 font-medium">{fmt(e.startDate)}{e.endDate > e.startDate ? ` – ${fmt(e.endDate)}` : ''} {e.startDate.getUTCFullYear()}</div>
                <div className="font-display text-xl mt-1">{e.title}</div>
                <p className="text-sm text-bone-0/80 mt-2">{e.summary}</p>
                {e.priceText && <p className="text-sm font-medium mt-3">{e.priceText}</p>}
              </div>
            );
            return e.linkPath ? <Link key={e.id} href={e.linkPath}>{body}</Link> : <div key={e.id}>{body}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
