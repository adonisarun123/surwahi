'use client';

import { useActionState } from 'react';
import { addRateRule, deleteRateRule } from '../../../_actions/calendar';
import { Card, Field, Notice, SubmitButton, inputCls } from '@/components/admin/ui';

type Rule = { id: string; name: string; from: string; to: string; basePrice: number; extraAdultPrice: number | null; minNights: number | null; priority: number };

export default function SeasonalRates({ accommodationId, rules, perPerson, canEdit }: { accommodationId: string; rules: Rule[]; perPerson: boolean; canEdit: boolean }) {
  const [state, action] = useActionState(addRateRule.bind(null, accommodationId), undefined);
  const fmt = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  return (
    <Card title="Seasonal & special-date rates">
      <p className="text-xs text-soil-700 mb-4">Overrides the standard price for the nights in range (e.g. Christmas–New Year, long weekends). If ranges overlap, higher priority wins.</p>
      {rules.length > 0 ? (
        <ul className="divide-y divide-mist-200 text-sm mb-5">
          {rules.map((r) => (
            <li key={r.id} className="py-2 flex flex-wrap items-center justify-between gap-2">
              <span><b>{r.name}</b> · {fmt(r.from)} – {fmt(r.to)} · ₹{r.basePrice.toLocaleString('en-IN')}{r.extraAdultPrice != null && ` (+₹${r.extraAdultPrice.toLocaleString('en-IN')}/extra adult)`}{r.minNights && ` · min ${r.minNights} nights`}{r.priority ? ` · priority ${r.priority}` : ''}</span>
              {canEdit && <form action={deleteRateRule.bind(null, r.id)}><button className="text-xs text-red-700 hover:underline">Remove</button></form>}
            </li>
          ))}
        </ul>
      ) : <p className="text-sm text-soil-700 mb-5">No seasonal rates. The standard price applies every night.</p>}
      {canEdit && (
        <form action={action} className="space-y-3">
          <Notice state={state} />
          <div className="grid sm:grid-cols-3 gap-3">
            <Field label="Name"><input name="name" required placeholder="Christmas & New Year" className={inputCls} /></Field>
            <Field label="First night"><input name="from" type="date" required className={inputCls} /></Field>
            <Field label="Last night"><input name="to" type="date" required className={inputCls} /></Field>
            <Field label={perPerson ? 'Price per person (₹, before GST)' : 'Room price (₹, before GST)'}><input name="basePrice" type="number" min={1} required className={inputCls} /></Field>
            {!perPerson && <Field label="Extra adult (₹)" hint="Empty = standard"><input name="extraAdultPrice" type="number" min={0} className={inputCls} /></Field>}
            <Field label="Minimum nights" hint="Optional"><input name="minNights" type="number" min={1} className={inputCls} /></Field>
            <Field label="Priority" hint="Higher wins on overlap"><input name="priority" type="number" min={0} defaultValue={0} className={inputCls} /></Field>
          </div>
          <SubmitButton>Add seasonal rate</SubmitButton>
        </form>
      )}
    </Card>
  );
}
