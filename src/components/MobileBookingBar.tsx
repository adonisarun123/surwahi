'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MobileBookingBar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show bar after scrolling down a bit more, e.g., past the hero section
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between max-w-md mx-auto">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium">Starting from</span>
                    <span className="text-lg font-bold text-forest-900">₹2,500<span className="text-sm font-normal text-gray-500">/night</span></span>
                </div>
                <Link href="/stay" className="btn btn-primary py-2 px-6 text-sm">
                    Book Now
                </Link>
            </div>
        </div>
    );
}
