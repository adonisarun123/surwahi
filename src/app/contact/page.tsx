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
    street: 'Surwahi, PO - Jamunia, Tehsil - Bichiya',
    city: 'Mandla',
    state: 'Madhya Pradesh',
    pincode: '481993',
    country: 'India'
  },
  phone: '+91 83057 20078',
  email: 'surwahisocial@gmail.com',
  bookingEmail: 'bookings@surwahi.com',
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
                          href={`mailto:${contactInfo.email}`}
                          className="text-soil-700 hover:text-moss-500 transition-colors"
                        >
                          {contactInfo.email}
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
    </div>
  );
}

