import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'About Us',
  'Learn about the story, philosophy, and team behind Surwahi Eco Lodge.',
  '/about'
);

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-display-xl text-forest-900 mb-8">About Us</h1>
        <div className="space-y-12">
          <section id="our-story">
            <h2 className="font-display text-2xl text-forest-700 mb-4">Our Story</h2>
            <p>Placeholder content...</p>
          </section>
          <section id="land-and-legacy">
            <h2 className="font-display text-2xl text-forest-700 mb-4">The Land & Legacy</h2>
            <p>Placeholder content...</p>
          </section>
          <section id="our-philosophy">
            <h2 className="font-display text-2xl text-forest-700 mb-4">Our Philosophy</h2>
            <p>Placeholder content...</p>
          </section>
          <section id="the-team">
            <h2 className="font-display text-2xl text-forest-700 mb-4">The Team Behind Surwahi</h2>
            <p>Placeholder content...</p>
          </section>
          <section id="conservation-commitments">
            <h2 className="font-display text-2xl text-forest-700 mb-4">Conservation Commitments</h2>
            <p>Placeholder content...</p>
          </section>
        </div>
      </div>
    </div>
  );
}
