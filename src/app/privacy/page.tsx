import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Privacy Policy — Surwahi Social Ecoestate Kanha',
  description: 'Privacy policy for Surwahi Social Ecoestate. Learn how we protect and handle your personal information.',
  url: 'https://surwahi.com/privacy',
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose">
          <h1 className="font-display text-display-xl text-forest-900 mb-8">Privacy Policy</h1>

          <p className="text-body-lg text-soil-700 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Introduction</h2>
            <p className="text-body-md mb-4">
              At Surwahi Social Ecoestate Kanha (&quot;Surwahi,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or stay at our eco-lodge.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Information We Collect</h2>
            <p className="text-body-md mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, postal address</li>
              <li><strong>Booking Information:</strong> Reservation details, payment information, special requests</li>
              <li><strong>Website Usage:</strong> IP address, browser type, pages visited, time spent on pages</li>
              <li><strong>Communication:</strong> Messages sent through contact forms or email</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">How We Use Your Information</h2>
            <p className="text-body-md mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Process and manage your bookings and reservations</li>
              <li>Communicate with you about your stay and our services</li>
              <li>Send you newsletters and updates (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Data Protection</h2>
            <p className="text-body-md mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Your Rights</h2>
            <p className="text-body-md mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Cookies</h2>
            <p className="text-body-md mb-4">
              We use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Contact Us</h2>
            <p className="text-body-md mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at:
            </p>
            <p className="text-body-md mb-2">
              <strong>Email:</strong> <a href="mailto:contact@surwahi.com" className="text-moss-500 hover:text-forest-700">contact@surwahi.com</a>
            </p>
            <p className="text-body-md mb-2">
              <strong>Phone:</strong> <a href="tel:+919744844777" className="text-moss-500 hover:text-forest-700">+91 97448 44777</a>
            </p>
            <p className="text-body-md">
              <strong>Address:</strong> Surwahi Social, Village Surwahi, P.O Majgaon, Tehsil Paraswada, District Balaghat, Madhya Pradesh – 481111
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
