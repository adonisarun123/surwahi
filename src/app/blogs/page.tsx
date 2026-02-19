import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import BlogList from './BlogList';

export const metadata = generatePageMetadata(
  'Blogs & Stories',
  'Read stories from Surwahi, including conservation diaries, behind-the-scenes looks, and guest experiences.',
  '/blogs'
);

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
        <BlogList />
      </div>
    </div>
  );
}

