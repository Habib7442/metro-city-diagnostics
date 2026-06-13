'use client';

/**
 * ContactForm.tsx
 * Client-side interactive inquiry form for /contact.
 * Validates entries and handles submission UI states.
 */

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formState.phone.replace(/[\s-+]/g, '').slice(-10))) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    }
    if (formState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formState.message.trim()) newErrors.message = 'Inquiry message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const message = `NEW CONTACT INQUIRY:
- Name: ${formState.name}
- Mobile: ${formState.phone}
- Email: ${formState.email || 'N/A'}

MESSAGE:
${formState.message}`;

      const isAndroid = typeof window !== 'undefined' && /Android/i.test(navigator.userAgent);
      const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      let whatsappUrl = '';
      if (isAndroid) {
        whatsappUrl = `intent://send/?phone=919957357278&text=${encodeURIComponent(message)}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
      } else if (isMobile) {
        whatsappUrl = `whatsapp://send?phone=919957357278&text=${encodeURIComponent(message)}`;
      } else {
        whatsappUrl = `https://web.whatsapp.com/send?phone=919957357278&text=${encodeURIComponent(message)}`;
      }
      
      if (isMobile) {
        window.location.href = whatsappUrl;
      } else {
        window.open(whatsappUrl, '_blank');
      }
      
      setSubmitSuccess(true);
      setFormState({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (err) {
      setSubmitError('Failed to open WhatsApp. Please try calling us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8 shadow-sm">
      <h3 className="text-xl font-bold text-navy-900 mb-6 font-display">Send Us an Inquiry</h3>

      {submitSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h4 className="font-bold text-green-900 text-base mb-2">Message Sent Successfully!</h4>
          <p className="text-xs text-green-700 leading-relaxed">
            Thank you for contacting Metro-City Diagnostics. Our clinical reception desk will review your query and contact you within 2-4 business hours.
          </p>
          <Button
            onClick={() => setSubmitSuccess(false)}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold text-xs"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 text-red-700 text-xs">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="e.g. Joydeep Sen"
              className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
            />
            {errors.name && <span className="text-[11px] text-red-500 mt-1 block">{errors.name}</span>}
          </div>

          {/* Mobile Number & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                placeholder="10-digit phone number"
                className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              />
              {errors.phone && <span className="text-[11px] text-red-500 mt-1 block">{errors.phone}</span>}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                Email Address (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="e.g. name@example.com"
                className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              />
              {errors.email && <span className="text-[11px] text-red-500 mt-1 block">{errors.email}</span>}
            </div>
          </div>

          {/* Inquiry Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
              Your Message / Inquiry *
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows={4}
              placeholder="How can our diagnostic team help you? Ask about specific test requirements, timings, or reports."
              className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
            />
            {errors.message && <span className="text-[11px] text-red-500 mt-1 block">{errors.message}</span>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-6 rounded tracking-wide shadow-sm flex items-center justify-center gap-2 w-full md:w-auto"
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
            {!isSubmitting && <Send className="h-4 w-4" />}
          </Button>
        </form>
      )}
    </div>
  );
}
