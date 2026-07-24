import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';
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

      <PageHero title={"Blogs & Stories"} subtitle={"Dive deeper into the world of Surwahi. Read our stories of conservation, community, and the magic of the wild heart of India."} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <BlogList />
      </div>
    </div>
  );
}

