'use client';

import Image from 'next/image';
import { useActionState, useState } from 'react';
import { saveArticle, deleteArticle } from '../../../../_actions/content';
import { Card, Field, Notice, SubmitButton, inputCls } from '@/components/admin/ui';

type Initial = {
  title: string; slug: string; excerpt: string; content: string; category: string; author: string; authorBio: string;
  coverUrl: string; coverAlt: string; tags: string; status: 'DRAFT' | 'PUBLISHED'; publishedAt: string; seoTitle: string; seoDescription: string;
};

const slugify = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 90);

export default function ArticleForm({ id, initial, library, categories }: { id: string | null; initial: Initial; library: { url: string; alt: string }[]; categories: string[] }) {
  const [state, action] = useActionState(saveArticle.bind(null, id), undefined);
  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [slugTouched, setSlugTouched] = useState(!!id);
  const [cover, setCover] = useState(initial.coverUrl);
  const [coverAlt, setCoverAlt] = useState(initial.coverAlt);
  const [picking, setPicking] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [seoTitle, setSeoTitle] = useState(initial.seoTitle);
  const [seoDesc, setSeoDesc] = useState(initial.seoDescription);

  return (
    <div className="space-y-6">
      <form action={action} className="space-y-6">
        <Notice state={state} />
        <Card title="Post">
          <div className="space-y-4">
            <Field label="Title">
              <input name="title" value={title} required className={inputCls} onChange={(e) => { setTitle(e.target.value); if (!slugTouched) setSlug(slugify(e.target.value)); }} />
            </Field>
            <Field label="URL" hint={id ? 'Changing the URL of a live post breaks existing links to it.' : undefined}>
              <div className="flex items-center gap-1 text-sm"><span className="text-soil-700">/blogs/</span>
                <input name="slug" value={slug} required className={inputCls} onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }} />
              </div>
            </Field>
            <Field label="Summary" hint="Shown on the blog list and in Google if no SEO description is set">
              <textarea name="excerpt" rows={2} defaultValue={initial.excerpt} required className={inputCls} />
            </Field>
            <Field label="Article" hint="Blank line between paragraphs. Start a line with ## for a heading.">
              <textarea name="content" rows={18} defaultValue={initial.content} required className={`${inputCls} font-mono text-[13px]`} />
            </Field>
          </div>
        </Card>

        <Card title="Cover photo">
          <div className="flex flex-wrap gap-4 items-start">
            <div className="relative w-48 aspect-[4/3] rounded-lg overflow-hidden bg-sand-50 border border-mist-200">
              {cover && <Image src={cover} alt={coverAlt || 'Cover'} fill sizes="200px" className="object-cover" />}
            </div>
            <div className="flex-1 min-w-[220px] space-y-3">
              <input type="hidden" name="coverUrl" value={cover} />
              <Field label="Photo description"><input name="coverAlt" value={coverAlt} onChange={(e) => setCoverAlt(e.target.value)} className={inputCls} /></Field>
              <button type="button" onClick={() => setPicking((v) => !v)} className="text-sm text-forest-700 hover:underline">{picking ? 'Close library' : 'Choose from photo library'}</button>
            </div>
          </div>
          {picking && (
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-4 max-h-72 overflow-y-auto">
              {library.map((m) => (
                <button key={m.url} type="button" title={m.alt} onClick={() => { setCover(m.url); setCoverAlt(m.alt); setPicking(false); }} className="relative aspect-square rounded overflow-hidden ring-forest-700 hover:ring-2">
                  <Image src={m.url} alt={m.alt} fill sizes="100px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </Card>

        <Card title="Details">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Category">
              <input name="category" list="categories" defaultValue={initial.category} required className={inputCls} />
              <datalist id="categories">{categories.map((c) => <option key={c} value={c} />)}</datalist>
            </Field>
            <Field label="Tags" hint="Comma separated"><input name="tags" defaultValue={initial.tags} className={inputCls} /></Field>
            <Field label="Author"><input name="author" defaultValue={initial.author} required className={inputCls} /></Field>
            <Field label="Author bio (optional)" hint="Shown under the post only if filled in"><input name="authorBio" defaultValue={initial.authorBio} className={inputCls} /></Field>
            <Field label="Publish date"><input name="publishedAt" type="date" defaultValue={initial.publishedAt} required className={inputCls} /></Field>
            <Field label="Status">
              <select name="status" defaultValue={initial.status} className={inputCls}>
                <option value="DRAFT">Draft - hidden</option>
                <option value="PUBLISHED">Published - live on the site</option>
              </select>
            </Field>
          </div>
        </Card>

        <Card title="Search engines (optional)">
          <div className="space-y-4">
            <Field label={`SEO title (${seoTitle.length}/60)`} hint="Defaults to the post title"><input name="seoTitle" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} maxLength={70} className={inputCls} /></Field>
            <Field label={`Meta description (${seoDesc.length}/160)`} hint="Defaults to the summary"><textarea name="seoDescription" rows={2} value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} maxLength={170} className={inputCls} /></Field>
            <div className="rounded-lg border border-mist-200 p-3 text-sm">
              <div className="text-[#1a0dab] truncate">{seoTitle || title || 'Post title'}</div>
              <div className="text-[#006621] text-xs">surwahi.com/blogs/{slug}</div>
              <div className="text-soil-700 text-xs line-clamp-2">{seoDesc || initial.excerpt || 'Summary…'}</div>
            </div>
          </div>
        </Card>

        <div className="sticky bottom-0 bg-sand-50/95 py-3 flex justify-end"><SubmitButton>{id ? 'Save post' : 'Create post'}</SubmitButton></div>
      </form>

      {id && (
        <div className="text-sm">
          {!confirmDelete ? <button type="button" onClick={() => setConfirmDelete(true)} className="text-red-700 hover:underline">Delete post…</button> : (
            <form action={deleteArticle.bind(null, id)} className="flex items-center gap-3">
              <span>Delete permanently? Consider setting it to Draft instead.</span>
              <SubmitButton variant="danger" pendingLabel="Deleting…">Yes, delete</SubmitButton>
              <button type="button" onClick={() => setConfirmDelete(false)} className="text-soil-700">Cancel</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
