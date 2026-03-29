'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle, Send } from 'lucide-react';

const inputClass =
  'w-full rounded-xl border-2 border-[#9a6b47]/50 bg-white px-4 py-3 text-[#1E5741] placeholder:text-[#6b5a4a]/70 focus:border-[#1E5741] focus:outline-none focus:ring-2 focus:ring-[#1E5741]/25';

const labelClass = 'mb-1.5 block text-sm font-semibold text-[#1E5741]';

const PACKAGES = {
  DOUBLE_SHARING: {
    value: 'DOUBLE_SHARING',
    label: 'Double sharing — ₹30,000 / person',
  },
  COMMUNITY_DORM: {
    value: 'COMMUNITY_DORM',
    label: 'Community dorm — ₹23,000 / person',
  },
} as const;

export default function VannVibeBookingForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [retreatPackage, setRetreatPackage] = useState<
    keyof typeof PACKAGES
  >('DOUBLE_SHARING');
  const [guests, setGuests] = useState('1');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const pkg = PACKAGES[retreatPackage];
    const guestCount = parseInt(guests, 10) || 1;
    const composedMessage = [
      '[Vann Vibe — 3–6 April 2026 | booking request from website]',
      `Preferred package: ${pkg.label}`,
      `Number of guests: ${guestCount}`,
      '',
      message.trim(),
    ].join('\n');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          city: city.trim() || undefined,
          inquiryType: 'VANN_VIBE',
          preferredDates: '3–6 April 2026',
          partySize: guestCount,
          message: composedMessage,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setCity('');
        setRetreatPackage('DOUBLE_SHARING');
        setGuests('1');
        setMessage('');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border-2 border-[#9a6b47] bg-[#faf6f0] p-6 sm:p-8">
      <h3 className="font-display text-xl font-semibold text-[#1E5741] sm:text-2xl">
        Book Vann Vibe
      </h3>
      <p className="mt-2 text-sm text-[#5c4a3a] sm:text-base">
        Send a booking request for the 3-night retreat (3–6 April 2026). We
        will confirm availability and next steps by email or phone.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="vv-name" className={labelClass}>
              Full name <span className="text-red-600">*</span>
            </label>
            <input
              id="vv-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="vv-email" className={labelClass}>
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="vv-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="vv-phone" className={labelClass}>
              Phone <span className="text-red-600">*</span>
            </label>
            <input
              id="vv-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              placeholder="+91 …"
              autoComplete="tel"
            />
          </div>
          <div>
            <label htmlFor="vv-city" className={labelClass}>
              City
            </label>
            <input
              id="vv-city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputClass}
              placeholder="Your city"
              autoComplete="address-level2"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="vv-package" className={labelClass}>
              Retreat package <span className="text-red-600">*</span>
            </label>
            <select
              id="vv-package"
              value={retreatPackage}
              onChange={(e) =>
                setRetreatPackage(e.target.value as keyof typeof PACKAGES)
              }
              className={inputClass}
            >
              <option value="DOUBLE_SHARING">{PACKAGES.DOUBLE_SHARING.label}</option>
              <option value="COMMUNITY_DORM">{PACKAGES.COMMUNITY_DORM.label}</option>
            </select>
          </div>
          <div>
            <label htmlFor="vv-guests" className={labelClass}>
              Number of guests <span className="text-red-600">*</span>
            </label>
            <input
              id="vv-guests"
              type="number"
              required
              min={1}
              max={20}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="vv-message" className={labelClass}>
            Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="vv-message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={inputClass}
            placeholder="Dietary needs, questions for Rushant, or anything else we should know (min. a short sentence)."
            minLength={10}
          />
        </div>

        {submitStatus === 'success' && (
          <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-800">
            <CheckCircle className="h-5 w-5 shrink-0" />
            <span>
              Thank you. We have received your Vann Vibe request and will reply
              within 24 hours.
            </span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>
              Something went wrong. Please try again or call Rushant at{' '}
              <a href="tel:+917875586863" className="font-semibold underline">
                +91 78755 86863
              </a>
              .
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E5741] px-6 py-4 font-semibold text-white transition hover:bg-[#163d2e] disabled:opacity-50"
        >
          {isSubmitting ? (
            'Sending…'
          ) : (
            <>
              <Send className="h-4 w-4" />
              Submit booking request
            </>
          )}
        </button>

        <p className="text-center text-xs text-[#6b5a4a]">
          By submitting, you agree to our{' '}
          <a href="/privacy" className="text-[#1E5741] underline">
            privacy policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}
