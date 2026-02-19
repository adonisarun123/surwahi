'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Instagram, Facebook, Linkedin } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { NavigationItem } from '@/types';
import { mainNavigation, ctaButton, workshopGroups } from '@/config/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isTransparent = !scrolled && !mobileMenuOpen && pathname === '/';

  const NavLink = ({ item }: { item: NavigationItem }) => {
    const isActive = pathname.startsWith(item.href);
    return (
      <Link
        href={item.href}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
          ? 'text-moss-500'
          : isTransparent ? 'text-bone-0 hover:text-bone-0/80' : 'text-soil-700 hover:text-forest-900'
          }`}
      >
        {item.label}
        {item.isNew && (
          <span className="ml-1 inline-flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">New</span>
        )}
      </Link>
    );
  };

  const DropdownLink = ({ item }: { item: NavigationItem }) => {
    const isActive = pathname.startsWith(item.href);
    const isWorkshops = item.label === 'Workshops';

    return (
      <div className="group relative">
        <Link
          href={item.href}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
            ? 'text-moss-500'
            : isTransparent ? 'text-bone-0 hover:text-bone-0/80' : 'text-soil-700 hover:text-forest-900'
            }`}
        >
          {item.label}
          <ChevronDown className={`ml-1 h-4 w-4 transition-colors group-hover:text-forest-900 ${isTransparent ? 'text-bone-0' : 'text-soil-700'}`} />
        </Link>

        {/* Mega Menu for Workshops */}
        {isWorkshops ? (
          <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block pt-2 w-[600px] z-50">
            <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="grid grid-cols-3 gap-6 p-6">
                {workshopGroups.map((group) => (
                  <div key={group.groupLabel}>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 border-b border-stone-100 pb-1">
                      {group.groupLabel}
                    </h4>
                    <ul className="space-y-2">
                      {group.items.map((subItem) => (
                        <li key={subItem.href}>
                          <Link href={subItem.href} className="block text-sm text-soil-700 hover:text-moss-600 transition-colors">
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Standard Dropdown */
          <div className="absolute top-full left-0 hidden group-hover:block pt-2 w-64 z-50">
            <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {item.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="flex items-center justify-between px-4 py-2 text-sm text-soil-700 hover:bg-sand-50 hover:text-forest-900"
                  >
                    <span>{child.label}</span>
                    {child.isNew && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">New</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="https://ik.imagekit.io/adonisarun/surwahi-logo.png?updatedAt=1761322022431"
                alt="Surwahi Logo"
                width={168}
                height={56}
                className="h-14 w-auto"
                priority
              />
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {mainNavigation.map((item) => (
              item.children ? <DropdownLink key={item.label} item={item} /> : <NavLink key={item.label} item={item} />
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-3 border-r border-stone-200 pr-4 mr-2">
              <a href="https://www.instagram.com/surwahisocialecoestatekanha" target="_blank" rel="noopener noreferrer"
                className={`transition-colors ${isTransparent ? 'text-bone-0 hover:text-bone-0/80' : 'text-stone-400 hover:text-moss-600'}`} aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/surwahisocialecoestatekanha/" target="_blank" rel="noopener noreferrer"
                className={`transition-colors ${isTransparent ? 'text-bone-0 hover:text-bone-0/80' : 'text-stone-400 hover:text-moss-600'}`} aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://in.linkedin.com/company/surwahisocialecoestatekanha" target="_blank" rel="noopener noreferrer"
                className={`transition-colors ${isTransparent ? 'text-bone-0 hover:text-bone-0/80' : 'text-stone-400 hover:text-moss-600'}`} aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <Link href={ctaButton.href} className="btn btn-primary" style={{ color: 'white' }}>
              {ctaButton.label}
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-moss-500 ${isTransparent ? 'text-bone-0 hover:text-bone-0/80 hover:bg-bone-0/10' : 'text-soil-700 hover:text-forest-900 hover:bg-sand-50'
                }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-forest-900/20 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-white shadow-lg overflow-y-auto max-h-[calc(100vh-5rem)] z-50 border-t border-mist-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {mainNavigation.map((item) => (
              item.children ? (
                <div key={item.label} className="group border-b border-stone-100 last:border-0">
                  <Link href={item.href} className="flex items-center justify-between w-full px-3 py-3 text-base font-semibold text-soil-700 hover:text-forest-900 hover:bg-sand-50">
                    {item.label}
                    {item.isNew && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">New</span>
                    )}
                  </Link>
                  <div className="pl-4 pb-2">
                    {/* Special handling for Workshops in Mobile */}
                    {item.label === 'Workshops' ? (
                      workshopGroups.map(group => (
                        <div key={group.groupLabel} className="mb-3">
                          <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-3 py-1">{group.groupLabel}</div>
                          {group.items.map(subItem => (
                            <Link key={subItem.label} href={subItem.href} className="block px-3 py-2 rounded-md text-sm font-medium text-soil-600 hover:text-forest-900 hover:bg-sand-50 pl-6">
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      ))
                    ) : (
                      item.children.map((child) => (
                        <Link key={child.label} href={child.href} className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-soil-600 hover:text-forest-900 hover:bg-sand-50">
                          <span>{child.label}</span>
                          {child.isNew && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">New</span>
                          )}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <Link key={item.label} href={item.href} className="block px-3 py-3 border-b border-stone-100 text-base font-semibold text-soil-700 hover:text-forest-900 hover:bg-sand-50">
                  {item.label}
                </Link>
              )
            ))}
          </div>
          <div className="px-5 py-6 bg-sand-50">
            <div className="flex justify-center gap-6 mb-6">
              <a href="https://www.instagram.com/surwahisocialecoestatekanha" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-moss-600">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/surwahisocialecoestatekanha/" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-moss-600">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://in.linkedin.com/company/surwahisocialecoestatekanha" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-moss-600">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            <Link href={ctaButton.href} className="btn btn-primary w-full text-center flex justify-center items-center" style={{ color: 'white' }}>
              {ctaButton.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
