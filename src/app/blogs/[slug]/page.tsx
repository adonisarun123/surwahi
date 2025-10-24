import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import Breadcrumbs, { BreadcrumbJsonLd } from '@/components/Breadcrumbs';
import { generateBlogMetadata } from '@/lib/seo';
import ShareButton from '@/components/ShareButton';

// Mock blog data - will be replaced with database queries
const blogPosts = {
  'the-magic-of-the-monsoon-forest': {
    id: 1,
    title: 'The Magic of the Monsoon Forest',
    slug: 'the-magic-of-the-monsoon-forest',
    excerpt: 'The monsoon breathes new life into the forest, transforming the landscape into a vibrant green and filling the air with the scent of wet earth.',
    content: `The forest awakens in a riot of green when the monsoon arrives. After months of dry heat, the first rains are a celebration. The dusty brown landscape transforms into a lush, vibrant paradise, and the air is thick with the petrichor, the scent of wet earth. This is the forest's time of rejuvenation, a magical period that reveals its deepest secrets.

## A Symphony of Life

The monsoon is a sensory explosion. The constant drumming of rain is a backdrop to a symphony of life. Frogs of all shapes and sizes emerge, their croaks filling the nights. The bird calls are different now - more urgent, more joyful. This is the breeding season for many species, and the forest is alive with courtship displays and the frantic activity of nest building.

## The World in a Droplet

It's a time to appreciate the small wonders. A raindrop clinging to a spider's web, a mushroom sprouting from a decaying log, a caterpillar munching on a fresh leaf. The macro world comes alive, offering endless opportunities for photographers and nature lovers to observe the intricate details of the ecosystem. Our guided herping walks are particularly exciting during this season, revealing the hidden world of amphibians and reptiles.

## A Different Kind of Safari

While the core zones of the national parks are closed during the monsoon, the buffer zones offer a unique safari experience. The forest is less crowded, and the landscape is breathtakingly beautiful. It's a chance to see the jungle in its most raw and untamed state. The rain-washed trees, the misty mornings, and the dramatic skies create a mystical atmosphere that is a world away from the dry heat of summer.`,
    category: 'Conservation Diaries',
    author: 'Rhea Sharma',
    authorBio: 'Naturalist and passionate conservationist at Surwahi Social.',
    publishedAt: '2024-08-15',
    updatedAt: '2024-08-15',
    readingTime: 4,
    featuredImage: {
      url: 'https://placehold.co/1200x800/A8BA9A/333333?text=Monsoon+Forest',
      alt: 'A lush green forest during the monsoon season',
      caption: 'The vibrant green of the monsoon forest'
    },
    tags: ['monsoon', 'forest', 'conservation', 'nature', 'rejuvenation'],
    isPublished: true,
    seoTitle: 'The Magic of the Monsoon Forest',
    seoDescription: 'Discover the beauty and secrets of the forest during the monsoon season.'
  },
  'building-with-mud-a-lesson-in-sustainability': {
    id: 2,
    title: 'Building with Mud: A Lesson in Sustainability',
    slug: 'building-with-mud-a-lesson-in-sustainability',
    excerpt: 'Our buildings are more than just structures; they are a testament to our philosophy of sustainable living. Discover how we use the very earth we stand on to create beautiful, comfortable, and eco-friendly spaces.',
    content: `From the very beginning, our vision for Surwahi was to create a space that is in harmony with its surroundings. This philosophy is most tangible in our architecture. We chose to build with mud, one of the oldest and most sustainable building materials known to humankind.

## The Wisdom of the Earth

Building with mud is a tradition that has been practiced in this region for centuries. It is a technique that is both eco-friendly and climate-responsive. Our cob walls, made from a mixture of local soil, straw, and water, provide excellent thermal insulation. They keep the interiors cool in the scorching summer and warm during the chilly winter nights, drastically reducing our need for artificial heating and cooling.

## A Labor of Love and Community

The process of building with mud is a labor of love. Each wall is built by hand, layer by layer. We worked with local artisans who possess the traditional knowledge of this craft, passed down through generations. This not only ensured the authenticity of our structures but also provided meaningful employment to the local community, making them an integral part of our story.

## More Than Just a Building

Our mud structures are living, breathing entities. The natural materials allow the walls to 'breathe', regulating humidity and creating a healthy indoor environment. By choosing to build with mud, we have minimized our carbon footprint, reduced construction waste, and created a space that is truly connected to the land. Our "Build With Mud" workshop offers guests a chance to experience this ancient craft firsthand.`,
    category: 'Behind the Scenes',
    author: 'Arjun Das',
    authorBio: 'Co-founder of Surwahi Social and an advocate for sustainable architecture.',
    publishedAt: '2024-07-28',
    updatedAt: '2024-07-28',
    readingTime: 3,
    featuredImage: {
      url: 'https://placehold.co/1200x800/A8BA9A/333333?text=Mud+Building',
      alt: 'A beautiful structure built with mud',
      caption: 'The art of building with mud'
    },
    tags: ['sustainability', 'eco-architecture', 'mud-building', 'community', 'behind-the-scenes'],
    isPublished: true,
    seoTitle: 'Building with Mud: A Lesson in Sustainability',
    seoDescription: 'Learn about our philosophy of sustainable architecture and the art of building with mud.'
  },
  'a-tiger-sighting-that-changed-my-perspective': {
    id: 3,
    title: 'A Tiger Sighting That Changed My Perspective',
    slug: 'a-tiger-sighting-that-changed-my-perspective',
    excerpt: 'Locking eyes with a wild tiger is an experience that words can hardly do justice. It was a moment of pure awe, a powerful reminder of the raw beauty and importance of our wild spaces.',
    content: `I had been on several safaris before, but nothing could have prepared me for this moment. We were driving through the buffer zone of Kanha, the forest bathed in the golden light of the late afternoon. Our naturalist, with his keen eyes, suddenly stopped the jeep and pointed towards a thicket of bamboo.

## The Majestic Presence

And then I saw her. A tigress, majestic and powerful, emerged from the bamboo. She walked with a silent grace, her stripes a perfect camouflage in the dappled light. She was so close that I could see the twitch of her whiskers and the intensity in her amber eyes. For a few breathtaking moments, our worlds converged. She looked at us, not with aggression, but with a calm, regal indifference.

## A Lesson in Humility

In that moment, I felt a profound sense of humility. I was a guest in her kingdom, a fleeting visitor in a world that has existed for millennia. It was a powerful reminder that these wild spaces do not belong to us. We are merely custodians, with a responsibility to protect them for generations to come.

## The Importance of Conservation

This experience reinforced the importance of the conservation work being done by places like Surwahi Social and the forest department. Every effort to protect these habitats, to create corridors for wildlife, and to mitigate human-animal conflict is a step towards ensuring that future generations can also experience this sense of awe and wonder. My safari was not just a tour; it was a life-altering lesson in the importance of coexistence.`,
    category: 'Guest Experiences',
    author: 'A Guest Blogger',
    authorBio: 'A recent guest at Surwahi Social who was deeply moved by their wildlife experience.',
    publishedAt: '2024-07-10',
    updatedAt: '2024-07-10',
    readingTime: 3,
    featuredImage: {
      url: 'https://placehold.co/1200x800/A8BA9A/333333?text=Tiger+Sighting',
      alt: 'A majestic tiger in the wild',
      caption: 'A moment of awe in the jungle'
    },
    tags: ['tiger', 'safari', 'wildlife', 'conservation', 'guest-experience', 'kanha'],
    isPublished: true,
    seoTitle: 'A Tiger Sighting That Changed My Perspective',
    seoDescription: 'A firsthand account of a life-changing tiger sighting experience near Surwahi.'
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
