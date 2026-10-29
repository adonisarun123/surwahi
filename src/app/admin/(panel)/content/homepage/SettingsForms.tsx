'use client';

import { useActionState, useState } from 'react';
import { saveHero, saveAnnouncement, saveGalleryVideos } from '../../../_actions/content';
import { Field, Notice, SubmitButton, inputCls } from '@/components/admin/ui';
import type { HomeHero, Announcement, GalleryVideo } from '@/lib/content-repo';

export function HeroForm({ initial }: { initial: HomeHero }) {
  const [state, action] = useActionState(saveHero, undefined);
  return (
    <form action={action} className="space-y-4">
      <Notice state={state} />
      <Field label="Headline" hint="The page's main heading - keep the key phrase for Google"><input name="title" defaultValue={initial.title} required maxLength={90} className={inputCls} /></Field>
      <Field label="Intro text"><textarea name="subtitle" rows={3} defaultValue={initial.subtitle} required className={inputCls} /></Field>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Main button"><input name="primaryCta" defaultValue={initial.primaryCta} required className={inputCls} /></Field>
        <Field label="Main button link"><input name="primaryHref" defaultValue={initial.primaryHref} required className={inputCls} /></Field>
        <Field label="Second button"><input name="secondaryCta" defaultValue={initial.secondaryCta} required className={inputCls} /></Field>
        <Field label="Second button link"><input name="secondaryHref" defaultValue={initial.secondaryHref} required className={inputCls} /></Field>
      </div>
      <SubmitButton>Save homepage</SubmitButton>
    </form>
  );
}

export function AnnouncementForm({ initial }: { initial: Announcement }) {
  const [state, action] = useActionState(saveAnnouncement, undefined);
  return (
    <form action={action} className="space-y-4">
      <Notice state={state} />
      <p className="text-xs text-soil-700">A thin banner above the menu on every page, e.g. &quot;Monsoon offer: 15% off stays in July&quot;.</p>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="enabled" defaultChecked={initial.enabled} /> Show the announcement</label>
      <Field label="Text" hint="Max 160 characters"><input name="text" defaultValue={initial.text} maxLength={160} className={inputCls} /></Field>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Link text (optional)"><input name="linkText" defaultValue={initial.linkText ?? ''} placeholder="Book now" className={inputCls} /></Field>
        <Field label="Link (optional)"><input name="href" defaultValue={initial.href ?? ''} placeholder="/stay" className={inputCls} /></Field>
        <Field label="From (optional)"><input name="startsOn" type="date" defaultValue={initial.startsOn ?? ''} className={inputCls} /></Field>
        <Field label="Until (optional)"><input name="endsOn" type="date" defaultValue={initial.endsOn ?? ''} className={inputCls} /></Field>
      </div>
      <SubmitButton>Save announcement</SubmitButton>
    </form>
  );
}

export function VideosForm({ initial }: { initial: GalleryVideo[] }) {
  const [state, action] = useActionState(saveGalleryVideos, undefined);
  const [rows, setRows] = useState(() => (initial.length ? initial : [{ title: '', youtubeUrl: '' }]).map((r, i) => ({ ...r, key: i })));
  const [nextKey, setNextKey] = useState(1000);
  return (
    <form action={action} className="space-y-3">
      <Notice state={state} />
      <p className="text-xs text-soil-700">YouTube videos shown on the gallery page. The section is hidden when the list is empty.</p>
      {rows.map((r) => (
        <div key={r.key} className="grid sm:grid-cols-[1fr_1fr_auto] gap-2 items-center">
          <input name="title" defaultValue={r.title} placeholder="Title" className={inputCls} />
          <input name="youtubeUrl" defaultValue={r.youtubeUrl} placeholder="https://www.youtube.com/watch?v=…" className={inputCls} />
          <button type="button" onClick={() => setRows(rows.filter((x) => x.key !== r.key))} className="text-xs text-red-700">Remove</button>
        </div>
      ))}
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => { setRows([...rows, { title: '', youtubeUrl: '', key: nextKey }]); setNextKey(nextKey + 1); }} className="text-sm text-forest-700 hover:underline">+ Add video</button>
        <SubmitButton>Save videos</SubmitButton>
      </div>
    </form>
  );
}
