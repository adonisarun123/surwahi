'use client';

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling down 100px
            if (window.scrollY > 100) {
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
        <a
            href="https://wa.me/91XXXXXXXXXX" // Replace with actual number
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-24 right-4 z-40 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 animate-bounce-subtle"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-8 h-8" />
        </a>
    );
}
