import { Map, Plane, Train, Car, Calendar, CloudSun } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Getting Here',
  'Find all the information you need to plan your trip to Surwahi, including travel tips and the best times to visit.',
  '/getting-here'
);

const gettingHereDetails = {
  title: 'Getting to Surwahi Social',
  description: 'Your journey to tranquility begins here. Find all the information you need to plan a seamless trip to our eco-lodge, nestled on the edge of Kanha National Park.',
  travelOptions: [
    {
      mode: 'By Air',
      icon: Plane,
      details: 'The nearest airports are Jabalpur (JLR) and Nagpur (NAG), both approximately a 4-5 hour drive from Surwahi. Raipur (RPR) airport is about a 5-6 hour drive. We can arrange for a private taxi to pick you up from the airport upon request.',
    },
    {
      mode: 'By Rail',
      icon: Train,
      details: 'The closest major railway stations are Gondia (G) and Jabalpur (JBP). Both stations are well-connected to major cities in India and are about a 3-4 hour drive from the lodge. Taxis are readily available at the station.',
    },
    {
      mode: 'By Road',
      icon: Car,
      details: 'Surwahi Social is located near the Mukki Gate of Kanha National Park. The roads are well-maintained. If you are driving, you can search for "Surwahi Social Ecoestate" on Google Maps for precise directions.',
    },
  ],
  bestTimeToVisit: [
    {
      season: 'Winter (October to February)',
      description: 'Pleasant weather, ideal for safaris and outdoor activities. This is the peak season, so book in advance.',
      icon: CloudSun,
    },
    {
      season: 'Summer (March to June)',
      description: 'Hotter days, but excellent for wildlife sightings as animals gather around waterholes.',
      icon: CloudSun,
    },
    {
      season: 'Monsoon (July to September)',
      description: 'The landscape turns into a lush, vibrant paradise. While the core zone of the park is closed, the buffer zones are open for safaris, and it\'s a great time for birdwatching and experiencing the rejuvenation of the forest.',
      icon: CloudSun,
    },
  ],
};

export default function GettingHerePage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-display-xl text-forest-900 mb-4">
                {gettingHereDetails.title}
            </h1>
            <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
                {gettingHereDetails.description}
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Travel Options */}
          <div>
            <h2 className="font-display text-3xl text-forest-900 mb-8 flex items-center">
              <Map className="h-8 w-8 mr-3 text-moss-500" />
              How to Reach Us
            </h2>
            <div className="space-y-6">
              {gettingHereDetails.travelOptions.map((option, index) => (
                <div key={index} className="flex items-start">
                  <option.icon className="h-10 w-10 text-moss-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-forest-800">{option.mode}</h3>
                    <p className="text-soil-700">{option.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Time to Visit */}
          <div>
            <h2 className="font-display text-3xl text-forest-900 mb-8 flex items-center">
              <Calendar className="h-8 w-8 mr-3 text-moss-500" />
              Best Time to Visit
            </h2>
            <div className="space-y-6">
              {gettingHereDetails.bestTimeToVisit.map((season, index) => (
                <div key={index} className="flex items-start">
                  <season.icon className="h-10 w-10 text-moss-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-forest-800">{season.season}</h3>
                    <p className="text-soil-700">{season.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Google Maps Embed */}
        <section className="mt-16">
            <h2 className="font-display text-3xl text-forest-900 mb-8 text-center">Find Us on the Map</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.815918717282!2d80.59626931548816!3d22.36066298529249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a20e5e555555555%3A0x8aa8b1a5a8f4c3b5!2sSurwahi%20Social%20Ecoestate%20Kanha!5e0!3m2!1sen!2sin!4v1633000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="450" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    title="Surwahi Social Ecoestate Location"
                ></iframe>
            </div>
        </section>
      </div>
    </div>
  );
}
