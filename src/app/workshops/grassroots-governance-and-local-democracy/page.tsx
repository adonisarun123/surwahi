import Image from 'next/image';
import { Check, Users, Calendar, Clock, Landmark, BookOpen } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata = generatePageMetadata(
  'Grassroots Governance & Local Democracy',
  'Understand the pillars of local self-governance and its impact on community-led conservation.',
  '/workshops/grassroots-governance-and-local-democracy'
);

const workshopDetails = {
  title: 'Grassroots Governance & Local Democracy',
  description: 'How do local communities organize themselves to manage their resources and shape their future? This unique workshop offers a deep dive into the Panchayati Raj system, the cornerstone of India\'s local self-governance, and its role in fostering sustainable development and democracy from the ground up.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Gram+Sabha+Meeting', alt: 'A village assembly (Gram Sabha) meeting in progress' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Community+Discussion', alt: 'A lively discussion among community members' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Local+Leader', alt: 'A portrait of an elected local village leader' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Development+Project', alt: 'A community-led development project, like a check dam' },
  ],
  keyHighlights: [
    'Gain a firsthand understanding of India\'s vibrant grassroots democracy.',
    'Interact with elected local representatives and community leaders.',
    'Learn about the challenges and successes of local self-governance.',
    'Understand the link between local democracy and sustainable resource management.',
    'An insightful experience for students of sociology, political science, and public policy.',
  ],
  whatYouWillLearn: [
    { title: 'The Panchayati Raj System', description: 'Learn about the three-tier structure and constitutional basis of local self-governance in India.', icon: Landmark },
    { title: 'Community Decision Making', description: 'Witness or participate in a mock Gram Sabha (village assembly) to understand how decisions are made.', icon: Users },
    { title: 'Forest Rights Act (FRA)', description: 'Understand this landmark legislation and its role in empowering forest-dwelling communities.', icon: BookOpen },
    { title: 'Case Studies', description: 'Learn from real-world examples of successful community-led conservation and development projects.', icon: Check },
  ],
  schedule: [
    { date: 'Offered on request for groups', time: 'Half-day sessions', availability: 'Book in Advance' },
  ],
};

export default function GrassrootsGovernancePage() {
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
                <h3 className="font-display text-xl text-forest-900 mb-4">Arrange a Session</h3>
                <p className="text-soil-700 mb-4 text-sm">This workshop is ideal for academic groups, researchers, and anyone interested in civic engagement. Inquire to arrange a session.</p>
                <ContactForm subject="Grassroots Governance Workshop Inquiry" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
