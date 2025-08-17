import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, Tag, Share2, ArrowLeft, ArrowRight } from 'lucide-react';
import Breadcrumbs, { BreadcrumbJsonLd } from '@/components/Breadcrumbs';
import { generateBlogMetadata } from '@/lib/seo';

// Mock blog data - will be replaced with database queries
const blogPosts = {
  'sal-forest-morning': {
    id: 1,
    title: 'A Quiet Morning in the Sal Forest',
    slug: 'sal-forest-morning',
    excerpt: 'What a dawn walk taught us about bird calls, patience, and the intricate connections that bind forest ecosystems together.',
    content: `The forest awakens slowly, like an ancient being stretching after deep sleep. It's 5:45 AM, and I'm walking the familiar path that winds through our sal forest, camera in hand, footsteps muffled by years of fallen leaves.

This morning ritual has become sacred to me over the past three years at Surwahi. As our naturalist and photographer, I've witnessed over 500 sunrises in this forest, but each one reveals something new—a behavior I've never noticed, a sound I've never heard, a connection I've never understood.

## The Symphony Begins

The first voices belong to the Oriental Magpie-Robins. Their melodious calls pierce the pre-dawn darkness, complex songs that seem to cascade from the canopy like musical water. Dr. Salim Ali once wrote that these birds "sing the forest awake," and I understand now what he meant. Their calls trigger a cascade response—first the Red-vented Bulbuls join in, then the Spotted Doves add their gentle cooing.

But it's the hornbill's call that stops me in my tracks this morning. The deep, resonant honking echoes from somewhere ahead, and my heart quickens. We've been tracking a pair of Malabar Pied Hornbills for three months now, hoping they'll establish a nest in our territory.

## Patience as Practice

I settle onto a fallen log, camera ready but not raised. One of the most important lessons the forest has taught me is patience. In our hyperconnected world, we've forgotten the art of waiting, of watching, of simply being present. The forest demands this of you.

Twenty minutes pass. The light gradually shifts from deep blue to soft gold. A Spotted Deer emerges from the undergrowth, pauses to assess me as a threat, then continues to browse. Two Indian Giant Squirrels chase each other through the canopy, their dramatic leaps from branch to branch a testament to millions of years of arboreal evolution.

## The Hornbill Appears

At 6:23 AM, the hornbill reveals itself. A magnificent male Malabar Pied Hornbill perches on a branch thirty meters away, his massive yellow casque catching the early light. Through my telephoto lens, I can see every detail—the intricate black and white patterning, the intelligent dark eye, the powerful beak designed for a fruit-based diet.

He's not alone. His mate appears moments later, and I realize they're investigating a large hollow in an ancient sal tree. My pulse quickens again—are they considering this as a nesting site?

## Connections in the Web

As I photograph the hornbills, I become aware of the complex web of relationships playing out around me. The fig tree they're examining is one of over forty species of native trees we've documented in just this hectare of forest. Its fruits feed not just hornbills, but also langurs, flying foxes, and dozens of bird species.

The sal trees that dominate this forest are keystone species—their leaves provide nutrients for the soil when they fall, their trunks support epiphytes and climbing plants, their canopy creates the microclimate that allows the entire ecosystem to flourish.

## What the Forest Teaches

By 7:30 AM, the hornbills have moved on, and the forest has fully awakened. The lesson of this morning, like so many others, is about interconnectedness. The health of our forest depends not on any single species, but on the intricate relationships between all of them.

As humans, we often see ourselves as separate from nature, but mornings like this remind me that we're part of this web too. Our role at Surwahi isn't to control or manage this ecosystem, but to protect it, to learn from it, and to help others experience the profound peace that comes from truly connecting with the natural world.

## Looking Forward

The hornbills haven't committed to nesting here yet, but their presence is encouraging. Five years ago, there were no hornbill sightings in this area. Their return is a sign that our conservation efforts—protecting native trees, maintaining fruit-bearing species, eliminating pesticides—are working.

Tomorrow morning, I'll walk this path again. The forest will teach me something new, as it always does. The hornbills may return, or they may not. But I'll be here, patient and ready, learning the ancient art of paying attention.

*This is what the forest offers those willing to receive it: not answers, but better questions. Not certainty, but wonder. Not control, but connection.*`,
    category: 'Wildlife',
    author: 'Dr. Priya Sharma',
    authorBio: 'Naturalist and photographer at Surwahi Eco-Lodge. PhD in Ornithology from Wildlife Institute of India.',
    publishedAt: '2024-08-15',
    updatedAt: '2024-08-15',
    readingTime: 6,
    featuredImage: {
      url: '/images/blog/sal-forest-dawn.jpg',
      alt: 'Golden morning light filtering through sal forest canopy',
      caption: 'Dawn breaks over the sal forest at Surwahi Eco-Lodge'
    },
    tags: ['forest', 'wildlife', 'morning', 'birdwatching', 'hornbills', 'nature photography', 'conservation'],
    isPublished: true,
    seoTitle: 'A Quiet Morning in the Sal Forest - Wildlife Stories from Surwahi',
    seoDescription: 'Join our naturalist on a dawn walk through the sal forest and discover the intricate connections that bind forest ecosystems together.'
  }
};

const relatedPosts = [
  {
    id: 2,
    title: 'The Return of the Hornbills',
    slug: 'hornbill-return',
    excerpt: 'After five years of conservation efforts, the Malabar Pied Hornbills have returned to nest in our forest.',
    image: '/images/blog/hornbill-nest.jpg',
    category: 'Wildlife',
    publishedAt: '2024-07-20',
    readingTime: 6
  },
  {
    id: 3,
    title: 'Night Sounds of the Forest',
    slug: 'night-sounds',
    excerpt: 'A guide to the nocturnal symphony that plays every night at Surwahi.',
    image: '/images/blog/night-forest.jpg',
    category: 'Wildlife',
    publishedAt: '2024-07-08',
    readingTime: 4
  },
  {
    id: 4,
    title: 'Monsoon Magic in the Forest',
    slug: 'monsoon-forest',
    excerpt: 'The transformation of our forest during monsoon season and why this is the most critical time for ecosystem health.',
    image: '/images/blog/monsoon-forest.jpg',
    category: 'Conservation',
    publishedAt: '2024-07-28',
    readingTime: 7
  }
];

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];
  
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
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.title, href: `/blog/${post.slug}` }
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  return (
    <div className="pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs customBreadcrumbs={breadcrumbs} />
          <Link
            href="/blog"
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
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-moss-500 hover:text-forest-700 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
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
                      href={`/blog/tag/${tag}`}
                      className="inline-flex items-center gap-1 bg-mist-200/50 hover:bg-moss-500/10 text-soil-700 hover:text-moss-500 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
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
                    <Link href="/blog/category/wildlife" className="block text-soil-700 hover:text-moss-500 transition-colors text-sm">
                      Wildlife Stories
                    </Link>
                    <Link href="/blog/category/conservation" className="block text-soil-700 hover:text-moss-500 transition-colors text-sm">
                      Conservation Updates
                    </Link>
                    <Link href="/things-to-do" className="block text-soil-700 hover:text-moss-500 transition-colors text-sm">
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
                    <Link href={`/blog/${relatedPost.slug}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>
                  
                  <p className="text-soil-700 text-sm mb-4">{relatedPost.excerpt}</p>
                  
                  <Link
                    href={`/blog/${relatedPost.slug}`}
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

      {/* JSON-LD Structured Data */}
      <BreadcrumbJsonLd breadcrumbs={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": `https://surwahi.com${post.featuredImage.url}`,
            "author": {
              "@type": "Person",
              "name": post.author,
              "description": post.authorBio
            },
            "publisher": {
              "@type": "Organization",
              "name": "Surwahi Eco-Lodge",
              "logo": {
                "@type": "ImageObject",
                "url": "https://surwahi.com/assets/logo.png"
              }
            },
            "datePublished": post.publishedAt,
            "dateModified": post.updatedAt,
            "mainEntityOfPage": `https://surwahi.com/blog/${post.slug}`,
            "articleSection": post.category,
            "keywords": post.tags.join(", "),
            "wordCount": post.content.split(' ').length
          })
        }}
      />
    </div>
  );
}
