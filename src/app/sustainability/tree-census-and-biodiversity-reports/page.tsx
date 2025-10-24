import Image from 'next/image';
import { Check, Download, BarChart2, Leaf, PawPrint } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Tree Census & Biodiversity Reports',
  'Explore our research and data on the local ecosystem.',
  '/sustainability/tree-census-and-biodiversity-reports'
);

const reportDetails = {
  title: 'Tree Census & Biodiversity Reports',
  description: 'Understanding our ecosystem is the first step to protecting it. We conduct regular tree censuses and biodiversity surveys to monitor the health of our local environment, guide our conservation efforts, and contribute to scientific research.',
  images: [
    { src: 'https://placehold.co/1200x800/A8BA9A/333333?text=Researchers+at+Work', alt: 'Researchers conducting a biodiversity survey in the forest' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Tree+Tagging', alt: 'A tree being tagged as part of the census' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Infographic', alt: 'An infographic showing key findings from the report' },
    { src: 'https://placehold.co/800x600/A8BA9A/333333?text=Diverse+Fauna', alt: 'A collage of different animal species found in the area' },
  ],
  keyFindings: [
    'Identification of over 150 species of trees within our estate.',
    'Documentation of 200+ species of birds, both resident and migratory.',
    'Sighting records of 30+ species of mammals, including rare and elusive ones.',
    'A comprehensive checklist of butterflies, reptiles, and amphibians.',
    'Data-driven insights for our reforestation and habitat restoration projects.',
  ],
  ourMethodology: 'Our surveys are conducted in collaboration with ecologists and botanists, using scientific methodologies. This includes line transects, camera trapping, and quadrant sampling for flora. The data is meticulously recorded and analyzed to create comprehensive reports that serve as a baseline for our conservation strategies.',
  reports: [
    { name: 'Annual Tree Census Report 2023', fileUrl: '/reports/tree-census-2023.pdf' },
    { name: 'Avian Diversity Report 2023', fileUrl: '/reports/avian-diversity-2023.pdf' },
    { name: 'Mammal Sighting Checklist', fileUrl: '/reports/mammal-checklist-2023.pdf' },
  ],
  stats: [
    { stat: '150+', label: 'Tree Species', icon: Leaf },
    { stat: '200+', label: 'Bird Species', icon: BarChart2 },
    { stat: '30+', label: 'Mammal Species', icon: PawPrint },
  ],
};

export default function TreeCensusPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-xl text-forest-900 mb-4">
            {reportDetails.title}
          </h1>
          <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
            {reportDetails.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <Image src={reportDetails.images[0].src} alt={reportDetails.images[0].alt} width={1200} height={800} className="rounded-lg object-cover w-full h-full" />
            </div>
            {reportDetails.images.slice(1).map((image, index) => (
              <div key={index}>
                <Image src={image.src} alt={image.alt} width={800} height={600} className="rounded-lg object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-forest-900 mb-8 text-center">Our Ecosystem at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
            {reportDetails.stats.map((stat, index) => (
              <div key={index} className="bg-sand-50 p-6 rounded-lg">
                <stat.icon className="h-12 w-12 text-moss-500 mx-auto mb-4" />
                <p className="text-4xl font-bold text-forest-900">{stat.stat}</p>
                <p className="text-soil-700">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-display text-2xl text-forest-900 mb-4">Key Findings</h3>
              <ul className="space-y-3">
                {reportDetails.keyFindings.map((finding, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-fern-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-soil-700">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl text-forest-900 mb-4">Our Methodology</h3>
              <p className="text-soil-700 mb-6">{reportDetails.ourMethodology}</p>
              <h3 className="font-display text-2xl text-forest-900 mb-4">Download Reports</h3>
              <div className="space-y-3">
                {reportDetails.reports.map((report, index) => (
                  <a key={index} href={report.fileUrl} download className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Download className="h-5 w-5 text-moss-600 mr-3" />
                    <span className="text-moss-700 font-medium">{report.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
