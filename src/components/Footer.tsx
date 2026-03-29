'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Leaf, Recycle, Bird, Instagram, Facebook, Linkedin } from 'lucide-react';
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
      { name: 'Stay', href: '/stay' },
      { name: 'Experiences', href: '/experiences' },
      { name: 'Workshops', href: '/workshops' },
      { name: 'Plan Your Visit', href: '/plan-your-visit' },
      { name: 'Stories & News', href: '/stories' },
      { name: 'Gallery', href: '/gallery' },
    ],
  },
  {
    title: 'About',
    links: [
      { name: 'Our Story', href: '/about/our-story' },
      { name: 'Why Surwahi', href: '/about/why-surwahi' },
      { name: 'The Lodge & Philosophy', href: '/about/the-lodge-and-philosophy' },
      { name: 'Our Residents', href: '/about/our-residents' },
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
  { name: 'Instagram', href: 'https://www.instagram.com/surwahisocialecoestatekanha', Icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/surwahisocialecoestatekanha/', Icon: Facebook },
  { name: 'LinkedIn', href: 'https://in.linkedin.com/company/surwahisocialecoestatekanha', Icon: Linkedin },
] as const;

const certificationBadges = [
  { name: 'Eco-Certified', icon: Leaf, color: 'text-green-600 bg-green-50' },
  { name: 'Zero Waste', icon: Recycle, color: 'text-blue-600 bg-blue-50' },
  { name: 'Wildlife Friendly', icon: Bird, color: 'text-amber-600 bg-amber-50' },
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
                  style={{ backgroundColor: 'transparent', color: 'black' }}
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 px-8 rounded-xl bg-moss-600 hover:bg-moss-700 text-dark font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 whitespace-nowrap"
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 max-w-7xl">

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
              <div className="flex flex-wrap gap-3">
                {certificationBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.name}
                      className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-mist-200 bg-white hover:border-moss-500/30 hover:shadow-md transition-all"
                      title={badge.name}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        badge.color
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-soil-700 group-hover:text-moss-600 transition-colors">
                        {badge.name}
                      </span>
                    </div>
                  );
                })}
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
          <section className="lg:col-span-2 md:col-span-1" aria-labelledby="footer-contact">
            <div className="mb-6">
              <h3 id="footer-contact" className="font-display text-xl text-forest-900 mb-5 relative inline-block">
                Get in Touch
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-moss-500 rounded-full"></span>
              </h3>
            </div>

            <address className="not-italic text-base space-y-4">
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
          </section>

          {/* Google Maps Embed - Now beside Contact Info */}
          <section className="lg:col-span-3 md:col-span-1" aria-label="Location Map">
            <div className="w-full h-full min-h-[280px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7788986.880134164!2d73.72899689350048!3d17.59246313028678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2a0ca75f087ccb%3A0xe89d09f64b652f09!2sSurwahi%20Social%20Ecoestate%20Kanha!5e0!3m2!1sen!2sin!4v1762322342765!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '280px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Surwahi Location Map"
              />
            </div>
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
              {socialLinks.map((social) => {
                const Icon = social.Icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white border border-mist-200 flex items-center justify-center hover:border-moss-500 hover:bg-moss-50 transition-all shadow-sm hover:shadow group"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <span className="sr-only">{social.name}</span>
                    <Icon className="h-5 w-5 text-soil-700 group-hover:text-moss-600 group-hover:scale-110 transition-all" aria-hidden />
                  </Link>
                );
              })}
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
