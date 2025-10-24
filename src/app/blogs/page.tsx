import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { blogs } from '@/lib/blogs';

export const metadata = generatePageMetadata(
  'Our Blog',
  'Stories from the forest, conservation updates, and insights into sustainable living at Surwahi.',
  '/blogs'
);

export default function BlogPage() {
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            Stories from the Forest
          </h1>
          <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
            Conservation updates, sustainable living insights, and tales from the wild heart of India.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedBlogs.map((post) => (
              <article key={post.slug} className="group bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={post.thumbnailImage}
                    alt={post.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-soil-700 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.publishedDate}>
                        {new Date(post.publishedDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                    </div>
                  </div>
                  
                  <h3 className="font-display text-lg text-forest-900 mb-3 group-hover:text-moss-500 transition-colors">
                    <Link href={`/blogs/${post.slug}`}>
                      {post.name}
                    </Link>
                  </h3>
                  
                  <p className="text-soil-700 text-sm mb-4">{post.metaDescription}</p>
                  
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center text-moss-500 hover:text-forest-700 transition-colors text-sm font-medium"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
