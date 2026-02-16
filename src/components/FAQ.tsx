
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';


interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
    className?: string;
}

export default function FAQ({ items, className = '' }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Generating Schema
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer
            }
        }))
    };

    return (
        <section className={`py-12 bg-sand-50 ${className}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-display text-3xl text-forest-900 mb-8 text-center">Frequently Asked Questions</h2>
                <div className="max-w-3xl mx-auto space-y-4">
                    {items.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-sand-200">
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-sand-50 transition-colors"
                                onClick={() => toggleItem(index)}
                            >
                                <span className="font-medium text-forest-900 text-lg">{item.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="h-5 w-5 text-moss-500" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-moss-500" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-6 pt-2 border-t border-sand-100">
                                    <p className="text-soil-700 leading-relaxed">{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            </div>
        </section>
    );
}
