"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <div key={index} className="border border-stone-200 rounded-lg overflow-hidden bg-white">
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50 transition-colors"
                        aria-expanded={openIndex === index}
                    >
                        <span className="font-medium text-forest-900 pr-4">{item.question}</span>
                        <ChevronDown
                            className={`w-5 h-5 text-moss-500 transition-transform flex-shrink-0 ${openIndex === index ? "rotate-180" : ""
                                }`}
                        />
                    </button>
                    {openIndex === index && (
                        <div className="px-4 pb-4 text-soil-700 leading-relaxed border-t border-stone-100 pt-4">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
