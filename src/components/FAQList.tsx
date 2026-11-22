/**
 * Server-rendered FAQ list using native <details>/<summary>.
 * Unlike FAQAccordion (client, renders answers only when open), every answer is in the
 * initial HTML, so search engines and AI crawlers can read it and it matches FAQPage schema.
 */
export default function FAQList({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.question} className="group border border-stone-200 rounded-lg bg-white overflow-hidden">
          <summary className="flex items-center justify-between gap-4 p-4 cursor-pointer list-none font-medium text-forest-900 hover:bg-stone-50 [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span aria-hidden="true" className="text-moss-500 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
          </summary>
          <div className="px-4 pb-4 pt-3 border-t border-stone-100 text-soil-700 leading-relaxed">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
