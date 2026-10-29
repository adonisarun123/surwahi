import Link from 'next/link';
import React from 'react';

function inline(text: string, kp: string): React.ReactNode[] {
  text = text.replace(/->/g, '→');
  const out: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|\*([^*\s][^*]*?)\*/g;
  let last = 0, i = 0; let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={`${kp}-b${i}`} className="font-semibold text-forest-900">{m[1]}</strong>);
    else if (m[4] !== undefined) out.push(<em key={`${kp}-i${i}`}>{m[4]}</em>);
    else out.push(<Link key={`${kp}-l${i}`} href={m[3]} className="text-clay-600 font-medium underline underline-offset-2 hover:text-clay-500">{m[2]}</Link>);
    last = m.index + m[0].length; i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const DEF = /^\*\*(.+?)\*\*\s*[-–—:]?\s*(.+)$/;

export default function Prose({ md }: { md: string }) {
  const lines = md.replace(/\r/g, '').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0, k = 0;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (t === '' || t === '---') { i++; continue; }
    if (t.startsWith('### ')) { blocks.push(<h3 key={k} className="font-display text-xl text-forest-900 mt-8 mb-3">{inline(t.slice(4), 'h3' + k)}</h3>); k++; i++; continue; }
    if (t.startsWith('## ') || t.startsWith('# ')) {
      const txt = t.startsWith('## ') ? t.slice(3) : t.slice(2);
      blocks.push(
        <h2 key={k} className="font-display text-2xl md:text-3xl text-forest-900 mt-14 mb-5">
          <span className="block w-10 h-0.5 bg-clay-500 mb-3" aria-hidden="true"></span>
          {inline(txt, 'h2' + k)}
        </h2>
      );
      k++; i++; continue;
    }
    if (t.startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const cells = lines[i].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [head, ...body] = rows;
      blocks.push(
        <div key={k} className="overflow-x-auto my-6 rounded-card border border-mist-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-sand-50 text-forest-900">
              <tr>{head.map((c, j) => <th key={j} scope="col" className="px-4 py-3 font-semibold">{inline(c, `th${k}-${j}`)}</th>)}</tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri} className="border-t border-mist-200">
                  {r.map((c, j) => <td key={j} className="px-4 py-3 text-soil-700 align-top">{inline(c, `td${k}-${ri}-${j}`)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      k++; continue;
    }
    if (t.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) { items.push(lines[i].trim().slice(2)); i++; }
      const parsed = items.map((it) => it.match(DEF));
      if (items.length > 1 && parsed.every((x): x is RegExpMatchArray => x !== null)) {
        blocks.push(
          <div key={k} className="grid sm:grid-cols-2 gap-4 my-6">
            {parsed.map((mm, j) => (
              <div key={j} className="bg-sand-50 border border-mist-200 rounded-card p-5">
                <div className="font-ui font-bold text-forest-900 mb-1">{inline(mm[1], `c${k}-${j}t`)}</div>
                <div className="text-sm text-soil-700 leading-relaxed">{inline(mm[2], `c${k}-${j}b`)}</div>
              </div>
            ))}
          </div>
        );
      } else {
        blocks.push(<ul key={k} className="list-disc pl-5 space-y-2 text-soil-700 mb-5 marker:text-clay-500">{items.map((it, j) => <li key={j} className="leading-relaxed">{inline(it, `li${k}-${j}`)}</li>)}</ul>);
      }
      k++; continue;
    }
    const para: string[] = [];
    while (i < lines.length) {
      const lt = lines[i].trim();
      if (lt === '' || lt === '---' || lt.startsWith('#') || lt.startsWith('- ') || lt.startsWith('|')) break;
      para.push(lt); i++;
    }
    blocks.push(<p key={k} className="text-soil-700 leading-relaxed mb-5 text-[1.05rem]">{inline(para.join(' '), 'p' + k)}</p>);
    k++;
  }
  return <div className="prose-surwahi">{blocks}</div>;
}
