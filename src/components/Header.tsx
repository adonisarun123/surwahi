'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { NavigationItem } from '@/types';

const navigation: NavigationItem[] = [
  {
    name: 'About Us',
    href: '/about-us',
    children: [
      { name: 'Our Story', href: '/about-us/our-story' },
      { name: 'The Lodge & Philosophy', href: '/about-us/the-lodge-and-philosophy' },
      { name: 'Accommodations', href: '/accommodations' },
      { name: 'Dining & Local Cuisine', href: '/about-us/dining-and-local-cuisine' },
      { name: 'Fact Sheet', href: '/about-us/fact-sheet' },
      { name: 'Our Residents (Flora & Fauna)', href: '/about-us/our-residents' },
    ],
  },
  {
    name: 'Experiences',
    href: '/experiences',
    children: [
        { name: 'Wildlife Safaris', href: '/experiences/wildlife-safaris' },
        { name: 'Guided Forest Trails', href: '/experiences/guided-forest-trails' },
        { name: 'Bird-watching Expeditions', href: '/experiences/bird-watching-expeditions' },
        { name: 'Farm Life Visit', href: '/experiences/farm-life-visit' },
        { name: 'Know Your Crop (Agri-Learning Walks)', href: '/experiences/know-your-crop' },
        { name: 'Play @ Surwahi (Family & Kids Zone)', href: '/experiences/play-at-surwahi' },
        { name: 'Outdoor Sports & Nature Games', href: '/experiences/outdoor-sports-and-nature-games' },
        { name: 'Eco Volunteering Programs', href: '/experiences/eco-volunteering-programs' },
        { name: 'Cultural Immersion & Local Life', href: '/experiences/cultural-immersion-and-local-life' },
        { name: 'Live Tribal Cooking Experiences', href: '/experiences/live-tribal-cooking-experiences' },
    ],
  },
  {
    name: 'Sustainability',
    href: '/sustainability',
    children: [
        { name: 'Evapo-Transpiration Toilets (ETT)', href: '/sustainability/evapo-transpiration-toilets' },
        { name: 'Tree Census & Biodiversity Reports', href: '/sustainability/tree-census-and-biodiversity-reports' },
        { name: 'Eco-Friendly Construction Practices', href: '/sustainability/eco-friendly-construction-practices' },
        { name: 'Sustainable Development Goals (SDGs) Alignment', href: '/sustainability/sustainable-development-goals-alignment' },
    ],
  },
  {
    name: 'Workshops & Learning',
    href: '/workshops',
    children: [
        { name: 'Star Gazing Nights', href: '/workshops/star-gazing-nights' },
        { name: 'Astro-Photography', href: '/workshops/astro-photography' },
        { name: 'Earthen Pottery', href: '/workshops/earthen-pottery' },
        { name: 'Gond Art Workshops', href: '/workshops/gond-art-workshops' },
        { name: 'Bamboo & Lantana Crafting', href: '/workshops/bamboo-and-lantana-crafting' },
        { name: 'Forest Bathing (Shinrin-Yoku)', href: '/workshops/forest-bathing' },
        { name: 'Leaf Plate Making', href: '/workshops/leaf-plate-making' },
        { name: 'Food Foraging Trails', href: '/workshops/food-foraging-trails' },
        { name: 'Herping Walks (Amphibian Study)', href: '/workshops/herping-walks' },
        { name: 'The Art of Regeneration', href: '/workshops/the-art-of-regeneration' },
        { name: 'Grassroots Governance & Local Democracy', href: '/workshops/grassroots-governance-and-local-democracy' },
        { name: 'Nature’s Pharmacy (Herbal Healing)', href: '/workshops/natures-pharmacy' },
        { name: 'Build With Mud (Eco-Architecture)', href: '/workshops/build-with-mud' },
    ],
  },
  {
    name: 'Praises',
    href: '/praises',
    children: [
        { name: 'Awards & Accolades', href: '/praises/awards-and-accolades' },
        { name: 'Press Mentions & Recognitions', href: '/praises/press-mentions-and-recognitions' },
    ],
  },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Getting Here', href: '/getting-here' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Contact', href: '/contact' },
];

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

  const isTransparent = !scrolled && !mobileMenuOpen && pathname === '/';

  const NavLink = ({ item }: { item: NavigationItem }) => {
    const isActive = pathname.startsWith(item.href);
    return (
      <Link
        href={item.href}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? 'text-moss-500'
            : isTransparent ? 'text-bone-0 hover:text-bone-0/80' : 'text-soil-700 hover:text-forest-900'
        }`}
      >
        {item.name}
      </Link>
    );
  };

  const DropdownLink = ({ item }: { item: NavigationItem }) => {
    const isActive = pathname.startsWith(item.href);
    return (
      <div className="group relative">
        <Link
          href={item.href}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive
              ? 'text-moss-500'
              : isTransparent ? 'text-bone-0 hover:text-bone-0/80' : 'text-soil-700 hover:text-forest-900'
          }`}
        >
          {item.name}
          <ChevronDown className={`ml-1 h-4 w-4 transition-colors group-hover:text-forest-900 ${isTransparent ? 'text-bone-0' : 'text-soil-700'}`} />
        </Link>
        <div className="absolute top-full left-0 hidden group-hover:block pt-2 w-64 z-50">
          <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {item.children?.map((child) => (
                <Link
                  key={child.name}
                  href={child.href}
                  className="block px-4 py-2 text-sm text-soil-700 hover:bg-sand-50 hover:text-forest-900"
                >
                  {child.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
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
              />
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-2">
             {navigation.map((item) => (
                item.children ? <DropdownLink key={item.name} item={item} /> : <NavLink key={item.name} item={item} />
            ))}
          </div>

          <div className="hidden md:block">
            <Link href="/accommodations" className="btn btn-primary">
              Book Now
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              item.children ? (
                <div key={item.name} className="group">
                  <Link href={item.href} className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-soil-700 hover:text-forest-900 hover:bg-sand-50">
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Link>
                  <div className="pl-4">
                  {item.children.map((child) => (
                     <Link key={child.name} href={child.href} className="block px-3 py-2 rounded-md text-base font-medium text-soil-700 hover:text-forest-900 hover:bg-sand-50">{child.name}</Link>
                  ))}
                  </div>
                </div>
              ) : (
                <Link key={item.name} href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-soil-700 hover:text-forest-900 hover:bg-sand-50">{item.name}</Link>
              )
            ))}
          </div>
          <div className="px-5 py-4">
            <Link href="/accommodations" className="btn btn-primary w-full">
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
