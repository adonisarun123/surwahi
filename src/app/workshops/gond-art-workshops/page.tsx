import Image from 'next/image';
import { Check, Users, Calendar, Clock, Palette } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import { getImageKitUrl, workshopImages, experienceImages } from '@/lib/images';
import ContactForm from '@/components/ContactForm';
import RelatedContent from '@/components/RelatedContent';

export const metadata = generatePageMetadata(
  'Gond Art Workshop',
  'Immerse yourself in the vibrant world of Gond art with our traditional artist-led workshops.',
  '/workshops/gond-art-workshops',
  undefined,
  ['Gond Art Workshop', 'Tribal Art India', 'Gond Painting Class', 'Traditional Art Form', 'Cultural Workshop Kanha']
);

const workshopDetails = {
  title: 'Gond Art Workshop',
  description: 'Discover the intricate and imaginative world of Gond art, a traditional art form of the Gond tribe. In this workshop, you will learn the unique style of creating patterns, inspired by nature and mythology, under the guidance of a local Gond artist.',
  images: [
    { src: getImageKitUrl('Surwahi Social Photos/Jholar_Corridor_Wall_Painting.jpg'), alt: 'A vibrant Gond art painting' },
    { src: getImageKitUrl('Surwahi Social Photos/3c3adbb2-aacd-4c01-8aa0-01615b0912e8.jpeg'), alt: 'A Gond artist creating a piece' },
    { src: getImageKitUrl('Surwahi Social Photos/IMG_20200217_095015 (2).jpg'), alt: 'A workshop participant learning Gond art' },
    { src: getImageKitUrl('Surwahi Social Photos/Jholar_Corridor_Wall_Painting.jpg'), alt: 'Beautiful finished Gond artwork' },
  ],
  keyHighlights: [
    'Learn the history and cultural significance of Gond art.',
    'Taught by a practicing Gond artist from the local community.',
    'Explore the distinctive patterns and motifs of the art form.',
    'Create your own Gond painting on canvas to take home.',
    'A unique cultural and creative experience for all ages.',
  ],
  whatYouWillLearn: [
    { title: 'The Story of Gond', description: 'Learn about the origins and folklore that inspire Gond art.', icon: Palette },
    { title: 'Signature Patterns', description: 'Master the technique of creating fine lines, dots, and dashes that form the soul of Gond paintings.', icon: Check },
    { title: 'Themes & Motifs', description: 'Explore how nature, animals, and mythology are depicted in Gond art.', icon: Users },
    { title: 'Color & Composition', description: 'Understand the vibrant color palette and principles of composition in Gond art.', icon: Clock },
  ],
  schedule: [
    { date: 'Every Wednesday & Sunday', time: '2:00 PM - 4:00 PM', availability: 'Booking Required' },
  ],
};

export default function GondArtWorkshopsPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {workshopDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {workshopDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={workshopDetails.images[0].src} alt={workshopDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {workshopDetails.images.slice(1).map((image, index) => (
              <div key={index}>
                <Image src={image.src} alt={image.alt} width={800} height={600} className="rounded-lg object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl text-forest-900 mb-6">Key Highlights</h2>
            <ul className="space-y-4 mb-8">
              {workshopDetails.keyHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-lg text-soil-700">{highlight}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-3xl text-forest-900 mb-6">What You Will Learn</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {workshopDetails.whatYouWillLearn.map((item, index) => (
                <div key={index} className="flex items-start">
                  <item.icon className="h-8 w-8 text-moss-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-forest-900">{item.title}</h3>
                    <p className="text-soil-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-sand-50 p-8 rounded-lg">
              <h3 className="font-display text-2xl text-forest-900 mb-6">Workshop Schedule</h3>
              <div className="flex items-center justify-between p-4 bg-white rounded-md">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-moss-500 mr-4" />
                  <div>
                    <p className="font-semibold text-lg text-forest-900">{workshopDetails.schedule[0].date}</p>
                    <p className="text-sm text-soil-700 flex items-center"><Clock className="h-4 w-4 mr-1" />{workshopDetails.schedule[0].time}</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                  {workshopDetails.schedule[0].availability}
                </span>
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-bone-0 p-6 rounded-lg shadow-lg">
                <h3 className="font-display text-xl text-forest-900 mb-4">Book Your Workshop</h3>
                <p className="text-soil-700 mb-4 text-sm">Unleash your inner artist and take home a piece of tribal heritage. Book your spot in our Gond art workshop.</p>
                <ContactForm subject="Gond Art Workshop Inquiry" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedContent
        title="Explore Cultural Heritage"
        items={[
          { title: 'Earthen Pottery', href: '/workshops/earthen-pottery', image: workshopImages.earthenPottery, category: 'Craft' },
          { title: 'Leaf Plate Making', href: '/workshops/leaf-plate-making', image: workshopImages.leafPlate, category: 'Sustainable Skills' },
          { title: 'Tribal Cooking', href: '/experiences/live-tribal-cooking-experiences', image: experienceImages.tribalCooking, category: 'Culture' },
        ]}
      />
    </div>
  );
}
