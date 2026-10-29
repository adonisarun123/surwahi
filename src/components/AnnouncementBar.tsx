import Link from 'next/link';

/** Fixed-height (h-9) bar rendered inside the fixed header; layout adds a matching h-9 spacer. */
export default function AnnouncementBar({ text, linkText, href }: { text: string; linkText?: string; href?: string }) {
  return (
    <div className="h-9 flex items-center justify-center bg-clay-500 text-white text-xs sm:text-sm px-4">
      <p className="truncate">
        {text}
        {href && <> <Link href={href} className="underline font-semibold">{linkText || 'Learn more'}</Link></>}
      </p>
    </div>
  );
}
