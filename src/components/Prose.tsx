import Link from 'next/link';
import React from 'react';

function inline(text: string, kp: string): React.ReactNode[] {
  text = text.replace(/->/g, '→');
  const out: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0; let m: RegExpExecArray | null; let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(<strong key={`${kp}-b${i}`} className="font-semibold text-forest-900">{m[1]}</strong>);
    } else {
      out.push(<Link key={`${kp}-l${i}`} href={m[3]} className="text-clay-500 underline underline-offset-2 hover:text-clay-600">{m[2]}</Link>);
    }
    last = m.index + m[0].length; i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Prose({ md }: { md: string }) {
  const lines = md.replace(/\r/g, '').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0; let k = 0;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (t === '' || t === '---') { i++; continue; }
    if (t.startsWith('### ')) { blocks.push(<h3 key={k} className="font-display text-xl text-forest-900 mt-8 mb-3">{inline(t.slice(4), 'h3' + k)}</h3>); k++; i++; continue; }
    if (t.startsWith('## ')) { blocks.push(<h2 key={k} className="font-display text-2xl md:text-3xl text-forest-900 mt-12 mb-4">{inline(t.slice(3), 'h2' + k)}</h2>); k++; i++; continue; }
    if (t.startsWith('# ')) { blocks.push(<h2 key={k} className="font-display text-2xl md:text-3xl text-forest-900 mt-10 mb-4">{inline(t.slice(2), 'h1' + k)}</h2>); k++; i++; continue; }
    if (t.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) { items.push(lines[i].trim().slice(2)); i++; }
      blocks.push(<ul key={k} className="list-disc pl-6 space-y-2 text-soil-700 mb-5">{items.map((it, j) => <li key={j}>{inline(it, `li${k}-${j}`)}</li>)}</ul>);
      k++; continue;
    }
    const para: string[] = [];
    while (i < lines.length) {
      const lt = lines[i].trim();
      if (lt === '' || lt === '---' || lt.startsWith('#') || lt.startsWith('- ')) break;
      para.push(lt); i++;
    }
    blocks.push(<p key={k} className="text-soil-700 leading-relaxed mb-4">{inline(para.join(' '), 'p' + k)}</p>);
    k++;
  }
  return <div>{blocks}</div>;
}
