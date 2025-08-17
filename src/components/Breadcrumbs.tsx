'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbsForPath } from '@/lib/breadcrumbs';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  className?: string;
  showHome?: boolean;
  customBreadcrumbs?: Array<{ name: string; href: string }>;
}

export default function Breadcrumbs({ 
  className, 
  showHome = true,
  customBreadcrumbs 
}: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on home page
  if (pathname === '/') {
    return null;
  }

  const breadcrumbs = customBreadcrumbs || getBreadcrumbsForPath(pathname);

  // Filter out home if showHome is false
  const filteredBreadcrumbs = showHome ? breadcrumbs : breadcrumbs.slice(1);

  if (filteredBreadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav
      className={cn(
        'flex items-center space-x-1 text-sm',
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {filteredBreadcrumbs.map((crumb, index) => {
          const isLast = index === filteredBreadcrumbs.length - 1;
          const isHome = crumb.href === '/';

          return (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight 
                  className="h-4 w-4 text-mist-200 mx-1 flex-shrink-0" 
                  aria-hidden="true" 
                />
              )}
              
              {isLast ? (
                <span 
                  className="text-ink-900 font-medium"
                  aria-current="page"
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className={cn(
                    'hover:text-moss-500 transition-colors',
                    'text-soil-700 hover:underline',
                    'focus:outline-none focus:ring-2 focus:ring-moss-500 focus:ring-offset-2 rounded-sm'
                  )}
                >
                  {isHome && showHome ? (
                    <span className="flex items-center gap-1">
                      <Home className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only sm:not-sr-only">Home</span>
                    </span>
                  ) : (
                    crumb.name
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Structured data component for breadcrumbs
interface BreadcrumbJsonLdProps {
  breadcrumbs?: Array<{ name: string; href: string }>;
}

export function BreadcrumbJsonLd({ breadcrumbs }: BreadcrumbJsonLdProps) {
  const pathname = usePathname();
  const crumbs = breadcrumbs || getBreadcrumbsForPath(pathname);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.href.startsWith('http') 
        ? crumb.href 
        : `https://surwahi.com${crumb.href}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Compact breadcrumbs for mobile (truncates middle items)
interface CompactBreadcrumbsProps extends BreadcrumbsProps {
  maxItems?: number;
}

export function CompactBreadcrumbs({ 
  className, 
  showHome = true,
  customBreadcrumbs,
  maxItems = 3 
}: CompactBreadcrumbsProps) {
  const pathname = usePathname();
  
  if (pathname === '/') {
    return null;
  }

  const breadcrumbs = customBreadcrumbs || getBreadcrumbsForPath(pathname);
  const filteredBreadcrumbs = showHome ? breadcrumbs : breadcrumbs.slice(1);

  if (filteredBreadcrumbs.length <= 1) {
    return null;
  }

  // For mobile, show first, ellipsis, and last if there are too many items
  let displayBreadcrumbs = filteredBreadcrumbs;
  let showEllipsis = false;

  if (filteredBreadcrumbs.length > maxItems) {
    showEllipsis = true;
    displayBreadcrumbs = [
      filteredBreadcrumbs[0], // First (Home)
      filteredBreadcrumbs[filteredBreadcrumbs.length - 1] // Last (current page)
    ];
  }

  return (
    <nav
      className={cn(
        'flex items-center space-x-1 text-sm',
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {displayBreadcrumbs.map((crumb, index) => {
          const isLast = !showEllipsis 
            ? index === displayBreadcrumbs.length - 1
            : index === 1; // In truncated view, second item is last
          const isHome = crumb.href === '/';

          return (
            <li key={`${crumb.href}-${index}`} className="flex items-center">
              {index > 0 && (
                <>
                  {showEllipsis && index === 1 && (
                    <>
                      <ChevronRight 
                        className="h-4 w-4 text-mist-200 mx-1 flex-shrink-0" 
                        aria-hidden="true" 
                      />
                      <span className="text-mist-200 mx-1" aria-hidden="true">
                        ...
                      </span>
                    </>
                  )}
                  <ChevronRight 
                    className="h-4 w-4 text-mist-200 mx-1 flex-shrink-0" 
                    aria-hidden="true" 
                  />
                </>
              )}
              
              {isLast ? (
                <span 
                  className="text-ink-900 font-medium"
                  aria-current="page"
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className={cn(
                    'hover:text-moss-500 transition-colors',
                    'text-soil-700 hover:underline',
                    'focus:outline-none focus:ring-2 focus:ring-moss-500 focus:ring-offset-2 rounded-sm'
                  )}
                >
                  {isHome && showHome ? (
                    <span className="flex items-center gap-1">
                      <Home className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only sm:not-sr-only">Home</span>
                    </span>
                  ) : (
                    crumb.name
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
