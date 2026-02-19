'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Calendar, Tag } from 'lucide-react';
import { blogPosts } from '@/lib/data';

const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

export default function BlogList() {
    const [filter, setFilter] = useState('All');

    const filteredPosts = filter === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === filter);

    return (
        <div>
            {/* Category Filter */}
            <div className="flex justify-center flex-wrap gap-3 mb-12">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 border ${filter === category
                            ? 'bg-moss-700 text-white border-moss-700 shadow-md transform scale-105'
                            : 'bg-white text-forest-700 border-stone-200 hover:border-moss-300 hover:bg-moss-50'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                    <Link href={`/blogs/${post.slug}`} key={post.slug} className="group block bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all border border-stone-100 h-full flex flex-col">
                        <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-moss-700 flex items-center gap-1 shadow-sm">
                                    <Tag className="h-3 w-3" />
                                    {post.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="font-display text-2xl text-forest-900 mb-3 group-hover:text-moss-600 transition-colors leading-tight">{post.title}</h3>
                            <p className="text-soil-700 text-sm mb-6 flex-1 leading-relaxed">{post.excerpt}</p>
                            <div className="flex items-center justify-between text-xs text-soil-500 pt-4 border-t border-stone-100 mt-auto">
                                <div className="flex items-center">
                                    <User className="h-3 w-3 mr-1.5" />
                                    <span className="font-medium">{post.author}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1.5" />
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {filteredPosts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-soil-600 text-lg">No stories found in this category.</p>
                </div>
            )}
        </div>
    );
}
