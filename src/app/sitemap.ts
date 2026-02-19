import { MetadataRoute } from 'next';
import { blogPosts, experienceGroups, workshopGroups } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://surwahi.com';

  // Static routes
  const staticRoutes = [
    '',
    '/about/our-story',
    '/about/our-team',
    '/about/why-surwahi',
    '/accommodations',
    '/blogs',
    '/contact',
    '/experiences',
    '/gallery',
    '/plan-your-visit',
    '/plan-your-visit/getting-here',
    '/plan-your-visit/best-time-to-visit',
    '/plan-your-visit/safari-booking-guide',
    '/plan-your-visit/faqs',
    '/stay',
    '/stories',
    '/stories/guest-reviews',
    '/sustainability',
    '/workshops',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Blog posts
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Experience routes
  const experienceRoutes = experienceGroups.flatMap((group) =>
    group.items.map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  // Workshop routes
  const workshopRoutes = workshopGroups.flatMap((group) =>
    group.items.map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  return [...staticRoutes, ...blogRoutes, ...experienceRoutes, ...workshopRoutes];
}
