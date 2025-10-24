import Link from 'next/link';
import Image from 'next/image';
import { User, Calendar, Tag } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Blogs & Stories',
  'Read stories from Surwahi, including conservation diaries, behind-the-scenes looks, and guest experiences.',
  '/blogs'
);

const blogPosts = [
  {
    slug: 'the-magic-of-the-monsoon-forest',
    title: 'The Magic of the Monsoon Forest',
    author: 'Rhea Sharma',
    date: 'August 15, 2024',
    category: 'Conservation Diaries',
    excerpt: 'The monsoon breathes new life into the forest. The landscape transforms into a vibrant green, and the air is filled with the scent of wet earth. It’s a time of rejuvenation, and a magical time to witness the secrets of the jungle.',
    imageUrl: 'https://placehold.co/800x600/A8BA9A/333333?text=Monsoon+Forest',
  },
  {
    slug: 'building-with-mud-a-lesson-in-sustainability',
    title: 'Building with Mud: A Lesson in Sustainability',
    author: 'Arjun Das',
    date: 'July 28, 2024',
    category: 'Behind the Scenes',
    excerpt: 'Our buildings are more than just structures; they are a testament to our philosophy. Discover the journey of how we use the very earth we stand on to create spaces that are both beautiful and sustainable.',
    imageUrl: 'https://placehold.co/800x600/A8BA9A/333333?text=Mud+Building',
  },
  {
    slug: 'a-tiger-sighting-that-changed-my-perspective',
    title: 'A Tiger Sighting That Changed My Perspective',
    author: 'A Guest Blogger',
    date: 'July 10, 2024',
    category: 'Guest Experiences',
    excerpt: 'Locking eyes with a wild tiger is an experience that words can hardly do justice. It was a moment of pure awe, a powerful reminder of the raw beauty and importance of our wild spaces.',
    imageUrl: 'https://placehold.co/800x600/A8BA9A/333333?text=Tiger+Sighting',
  },
];

export default function BlogPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-display-xl text-forest-900 mb-4">
                Blogs & Stories
            </h1>
            <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
                Dive deeper into the world of Surwahi. Read our stories of conservation, community, and the magic of the wild heart of India.
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link href={`/blogs/${post.slug}`} key={post.slug} className="group block bg-bone-0 rounded-card overflow-hidden shadow-elev-1 hover:shadow-elev-2 transition-all">
              <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-soil-700 mb-2">
                  <Tag className="h-4 w-4 mr-2 text-moss-500" />
                  <span>{post.category}</span>
                </div>
                <h3 className="font-display text-2xl text-forest-900 mb-2 group-hover:text-moss-600 transition-colors">{post.title}</h3>
                <p className="text-soil-700 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <div className="flex items-center mr-4">
                    <User className="h-3 w-3 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
