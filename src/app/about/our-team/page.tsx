import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { Handshake, Quote } from 'lucide-react';

export const metadata = generatePageMetadata(
    'Meet the Team | Surwahi Eco Lodge',
    'Meet the founders behind Surwahi Social Ecoestate near Kanha — Ankit Rastogi and Pradeep Vijayan — and the local community that brings this eco-lodge to life.',
    '/about/our-team'
);

const founders = [
    { name: 'Ankit Rastogi', role: 'Founder & Host', image: '/team/Ankit.webp' },
    { name: 'Pradeep Vijayan', role: 'Co-Founder & Kitchen', image: '/team/pradeep-vijayan.jpeg' },
];

export default function OurTeamPage() {
    return (
        <div className="pt-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', '@id': 'https://surwahi.com/#org', founder: [{ '@type': 'Person', name: 'Ankit Rastogi', jobTitle: 'Founder' }, { '@type': 'Person', name: 'Pradeep Vijayan', jobTitle: 'Co-Founder' }] }) }}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs />
            </div>

            <section className="bg-sand-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-display-xl text-forest-900 mb-4">
                        The People Behind Surwahi
                    </h1>
                    <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
                        Surwahi is built by people, not machines — from our founders to the caretakers, cooks and local artisans who bring the estate to life.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Founders */}
                <section className="mb-24">
                    <h2 className="font-display text-3xl text-forest-900 mb-12 text-center">Meet the Founders</h2>
                    <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
                        {founders.map((f) => (
                            <div key={f.name} className="text-center">
                                <div className="w-40 h-40 mx-auto relative rounded-2xl overflow-hidden border-4 border-sand-100 shadow-elev-1">
                                    <Image src={f.image} alt={f.name} fill className="object-cover" sizes="160px" />
                                </div>
                                <h3 className="font-display text-xl text-forest-900 mt-4">{f.name}</h3>
                                <p className="text-moss-600 font-medium text-sm uppercase tracking-wide">{f.role}</p>
                            </div>
                        ))}
                    </div>
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-soil-700 leading-relaxed mb-6">
                            Travel entrepreneurs with a background in travel e-commerce, Ankit and Pradeep dreamed of building a holistically sustainable property — one rooted in hyper-local character, culture and grassroots values. In December 2015 they chose the village of Surwahi, on the outskirts of Kanha Tiger Reserve, and from there began an ongoing journey of unravelling what truly sustainable travel can look like: community-first, conservation-led and minimal by design.
                        </p>
                        <blockquote className="relative bg-sand-50 border-l-4 border-clay-500 rounded-r-xl p-6 text-soil-700 italic text-left max-w-2xl mx-auto">
                            <Quote className="h-5 w-5 text-clay-500 mb-2" />
                            We believe that sustainability, community, and natural beauty should coexist, creating a sanctuary that is more than just a place to live &mdash; it&rsquo;s a way of life.
                        </blockquote>
                    </div>
                </section>

                {/* On the ground */}
                <section className="mb-24 max-w-3xl mx-auto text-center">
                    <h2 className="font-display text-3xl text-forest-900 mb-6">The Team on the Ground</h2>
                    <p className="text-soil-700 leading-relaxed mb-10">
                        Every stay at Surwahi is personal. Ankit is the host guests remember — generous with his time and his passion for sustainability. Pradeep brings the kitchen to life, with home-cooked meals guests single out as a highlight. And Narendra, our caretaker and property manager, quietly makes sure everything runs smoothly from dawn to dusk.
                    </p>
                    <div className="max-w-xs mx-auto bg-white rounded-xl border border-stone-100 shadow-sm p-6">
                        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-moss-500/10 text-moss-600 font-display text-xl flex items-center justify-center">N</div>
                        <h3 className="font-display text-lg text-forest-900">Narendra ji</h3>
                        <p className="text-moss-600 text-xs font-bold uppercase tracking-wider">Caretaker &amp; Property Manager</p>
                    </div>
                </section>

                {/* Community Partners */}
                <section className="bg-moss-50 p-8 md:p-12 rounded-3xl text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-moss-600 shadow-sm">
                        <Handshake className="h-8 w-8" />
                    </div>
                    <h2 className="font-display text-3xl text-forest-900 mb-6">Built by the Community</h2>
                    <p className="text-soil-700 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Surwahi was built with the community, not merely for it. Much of our team comes from the neighbouring villages of Surwahi and Majgaon, and we work hand-in-hand with local farmers, artisans and women&rsquo;s self-help groups. Together, the estate helps sustain the livelihoods of 50+ local people — so every stay directly supports the skills, craft and families at the forest&rsquo;s edge.
                    </p>
                    <Link href="/about/our-story" className="btn btn-primary bg-moss-600 hover:bg-moss-700 text-white border-none">
                        Read Our Full Story
                    </Link>
                </section>

            </div>
        </div>
    );
}
