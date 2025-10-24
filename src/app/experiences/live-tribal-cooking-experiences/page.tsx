import Image from 'next/image';
import { Check, Users, Leaf, UtensilsCrossed } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Live Tribal Cooking Experiences',
  'Learn to cook traditional tribal dishes with local chefs.',
  '/experiences/live-tribal-cooking-experiences'
);

const cookingDetails = {
  title: 'Live Tribal Cooking Experiences',
  description: 'Embark on a culinary adventure into the heart of tribal kitchens. Our live cooking experiences are a sensory delight, where you\'ll learn the secrets of traditional Baiga and Gond cuisine, using ancient recipes and fresh, local ingredients.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Tribal+Cooking', alt: 'A tribal woman cooking over an open fire' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Fresh+Ingredients', alt: 'A colorful array of fresh, locally sourced ingredients' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Guests+Cooking', alt: 'Guests participating in a hands-on cooking class' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Plated+Dish', alt: 'A beautifully plated traditional tribal dish' },
  ],
  keyHighlights: [
    'Hands-on cooking class led by local community chefs.',
    'Learn to prepare authentic, healthy, and flavorful tribal dishes.',
    'Discover the use of indigenous herbs, spices, and vegetables.',
    'Understand the cultural significance behind the food.',
    'Enjoy the delicious meal you helped prepare.',
  ],
  whatToExpect: 'This is a fun, interactive, and delicious experience. You will be guided through the entire process, from understanding the ingredients to mastering the cooking techniques. The class is conducted in a traditional kitchen setting, offering an authentic glimpse into the local way of life. The experience culminates in a communal meal, where you get to savor the fruits of your labor.',
  sampleMenu: [
    { name: 'Red Ant Chutney', description: 'A zesty and protein-rich local delicacy (optional and seasonal).', icon: UtensilsCrossed },
    { name: 'Kodo Millet Khichdi', description: 'A nutritious and comforting one-pot meal made from local millets.', icon: Leaf },
    { name: 'Mahua Laddoos', description: 'Sweet treats made from the flowers of the sacred Mahua tree.', icon: Users },
  ],
  bestSuitedFor: {
    text: 'Food lovers, cultural explorers, and anyone looking for a unique and authentic culinary experience.',
    icon: Users,
  },
};

export default function LiveTribalCookingPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {cookingDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {cookingDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={cookingDetails.images[0].src} alt={cookingDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {cookingDetails.images.slice(1).map((image, index) => (
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
              {cookingDetails.keyHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-lg text-soil-700">{highlight}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-3xl text-forest-900 mb-6">What to Expect</h2>
            <p className="text-lg text-soil-700 mb-8">{cookingDetails.whatToExpect}</p>
            
            <div className="bg-sand-50 p-8 rounded-lg">
              <h3 className="font-display text-2xl text-forest-900 mb-6">A Taste of Our Menu</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {cookingDetails.sampleMenu.map((item, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <item.icon className="h-10 w-10 text-moss-500 mb-3" />
                    <h4 className="font-semibold text-xl text-forest-800">{item.name}</h4>
                    <p className="text-sm text-soil-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-bone-0 p-6 rounded-lg shadow-lg">
                <h3 className="font-display text-xl text-forest-900 mb-4">Book Your Culinary Adventure</h3>
                <p className="text-soil-700 mb-4 text-sm">These exclusive cooking experiences are arranged on request. Please contact us to check availability and book your spot.</p>
                <a href="/contact" className="btn btn-primary w-full">Inquire Now</a>
              </div>
              <div className="mt-6 text-center">
                <a href="/experiences" className="text-moss-600 hover:underline">Explore other experiences</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
