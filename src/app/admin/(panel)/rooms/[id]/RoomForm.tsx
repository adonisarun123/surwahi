'use client';

import { useActionState, useState } from 'react';
import { updateRoom } from '../../../_actions/rooms';
import { Card, Field, Notice, SubmitButton, inputCls } from '@/components/admin/ui';

type RoomProps = {
  id: string;
  name: string;
  pricingModel: 'PER_UNIT' | 'PER_PERSON';
  shortDescription: string;
  longDescription: string;
  bedConfiguration: string;
  size: string | null;
  view: string | null;
  location: string | null;
  maxOccupancy: number;
  basePrice: number;
  extraAdultPrice: number | null;
  includedAdults: number | null;
  childPrice: number | null;
  gstPercent: number;
  mealPlan: string;
  amenities: string[];
  ecoFeatures: string[];
  accessibility: string[];
  included: string[];
  keywords: string[];
  policies: Record<string, string>;
  isActive: boolean;
  sortOrder: number;
};

const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

export default function RoomForm({ room, canEditRates }: { room: RoomProps; canEditRates: boolean }) {
  const [state, action] = useActionState(updateRoom.bind(null, room.id), undefined);
  const [base, setBase] = useState(room.basePrice);
  const [extra, setExtra] = useState(room.extraAdultPrice ?? 0);
  const gst = room.gstPercent / 100;
  const perPerson = room.pricingModel === 'PER_PERSON';

  return (
    <form action={action} className="space-y-6">
      <Notice state={state} />

      <Card title="Rates (per night, before GST)">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Field label={perPerson ? 'Price per person (₹)' : 'Room price (₹)'} hint={`Guest pays ${inr(base * (1 + gst))} incl. ${room.gstPercent}% GST`}>
            <input name="basePrice" type="number" min={1} required defaultValue={room.basePrice} disabled={!canEditRates}
              onChange={(e) => setBase(Number(e.target.value) || 0)} className={inputCls} />
          </Field>
          {!perPerson && (
            <>
              <Field label="Adults included" hint="Covered by the room price">
                <input name="includedAdults" type="number" min={1} max={room.maxOccupancy} defaultValue={room.includedAdults ?? 2} disabled={!canEditRates} className={inputCls} />
              </Field>
              <Field label="Extra adult (₹)" hint={extra ? `Guest pays ${inr(extra * (1 + gst))} incl. GST` : 'Leave empty if not allowed'}>
                <input name="extraAdultPrice" type="number" min={0} defaultValue={room.extraAdultPrice ?? ''} disabled={!canEditRates}
                  onChange={(e) => setExtra(Number(e.target.value) || 0)} className={inputCls} />
              </Field>
            </>
          )}
          <Field label="Child price (₹)" hint="Empty = confirmed at booking">
            <input name="childPrice" type="number" min={0} defaultValue={room.childPrice ?? ''} disabled={!canEditRates} className={inputCls} />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Field label="Meal plan">
            <input name="mealPlan" defaultValue={room.mealPlan} required className={inputCls} />
          </Field>
          <Field label="Max guests">
            <input name="maxOccupancy" type="number" min={1} defaultValue={room.maxOccupancy} required className={inputCls} />
          </Field>
        </div>
        {!canEditRates && <p className="text-xs text-soil-700 mt-3">Your role can&apos;t change prices.</p>}
        <p className="text-xs text-soil-700 mt-3">Seasonal prices and date-specific rates come with the calendar.</p>
      </Card>

      <Card title="Description">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name"><input name="name" defaultValue={room.name} required className={inputCls} /></Field>
            <Field label="Beds"><input name="bedConfiguration" defaultValue={room.bedConfiguration} required className={inputCls} /></Field>
            <Field label="Size"><input name="size" defaultValue={room.size ?? ''} className={inputCls} /></Field>
            <Field label="View"><input name="view" defaultValue={room.view ?? ''} className={inputCls} /></Field>
            <Field label="Location label"><input name="location" defaultValue={room.location ?? ''} className={inputCls} /></Field>
            <Field label="Display order"><input name="sortOrder" type="number" min={0} defaultValue={room.sortOrder} className={inputCls} /></Field>
          </div>
          <Field label="Short description" hint="Shown on listing cards and search results">
            <textarea name="shortDescription" rows={2} defaultValue={room.shortDescription} required className={inputCls} />
          </Field>
          <Field label="Full description" hint="Blank line = new paragraph">
            <textarea name="longDescription" rows={8} defaultValue={room.longDescription} required className={inputCls} />
          </Field>
        </div>
      </Card>

      <Card title="Lists (one item per line)">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Amenities"><textarea name="amenities" rows={6} defaultValue={room.amenities.join('\n')} className={inputCls} /></Field>
          <Field label="What's included"><textarea name="included" rows={6} defaultValue={room.included.join('\n')} className={inputCls} /></Field>
          <Field label="Sustainability features"><textarea name="ecoFeatures" rows={5} defaultValue={room.ecoFeatures.join('\n')} className={inputCls} /></Field>
          <Field label="Accessibility"><textarea name="accessibility" rows={5} defaultValue={room.accessibility.join('\n')} className={inputCls} /></Field>
        </div>
      </Card>

      <Card title="Policies & SEO">
        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Pets"><input name="policyPets" defaultValue={room.policies.pets ?? ''} className={inputCls} /></Field>
          <Field label="Extra bed / groups"><input name="policyExtraBed" defaultValue={room.policies.extraBed ?? ''} className={inputCls} /></Field>
          <Field label="Children"><input name="policyChildren" defaultValue={room.policies.children ?? ''} className={inputCls} /></Field>
        </div>
        <Field label="Search keywords" hint="Comma separated" className="mt-4">
          <input name="keywords" defaultValue={room.keywords.join(', ')} className={inputCls} />
        </Field>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3 sticky bottom-0 bg-sand-50/95 py-3">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isActive" defaultChecked={room.isActive} /> Show this room on the website
        </label>
        <SubmitButton>Save changes</SubmitButton>
      </div>
    </form>
  );
}
