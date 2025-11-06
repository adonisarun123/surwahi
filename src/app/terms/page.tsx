import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Terms of Service — Surwahi Social Ecoestate Kanha',
  description: 'Terms of service for booking and staying at Surwahi Social Ecoestate Kanha.',
  url: 'https://surwahi.com/terms',
});

export default function TermsPage() {
  return (
    <main className="min-h-screen py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose">
          <h1 className="font-display text-display-xl text-forest-900 mb-8">Terms of Service</h1>

          <p className="text-body-lg text-soil-700 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Acceptance of Terms</h2>
            <p className="text-body-md text-black mb-4">
              By accessing and using Surwahi Social Ecoestate Kanha&apos;s website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Booking and Reservations</h2>
            <p className="text-body-md text-black mb-4">All bookings are subject to availability and confirmation. By making a reservation, you agree to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-black">
              <li>Provide accurate and complete information</li>
              <li>Pay all applicable fees and charges</li>
              <li>Comply with our house rules and policies</li>
              <li>Respect the property and other guests</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Payment Terms</h2>
            <p className="text-body-md text-black mb-4">
              Payment is required at the time of booking or as specified in your reservation confirmation. We accept various payment methods as indicated during the booking process. All prices are in Indian Rupees (INR) unless otherwise stated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Cancellation Policy</h2>
            <p className="text-body-md text-black mb-4">
              Please refer to our <a href="/cancellation" className="text-moss-500 hover:text-forest-700">Cancellation Policy</a> for detailed information about cancellations, refunds, and modifications to your booking.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Guest Responsibilities</h2>
            <p className="text-body-md text-black mb-4">As a guest, you are responsible for:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-black">
              <li>Following all house rules and guidelines</li>
              <li>Respecting the natural environment and local community</li>
              <li>Any damage caused to the property during your stay</li>
              <li>The conduct of all members of your party</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Limitation of Liability</h2>
            <p className="text-body-md text-black mb-4">
              Surwahi Social Ecoestate Kanha shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services or property. We are not responsible for loss or damage to personal belongings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Intellectual Property</h2>
            <p className="text-body-md text-black mb-4">
              All content on this website, including text, images, logos, and designs, is the property of Surwahi Social Ecoestate Kanha and is protected by copyright and intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Changes to Terms</h2>
            <p className="text-body-md text-black mb-4">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Contact Information</h2>
            <p className="text-body-md text-black mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <p className="text-body-md text-black mb-2">
              <strong>Email:</strong> <a href="mailto:contact@surwahi.com" className="text-moss-500 hover:text-forest-700">contact@surwahi.com</a>
            </p>
            <p className="text-body-md text-black mb-2">
              <strong>Phone:</strong> <a href="tel:+917795207779" className="text-moss-500 hover:text-forest-700">+91 77952 07779</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
