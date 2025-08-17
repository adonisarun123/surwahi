import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Car, 
  Train, 
  Plane,
  Navigation
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactFormComponent from '@/components/ContactForm';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Contact & How to Reach',
  'Get in touch with Surwahi Eco-Lodge. Find directions, contact information, and plan your journey to our forest retreat in Madhya Pradesh.',
  '/contact'
);

const contactInfo = {
  address: {
    street: 'Forest Road, Surwahi Village',
    city: 'Surwahi',
    state: 'Madhya Pradesh',
    pincode: '480001',
    country: 'India'
  },
  phone: '+91-98765 43210',
  email: 'hello@surwahi.com',
  bookingEmail: 'bookings@surwahi.com',
  coordinates: {
    lat: 23.1765,
    lng: 79.9385
  }
};

const travelOptions = [
  {
    mode: 'Air',
    icon: Plane,
    title: 'Fly to Jabalpur Airport',
    distance: '45 km from Surwahi',
    duration: '1 hour drive',
    description: 'Daily flights from Delhi, Mumbai, and Bengaluru',
    details: [
      'Airport code: JLR',
      'Taxi service available',
      'Car rental counters',
      'We can arrange airport pickup'
    ]
  },
  {
    mode: 'Rail',
    icon: Train,
    title: 'Jabalpur Junction Railway Station',
    distance: '40 km from Surwahi',
    duration: '1 hour drive',
    description: 'Well-connected to major Indian cities',
    details: [
      'Direct trains from Delhi, Mumbai, Chennai',
      'Pre-paid taxi counter available',
      'We can arrange station pickup',
      'Online booking recommended'
    ]
  },
  {
    mode: 'Road',
    icon: Car,
    title: 'Drive to Surwahi',
    distance: 'Various routes available',
    duration: 'Depends on origin',
    description: 'Scenic drive through highways and country roads',
    details: [
      'NH44 to Jabalpur, then state highway',
      'EV charging available at lodge',
      'GPS coordinates provided',
      'Parking available on-site'
    ]
  }
];

const nearbyAttractions = [
  {
    name: 'Dhuandhar Falls',
    distance: '25 km',
    duration: '30 minutes',
    description: 'Spectacular waterfall on Narmada River'
  },
  {
    name: 'Marble Rocks (Bhedaghat)',
    distance: '30 km', 
    duration: '35 minutes',
    description: 'Famous marble cliffs and boat rides'
  },
  {
    name: 'Chausath Yogini Temple',
    distance: '35 km',
    duration: '40 minutes',
    description: '10th century circular temple'
  },
  {
    name: 'Kanha National Park',
    distance: '120 km',
    duration: '2.5 hours',
    description: 'Tiger reserve and wildlife sanctuary'
  }
];

const importantInfo = [
  {
    title: 'Check-in / Check-out',
    details: ['Check-in: 2:00 PM', 'Check-out: 11:00 AM', 'Early check-in available on request']
  },
  {
    title: 'What to Bring',
    details: ['Comfortable walking shoes', 'Light cotton clothing', 'Sun hat and sunscreen', 'Insect repellent', 'Camera/binoculars']
  },
  {
    title: 'Emergency Contacts',
    details: ['Lodge: +91-98765 43210', 'Local Hospital: +91-761-2345678', 'Police: 100', 'Tourism Helpline: 1363']
  }
];

export default function ContactPage() {

  return (
    <div className="pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      {/* Header */}
      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-display-xl text-forest-900 mb-4">
              Contact & How to Reach
            </h1>
            <p className="text-body-lg text-soil-700 mb-6">
              Plan your journey to Surwahi Eco-Lodge. Get in touch with our team 
              for bookings, inquiries, or travel assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="font-display text-2xl text-forest-900 mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-moss-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-moss-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-forest-900 mb-2">Address</h3>
                    <address className="not-italic text-soil-700 leading-relaxed">
                      {contactInfo.address.street}<br />
                      {contactInfo.address.city}, {contactInfo.address.state}<br />
                      {contactInfo.address.pincode}, {contactInfo.address.country}
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-moss-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-moss-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-forest-900 mb-2">Phone</h3>
                    <Link 
                      href={`tel:${contactInfo.phone}`}
                      className="text-soil-700 hover:text-moss-500 transition-colors"
                    >
                      {contactInfo.phone}
                    </Link>
                    <p className="text-sm text-soil-700 mt-1">Available 9:00 AM - 9:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-moss-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-moss-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-forest-900 mb-2">Email</h3>
                    <div className="space-y-1">
                      <div>
                        <Link 
                          href={`mailto:${contactInfo.email}`}
                          className="text-soil-700 hover:text-moss-500 transition-colors"
                        >
                          {contactInfo.email}
                        </Link>
                        <span className="text-sm text-soil-700 ml-2">• General inquiries</span>
                      </div>
                      <div>
                        <Link 
                          href={`mailto:${contactInfo.bookingEmail}`}
                          className="text-soil-700 hover:text-moss-500 transition-colors"
                        >
                          {contactInfo.bookingEmail}
                        </Link>
                        <span className="text-sm text-soil-700 ml-2">• Reservations</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-moss-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-moss-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-forest-900 mb-2">Response Time</h3>
                    <p className="text-soil-700">We respond to all inquiries within 24 hours</p>
                    <p className="text-sm text-soil-700 mt-1">Faster response during business hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactFormComponent />
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className="py-16 lg:py-24 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg text-forest-900 mb-4">
              How to Reach Surwahi
            </h2>
            <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
              Multiple convenient travel options to reach our forest retreat. 
              We can arrange pickup from airports and railway stations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {travelOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div key={index} className="bg-bone-0 rounded-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-moss-500/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-moss-500" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-forest-900">{option.title}</h3>
                      <p className="text-sm text-soil-700">{option.mode}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-soil-700 mb-1">
                      <Navigation className="h-4 w-4" />
                      <span>{option.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-soil-700">
                      <Clock className="h-4 w-4" />
                      <span>{option.duration}</span>
                    </div>
                  </div>
                  
                  <p className="text-soil-700 mb-4">{option.description}</p>
                  
                  <ul className="space-y-1">
                    {option.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-2 text-sm text-soil-700">
                        <div className="w-1.5 h-1.5 bg-fern-300 rounded-full" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Map Placeholder */}
          <div className="bg-bone-0 rounded-card p-8 text-center">
            <h3 className="font-display text-xl text-forest-900 mb-4">Location Map</h3>
            <div className="aspect-video bg-mist-200/50 rounded-card flex items-center justify-center mb-4">
              <div className="text-soil-700">
                <MapPin className="h-12 w-12 mx-auto mb-2" />
                <p>Interactive map will be embedded here</p>
                <p className="text-sm">GPS: {contactInfo.coordinates.lat}, {contactInfo.coordinates.lng}</p>
              </div>
            </div>
            <Link href="/contact/directions" className="btn btn-secondary">
              Get Detailed Directions
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg text-forest-900 mb-4">
              Nearby Attractions
            </h2>
            <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
              Explore the rich cultural and natural heritage of the region during your stay.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyAttractions.map((attraction, index) => (
              <div key={index} className="bg-sand-50 rounded-card p-4">
                <h3 className="font-medium text-forest-900 mb-2">{attraction.name}</h3>
                <div className="flex items-center gap-4 text-sm text-soil-700 mb-2">
                  <span className="flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    {attraction.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {attraction.duration}
                  </span>
                </div>
                <p className="text-sm text-soil-700">{attraction.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 lg:py-24 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-lg text-forest-900 mb-4">
              Important Information
            </h2>
            <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
              Essential details to help you prepare for your stay at Surwahi Eco-Lodge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {importantInfo.map((info, index) => (
              <div key={index} className="bg-bone-0 rounded-card p-6">
                <h3 className="font-display text-lg text-forest-900 mb-4">{info.title}</h3>
                <ul className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-moss-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-soil-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact & How to Reach Surwahi Eco-Lodge",
            "about": {"@id": "https://surwahi.com/#lodging"},
            "url": "https://surwahi.com/contact",
            "breadcrumb": "Home > Contact & How to Reach",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "Surwahi Eco-Lodge", 
              "address": {
                "@type": "PostalAddress",
                "streetAddress": contactInfo.address.street,
                "addressLocality": contactInfo.address.city,
                "addressRegion": contactInfo.address.state,
                "postalCode": contactInfo.address.pincode,
                "addressCountry": contactInfo.address.country
              },
              "telephone": contactInfo.phone,
              "email": contactInfo.email,
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": contactInfo.coordinates.lat,
                "longitude": contactInfo.coordinates.lng
              }
            }
          })
        }}
      />
    </div>
  );
}
