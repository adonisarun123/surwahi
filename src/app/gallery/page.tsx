import { generatePageMetadata } from '@/lib/seo';
import GalleryContent from './GalleryContent';
import { getGalleryImages, getGalleryVideos } from '@/lib/content-repo';

export const revalidate = 3600;

export const metadata = generatePageMetadata(
    'Gallery',
    'Explore the beauty of Surwahi Social Ecoestate, Kanha National Park. Photos of mud cottages, wildlife, and sustainable living.',
    '/gallery',
    undefined,
    ['Surwahi Photos', 'Eco Lodge Gallery', 'Kanha Wildlife Photos', 'Mud House Images', 'Sustainable Resort Photos']
);

export default async function GalleryPage() {
    const [images, videos] = await Promise.all([getGalleryImages(), getGalleryVideos()]);
    return <GalleryContent images={images} videos={videos} />;
}
