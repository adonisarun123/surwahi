import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Accessibility Statement — Surwahi Eco-Lodge',
  description: 'Accessibility information and commitment for Surwahi Eco-Lodge.',
  url: 'https://surwahi.com/accessibility',
  keywords: ['Accessibility Statement', 'Accessible Resort Kanha', 'Wheelchair Friendly Resort', 'Inclusive Tourism India']
});

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose">
          <h1 className="font-display text-display-xl text-forest-900 mb-8">Accessibility Statement</h1>

          <p className="text-body-lg text-soil-700 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Our Commitment</h2>
            <p className="text-body-md text-black mb-4">
              Surwahi Eco-Lodge is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying relevant accessibility standards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Website Accessibility</h2>
            <p className="text-body-md text-black mb-4">
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. Our website includes the following accessibility features:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-black">
              <li>Semantic HTML structure for screen reader compatibility</li>
              <li>Keyboard navigation support</li>
              <li>Alternative text for images</li>
              <li>Sufficient color contrast ratios</li>
              <li>Readable and scalable text</li>
              <li>Skip navigation links</li>
              <li>ARIA labels where appropriate</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Physical Accessibility</h2>
            <p className="text-body-md text-black mb-4">
              While Surwahi is a nature-based eco-lodge with rustic architecture, we are working towards making our physical spaces more accessible:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-black">
              <li>Ground-level accommodations available upon request</li>
              <li>Staff assistance available for guests with mobility challenges</li>
              <li>Accessible pathways being developed in common areas</li>
              <li>Special dietary requirements can be accommodated</li>
            </ul>
            <p className="text-body-md text-black mb-4">
              Please contact us in advance to discuss your specific accessibility needs, and we will do our best to accommodate you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Assistive Technologies</h2>
            <p className="text-body-md text-black mb-4">
              Our website is designed to be compatible with:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-black">
              <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Limitations and Alternatives</h2>
            <p className="text-body-md text-black mb-4">
              Despite our best efforts, some content may not yet be fully accessible. We are actively working to improve accessibility across all areas of our digital presence. If you encounter any accessibility barriers, please let us know.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Third-Party Content</h2>
            <p className="text-body-md text-black mb-4">
              Some content on our website may be provided by third parties. While we strive to ensure all content meets accessibility standards, we may not have full control over third-party materials.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Feedback and Contact</h2>
            <p className="text-body-md text-black mb-4">
              We welcome your feedback on the accessibility of our website and facilities. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:
            </p>
            <div className="bg-sand-50 p-6 rounded-card">
              <p className="text-body-md text-black mb-2">
                <strong>Email:</strong> <a href="mailto:contact@surwahi.com" className="text-moss-500 hover:text-forest-700">contact@surwahi.com</a>
              </p>
              <p className="text-body-md text-black mb-2">
                <strong>Phone:</strong> <a href="tel:+917795207779" className="text-moss-500 hover:text-forest-700">+91 77952 07779</a>
              </p>
              <p className="text-body-md text-black mb-2">
                <strong>Subject Line:</strong> Accessibility Inquiry
              </p>
            </div>
            <p className="text-body-md text-black mt-4">
              We aim to respond to accessibility feedback within 3-5 business days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-display-md text-forest-900 mb-4">Ongoing Improvements</h2>
            <p className="text-body-md text-black mb-4">
              Accessibility is an ongoing effort. We regularly:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-black">
              <li>Test our website with assistive technologies</li>
              <li>Conduct accessibility audits</li>
              <li>Provide accessibility training to our staff</li>
              <li>Update our website based on user feedback</li>
              <li>Review and implement new accessibility best practices</li>
            </ul>
          </section>

          <section className="mb-8 bg-moss-500/10 p-6 rounded-card border-l-4 border-moss-500">
            <h3 className="font-display text-lg text-forest-900 mb-3">Thank You</h3>
            <p className="text-body-md text-black">
              Thank you for choosing Surwahi Eco-Lodge. We are committed to providing an inclusive experience for all our guests and website visitors.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
