'use client';

import { useActionState, useState } from 'react';
import { saveFaq, saveEvent } from '../../_actions/content';
import { Field, Notice, SubmitButton, inputCls } from '@/components/admin/ui';

type Faq = { id: string | null; category: string; question: string; answer: string; sortOrder: number; isPublished: boolean };

export function FaqForm({ faq, categories, onDone }: { faq: Faq; categories: string[]; onDone?: () => void }) {
  const [state, action] = useActionState(saveFaq.bind(null, faq.id), undefined);
  return (
    <form action={action} className="space-y-3" onSubmit={() => onDone?.()}>
      <Notice state={state} />
      <div className="grid sm:grid-cols-[2fr_1fr] gap-3">
        <Field label="Category">
          <input name="category" list="faq-cats" defaultValue={faq.category} required className={inputCls} />
          <datalist id="faq-cats">{categories.map((c) => <option key={c} value={c} />)}</datalist>
        </Field>
        <Field label="Order" hint="Lower shows first"><input name="sortOrder" type="number" min={0} defaultValue={faq.sortOrder} className={inputCls} /></Field>
      </div>
      <Field label="Question"><input name="question" defaultValue={faq.question} required className={inputCls} /></Field>
      <Field label="Answer"><textarea name="answer" rows={4} defaultValue={faq.answer} required className={inputCls} /></Field>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isPublished" defaultChecked={faq.isPublished} /> Show on the website</label>
        <SubmitButton>{faq.id ? 'Save' : 'Add FAQ'}</SubmitButton>
      </div>
    </form>
  );
}

export function DeleteButton({ action, label = 'Delete' }: { action: () => Promise<void>; label?: string }) {
  const [confirm, setConfirm] = useState(false);
  if (!confirm) return <button type="button" onClick={() => setConfirm(true)} className="text-xs text-red-700 hover:underline">{label}</button>;
  return (
    <form action={action} className="inline-flex items-center gap-2 text-xs">
      <span>Sure?</span>
      <button className="text-white bg-red-600 rounded px-2 py-0.5">Yes</button>
      <button type="button" onClick={() => setConfirm(false)} className="text-soil-700">No</button>
    </form>
  );
}


type Ev = { id: string | null; title: string; summary: string; startDate: string; endDate: string; linkPath: string; priceText: string; imageUrl: string; isPublished: boolean };

export function EventForm({ ev }: { ev: Ev }) {
  const [state, action] = useActionState(saveEvent.bind(null, ev.id), undefined);
  return (
    <form action={action} className="space-y-3">
      <Notice state={state} />
      <Field label="Title"><input name="title" defaultValue={ev.title} required className={inputCls} /></Field>
      <Field label="Short description"><textarea name="summary" rows={2} defaultValue={ev.summary} required className={inputCls} /></Field>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Starts"><input name="startDate" type="date" defaultValue={ev.startDate} required className={inputCls} /></Field>
        <Field label="Ends"><input name="endDate" type="date" defaultValue={ev.endDate} required className={inputCls} /></Field>
        <Field label="Details page" hint="e.g. /workshops/vann-vibe"><input name="linkPath" defaultValue={ev.linkPath} className={inputCls} /></Field>
        <Field label="Price (optional)" hint="e.g. ₹18,000 per person"><input name="priceText" defaultValue={ev.priceText} className={inputCls} /></Field>
      </div>
      <Field label="Image URL (optional)" hint="Copy from the photo library"><input name="imageUrl" defaultValue={ev.imageUrl} className={inputCls} /></Field>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isPublished" defaultChecked={ev.isPublished} /> Show on the website</label>
        <SubmitButton>{ev.id ? 'Save' : 'Add event'}</SubmitButton>
      </div>
    </form>
  );
}
