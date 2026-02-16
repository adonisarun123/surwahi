import { generatePageMetadata } from '@/lib/seo';
import GalleryContent from './GalleryContent';

export const metadata = generatePageMetadata(
    'Gallery',
    'Explore the beauty of Surwahi Eco-Lodge, Kanha National Park. Photos of mud cottages, wildlife, and sustainable living.',
    '/gallery',
    undefined,
    ['Surwahi Photos', 'Eco Lodge Gallery', 'Kanha Wildlife Photos', 'Mud House Images', 'Sustainable Resort Photos']
);

export default function GalleryPage() {
    return <GalleryContent />;
}
