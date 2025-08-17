export interface Crumb {
  name: string;
  href: string;
}

export function pathToBreadcrumbs(pathname: string): Crumb[] {
  const parts = pathname.split('/').filter(Boolean);
  const crumbs: Crumb[] = [{ name: 'Home', href: '/' }];
  
  let href = '';
  
  parts.forEach((part, index) => {
    href += `/${part}`;
    
    // Decode URI component and format the label
    const decoded = decodeURIComponent(part);
    let label = decoded.replace(/-/g, ' ').replace(/\b\w/g, s => s.toUpperCase());
    
    // Custom labels for specific routes
    const customLabels: Record<string, string> = {
      'accommodations': 'Accommodations',
      'things-to-do': 'Things to Do',
      'around-surwahi': 'Around Surwahi',
      'how-to-reach': 'How to Reach',
      'sustainability': 'Sustainability',
      'itineraries': 'Itineraries',
      'gallery': 'Gallery',
      'blog': 'Blog',
      'contact': 'Contact',
    };
    
    if (customLabels[part]) {
      label = customLabels[part];
    }
    
    // Handle dynamic routes
    if (index === parts.length - 1) {
      // This is the last part (current page)
      // For dynamic routes like room slugs, we might want to fetch the actual name
      // For now, just format the slug nicely
      if (parts[0] === 'accommodations' && parts.length === 2) {
        // This is a room detail page
        label = formatRoomName(decoded);
      } else if (parts[0] === 'blog' && parts.length === 2) {
        // This is a blog post page
        label = formatBlogTitle(decoded);
      } else if (parts[0] === 'things-to-do' && parts.length === 2) {
        // This is an activity detail page
        label = formatActivityName(decoded);
      }
    }
    
    crumbs.push({ name: label, href });
  });
  
  return crumbs;
}

function formatRoomName(slug: string): string {
  // Convert slug to a nice room name
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatBlogTitle(slug: string): string {
  // Convert slug to a nice blog title
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatActivityName(slug: string): string {
  // Convert slug to a nice activity name
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getBreadcrumbsForPath(pathname: string): Crumb[] {
  // Handle special cases where we might want different breadcrumb structures
  if (pathname.startsWith('/accommodations/')) {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 2) {
      // Room detail page
      return [
        { name: 'Home', href: '/' },
        { name: 'Accommodations', href: '/accommodations' },
        { name: formatRoomName(parts[1]), href: pathname }
      ];
    }
  }
  
  if (pathname.startsWith('/blog/')) {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 2) {
      // Blog post page
      return [
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: formatBlogTitle(parts[1]), href: pathname }
      ];
    }
  }
  
  if (pathname.startsWith('/things-to-do/')) {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 2) {
      // Activity detail page
      return [
        { name: 'Home', href: '/' },
        { name: 'Things to Do', href: '/things-to-do' },
        { name: formatActivityName(parts[1]), href: pathname }
      ];
    }
  }
  
  if (pathname.startsWith('/itineraries/')) {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 2) {
      // City-specific itinerary page
      const cityCode = parts[1].toUpperCase();
      const cityNames: Record<string, string> = {
        'BLR': 'Bengaluru',
        'DEL': 'Delhi',
        'MUM': 'Mumbai',
        'HYD': 'Hyderabad',
        'CCU': 'Kolkata',
        'MAA': 'Chennai',
      };
      
      return [
        { name: 'Home', href: '/' },
        { name: 'Itineraries', href: '/itineraries' },
        { name: `From ${cityNames[cityCode] || cityCode}`, href: pathname }
      ];
    }
  }
  
  // Default breadcrumb generation
  return pathToBreadcrumbs(pathname);
}

export function generateBreadcrumbJsonLd(breadcrumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.href.startsWith('http') 
        ? crumb.href 
        : `https://surwahi.com${crumb.href}`
    }))
  };
}
