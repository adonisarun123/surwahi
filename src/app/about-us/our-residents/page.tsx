import Image from 'next/image';
import { Bird, Bug, Sprout, Trees } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generatePageMetadata(
  'Our Residents (Flora & Fauna)',
  'Meet the diverse wildlife that calls Surwahi home.',
  '/about-us/our-residents'
);

const residentsDetails = {
  title: 'Our Residents: Flora & Fauna',
  intro: 'Surwahi is not just a destination for human travelers; it is a thriving ecosystem, home to a staggering diversity of plants, animals, and insects. Our 17-acre estate is a living sanctuary where nature is the primary resident. We are merely custodians, and we invite you to meet the locals.',
  fauna: {
    title: 'Feathered, Furred, and Crawling',
    categories: [
      {
        name: 'Avian Life',
        icon: Bird,
        description: 'Over 200 species of birds have been recorded at Surwahi, making it a birder\'s paradise. From the majestic Crested Serpent Eagle to the vibrant Indian Roller, the air is alive with birdsong.',
        images: [
          { src: 'https://placehold.co/600x400/A8BA9A/333333?text=Hornbill', alt: 'Malabar Pied Hornbill' },
          { src: 'https://placehold.co/600x400/A8BA9A/333333?text=Kingfisher', alt: 'White-throated Kingfisher' },
        ],
        species: ['Racket-tailed Drongo', 'Black-hooded Oriole', 'Mottled Wood Owl', 'Changeable Hawk-Eagle'],
      },
      {
        name: 'Insect World',
        icon: Bug,
        description: 'The world of insects at Surwahi is a miniature marvel. Butterflies paint the air with color, while fascinating creatures like stick insects and praying mantises reveal the art of camouflage.',
        images: [
          { src: 'https://placehold.co/600x400/A8BA9A/333333?text=Butterfly', alt: 'A Common Jezebel butterfly on a flower' },
          { src: 'https://placehold.co/600x400/A8BA9A/333333?text=Dragonfly', alt: 'A vibrant dragonfly resting on a leaf' },
        ],
        species: ['Common Mormon', 'Blue Pansy', 'Giant Wood Spider', 'Praying Mantis'],
      },
    ],
  },
  flora: {
    title: 'The Silent Inhabitants',
    description: 'Our estate is a testament to the resilience of nature. Through dedicated reforestation efforts, we have cultivated a thriving forest, home to a mix of native and fruit-bearing trees.',
    categories: [
      {
        name: 'Native Trees',
        icon: Trees,
        description: 'The backbone of our ecosystem, these trees provide food and shelter for countless species. We have over 50 species of native trees, including Sal, Teak, and Mahua.',
        images: [
          { src: 'https://placehold.co/600x400/A8BA9A/333333?text=Sal+Forest', alt: 'A dense grove of Sal trees' },
          { src: 'https://placehold.co/600x400/A8BA9A/333333?text=Mahua+Flowers', alt: 'The fragrant flowers of the Mahua tree' },
        ],
      },
      {
        name: 'Medicinal Plants',
        icon: Sprout,
        description: 'Our herbal garden is a living pharmacy, home to a variety of medicinal plants used in traditional remedies. Learn about the healing properties of Ashwagandha, Tulsi, and more.',
        images: [
          { src: 'https://placehold.co/600x400/A8BA9A/333333?text=Tulsi+Plant', alt: 'A lush Tulsi (Holy Basil) plant' },
          { src: 'https://placehold.co/600x400/A8BA9A/333333?text=Aloe+Vera', alt: 'An Aloe Vera plant in the herbal garden' },
        ],
      },
    ]
  }
};

export default function OurResidentsPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {residentsDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {residentsDetails.intro}
          </p>
        </div>
      </section>

      {/* Fauna Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl text-forest-900 mb-10 text-center">{residentsDetails.fauna.title}</h2>
          <div className="space-y-12">
            {residentsDetails.fauna.categories.map((category) => (
              <div key={category.name} className="grid md:grid-cols-2 gap-8 items-center">
                <div className="md:order-last">
                  <div className="grid grid-cols-2 gap-4">
                    {category.images.map((image) => (
                      <Image key={image.src} src={image.src} alt={image.alt} width={600} height={400} className="rounded-lg object-cover w-full h-full" />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <category.icon className="h-10 w-10 text-moss-500 mr-4" />
                    <h3 className="font-display text-3xl text-forest-800">{category.name}</h3>
                  </div>
                  <p className="text-lg text-soil-700 mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.species.map((s) => (
                      <span key={s} className="bg-fern-100 text-fern-800 text-sm font-medium px-3 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Flora Section */}
      <section className="bg-sand-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl text-forest-900 mb-10 text-center">{residentsDetails.flora.title}</h2>
          <p className="text-lg text-soil-700 max-w-3xl mx-auto text-center mb-10">{residentsDetails.flora.description}</p>
          <div className="grid md:grid-cols-2 gap-10">
            {residentsDetails.flora.categories.map((category) => (
              <div key={category.name} className="bg-bone-0 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <category.icon className="h-8 w-8 text-moss-500 mr-3" />
                  <h3 className="font-display text-2xl text-forest-800">{category.name}</h3>
                </div>
                <p className="text-soil-700 mb-4">{category.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {category.images.map((image) => (
                    <Image key={image.src} src={image.src} alt={image.alt} width={600} height={400} className="rounded-lg object-cover w-full h-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-display text-3xl text-forest-900 mb-4">Come and Meet Them</h3>
          <p className="text-soil-700 max-w-2xl mx-auto mb-6">
            The best way to appreciate our resident flora and fauna is to see them for yourself. Join one of our guided nature walks and discover the hidden wonders of Surwahi.
          </p>
          <Link href="/experiences/guided-forest-trails" className="btn btn-primary">
            Book a Nature Walk
          </Link>
        </div>
      </section>
    </div>
  );
}
