import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateBlogMetadata, toAbsoluteSiteUrl } from '@/lib/seo';
import ShareButton from '@/components/ShareButton';
import { getArticle, getPublishedArticles } from '@/lib/content-repo';

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getPublishedArticles()).map((a) => ({ slug: a.slug }));
}

async function loadPost(slug: string) {
  const a = await getArticle(slug);
  if (!a) return null;
  return { ...a, featuredImage: { url: a.coverUrl, alt: a.coverAlt, caption: '' } };
}

// Mock blog data - will be replaced with database queries

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await loadPost(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  return generateBlogMetadata(
    post.seoTitle || post.title,
    post.seoDescription || post.excerpt,
    post.slug,
    post.publishedAt,
    post.updatedAt,
    [post.author],
    post.tags,
    post.featuredImage.url
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await loadPost(slug);

  if (!post) {
    // Unpublished (draft) posts send visitors to the blog index instead of a 404
    const draft = await prisma.article.findUnique({ where: { slug }, select: { id: true } }).catch(() => null);
    if (draft) redirect('/blogs');
    notFound();
  }
  const relatedPosts = (await getPublishedArticles()).filter((a) => a.slug !== post.slug).slice(0, 3).map((a) => ({ id: a.slug, title: a.title, slug: a.slug, excerpt: a.excerpt, image: a.coverUrl, category: a.category, publishedAt: a.publishedAt, readingTime: a.readingTime }));

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blogs' },
    { name: post.title, href: `/blogs/${post.slug}` }
  ];

  return (
    <div className="pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs customBreadcrumbs={breadcrumbs} />
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-moss-500 hover:text-forest-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Category Badge */}
            <div className="mb-6">
              <span className="bg-moss-500 text-bone-0 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-display-xl text-forest-900 mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-soil-700 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
              <ShareButton title={post.title} text={post.excerpt} />
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] relative overflow-hidden rounded-card mb-8">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
                fill
                className="object-cover"
                priority
              />
              {post.featuredImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-forest-900/80 text-bone-0 p-4">
                  <p className="text-sm">{post.featuredImage.caption}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            
            {/* Main Content */}
            <article className="lg:col-span-3">
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n\n').map((paragraph, index) => {
                  // Handle headings
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="font-display text-2xl text-forest-900 mt-12 mb-6 first:mt-0">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  
                  // Handle emphasis paragraphs (italics)
                  if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                    return (
                      <p key={index} className="text-lg italic text-moss-500 border-l-4 border-moss-500 pl-6 my-8">
                        {paragraph.slice(1, -1)}
                      </p>
                    );
                  }
                  
                  // Regular paragraphs
                  return (
                    <p key={index} className="mb-6 text-ink-900 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-mist-200">
                <h3 className="font-medium text-forest-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href="/blogs"
                      className="inline-flex items-center gap-1 bg-mist-200/50 hover:bg-moss-500/10 text-soil-700 hover:text-moss-500 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              {post.authorBio && (
              <div className="mt-12 pt-8 border-t border-mist-200">
                <div className="bg-sand-50 rounded-card p-6">
                  <h3 className="font-display text-xl text-forest-900 mb-3">About the Author</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-moss-500 rounded-full flex items-center justify-center text-bone-0 font-bold text-lg flex-shrink-0">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-medium text-forest-900 mb-2">{post.author}</h4>
                      <p className="text-soil-700 text-sm">{post.authorBio}</p>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                
                {/* Table of Contents */}
                <div className="bg-sand-50 rounded-card p-6">
                  <h3 className="font-medium text-forest-900 mb-4">In This Article</h3>
                  <nav className="space-y-2 text-sm">
                    <a href="#the-symphony-begins" className="block text-soil-700 hover:text-moss-500 transition-colors">
                      The Symphony Begins
                    </a>
                    <a href="#patience-as-practice" className="block text-soil-700 hover:text-moss-500 transition-colors">
                      Patience as Practice
                    </a>
                    <a href="#the-hornbill-appears" className="block text-soil-700 hover:text-moss-500 transition-colors">
                      The Hornbill Appears
                    </a>
                    <a href="#connections-in-the-web" className="block text-soil-700 hover:text-moss-500 transition-colors">
                      Connections in the Web
                    </a>
                    <a href="#what-the-forest-teaches" className="block text-soil-700 hover:text-moss-500 transition-colors">
                      What the Forest Teaches
                    </a>
                  </nav>
                </div>

                {/* Related Categories */}
                <div className="bg-sand-50 rounded-card p-6">
                  <h3 className="font-medium text-forest-900 mb-4">Related Topics</h3>
                  <div className="space-y-2">
                    <Link href="/blogs" className="block text-soil-700 hover:text-moss-500 transition-colors text-sm">
                      Wildlife Stories
                    </Link>
                    <Link href="/blogs" className="block text-soil-700 hover:text-moss-500 transition-colors text-sm">
                      Conservation Updates
                    </Link>
                    <Link href="/experiences" className="block text-soil-700 hover:text-moss-500 transition-colors text-sm">
                      Forest Activities
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 lg:py-24 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-forest-900 mb-8 text-center">
            Related Stories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.id} className="group bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-moss-500 text-bone-0 px-2 py-1 rounded text-xs font-medium">
                      {relatedPost.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-soil-700 mb-3">
                    <time>{new Date(relatedPost.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</time>
                    <span>{relatedPost.readingTime} min read</span>
                  </div>
                  
                  <h3 className="font-display text-lg text-forest-900 mb-3 group-hover:text-moss-500 transition-colors">
                    <Link href={`/blogs/${relatedPost.slug}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>

                  <p className="text-soil-700 text-sm mb-4">{relatedPost.excerpt}</p>

                  <Link
                    href={`/blogs/${relatedPost.slug}`}
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

      {/* JSON-LD Structured Data (breadcrumbs JSON-LD is emitted by <Breadcrumbs />) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": toAbsoluteSiteUrl(post.featuredImage.url),
            "author": {
              "@type": "Person",
              "name": post.author,
              "description": post.authorBio ?? undefined,
              "url": "https://surwahi.com/about/our-team"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Surwahi Social Ecoestate",
              "logo": {
                "@type": "ImageObject",
                "url": "https://surwahi.com/assets/logo.png"
              }
            },
            "datePublished": post.publishedAt,
            "dateModified": post.updatedAt,
            "mainEntityOfPage": `https://surwahi.com/blogs/${post.slug}`,
            "articleSection": post.category,
            "keywords": post.tags.join(", "),
            "wordCount": post.content.split(' ').length
          })
        }}
      />
    </div>
  );
}
