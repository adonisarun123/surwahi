import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import { can } from '@/lib/auth/permissions';
import RoomForm from './RoomForm';
import SeasonalRates from './SeasonalRates';
import { toIso, addDaysUtc, todayIst } from '@/lib/booking/dates';

export default async function EditRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser('rooms');
  const { id } = await params;
  const room = await prisma.accommodation.findUnique({ where: { id } }).catch(() => null);
  if (!room) notFound();
  const rules = await prisma.rateRule.findMany({ where: { accommodationId: id, endDate: { gte: addDaysUtc(todayIst(), -1) } }, orderBy: { startDate: 'asc' } });
  const recent = await prisma.auditLog.findMany({
    where: { entity: 'accommodation', entityId: id },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { user: { select: { name: true } } },
  });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <Link href="/admin/rooms" className="text-sm text-soil-700 hover:underline">← Rooms</Link>
          <h1 className="font-display text-3xl text-forest-900">{room.name}</h1>
        </div>
        <a href={`/stay/${room.slug}`} target="_blank" rel="noreferrer" className="text-sm text-forest-700 hover:underline">View on site ↗</a>
      </div>
      <RoomForm
        room={{ ...room, gstPercent: Number(room.gstPercent), policies: (room.policies ?? {}) as Record<string, string> }}
        canEditRates={can(user.role, 'rates')}
      />
      <SeasonalRates
        accommodationId={room.id}
        perPerson={room.pricingModel === 'PER_PERSON'}
        canEdit={can(user.role, 'rates')}
        rules={rules.map((r) => ({ id: r.id, name: r.name, from: toIso(r.startDate), to: toIso(r.endDate), basePrice: r.basePrice, extraAdultPrice: r.extraAdultPrice, minNights: r.minNights, priority: r.priority }))}
      />
      {recent.length > 0 && (
        <div className="text-xs text-soil-700">
          <div className="font-medium mb-1">Recent changes</div>
          <ul className="space-y-0.5">
            {recent.map((r) => (
              <li key={r.id}>{r.createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} · {r.user?.name ?? 'system'} · {r.action.replace(/_/g, ' ')}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
