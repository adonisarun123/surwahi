'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle, Send } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  inquiryType: string;
  preferredDates: string;
  partySize: string;
  message: string;
}

interface ContactFormProps {
  subject?: string;
}

export default function ContactFormComponent({ subject }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    inquiryType: 'GENERAL',
    preferredDates: '',
    partySize: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: subject || `New Inquiry: ${formData.inquiryType}`,
          partySize: formData.partySize ? parseInt(formData.partySize) : undefined
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: '',
          inquiryType: 'GENERAL',
          preferredDates: '',
          partySize: '',
          message: ''
        });
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
    <div className="bg-sand-50 rounded-card p-8">
      <h3 className="font-display text-xl text-forest-900 mb-6">Send us a Message</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="subject" value={subject} />
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="form-label">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="form-label">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input"
              placeholder="+91-XXXXX XXXXX"
            />
          </div>
          <div>
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Your city"
            />
          </div>
        </div>

        <div>
          <label htmlFor="inquiryType" className="form-label">Inquiry Type</label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="GENERAL">General Inquiry</option>
            <option value="BOOKING">Booking & Reservations</option>
            <option value="ACTIVITIES">Activities & Experiences</option>
            <option value="SUSTAINABILITY">Sustainability Programs</option>
            <option value="PRESS">Press & Media</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="preferredDates" className="form-label">Preferred Dates</label>
            <input
              type="text"
              id="preferredDates"
              name="preferredDates"
              value={formData.preferredDates}
              onChange={handleInputChange}
              className="form-input"
              placeholder="e.g., Dec 15-20, 2024"
            />
          </div>
          <div>
            <label htmlFor="partySize" className="form-label">Party Size</label>
            <input
              type="number"
              id="partySize"
              name="partySize"
              value={formData.partySize}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Number of guests"
              min="1"
              max="20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="form-label">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={4}
            className="form-input"
            placeholder="Tell us about your inquiry..."
          />
        </div>

        {/* Submit Status */}
        {submitStatus === 'success' && (
          <div className="flex items-center gap-2 text-success bg-success/10 px-4 py-3 rounded-input">
            <CheckCircle className="h-5 w-5" />
            <span>Thank you! We&apos;ll get back to you within 24 hours.</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="flex items-center gap-2 text-error bg-error/10 px-4 py-3 rounded-input">
            <AlertCircle className="h-5 w-5" />
            <span>Something went wrong. Please try again or call us directly.</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full justify-center disabled:opacity-50"
        >
          {isSubmitting ? (
            <>Sending...</>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </>
          )}
        </button>

        <p className="text-xs text-soil-700 text-center">
          By submitting this form, you agree to our privacy policy. 
          We&apos;ll never share your information with third parties.
        </p>
      </form>
    </div>
  );
}
