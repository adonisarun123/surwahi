import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { blogs } from '@/lib/blogs';
import ShareButton from '@/components/ShareButton';

export async function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogs.find(p => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  return generatePageMetadata(
    post.metaTitle || post.name,
    post.metaDescription,
    `/blogs/${post.slug}`
  );
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogs.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blogs', href: '/blogs' },
    { name: post.name, href: `/blogs/${post.slug}` }
  ];

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs customBreadcrumbs={breadcrumbs} />
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-moss-500 hover:text-forest-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-display-xl text-forest-900 mb-6">
              {post.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-soil-700 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedDate}>
                  {new Date(post.publishedDate).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
              </div>
              <ShareButton title={post.name} text={post.metaDescription} />
            </div>

            <div className="aspect-[16/9] relative overflow-hidden rounded-card mb-8">
              <Image
                src={post.bannerImage}
                alt={post.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.postBody }} />
          </div>
        </div>
      </section>
    </div>
  );
}
