'use client';

/**
 * BookingForm.tsx
 * Client-side interactive appointment & sample collection booking form.
 * Supports prefilling select options using search parameters.
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, Clock, MapPin, User, Phone, Mail, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/content';
import doctorsData from '@/lib/doctors.json';

type BookingFormData = {
  name: string;
  phone: string;
  email: string;
  testSlug: string;
  doctorId: string;
  preferredDate: string;
  preferredTime: string;
  homeCollection: boolean;
  address: string;
  landmark: string;
};

export default function BookingForm() {
  const searchParams = useSearchParams();
  
  const [formState, setFormState] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    testSlug: '',
    doctorId: '',
    preferredDate: '',
    preferredTime: '',
    homeCollection: false,
    address: '',
    landmark: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync with search parameters on mount / param changes
  useEffect(() => {
    const testSlug = searchParams.get('test') || '';
    const doctorId = searchParams.get('doctor') || '';
    
    setFormState((prev) => ({
      ...prev,
      testSlug: services.some((s) => s.slug === testSlug) ? testSlug : prev.testSlug,
      doctorId: doctorsData.some((d) => d.id === doctorId) ? doctorId : prev.doctorId,
    }));
  }, [searchParams]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) newErrors.name = 'Patient name is required';
    
    if (!formState.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formState.phone.replace(/[\s-+]/g, '').slice(-10))) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    }
    
    if (formState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    
    if (!formState.testSlug && !formState.doctorId) {
      newErrors.selection = 'Please select either a diagnostic test or doctor consultation';
    }
    
    if (!formState.preferredDate) {
      newErrors.preferredDate = 'Please select a date';
    } else {
      const selected = new Date(formState.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.preferredDate = 'Appointment date cannot be in the past';
      }
    }
    
    if (!formState.preferredTime) newErrors.preferredTime = 'Please select a preferred slot';
    
    if (formState.homeCollection && !formState.address.trim()) {
      newErrors.address = 'Full address is required for home sample collection';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormState((prev) => ({ ...prev, [name]: val }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    
    // Clear selection error if either diagnostic test or doctor is picked
    if (name === 'testSlug' || name === 'doctorId') {
      setErrors((prev) => ({ ...prev, selection: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const selectedTest = formState.testSlug 
        ? services.find((s) => s.slug === formState.testSlug)?.name 
        : 'None selected';
        
      const selectedDoctor = formState.doctorId 
        ? doctorsData.find((d) => d.id === formState.doctorId)?.doctor.name 
        : 'None selected';

      // Build WhatsApp message
      const message = `Hello Metro-City Diagnostics,

I would like to book a diagnostic appointment. Here are my details:

📋 PATIENT DETAILS:
• Name: ${formState.name}
• Mobile: ${formState.phone}
• Email: ${formState.email || 'N/A'}

🔬 APPOINTMENT DETAILS:
• Test/Package: ${selectedTest}
• Doctor Consultation: ${selectedDoctor}
• Preferred Date: ${formState.preferredDate}
• Preferred Time: ${formState.preferredTime}

🏠 SAMPLE COLLECTION:
• Home Collection: ${formState.homeCollection ? 'Yes (Requested)' : 'No (Walk-in)'}
${formState.homeCollection ? `• Address: ${formState.address}\n• Landmark: ${formState.landmark || 'N/A'}` : ''}`;

      const whatsappUrl = `https://wa.me/919957357278?text=${encodeURIComponent(message)}`;
      
      // Open in a new tab
      window.open(whatsappUrl, '_blank');
      
      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Predefined time slots
  const timeSlots = [
    '07:00 AM - 09:00 AM (Early Morning)',
    '09:00 AM - 12:00 PM (Forenoon)',
    '12:00 PM - 03:00 PM (Afternoon)',
    '03:00 PM - 06:00 PM (Late Afternoon)',
    '06:00 PM - 08:00 PM (Evening)',
  ];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-10 shadow-sm">
      {submitSuccess ? (
        <div className="text-center py-10">
          <div className="h-16 w-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-navy-950 font-display mb-3">Booking Request Received!</h2>
          <p className="text-sm text-neutral-500 max-w-md mx-auto leading-relaxed mb-8">
            Thank you, <span className="font-bold text-navy-900">{formState.name}</span>. Your booking request has been securely registered. Our laboratory coordinators will call you back within **30 minutes** to finalize your appointment details and confirm the timing slot.
          </p>

          <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100 max-w-lg mx-auto text-left space-y-3 mb-8">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Patient Name:</span>
              <span className="font-bold text-navy-950">{formState.name}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Mobile Number:</span>
              <span className="font-bold text-navy-950">{formState.phone}</span>
            </div>
            {formState.testSlug && (
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Selected Test:</span>
                <span className="font-bold text-navy-950">
                  {services.find((s) => s.slug === formState.testSlug)?.name}
                </span>
              </div>
            )}
            {formState.doctorId && (
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Consultant Doctor:</span>
                <span className="font-bold text-navy-950">
                  {doctorsData.find((d) => d.id === formState.doctorId)?.doctor.name}
                </span>
              </div>
            )}
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Preferred Date & Slot:</span>
              <span className="font-bold text-navy-950">
                {formState.preferredDate} ({formState.preferredTime.split(' ')[0]})
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Home Collection:</span>
              <span className={`font-bold uppercase ${formState.homeCollection ? 'text-gold-700' : 'text-neutral-500'}`}>
                {formState.homeCollection ? 'Yes (Requested)' : 'No (Walk-in)'}
              </span>
            </div>
          </div>

          <Button
            onClick={() => setSubmitSuccess(false)}
            className="bg-gold-500 hover:bg-gold-600 text-white font-bold h-11 px-6 rounded"
          >
            Submit Another Booking
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Patient Information */}
          <div>
            <h3 className="text-base font-bold text-navy-900 border-b border-neutral-100 pb-3 mb-5 flex items-center gap-2">
              <User className="h-4.5 w-4.5 text-gold-500" />
              1. Patient Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  placeholder="Patient's full name"
                  className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                />
                {errors.name && <span className="text-[11px] text-red-500 mt-1 block">{errors.name}</span>}
              </div>

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
                  placeholder="10-digit mobile number"
                  className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                />
                {errors.phone && <span className="text-[11px] text-red-500 mt-1 block">{errors.phone}</span>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="For PDF report delivery copy"
                  className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                />
                {errors.email && <span className="text-[11px] text-red-500 mt-1 block">{errors.email}</span>}
              </div>
            </div>
          </div>

          {/* Section 2: Appointment Specifics */}
          <div>
            <h3 className="text-base font-bold text-navy-900 border-b border-neutral-100 pb-3 mb-5 flex items-center gap-2">
              <FileText className="h-4.5 w-4.5 text-gold-500" />
              2. Appointment & Selection
            </h3>

            {errors.selection && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-lg mb-6">
                {errors.selection}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Diagnostic Test Selector */}
              <div>
                <label htmlFor="testSlug" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                  Select Diagnostic Test / Package
                </label>
                <select
                  id="testSlug"
                  name="testSlug"
                  value={formState.testSlug}
                  onChange={handleChange}
                  className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white transition-all"
                >
                  <option value="">-- Choose Test (Optional) --</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.name} (₹{service.price})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-neutral-400 block mt-1">
                  Choose pathology tests, X-ray panels, or ultrasound.
                </span>
              </div>

              {/* Doctor Consultant Selector */}
              <div>
                <label htmlFor="doctorId" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                  Select Consultant Doctor
                </label>
                <select
                  id="doctorId"
                  name="doctorId"
                  value={formState.doctorId}
                  onChange={handleChange}
                  className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white transition-all"
                >
                  <option value="">-- Choose Doctor (Optional) --</option>
                  {doctorsData.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.doctor.name} - {doc.doctor.designation}
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-neutral-400 block mt-1">
                  Choose to schedule clinical consult program directly.
                </span>
              </div>

              {/* Preferred Date */}
              <div>
                <label htmlFor="preferredDate" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                  Preferred Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formState.preferredDate}
                    onChange={handleChange}
                    className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white transition-all"
                  />
                </div>
                {errors.preferredDate && <span className="text-[11px] text-red-500 mt-1 block">{errors.preferredDate}</span>}
              </div>

              {/* Preferred Time Slot */}
              <div>
                <label htmlFor="preferredTime" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                  Preferred Time Slot *
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formState.preferredTime}
                  onChange={handleChange}
                  className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white transition-all"
                >
                  <option value="">-- Choose Time Slot --</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.preferredTime && <span className="text-[11px] text-red-500 mt-1 block">{errors.preferredTime}</span>}
              </div>
            </div>
          </div>

          {/* Section 3: Home Sample Collection */}
          <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200/60">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="homeCollection"
                name="homeCollection"
                checked={formState.homeCollection}
                onChange={handleChange}
                className="h-4.5 w-4.5 rounded border-neutral-300 text-gold-500 focus:ring-gold-500 accent-gold-500 mt-1 cursor-pointer"
              />
              <div className="cursor-pointer">
                <label htmlFor="homeCollection" className="font-bold text-navy-950 text-sm block cursor-pointer">
                  Request Home Sample Collection
                </label>
                <p className="text-xs text-neutral-500 leading-relaxed mt-1">
                  Check this box if you would like our trained healthcare technician to collect your blood or urine samples directly from your home in Silchar.
                </p>
              </div>
            </div>

            {/* Conditional Address Fields */}
            {formState.homeCollection && (
              <div className="grid grid-cols-1 gap-5 mt-6 pt-6 border-t border-neutral-200/60">
                <div>
                  <label htmlFor="address" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                    Home Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formState.address}
                    onChange={handleChange}
                    placeholder="House/Flat number, building, street, locality"
                    className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white transition-all"
                  />
                  {errors.address && <span className="text-[11px] text-red-500 mt-1 block">{errors.address}</span>}
                </div>

                <div>
                  <label htmlFor="landmark" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    id="landmark"
                    name="landmark"
                    value={formState.landmark}
                    onChange={handleChange}
                    placeholder="e.g. Near Vivekananda statue, opposite petrol pump"
                    className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Core Submit Call-to-action */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <ShieldCheck className="h-4.5 w-4.5 text-green-500 flex-shrink-0" />
              <span>Secure, HIPAA-compliant patient diagnostics handling.</span>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gold-500 hover:bg-gold-600 text-white font-bold h-12 px-8 rounded tracking-wide shadow-sm w-full sm:w-auto"
            >
              {isSubmitting ? 'Confirming Appointment...' : 'Submit Booking Request'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
