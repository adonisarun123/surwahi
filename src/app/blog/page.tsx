import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, Calendar, Clock, User, Tag, ArrowRight, Leaf } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Blog',
  'Stories from the forest - conservation updates, community stories, and forest wisdom from Surwahi Eco-Lodge. Discover nature through our sustainable living insights.',
  '/blog'
);

// Mock data - will be replaced with database queries
const blogCategories = [
  { name: 'All Posts', slug: 'all', count: 24 },
  { name: 'Conservation', slug: 'conservation', count: 8 },
  { name: 'Community', slug: 'community', count: 6 },
  { name: 'Wildlife', slug: 'wildlife', count: 5 },
  { name: 'Sustainability', slug: 'sustainability', count: 3 },
  { name: 'Travel Tips', slug: 'travel-tips', count: 2 }
];

const featuredPost = {
  id: 1,
  title: 'A Quiet Morning in the Sal Forest',
  slug: 'sal-forest-morning',
  excerpt: 'What a dawn walk taught us about bird calls, patience, and the intricate connections that bind forest ecosystems together.',
  content: 'The forest awakens slowly, like an ancient being stretching after deep sleep...',
  category: 'Wildlife',
  author: 'Dr. Priya Sharma',
  publishedAt: '2024-08-15',
  readingTime: 6,
  image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  tags: ['forest', 'wildlife', 'morning', 'birdwatching', 'nature'],
  isPublished: true,
  isFeatured: true
};

const blogPosts = [
  {
    id: 2,
    title: 'Our Journey to Zero Waste',
    slug: 'zero-waste-journey',
    excerpt: 'How we achieved zero waste to landfill and what it means for conservation. A detailed look at our waste management systems.',
    category: 'Sustainability',
    author: 'Raj Kumar',
    publishedAt: '2024-08-10',
    readingTime: 8,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['sustainability', 'waste management', 'conservation'],
    isPublished: true,
    isFeatured: false
  },
  {
    id: 3,
    title: 'Supporting Local Communities',
    slug: 'supporting-communities',
    excerpt: 'Meet the artisans and farmers who make Surwahi possible. Stories from our community partnership program.',
    category: 'Community',
    author: 'Anita Devi',
    publishedAt: '2024-08-05',
    readingTime: 5,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['community', 'artisans', 'local economy'],
    isPublished: true,
    isFeatured: false
  },
  {
    id: 4,
    title: 'Monsoon Magic in the Forest',
    slug: 'monsoon-forest',
    excerpt: 'The transformation of our forest during monsoon season and why this is the most critical time for ecosystem health.',
    category: 'Conservation',
    author: 'Dr. Priya Sharma',
    publishedAt: '2024-07-28',
    readingTime: 7,
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['monsoon', 'forest ecosystem', 'conservation'],
    isPublished: true,
    isFeatured: false
  },
  {
    id: 5,
    title: 'The Return of the Hornbills',
    slug: 'hornbill-return',
    excerpt: 'After five years of conservation efforts, the Malabar Pied Hornbills have returned to nest in our forest.',
    category: 'Wildlife',
    author: 'Surwahi Wildlife Team',
    publishedAt: '2024-07-20',
    readingTime: 6,
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['hornbills', 'conservation success', 'wildlife'],
    isPublished: true,
    isFeatured: false
  },
  {
    id: 6,
    title: 'Permaculture in Practice',
    slug: 'permaculture-practice',
    excerpt: 'How we grow food in harmony with nature using permaculture principles. A behind-the-scenes look at our organic garden.',
    category: 'Sustainability',
    author: 'Organic Garden Team',
    publishedAt: '2024-07-15',
    readingTime: 9,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['permaculture', 'organic farming', 'sustainability'],
    isPublished: true,
    isFeatured: false
  },
  {
    id: 7,
    title: 'Night Sounds of the Forest',
    slug: 'night-sounds',
    excerpt: 'A guide to the nocturnal symphony that plays every night at Surwahi. Learn to identify calls and understand behavior.',
    category: 'Wildlife',
    author: 'Naturalist Guide Team',
    publishedAt: '2024-07-08',
    readingTime: 4,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['nocturnal wildlife', 'sounds', 'night safari'],
    isPublished: true,
    isFeatured: false
  },
  {
    id: 8,
    title: 'Traditional Knowledge, Modern Conservation',
    slug: 'traditional-knowledge',
    excerpt: 'How indigenous wisdom guides our conservation efforts. Learning from communities who have protected these forests for generations.',
    category: 'Community',
    author: 'Dr. Priya Sharma',
    publishedAt: '2024-07-01',
    readingTime: 10,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['traditional knowledge', 'community', 'conservation'],
    isPublished: true,
    isFeatured: false
  },
  {
    id: 9,
    title: 'Planning Your First Forest Visit',
    slug: 'first-forest-visit',
    excerpt: 'Essential tips for first-time visitors to make the most of your forest experience while respecting nature.',
    category: 'Travel Tips',
    author: 'Guest Experience Team',
    publishedAt: '2024-06-25',
    readingTime: 6,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['travel tips', 'first visit', 'forest etiquette'],
    isPublished: true,
    isFeatured: false
  }
];

const recentTags = ['forest', 'wildlife', 'sustainability', 'conservation', 'community', 'monsoon', 'permaculture', 'traditional knowledge'];

interface BlogCardProps {
  post: typeof blogPosts[0];
  featured?: boolean;
}

function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article className={`group bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all ${featured ? 'md:col-span-2' : ''}`}>
      <div className={`${featured ? 'md:grid md:grid-cols-2' : ''}`}>
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? 'aspect-[4/3] md:aspect-auto' : 'aspect-[4/3]'}`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-moss-500 text-bone-0 px-2 py-1 rounded text-xs font-medium">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={`p-6 ${featured ? 'md:flex md:flex-col md:justify-center' : ''}`}>
          <div className="flex items-center gap-4 text-sm text-soil-700 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time>{new Date(post.publishedAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          <h2 className={`font-display text-forest-900 mb-3 group-hover:text-moss-500 transition-colors ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>

          <p className={`text-soil-700 mb-4 ${featured ? 'text-lg' : ''}`}>
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-3 w-3 text-soil-700" />
              <span className="text-soil-700">{post.author}</span>
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center text-moss-500 hover:text-forest-700 transition-colors text-sm font-medium"
            >
              Read More
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>

          {/* Tags for featured post */}
          {featured && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="bg-mist-200/50 text-soil-700 px-2 py-1 rounded text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  return (
    <div className="pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      {/* Header */}
      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-display-xl text-forest-900 mb-4">
              Stories from the Forest
            </h1>
            <p className="text-body-lg text-soil-700 mb-8">
              Updates on conservation efforts, community stories, forest wisdom, and insights 
              from our sustainable living journey at Surwahi Eco-Lodge.
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-soil-700" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="form-input pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-soil-700" />
                <select className="form-input min-w-[150px]">
                  {blogCategories.map(category => (
                    <option key={category.slug} value={category.slug}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg text-forest-900 mb-4">
              Featured Story
            </h2>
            <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
              Our latest insights from the forest and conservation work.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <BlogCard post={featuredPost} featured={true} />
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 lg:py-24 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-display text-2xl text-forest-900">
              Recent Posts
            </h2>
            <div className="flex items-center gap-4">
              <select className="form-input">
                <option>Latest First</option>
                <option>Oldest First</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 6).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn btn-secondary">
              Load More Stories
            </button>
          </div>
        </div>
      </section>

      {/* Categories & Tags Sidebar */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            
            {/* Categories */}
            <div className="lg:col-span-1">
              <h3 className="font-display text-xl text-forest-900 mb-6">Categories</h3>
              <div className="space-y-3">
                {blogCategories.slice(1).map((category) => (
                  <Link
                    key={category.slug}
                    href={`/blog/category/${category.slug}`}
                    className="flex items-center justify-between p-3 rounded-input hover:bg-sand-50 transition-colors"
                  >
                    <span className="text-soil-700 hover:text-moss-500">{category.name}</span>
                    <span className="text-xs bg-mist-200 text-soil-700 px-2 py-1 rounded">{category.count}</span>
                  </Link>
                ))}
              </div>

              {/* Popular Tags */}
              <h3 className="font-display text-xl text-forest-900 mb-6 mt-12">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recentTags.map((tag) => (
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

            {/* Newsletter Signup */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-r from-forest-700 to-moss-500 rounded-card p-8 text-center text-bone-0">
                <div className="max-w-2xl mx-auto">
                  <div className="w-16 h-16 bg-bone-0/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Leaf className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-2xl mb-4">
                    Stay Updated with Forest Stories
                  </h3>
                  <p className="text-lg opacity-90 mb-8">
                    Get monthly updates on our conservation efforts, wildlife sightings, 
                    and sustainable living insights delivered to your inbox.
                  </p>
                  
                  <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="form-input flex-1 bg-bone-0 text-ink-900"
                      required
                    />
                    <button type="submit" className="btn bg-bone-0/20 border-bone-0/30 text-bone-0 hover:bg-bone-0/30">
                      Subscribe
                    </button>
                  </form>
                  
                  <p className="text-sm opacity-80 mt-4">
                    Join 2,500+ nature lovers. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Archive */}
      <section className="py-16 lg:py-24 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl text-forest-900 mb-4">
              Explore Our Archive
            </h2>
            <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
              Browse our complete collection of stories, organized by topic and date.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/blog/category/conservation" className="group bg-bone-0 rounded-card p-6 hover:shadow-elev-1 transition-all">
              <div className="w-12 h-12 bg-fern-300/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-fern-300/20 transition-colors">
                <Leaf className="h-6 w-6 text-fern-300" />
              </div>
              <h3 className="font-display text-lg text-forest-900 mb-2">Conservation Stories</h3>
              <p className="text-soil-700 text-sm mb-3">Updates on our environmental protection efforts and impact.</p>
              <div className="text-moss-500 text-sm font-medium">8 articles →</div>
            </Link>

            <Link href="/blog/category/community" className="group bg-bone-0 rounded-card p-6 hover:shadow-elev-1 transition-all">
              <div className="w-12 h-12 bg-clay-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-clay-500/20 transition-colors">
                <User className="h-6 w-6 text-clay-500" />
              </div>
              <h3 className="font-display text-lg text-forest-900 mb-2">Community Impact</h3>
              <p className="text-soil-700 text-sm mb-3">Stories from local communities and partnership programs.</p>
              <div className="text-moss-500 text-sm font-medium">6 articles →</div>
            </Link>

            <Link href="/blog/category/wildlife" className="group bg-bone-0 rounded-card p-6 hover:shadow-elev-1 transition-all">
              <div className="w-12 h-12 bg-river-400/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-river-400/20 transition-colors">
                <Calendar className="h-6 w-6 text-river-400" />
              </div>
              <h3 className="font-display text-lg text-forest-900 mb-2">Wildlife Chronicles</h3>
              <p className="text-soil-700 text-sm mb-3">Observations and insights from our forest ecosystem.</p>
              <div className="text-moss-500 text-sm font-medium">5 articles →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Surwahi Eco-Lodge Blog",
            "description": "Stories from the forest - conservation updates, community stories, and forest wisdom",
            "url": "https://surwahi.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Surwahi Eco-Lodge",
              "logo": {
                "@type": "ImageObject",
                "url": "https://surwahi.com/assets/logo.png"
              }
            },
            "mainEntity": [featuredPost, ...blogPosts.slice(0, 5)].map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "url": `https://surwahi.com/blog/${post.slug}`,
              "datePublished": post.publishedAt,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "image": `https://surwahi.com${post.image}`
            }))
          })
        }}
      />
    </div>
  );
}
