import Image from 'next/image';
import { Check, Users, Calendar, Clock, Leaf, BookOpen } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata = generatePageMetadata(
  'Nature’s Pharmacy (Herbal Healing)',
  'Discover the healing power of plants in our workshop on traditional herbal medicine.',
  '/workshops/natures-pharmacy'
);

const workshopDetails = {
  title: 'Nature’s Pharmacy: Herbal Healing',
  description: 'The forest is a treasure trove of medicinal plants. This workshop is an introduction to the world of herbal healing, drawing from the rich traditional knowledge of the local Baiga community, who are renowned for their expertise in jungle medicine.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Medicinal+Herbs', alt: 'A collection of various medicinal herbs and plants' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Herbal+Preparation', alt: 'Hands preparing a traditional herbal remedy' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Baiga+Healer', alt: 'A traditional Baiga healer sharing their knowledge' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Herbal+Garden', alt: 'A walk through a cultivated medicinal herb garden' },
  ],
  keyHighlights: [
    'Learn to identify common medicinal plants and their uses.',
    'Led by a local expert with deep knowledge of traditional healing practices.',
    'Understand the basics of preparing simple herbal remedies for common ailments.',
    'A fascinating insight into the ethnobotanical heritage of the region.',
    'Empowers you to take a more natural approach to your health and wellness.',
  ],
  whatYouWillLearn: [
    { title: 'Plant Identification', description: 'Learn the key features of important medicinal plants like Ashwagandha, Tulsi, and Giloy.', icon: Leaf },
    { title: 'Remedy Preparation', description: 'Get hands-on experience in making herbal teas, poultices, and infusions.', icon: Check },
    { title: 'Traditional Wisdom', description: 'Listen to the stories and knowledge passed down through generations of healers.', icon: BookOpen },
    { title: 'Ethical Harvesting', description: 'Understand the importance of sustainable harvesting to protect these valuable resources.', icon: Users },
  ],
  schedule: [
    { date: 'Offered weekly', time: '2-hour sessions', availability: 'Book in Advance' },
  ],
};

export default function NaturesPharmacyPage() {
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
                    <h3 className="font-semibold text-xl text-forest-800">{item.title}</h3>
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
                    <p className="font-semibold text-lg text-forest-800">{workshopDetails.schedule[0].date}</p>
                    <p className="text-sm text-soil-700 flex items-center"><Clock className="h-4 w-4 mr-1"/>{workshopDetails.schedule[0].time}</p>
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
                <h3 className="font-display text-xl text-forest-900 mb-4">Book Your Session</h3>
                <p className="text-soil-700 mb-4 text-sm">Discover the healing wisdom of the forest. Inquire to book your spot in our Nature's Pharmacy workshop.</p>
                <ContactForm subject="Nature's Pharmacy Workshop Inquiry" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
