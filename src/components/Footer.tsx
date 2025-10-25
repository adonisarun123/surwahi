'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterSection {
  title: string;
  links: Array<{
    name: string;
    href: string;
    external?: boolean;
  }>;
}

const footerSections: FooterSection[] = [
  {
    title: 'Explore',
    links: [
      { name: 'Accommodations', href: '/accommodations' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Things to Do', href: '/things-to-do' },
      { name: 'Knowledge Hub', href: '/knowledge-hub' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Blog', href: '/blogs' },
    ],
  },
  {
    title: 'About',
    links: [
      { name: 'Our Story', href: '/about' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Community Impact', href: '/sustainability#community' },
      { name: 'Press & Media', href: '/press' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cancellation Policy', href: '/cancellation' },
      { name: 'House Rules', href: '/house-rules' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/surwahi', icon: '📷' },
  { name: 'Facebook', href: 'https://www.facebook.com/surwahi', icon: '📘' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/surwahi', icon: '💼' },
];

const certificationBadges = [
  { name: 'Eco-certified by Green Tourism', src: '/images/badges/green-tourism.svg' },
  { name: 'Zero Waste Commitment', src: '/images/badges/zero-waste.svg' },
  { name: 'Wildlife Friendly', src: '/images/badges/wildlife-friendly.svg' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage('Thanks for subscribing! Check your email to confirm.');
        setEmail('');
      } else {
        setMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-sand-50 text-ink-900">
      {/* Decorative Top Band with Pattern */}
      <div
        className="relative h-24 sm:h-28 md:h-32 overflow-hidden"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(var(--footer-top-curve) 300px at 50% -220px, rgba(30,87,65,.10), transparent 70%),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Cdefs%3E%3Cfilter id='soften'%3E%3CfeGaussianBlur stdDeviation='0.3'/%3E%3C/filter%3E%3C/defs%3E%3Cg fill='none' stroke='%230F261A' stroke-opacity='0.12' stroke-width='1.2' filter='url(%23soften)'%3E%3Cpath d='M-20,80 C120,40 220,100 360,60 480,30 560,90 640,60'/%3E%3Cpath d='M-40,160 C110,120 240,180 360,140 500,100 560,160 660,130'/%3E%3Cpath d='M-10,240 C90,210 220,260 350,220 480,190 590,250 680,220'/%3E%3Cpath d='M-30,320 C130,280 210,340 340,300 470,270 560,330 700,300'/%3E%3C/g%3E%3C/svg%3E")
          `,
          backgroundSize: '1200px 300px, 600px 400px',
          backgroundRepeat: 'no-repeat, repeat',
          backgroundPosition: '50% -220px, 0 0',
        }}
      />

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* About Section */}
          <section className="sm:col-span-2 lg:col-span-1" aria-labelledby="footer-about">
            <h3 id="footer-about" className="font-display text-xl text-forest-900 mb-4">
              About Surwahi
            </h3>
            <p className="text-sm leading-6 text-ink-900 mb-6">
              Surwahi Eco-Lodge is a regenerative, low-impact stay nestled near the forest. 
              We&apos;re committed to conservation, community empowerment, and providing authentic 
              experiences in harmony with nature.
            </p>
            
            {/* Certification Badges */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-soil-700 uppercase tracking-wide">
                Certifications
              </p>
              <div className="flex flex-wrap gap-3">
                {certificationBadges.map((badge) => (
                  <Image
                    key={badge.name}
                    src={badge.src}
                    alt={badge.name}
                    width={32}
                    height={32}
                    className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <nav key={section.title} aria-labelledby={`footer-${section.title.toLowerCase()}`}>
              <h3 
                id={`footer-${section.title.toLowerCase()}`}
                className="font-display text-xl text-forest-900 mb-4"
              >
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-900 hover:text-moss-500 transition-colors"
                      {...(link.external && {
                        target: '_blank',
                        rel: 'noopener noreferrer'
                      })}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact & Newsletter */}
          <section className="sm:col-span-2 lg:col-span-1" aria-labelledby="footer-contact">
            <h3 id="footer-contact" className="font-display text-xl text-forest-900 mb-4">
              Stay Connected
            </h3>
            
            {/* Contact Info */}
            <address className="not-italic text-sm space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-moss-500 mt-0.5 flex-shrink-0" />
                <span>
                  Surwahi Social, Village Surwahi, P.O Majgaon, Tehsil Paraswada, District Balaghat, Madhya Pradesh – 481111
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-moss-500 flex-shrink-0" />
                <Link 
                  href="tel:+919744844777" 
                  className="hover:text-moss-500 transition-colors"
                >
                  +91 97448 44777
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-moss-500 flex-shrink-0" />
                <Link 
                  href="mailto:contact@surwahi.com" 
                  className="hover:text-moss-500 transition-colors"
                >
                  contact@surwahi.com
                </Link>
              </div>
            </address>

            <Link
              href="/contact#map"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-input bg-bone-0 border border-mist-200 text-sm font-medium hover:border-moss-500 hover:shadow-elev-1 transition-all"
              aria-label="View map and directions"
            >
              <MapPin className="h-4 w-4" />
              Map & Directions
              <ArrowRight className="h-3 w-3" />
            </Link>

            {/* Newsletter Signup */}
            <div className="mt-8 pt-6 border-t border-mist-200">
              <h4 className="font-medium text-forest-900 mb-3">Newsletter</h4>
              <p className="text-sm text-ink-900 mb-4">
                Get updates on conservation efforts, seasonal highlights, and exclusive offers.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="form-input flex-1 text-sm"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-input bg-forest-700 text-bone-0 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {isSubmitting ? 'Joining...' : 'Join'}
                  </button>
                </div>
                
                {message && (
                  <p className={cn(
                    'text-xs',
                    message.includes('Thanks') ? 'text-success' : 'text-error'
                  )}>
                    {message}
                  </p>
                )}
                
                <p className="text-xs text-soil-700">
                  We use double opt-in. Unsubscribe anytime. 
                  <Link href="/privacy" className="underline hover:no-underline">
                    Privacy policy
                  </Link>
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-mist-200 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <p className="text-xs text-ink-900">
              &copy; {currentYear} Surwahi Eco-Lodge. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-soil-700 hidden sm:inline">Follow us:</span>
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-moss-500 transition-colors"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <span className="sr-only">{social.name}</span>
                  <span role="img" aria-hidden="true">{social.icon}</span>
                </Link>
              ))}
            </div>

            {/* Additional Links */}
            <div className="flex items-center gap-4 text-xs">
              <Link 
                href="/accessibility" 
                className="text-ink-900 hover:text-moss-500 transition-colors"
              >
                Accessibility
              </Link>
              <Link 
                href="/sitemap" 
                className="text-ink-900 hover:text-moss-500 transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
