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
      { name: 'Experiences', href: '/experiences' },
      { name: 'Workshops', href: '/workshops' },
      { name: 'Knowledge Hub', href: '/knowledge-hub' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Blogs', href: '/blogs' },
    ],
  },
  {
    title: 'About',
    links: [
      { name: 'Our Story', href: '/about-us/our-story' },
      { name: 'The Lodge & Philosophy', href: '/about-us/the-lodge-and-philosophy' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Press & Media', href: '/praises/press-mentions-and-recognitions' },
      { name: 'Awards & Accolades', href: '/praises/awards-and-accolades' },
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
    <footer className="relative bg-sand-50">
      {/* Newsletter CTA Section */}
      <div className="bg-gradient-to-br from-moss-500/5 via-fern-300/5 to-moss-500/5 border-b-2 border-moss-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-moss-500/10 rounded-full mb-6">
              <Mail className="h-8 w-8 text-moss-600" />
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-forest-900 mb-4">
              Stay Connected with Nature
            </h3>
            <p className="text-lg text-soil-700 mb-8 max-w-2xl mx-auto">
              Get updates on conservation efforts, seasonal highlights, and exclusive eco-travel offers delivered to your inbox.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
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
                  className="form-input flex-1 h-14 text-base px-5 bg-white border-2 border-mist-300 focus:border-moss-500 rounded-xl shadow-sm"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 px-8 rounded-xl bg-moss-600 hover:bg-moss-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {isSubmitting ? 'Joining...' : 'Subscribe'}
                </button>
              </div>
              
              {message && (
                <p className={cn(
                  'text-sm mt-4 font-medium',
                  message.includes('Thanks') ? 'text-green-700' : 'text-red-600'
                )}>
                  {message}
                </p>
              )}
              
              <p className="text-sm text-soil-600 mt-4">
                🔒 We respect your privacy. Unsubscribe anytime.{' '}
                <Link href="/privacy" className="text-moss-600 hover:text-moss-700 underline font-medium">
                  Privacy policy
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* About Section */}
          <section className="lg:col-span-2" aria-labelledby="footer-about">
            <div className="mb-6">
              <h3 id="footer-about" className="font-display text-2xl text-forest-900 mb-5 relative inline-block">
                About Surwahi
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-moss-500 rounded-full"></span>
              </h3>
            </div>
            <p className="text-base leading-relaxed text-soil-700 mb-8">
              Surwahi Eco-Lodge is a regenerative, low-impact stay nestled near the forest. 
              We&apos;re committed to conservation, community empowerment, and providing authentic 
              experiences in harmony with nature.
            </p>
            
            {/* Certification Badges */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-soil-600 uppercase tracking-widest">
                Our Certifications
              </p>
              <div className="flex flex-wrap gap-5">
                {certificationBadges.map((badge) => (
                  <div key={badge.name} className="group relative">
                    <Image
                      src={badge.src}
                      alt={badge.name}
                      width={56}
                      height={56}
                      className="h-14 w-auto opacity-60 group-hover:opacity-100 transition-opacity filter grayscale-[30%] group-hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <nav key={section.title} className="lg:col-span-1" aria-labelledby={`footer-${section.title.toLowerCase()}`}>
              <div className="mb-6">
                <h3 
                  id={`footer-${section.title.toLowerCase()}`}
                  className="font-display text-xl text-forest-900 mb-5 relative inline-block"
                >
                  {section.title}
                  <span className="absolute -bottom-2 left-0 w-8 h-1 bg-moss-500 rounded-full"></span>
                </h3>
              </div>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-base text-soil-700 hover:text-moss-600 transition-colors inline-flex items-center group"
                      {...(link.external && {
                        target: '_blank',
                        rel: 'noopener noreferrer'
                      })}
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-moss-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}          

          {/* Contact Info */}
          <section className="lg:col-span-2 md:col-span-2" aria-labelledby="footer-contact">
            <div className="mb-6">
              <h3 id="footer-contact" className="font-display text-xl text-forest-900 mb-5 relative inline-block">
                Get in Touch
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-moss-500 rounded-full"></span>
              </h3>
            </div>
            
            <address className="not-italic text-base space-y-4 mb-8">
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-moss-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-moss-500/20 transition-colors">
                  <MapPin className="h-5 w-5 text-moss-600" />
                </div>
                <span className="text-soil-700 leading-relaxed pt-1.5">
                  Surwahi Social, Village Surwahi, P.O Majgaon, Tehsil Paraswada, District Balaghat, Madhya Pradesh – 481111
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-moss-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-moss-500/20 transition-colors">
                  <Phone className="h-5 w-5 text-moss-600" />
                </div>
                <Link 
                  href="tel:+917795207779" 
                  className="text-soil-700 hover:text-moss-600 transition-colors font-medium pt-1.5"
                >
                  +91 77952 07779
                </Link>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-moss-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-moss-500/20 transition-colors">
                  <Mail className="h-5 w-5 text-moss-600" />
                </div>
                <Link 
                  href="mailto:contact@surwahi.com" 
                  className="text-soil-700 hover:text-moss-600 transition-colors font-medium pt-1.5"
                >
                  contact@surwahi.com
                </Link>
              </div>
            </address>

            <Link
              href="/contact#map"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white border-2 border-moss-500/20 text-forest-900 font-semibold hover:border-moss-500 hover:bg-moss-50 transition-all shadow-sm hover:shadow-md group"
              aria-label="View map and directions"
            >
              <MapPin className="h-5 w-5 text-moss-600" />
              View on Map
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </section>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-mist-200 bg-gradient-to-b from-sand-50 to-sand-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <p className="text-sm text-soil-600 font-medium">
              &copy; {currentYear} Surwahi Eco-Lodge. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <span className="text-sm text-soil-600 font-medium hidden sm:inline">Follow us:</span>
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white border border-mist-200 flex items-center justify-center hover:border-moss-500 hover:bg-moss-50 transition-all shadow-sm hover:shadow group"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <span className="sr-only">{social.name}</span>
                  <span role="img" aria-hidden="true" className="text-lg group-hover:scale-110 transition-transform">{social.icon}</span>
                </Link>
              ))}
            </div>

            {/* Additional Links */}
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link 
                href="/accessibility" 
                className="text-soil-600 hover:text-moss-600 transition-colors"
              >
                Accessibility
              </Link>
              <span className="text-mist-300">•</span>
              <Link 
                href="/sitemap.xml" 
                className="text-soil-600 hover:text-moss-600 transition-colors"
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
