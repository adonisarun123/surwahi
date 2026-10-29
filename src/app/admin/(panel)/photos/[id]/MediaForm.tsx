'use client';

import { useActionState, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateMedia, deleteMedia } from '../../../_actions/media';
import { Field, Notice, SubmitButton, inputCls, type ActionState } from '@/components/admin/ui';

type M = { id: string; alt: string; caption: string; tags: string; galleryCategory: string; gallerySort: number };

export function MediaForm({ media, categories }: { media: M; categories: string[] }) {
  const [state, action] = useActionState(updateMedia.bind(null, media.id), undefined);
  return (
    <form action={action} className="space-y-4">
      <Notice state={state} />
      <Field label="Description (alt text)" hint="What's in the photo. Used by Google Images and screen readers.">
        <input name="alt" defaultValue={media.alt} required className={inputCls} />
      </Field>
      <Field label="Caption (optional)"><input name="caption" defaultValue={media.caption} className={inputCls} /></Field>
      <Field label="Tags" hint="Comma separated, for finding photos later"><input name="tags" defaultValue={media.tags} className={inputCls} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Show in gallery">
          <select name="galleryCategory" defaultValue={media.galleryCategory} className={inputCls}>
            <option value="">Not in gallery</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Gallery order" hint="Lower shows first"><input name="gallerySort" type="number" min={0} defaultValue={media.gallerySort} className={inputCls} /></Field>
      </div>
      <SubmitButton>Save</SubmitButton>
    </form>
  );
}

export function DeleteMedia({ id }: { id: string }) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [result, setResult] = useState<ActionState>();
  const [pending, start] = useTransition();
  return (
    <div className="space-y-2">
      <Notice state={result} />
      {!confirm ? (
        <button type="button" onClick={() => setConfirm(true)} className="text-sm text-red-700 hover:underline">Delete photo…</button>
      ) : (
        <div className="flex items-center gap-3 text-sm">
          <span>Delete permanently (also from ImageKit)?</span>
          <button type="button" disabled={pending} onClick={() => start(async () => { const r = await deleteMedia(id); setResult(r); if (!r?.error) router.push('/admin/photos'); })} className="rounded-lg bg-red-600 px-3 py-1 text-white">{pending ? 'Deleting…' : 'Yes, delete'}</button>
          <button type="button" onClick={() => setConfirm(false)} className="text-soil-700">Cancel</button>
        </div>
      )}
    </div>
  );
}
