'use client';

import { useActionState, useState } from 'react';
import { addBlock, addFeed } from '../../_actions/calendar';
import { Field, Notice, SubmitButton, inputCls } from '@/components/admin/ui';

export function BlockForm({ rooms }: { rooms: { id: string; name: string }[] }) {
  const [state, action] = useActionState(addBlock, undefined);
  return (
    <form action={action} className="space-y-3">
      <Notice state={state} />
      <div className="grid sm:grid-cols-3 gap-3">
        <Field label="Room"><select name="accommodationId" className={inputCls}>{rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}</select></Field>
        <Field label="First night"><input name="from" type="date" required className={inputCls} /></Field>
        <Field label="Last night"><input name="to" type="date" required className={inputCls} /></Field>
      </div>
      <Field label="Reason (staff only)"><input name="reason" placeholder="Maintenance, owner stay…" className={inputCls} /></Field>
      <SubmitButton>Block dates</SubmitButton>
    </form>
  );
}

export function FeedForm({ accommodationId }: { accommodationId: string }) {
  const [state, action] = useActionState(addFeed, undefined);
  const [open, setOpen] = useState(false);
  if (!open && !state?.error) return <button type="button" onClick={() => setOpen(true)} className="text-xs text-forest-700 hover:underline">+ Connect a channel calendar</button>;
  return (
    <form action={action} className="rounded-lg border border-dashed border-mist-200 p-3 space-y-2">
      <Notice state={state} />
      <input type="hidden" name="accommodationId" value={accommodationId} />
      <div className="grid sm:grid-cols-3 gap-2">
        <select name="name" className={inputCls} defaultValue="Airbnb"><option>Airbnb</option><option>Booking.com</option><option>Agoda</option><option>MakeMyTrip</option><option>Other</option></select>
        <input name="url" type="url" required placeholder="https://… .ics export link" className={`${inputCls} sm:col-span-2`} />
      </div>
      <SubmitButton pendingLabel="Connecting…">Connect & sync</SubmitButton>
    </form>
  );
}

export function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <div className="text-xs text-soil-700 mb-1">{label}</div>
      <div className="flex gap-2">
        <input readOnly value={value} className={`${inputCls} text-xs font-mono`} onFocus={(e) => e.currentTarget.select()} />
        <button type="button" onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="rounded-lg border border-mist-200 px-3 text-xs whitespace-nowrap">{copied ? 'Copied' : 'Copy'}</button>
      </div>
    </div>
  );
}
