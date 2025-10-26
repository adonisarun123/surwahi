import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Cancellation Policy — Surwahi Social Ecoestate Kanha',
  description: 'Cancellation and refund policy for bookings at Surwahi Social Ecoestate Kanha.',
  url: 'https://surwahi.com/cancellation',
});

export default function CancellationPage() {
  return (
    <main className="min-h-screen py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose">
          <h1 className="font-display text-display-xl text-forest-900 mb-8">Cancellation Policy</h1>

          <p className="text-body-lg text-soil-700 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <p className="text-body-md mb-4">
              We understand that plans can change. Please review our cancellation policy carefully before making a reservation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Standard Cancellation Terms</h2>
            <div className="bg-sand-50 p-6 rounded-card mb-4">
              <ul className="list-none space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-moss-500 font-bold min-w-[120px]">30+ days:</span>
                  <span>Full refund minus processing fees</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-moss-500 font-bold min-w-[120px]">15-29 days:</span>
                  <span>50% refund of the total booking amount</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-moss-500 font-bold min-w-[120px]">7-14 days:</span>
                  <span>25% refund of the total booking amount</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-moss-500 font-bold min-w-[120px]">Less than 7 days:</span>
                  <span>No refund</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Modifications to Bookings</h2>
            <p className="text-body-md mb-4">
              If you wish to modify your booking dates, please contact us as soon as possible. Modifications are subject to availability and may incur additional charges.
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Date changes requested 15+ days in advance: No fee (subject to availability)</li>
              <li>Date changes requested 7-14 days in advance: Subject to availability and potential rate differences</li>
              <li>Date changes requested less than 7 days: Treated as cancellation and new booking</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">No-Show Policy</h2>
            <p className="text-body-md mb-4">
              If you do not arrive on your scheduled check-in date and have not contacted us to modify or cancel your reservation, you will be considered a &quot;no-show&quot; and the full booking amount will be forfeited with no refund.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Early Departure</h2>
            <p className="text-body-md mb-4">
              If you choose to leave before your scheduled check-out date, no refund will be provided for the unused portion of your stay.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Special Circumstances</h2>
            <p className="text-body-md mb-4">
              We understand that emergencies happen. In case of documented medical emergencies, natural disasters, or other extraordinary circumstances, please contact us directly. We will review each situation on a case-by-case basis.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Peak Season & Holidays</h2>
            <p className="text-body-md mb-4">
              During peak seasons and holidays, stricter cancellation policies may apply. You will be informed of any special terms at the time of booking.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">How to Cancel</h2>
            <p className="text-body-md mb-4">
              To cancel your reservation, please contact us through:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Email:</strong> <a href="mailto:contact@surwahi.com" className="text-moss-500 hover:text-forest-700">contact@surwahi.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+919744844777" className="text-moss-500 hover:text-forest-700">+91 97448 44777</a></li>
            </ul>
            <p className="text-body-md mb-4">
              Cancellations are effective from the date we receive your written notice (email confirmation).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Refund Processing</h2>
            <p className="text-body-md mb-4">
              Approved refunds will be processed within 7-10 business days to the original payment method. Please note that it may take additional time for your bank or credit card company to process the refund.
            </p>
          </section>

          <section className="mb-8 bg-fern-300/10 p-6 rounded-card border-l-4 border-fern-300">
            <h3 className="font-display text-lg text-forest-900 mb-3">Have Questions?</h3>
            <p className="text-body-md mb-2">
              Our team is here to help. Please don&apos;t hesitate to reach out if you have any questions about our cancellation policy.
            </p>
            <p className="text-body-md">
              <a href="/contact" className="text-moss-500 hover:text-forest-700 font-medium">Contact us →</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
