import Image from 'next/image';
import { Check, Users, Leaf, Heart } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata = generatePageMetadata(
  'Eco Volunteering Programs',
  'Get involved and contribute to our sustainability and community initiatives.',
  '/experiences/eco-volunteering-programs'
);

const volunteeringDetails = {
  title: 'Eco-Volunteering Programs',
  description: 'Be a part of the change. Our eco-volunteering programs offer a unique opportunity to immerse yourself in our conservation and community efforts, contribute your skills, and leave a positive, lasting impact.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Tree+Planting', alt: 'Volunteers planting saplings as part of a reforestation drive' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Community+Workshop', alt: 'A volunteer conducting a workshop for the local community' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Waste+Management', alt: 'Volunteers working at a waste segregation and recycling unit' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Happy+Volunteers', alt: 'A group of smiling volunteers after a day of work' },
  ],
  keyHighlights: [
    'Make a tangible contribution to environmental conservation and community empowerment.',
    'Work alongside our team and local community members.',
    'Gain practical skills and knowledge in sustainability.',
    'A deeply rewarding and transformative experience.',
    'Flexible programs, from a few days to several weeks.',
  ],
  whatToExpect: 'Volunteering with us is a hands-on, immersive experience. You\'ll be working on real-world projects that are central to our mission. The work can be physically demanding but is always rewarding. You\'ll also have ample time to explore the area, interact with other guests, and enjoy the beauty of Surwahi.',
  programAreas: [
    { name: 'Reforestation & Conservation', description: 'Participate in our native tree planting drives, biodiversity surveys, and habitat restoration projects.', icon: Leaf },
    { name: 'Sustainable Agriculture', description: 'Work on our organic farms, learn about permaculture, and help with composting and seed saving.', icon: Users },
    { name: 'Community Outreach', description: 'Assist with our educational programs, skill development workshops, and health camps in local villages.', icon: Heart },
    { name: 'Eco-Construction', description: 'Get your hands dirty and learn the art of building with natural, sustainable materials like mud and bamboo.', icon: Check },
  ],
};

export default function EcoVolunteeringPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {volunteeringDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {volunteeringDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={volunteeringDetails.images[0].src} alt={volunteeringDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {volunteeringDetails.images.slice(1).map((image, index) => (
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
              {volunteeringDetails.keyHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-lg text-soil-700">{highlight}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-3xl text-forest-900 mb-6">What to Expect</h2>
            <p className="text-lg text-soil-700 mb-8">{volunteeringDetails.whatToExpect}</p>
            
            <div className="bg-sand-50 p-8 rounded-lg">
              <h3 className="font-display text-2xl text-forest-900 mb-6">Our Program Areas</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {volunteeringDetails.programAreas.map((area, index) => (
                  <div key={index} className="flex items-start">
                    <area.icon className="h-8 w-8 text-moss-500 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-xl text-forest-800">{area.name}</h4>
                      <p className="text-sm text-soil-700">{area.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-bone-0 p-6 rounded-lg shadow-lg">
                <h3 className="font-display text-xl text-forest-900 mb-4">Join Us</h3>
                <p className="text-soil-700 mb-4 text-sm">If you're passionate about making a difference, we'd love to hear from you. Fill out the form below to express your interest.</p>
                <ContactForm subject="Eco-Volunteering Inquiry" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
