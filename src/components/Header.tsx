'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/types';

const navigation: NavigationItem[] = [
  { name: 'Stay', href: '/accommodations' },
  { name: 'Sustainability', href: '/sustainability' },
  { name: 'Around Surwahi', href: '/around-surwahi' },
  { name: 'Things to do', href: '/things-to-do' },
  { name: 'Itineraries', href: '/itineraries' },
  { name: 'Blog', href: '/blog' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isHomePage = pathname === '/';

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled || !isHomePage
            ? 'bg-bone-0/95 backdrop-blur-md border-b border-mist-200 shadow-sm'
            : 'bg-transparent'
        )}
      >
        {/* Skip to main content link */}
        <Link
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 bg-bone-0 px-3 py-2 rounded-input text-ink-900 shadow-elev-2 z-[60]"
        >
          Skip to content
        </Link>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className={cn(
                  'font-display text-xl lg:text-2xl font-medium transition-colors',
                  scrolled || !isHomePage 
                    ? 'text-forest-900' 
                    : 'text-bone-0'
                )}
              >
                Surwahi
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Primary navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-moss-500 relative',
                    pathname === item.href
                      ? 'text-moss-500'
                      : scrolled || !isHomePage
                      ? 'text-ink-900'
                      : 'text-bone-0',
                    'after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-moss-500 after:transition-all',
                    pathname === item.href ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/#booking"
                className="btn btn-primary text-sm font-medium"
              >
                Check availability
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className={cn(
                'lg:hidden p-2 rounded-input transition-colors',
                scrolled || !isHomePage
                  ? 'text-ink-900 hover:bg-mist-200/50'
                  : 'text-bone-0 hover:bg-bone-0/10'
              )}
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-[60]" 
          role="dialog" 
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-forest-900/60 backdrop-blur-sm" 
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div
            ref={drawerRef}
            id="mobile-menu"
            className="ml-auto h-full w-full max-w-sm bg-bone-0 shadow-elev-2 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 id="mobile-menu-title" className="font-display text-xl text-forest-900">
                  Menu
                </h2>
                <button
                  type="button"
                  className="p-2 rounded-input text-ink-900 hover:bg-mist-200/50"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-1" aria-label="Mobile navigation">
                {navigation.map((item) => {
                  if (item.name === 'Sustainability') {
                    return (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center justify-between w-full py-3 px-3 rounded-input text-left transition-colors',
                            pathname === item.href
                              ? 'bg-moss-500/10 text-moss-500'
                              : 'text-ink-900 hover:bg-mist-200/50'
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="font-medium">{item.name}</span>
                        </Link>
                        
                        {/* Sustainability submenu */}
                        <details className="pl-4 mt-2">
                          <summary className="cursor-pointer py-2 text-sm text-soil-700 hover:text-moss-500">
                            Quick Links
                          </summary>
                          <div className="pl-4 space-y-2 mt-2">
                            <Link
                              href="/sustainability#water"
                              className="block py-1 text-sm text-ink-900 hover:text-moss-500"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Water Conservation
                            </Link>
                            <Link
                              href="/sustainability#energy"
                              className="block py-1 text-sm text-ink-900 hover:text-moss-500"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Solar Energy
                            </Link>
                            <Link
                              href="/sustainability#community"
                              className="block py-1 text-sm text-ink-900 hover:text-moss-500"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Community Impact
                            </Link>
                          </div>
                        </details>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'block py-3 px-3 rounded-input font-medium transition-colors',
                        pathname === item.href
                          ? 'bg-moss-500/10 text-moss-500'
                          : 'text-ink-900 hover:bg-mist-200/50'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-mist-200">
                <Link
                  href="/#booking"
                  className="btn btn-primary w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Check availability
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
