'use client';

import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUpload, addByUrl } from '../../_actions/media';
import { Field, Notice, SubmitButton, inputCls } from '@/components/admin/ui';

type Item = { name: string; status: 'uploading' | 'done' | 'error'; error?: string };
const MAX_MB = 25;

export function Uploader({ enabled }: { enabled: boolean }) {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const set = (name: string, patch: Partial<Item>) => setItems((xs) => xs.map((x) => (x.name === name ? { ...x, ...patch } : x)));

  async function upload(files: FileList) {
    const list = Array.from(files);
    setItems(list.map((f) => ({ name: f.name, status: 'uploading' })));
    for (const file of list) {
      try {
        if (!file.type.startsWith('image/')) throw new Error('Not an image');
        if (file.size > MAX_MB * 1024 * 1024) throw new Error(`Larger than ${MAX_MB} MB`);
        const auth = await (await fetch('/api/admin/imagekit-auth', { cache: 'no-store' })).json();
        if (auth.error) throw new Error(auth.error);
        const body = new FormData();
        body.append('file', file);
        body.append('fileName', file.name.replace(/[^\w.-]+/g, '_'));
        body.append('folder', '/surwahi-admin');
        body.append('useUniqueFileName', 'true');
        for (const k of ['publicKey', 'signature', 'expire', 'token'] as const) body.append(k, String(auth[k]));
        const res = await fetch('https://upload.imagekit.io/api/v1/files/upload', { method: 'POST', body });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message ?? `Upload failed (${res.status})`);
        await registerUpload({ url: json.url, fileId: json.fileId, filePath: json.filePath, width: json.width, height: json.height, name: file.name });
        set(file.name, { status: 'done' });
      } catch (e) {
        set(file.name, { status: 'error', error: (e as Error).message });
      }
    }
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {enabled ? (
        <label className="block border-2 border-dashed border-mist-200 rounded-xl p-6 text-center cursor-pointer hover:border-moss-500 bg-white">
          <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => e.target.files?.length && upload(e.target.files)} />
          <span className="font-medium text-forest-900">Upload photos</span>
          <span className="block text-xs text-soil-700 mt-1">JPG, PNG, WebP or HEIC up to {MAX_MB} MB each. Several at once is fine. ImageKit resizes them for the web.</span>
        </label>
      ) : (
        <p className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-800">
          Direct upload turns on when IMAGEKIT_PUBLIC_KEY and IMAGEKIT_PRIVATE_KEY are set in Vercel. Until then, upload in the ImageKit dashboard and paste the image URL below.
        </p>
      )}
      {items.length > 0 && (
        <ul className="text-sm space-y-1">
          {items.map((i) => (
            <li key={i.name} className={i.status === 'error' ? 'text-red-700' : i.status === 'done' ? 'text-green-700' : 'text-soil-700'}>
              {i.status === 'uploading' ? '⏳' : i.status === 'done' ? '✓' : '✗'} {i.name}{i.error ? ` - ${i.error}` : ''}
            </li>
          ))}
        </ul>
      )}
      <AddByUrl />
    </div>
  );
}

function AddByUrl() {
  const [state, action] = useActionState(addByUrl, undefined);
  const [open, setOpen] = useState(false);
  if (!open) return <button type="button" onClick={() => setOpen(true)} className="text-xs text-forest-700 hover:underline">+ Add a photo by URL</button>;
  return (
    <form action={action} className="grid sm:grid-cols-[2fr_2fr_auto] gap-2 items-end">
      <div className="sm:col-span-3"><Notice state={state} /></div>
      <Field label="Image URL"><input name="url" type="url" required placeholder="https://ik.imagekit.io/surwahi/…" className={inputCls} /></Field>
      <Field label="Describe the photo"><input name="alt" required className={inputCls} /></Field>
      <SubmitButton>Add</SubmitButton>
    </form>
  );
}
