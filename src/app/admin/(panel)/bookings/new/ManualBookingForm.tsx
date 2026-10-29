'use client';

import { useActionState, useState } from 'react';
import { createManualBooking } from '../../../_actions/bookings';
import { Card, Field, Notice, SubmitButton, inputCls } from '@/components/admin/ui';

type RoomOpt = { id: string; name: string; maxOccupancy: number; category: string };

export default function ManualBookingForm({ rooms }: { rooms: RoomOpt[] }) {
  const [state, action] = useActionState(createManualBooking, undefined);
  const [roomId, setRoomId] = useState(rooms[0]?.id ?? '');
  const [status, setStatus] = useState('CONFIRMED');
  const room = rooms.find((r) => r.id === roomId);
  return (
    <form action={action} className="space-y-6">
      <Notice state={state} />
      <Card title="Stay">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Room">
            <select name="accommodationId" value={roomId} onChange={(e) => setRoomId(e.target.value)} className={inputCls}>
              {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </Field>
          <Field label="Source">
            <select name="source" defaultValue="WHATSAPP" className={inputCls}>
              <option value="WHATSAPP">WhatsApp</option><option value="PHONE">Phone</option><option value="WALK_IN">Walk-in</option>
              <option value="AIRBNB">Airbnb</option><option value="BOOKING_COM">Booking.com</option><option value="WEBSITE">Website</option><option value="OTHER">Other</option>
            </select>
          </Field>
          <Field label="Check-in"><input name="checkIn" type="date" required className={inputCls} /></Field>
          <Field label="Check-out"><input name="checkOut" type="date" required className={inputCls} /></Field>
          <Field label="Adults"><input name="adults" type="number" min={1} max={room?.maxOccupancy} defaultValue={2} required className={inputCls} /></Field>
          <Field label="Children"><input name="children" type="number" min={0} defaultValue={0} required className={inputCls} /></Field>
        </div>
        {room?.category === 'DORMITORY' && (
          <label className="flex items-center gap-2 text-sm mt-4"><input type="checkbox" name="exclusive" /> Exclusive use (book all {room.maxOccupancy} beds)</label>
        )}
      </Card>
      <Card title="Guest">
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Name"><input name="guestName" required className={inputCls} /></Field>
          <Field label="Email"><input name="guestEmail" type="email" required className={inputCls} /></Field>
          <Field label="Phone"><input name="guestPhone" required className={inputCls} /></Field>
        </div>
        <Field label="Guest requests" className="mt-4"><textarea name="specialRequests" rows={2} className={inputCls} /></Field>
        <Field label="Internal notes" className="mt-4"><textarea name="internalNotes" rows={2} className={inputCls} /></Field>
      </Card>
      <Card title="Status">
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="radio" name="status" value="CONFIRMED" checked={status === 'CONFIRMED'} onChange={() => setStatus('CONFIRMED')} /> Confirmed (holds the dates now)</label>
          {status === 'CONFIRMED' && <label className="flex items-center gap-2 ml-6"><input type="checkbox" name="paid" /> Fully paid</label>}
          <label className="flex items-center gap-2"><input type="radio" name="status" value="REQUESTED" checked={status === 'REQUESTED'} onChange={() => setStatus('REQUESTED')} /> Request only (approve later to send a payment link)</label>
          <p className="text-xs text-soil-700">No email is sent when you add a booking here.</p>
        </div>
      </Card>
      <SubmitButton pendingLabel="Checking availability…">Create booking</SubmitButton>
    </form>
  );
}
