'use client';

import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text: string;
}

export default function ShareButton({ title, text }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy link:', err);
        alert('Failed to copy link.');
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-moss-500 hover:text-forest-700 transition-colors"
    >
      <Share2 className="h-4 w-4" />
      <span>Share</span>
    </button>
  );
}
