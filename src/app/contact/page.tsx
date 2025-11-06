import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactFormComponent from '@/components/ContactForm';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'Contact Us',
  'Get in touch with Surwahi Eco-Lodge. Find our contact information and send us a message for bookings or inquiries.',
  '/contact'
);

const contactInfo = {
  address: {
    street: 'Surwahi Social, Village Surwahi, P.O Majgaon',
    city: 'Tehsil Paraswada, District Balaghat',
    state: 'Madhya Pradesh',
    pincode: '481111',
    country: 'India'
  },
  phone: '+917795207779',
  generalEmail: 'contact@surwahi.com',
  bookingEmail: 'contact@surwahi.com',
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-display-xl text-forest-900 mb-4">
                Contact Us
            </h1>
            <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
                We&apos;d love to hear from you. Whether you have a question, a booking inquiry, or just want to say hello, here&apos;s how you can reach us.
            </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-3xl text-forest-900 mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-moss-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-moss-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-forest-900 mb-1">Our Address</h3>
                    <address className="not-italic text-soil-700 leading-relaxed">
                      {contactInfo.address.street}<br />
                      {contactInfo.address.city}, {contactInfo.address.state} - {contactInfo.address.pincode}<br />
                      {contactInfo.address.country}
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-moss-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-moss-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-forest-900 mb-1">Phone</h3>
                    <Link 
                      href={`tel:${contactInfo.phone}`}
                      className="text-soil-700 hover:text-moss-500 transition-colors"
                    >
                      {contactInfo.phone}
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-moss-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-moss-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-forest-900 mb-1">Email</h3>
                    <div className="space-y-1">
                      <div>
                        <Link 
                          href={`mailto:${contactInfo.generalEmail}`}
                          className="text-soil-700 hover:text-moss-500 transition-colors"
                        >
                          {contactInfo.generalEmail}
                        </Link>
                      </div>
                      <div>
                        <Link 
                          href={`mailto:${contactInfo.bookingEmail}`}
                          className="text-soil-700 hover:text-moss-500 transition-colors"
                        >
                          {contactInfo.bookingEmail}
                        </Link> (for reservations)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ContactFormComponent />
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section id="map" className="py-16 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-forest-900 mb-8 text-center">Find Us on the Map</h2>
          <div className="w-full max-w-6xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7788986.880134164!2d73.72899689350048!3d17.59246313028678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2a0ca75f087ccb%3A0xe89d09f64b652f09!2sSurwahi%20Social%20Ecoestate%20Kanha!5e0!3m2!1sen!2sin!4v1762322342765!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Surwahi Social Ecoestate Kanha Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

