import type { Metadata } from 'next';

/** Legacy archive; main journal lives at /blogs. Avoid index bloat alongside the blog. */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function KnowledgeHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
