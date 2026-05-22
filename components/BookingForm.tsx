'use client';

/**
 * BookingForm.tsx
 * Client-side interactive appointment & sample collection booking form.
 * Separated into two distinct booking pathways: Lab Tests and Doctor Consultations.
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, Clock, MapPin, User, Phone, Mail, FileText, CheckCircle2, ShieldCheck, Stethoscope, Check, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/content';
import doctorsData from '@/lib/doctors.json';
import { cn } from '@/lib/utils';

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

// Helper to parse timing string like "Every Tuesday & Friday" or "Every Monday to Saturday"
const getDaysFromTimingString = (daysStr: string): number[] => {
  const str = daysStr.toLowerCase();
  const days: number[] = [];
  
  if (str.includes('monday to saturday')) {
    return [1, 2, 3, 4, 5, 6];
  }
  
  if (str.includes('monday')) days.push(1);
  if (str.includes('tuesday')) days.push(2);
  if (str.includes('wednesday')) days.push(3);
  if (str.includes('thursday')) days.push(4);
  if (str.includes('friday')) days.push(5);
  if (str.includes('saturday')) days.push(6);
  if (str.includes('sunday')) days.push(0);
  
  if (days.length === 0) return [1, 2, 3, 4, 5, 6];
  return days;
};

// Helper to check if a specific slot time is in the past for today's date
const isSlotInPast = (dateStr: string, timeStr: string): boolean => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    if (dateStr !== todayStr) return false;

    // Parse start time (e.g. "2:30 PM" from "2:30 PM to 3:30 PM")
    const parts = timeStr.split(' to ');
    const startTimeStr = parts[0];
    
    const match = startTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return false;
    
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const ampm = match[3].toUpperCase();
    
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    
    const now = new Date();
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);
    
    // Add 15 minutes buffer
    slotTime.setMinutes(slotTime.getMinutes() + 15);
    
    return now > slotTime;
  } catch (err) {
    return false;
  }
};

// Generates the next N available calendar dates matching the doctor's schedule
const getUpcomingDoctorDates = (daysStr: string, timeStr: string, count = 6): { dateStr: string; displayDay: string; displayDate: string }[] => {
  const allowedDays = getDaysFromTimingString(daysStr);
  const dates: { dateStr: string; displayDay: string; displayDate: string }[] = [];
  
  const current = new Date();
  
  // Look up to 45 days ahead to find enough slots
  for (let i = 0; i < 45; i++) {
    const dayOfWeek = current.getDay();
    if (allowedDays.includes(dayOfWeek)) {
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, '0');
      const day = String(current.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      const isPast = isSlotInPast(dateStr, timeStr);
      
      if (!isPast && dayOfWeek !== 0) { // Skip Sundays
        const displayDay = current.toLocaleDateString('en-US', { weekday: 'short' });
        const displayDate = current.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        dates.push({ dateStr, displayDay, displayDate });
        if (dates.length === count) break;
      }
    }
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'lab' | 'doctor'>('lab');
  
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
    
    if (doctorId && doctorsData.some((d) => d.id === doctorId)) {
      setActiveTab('doctor');
      setFormState((prev) => {
        const doc = doctorsData.find((d) => d.id === doctorId);
        let nextDate = '';
        if (doc) {
          const upcoming = getUpcomingDoctorDates(doc.timing.days, doc.timing.time, 1);
          if (upcoming.length > 0) {
            nextDate = upcoming[0].dateStr;
          }
        }
        return {
          ...prev,
          doctorId: doctorId,
          testSlug: '',
          preferredDate: nextDate,
          preferredTime: doc ? doc.timing.time : prev.preferredTime,
        };
      });
    } else if (testSlug && services.some((s) => s.slug === testSlug)) {
      setActiveTab('lab');
      setFormState((prev) => ({
        ...prev,
        testSlug: testSlug,
        doctorId: '',
        preferredDate: '',
        preferredTime: '',
      }));
    }
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

    if (activeTab === 'lab') {
      if (!formState.testSlug) {
        newErrors.testSlug = 'Please select a diagnostic test or package';
      }
      
      if (!formState.preferredDate) {
        newErrors.preferredDate = 'Please select a preferred date';
      } else {
        const selected = new Date(formState.preferredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
          newErrors.preferredDate = 'Appointment date cannot be in the past';
        } else {
          const dayOfWeek = selected.getDay();
          if (dayOfWeek === 0) {
            newErrors.preferredDate = 'Sunday is Closed. Please select Monday to Saturday.';
          }
        }
      }
      
      if (!formState.preferredTime) {
        newErrors.preferredTime = 'Please select a preferred time slot';
      }
      
      if (formState.homeCollection && !formState.address.trim()) {
        newErrors.address = 'Full address is required for home sample collection';
      }
    } else {
      // Doctor tab
      if (!formState.doctorId) {
        newErrors.doctorId = 'Please select a consultant specialist';
      }
      
      if (!formState.preferredDate) {
        newErrors.preferredDate = 'Please select a consultation date';
      } else {
        const selected = new Date(formState.preferredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
          newErrors.preferredDate = 'Appointment date cannot be in the past';
        } else {
          const dayOfWeek = selected.getDay();
          if (dayOfWeek === 0) {
            newErrors.preferredDate = 'Sunday is Closed. Please select Monday to Saturday.';
          } else if (formState.doctorId) {
            const doc = doctorsData.find((d) => d.id === formState.doctorId);
            if (doc) {
              const allowedDays = getDaysFromTimingString(doc.timing.days);
              if (!allowedDays.includes(dayOfWeek)) {
                newErrors.preferredDate = `${doc.doctor.name} is only available on ${doc.timing.days}.`;
              }
            }
          }
        }
      }
      
      if (!formState.preferredTime) {
        newErrors.preferredTime = 'Appointment slot timing is missing';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    if (name === 'doctorId') {
      const docId = val as string;
      const doc = doctorsData.find((d) => d.id === docId);
      
      let nextDate = '';
      if (doc) {
        const upcoming = getUpcomingDoctorDates(doc.timing.days, doc.timing.time, 1);
        if (upcoming.length > 0) {
          nextDate = upcoming[0].dateStr;
        }
      }
      
      setFormState((prev) => ({
        ...prev,
        doctorId: docId,
        preferredDate: nextDate,
        preferredTime: doc ? doc.timing.time : '',
      }));
      setErrors({});
    } else {
      setFormState((prev) => ({ ...prev, [name]: val }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      let message = '';
      
      if (activeTab === 'lab') {
        const selectedService = services.find((s) => s.slug === formState.testSlug);
        const selectedTest = selectedService?.name || 'N/A';
        const priceLabel = selectedService?.price ? `₹${selectedService.price}` : 'Price on Call (Quote Requested)';
        message = `Hello Metro-City Diagnostics,

I would like to book a Diagnostic Lab Test. Here are my details:

📋 PATIENT DETAILS:
• Name: ${formState.name}
• Mobile: ${formState.phone}
• Email: ${formState.email || 'N/A'}

🔬 DIAGNOSTIC TEST DETAILS:
• Test/Package: ${selectedTest}
• Price / Fee: ${priceLabel}
• Preferred Date: ${formState.preferredDate}
• Preferred Time: ${formState.preferredTime}

🏠 SAMPLE COLLECTION:
• Home Collection: ${formState.homeCollection ? 'Yes (Requested)' : 'No (Walk-in)'}
${formState.homeCollection ? `• Address: ${formState.address}\n• Landmark: ${formState.landmark || 'N/A'}` : ''}`;
      } else {
        const selectedDoctor = doctorsData.find((d) => d.id === formState.doctorId);
        const doctorName = selectedDoctor ? selectedDoctor.doctor.name : 'N/A';
        const designation = selectedDoctor ? selectedDoctor.doctor.designation : 'N/A';
        const fees = selectedDoctor ? (selectedDoctor.fees !== undefined ? selectedDoctor.fees : 500) : 500;
        const feeText = typeof fees === 'string' ? fees : `₹${fees || 500}`;
        message = `Hello Metro-City Diagnostics,

I would like to book a Specialist Doctor Consultation. Here are my details:

📋 PATIENT DETAILS:
• Name: ${formState.name}
• Mobile: ${formState.phone}
• Email: ${formState.email || 'N/A'}

👨‍⚕️ CONSULTATION DETAILS:
• Consultant Doctor: Dr. ${doctorName} (${designation})
• Appointment Date: ${formState.preferredDate}
• Timing Slot: ${formState.preferredTime}
• Consultation Fee: ${feeText}
• Clinic Location: Near Vivekananda Co-operative, Meherpur, Silchar`;
      }

      const whatsappUrl = `https://wa.me/919957357278?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDoc = activeTab === 'doctor' && formState.doctorId
    ? doctorsData.find((d) => d.id === formState.doctorId)
    : null;

  // Predefined time slots for general pathology booking
  const generalTimeSlots = [
    '07:30 AM - 09:30 AM (Early Morning)',
    '09:30 AM - 12:30 PM (Forenoon)',
    '12:30 PM - 03:30 PM (Afternoon)',
    '03:30 PM - 06:30 PM (Late Afternoon)',
    '06:30 PM - 08:30 PM (Evening)',
  ];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden transition-all">
      {/* Visual Navigation Tabs */}
      {!submitSuccess && (
        <div className="flex border-b border-neutral-200 bg-neutral-50/80 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setActiveTab('lab');
              setErrors({});
              setFormState((prev) => ({
                ...prev,
                doctorId: '',
                preferredDate: '',
                preferredTime: '',
              }));
            }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2",
              activeTab === 'lab'
                ? "bg-white text-navy-950 shadow-sm border border-neutral-200/50"
                : "text-neutral-500 hover:text-navy-900 hover:bg-neutral-100"
            )}
            style={{ minHeight: '44px' }}
          >
            <Layers className={cn("h-4 w-4 shrink-0 transition-colors", activeTab === 'lab' ? "text-gold-500" : "text-neutral-400")} />
            <span>🔬 Lab Test / Package</span>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setActiveTab('doctor');
              setErrors({});
              setFormState((prev) => ({
                ...prev,
                testSlug: '',
                homeCollection: false,
                address: '',
                landmark: '',
                preferredDate: '',
                preferredTime: '',
              }));
            }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2",
              activeTab === 'doctor'
                ? "bg-white text-navy-950 shadow-sm border border-neutral-200/50"
                : "text-neutral-500 hover:text-navy-900 hover:bg-neutral-100"
            )}
            style={{ minHeight: '44px' }}
          >
            <Stethoscope className={cn("h-4.5 w-4.5 shrink-0 transition-colors", activeTab === 'doctor' ? "text-gold-500" : "text-neutral-400")} />
            <span>👨‍⚕️ Doctor Consultation</span>
          </button>
        </div>
      )}

      {/* Form Container */}
      <div className="p-6 md:p-10">
        {submitSuccess ? (
          <div className="text-center py-8">
            <div className="h-16 w-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
              <CheckCircle2 className="h-10 w-10 animate-bounce" />
            </div>
            <h2 className="text-2xl font-black text-navy-950 font-display mb-3">Booking Request Sent!</h2>
            <p className="text-sm text-neutral-500 max-w-md mx-auto leading-relaxed mb-8">
              Thank you, <span className="font-bold text-navy-900">{formState.name}</span>. Your booking request has been securely compiled. We have redirected you to WhatsApp to instantly submit your booking details. Our helpdesk will call you within <span className="text-gold-700 font-bold">30 minutes</span> to finalize everything.
            </p>

            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-150 max-w-lg mx-auto text-left space-y-3 mb-8">
              <div className="flex justify-between text-xs border-b border-neutral-200/40 pb-2">
                <span className="text-neutral-400 font-medium">Patient Name:</span>
                <span className="font-extrabold text-navy-950">{formState.name}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-neutral-200/40 pb-2">
                <span className="text-neutral-400 font-medium">Mobile Number:</span>
                <span className="font-extrabold text-navy-950">{formState.phone}</span>
              </div>
              
              {activeTab === 'lab' && formState.testSlug && (
                <>
                  <div className="flex justify-between text-xs border-b border-neutral-200/40 pb-2">
                    <span className="text-neutral-400 font-medium">Selected Test:</span>
                    <span className="font-extrabold text-navy-950">
                      {services.find((s) => s.slug === formState.testSlug)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-neutral-200/40 pb-2">
                    <span className="text-neutral-400 font-medium">Test Fee:</span>
                    <span className="font-extrabold text-navy-950">
                      {(() => {
                        const s = services.find((s) => s.slug === formState.testSlug);
                        return s?.price ? `₹${s.price}` : 'Price on Call';
                      })()}
                    </span>
                  </div>
                </>
              )}
              {activeTab === 'doctor' && formState.doctorId && (
                <>
                  <div className="flex justify-between text-xs border-b border-neutral-200/40 pb-2">
                    <span className="text-neutral-400 font-medium">Consulting Specialist:</span>
                    <span className="font-extrabold text-navy-950">
                      {doctorsData.find((d) => d.id === formState.doctorId)?.doctor.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-neutral-200/40 pb-2">
                    <span className="text-neutral-400 font-medium">Consultation Fee:</span>
                    <span className="font-extrabold text-emerald-700">
                      {(() => {
                        const feeVal = doctorsData.find((d) => d.id === formState.doctorId)?.fees;
                        const fees = feeVal !== undefined ? feeVal : 500;
                        return typeof fees === 'string' ? fees : `₹${fees || 500}`;
                      })()}
                    </span>
                  </div>
                </>
              )}
              
              <div className="flex justify-between text-xs border-b border-neutral-200/40 pb-2">
                <span className="text-neutral-400 font-medium">Preferred Date & Slot:</span>
                <span className="font-extrabold text-navy-950">
                  {formState.preferredDate} ({formState.preferredTime.split(' ')[0]})
                </span>
              </div>
              
              {activeTab === 'lab' && (
                <div className="flex justify-between text-xs pb-1">
                  <span className="text-neutral-400 font-medium">Home Collection:</span>
                  <span className={`font-extrabold uppercase ${formState.homeCollection ? 'text-gold-700' : 'text-neutral-500'}`}>
                    {formState.homeCollection ? 'Yes (Requested)' : 'No (Walk-in)'}
                  </span>
                </div>
              )}
            </div>

            <Button
              onClick={() => {
                setSubmitSuccess(false);
                setFormState({
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
              }}
              className="bg-gold-500 hover:bg-gold-600 text-white font-extrabold h-11 px-6 rounded cursor-pointer"
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

            {/* Section 2: Conditional Selections */}
            <div>
              <h3 className="text-base font-bold text-navy-900 border-b border-neutral-100 pb-3 mb-5 flex items-center gap-2">
                {activeTab === 'lab' ? (
                  <>
                    <Layers className="h-4.5 w-4.5 text-gold-500" />
                    2. Lab Test & Schedule Selection
                  </>
                ) : (
                  <>
                    <Stethoscope className="h-4.5 w-4.5 text-gold-500" />
                    2. Specialist Doctor Appointment
                  </>
                )}
              </h3>

              {/* Form A: Diagnostic Lab Test Booking */}
              {activeTab === 'lab' && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="testSlug" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                      Select Diagnostic Test or Package *
                    </label>
                    <select
                      id="testSlug"
                      name="testSlug"
                      value={formState.testSlug}
                      onChange={handleChange}
                      className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white transition-all"
                    >
                      <option value="">-- Choose Diagnostic Test / Package --</option>
                      {services.map((service) => (
                        <option key={service.slug} value={service.slug}>
                          {service.name} ({service.price ? `₹${service.price}` : 'Price on Call'})
                        </option>
                      ))}
                    </select>
                    {errors.testSlug && (
                      <span className="text-[11px] text-red-500 mt-1 block">{errors.testSlug}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Lab Test Date Selector */}
                    <div>
                      <label htmlFor="preferredDate" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        min={new Date().toISOString().split('T')[0]}
                        value={formState.preferredDate}
                        onChange={handleChange}
                        className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white transition-all"
                      />
                      {errors.preferredDate && (
                        <span className="text-[11px] text-red-500 mt-1 block">{errors.preferredDate}</span>
                      )}
                    </div>

                    {/* Lab Test Time Slots */}
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
                        <option value="">-- Choose preferred time window --</option>
                        {generalTimeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {errors.preferredTime && (
                        <span className="text-[11px] text-red-500 mt-1 block">{errors.preferredTime}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Form B: Specialist Doctor Consultation */}
              {activeTab === 'doctor' && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="doctorId" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                      Select Consultant Doctor *
                    </label>
                    <select
                      id="doctorId"
                      name="doctorId"
                      value={formState.doctorId}
                      onChange={handleChange}
                      className="w-full rounded border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white transition-all"
                    >
                      <option value="">-- Choose Specialist Doctor --</option>
                      {doctorsData.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.doctor.name} - {doc.doctor.designation} ({typeof doc.fees === 'string' ? doc.fees : `₹${doc.fees || 500}`})
                        </option>
                      ))}
                    </select>
                    {errors.doctorId && (
                      <span className="text-[11px] text-red-500 mt-1 block">{errors.doctorId}</span>
                    )}
                  </div>

                  {/* Doctor Scheduling Grid Activated ONLY when Doctor is Selected */}
                  {selectedDoc ? (
                    <div className="space-y-5 animate-fadeIn">
                      <div>
                        <label className="block text-xs font-extrabold text-navy-950 uppercase tracking-wider mb-2.5">
                          Select Consultation Date *
                        </label>
                        
                        {/* Interactive Clickable Available Dates Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {getUpcomingDoctorDates(selectedDoc.timing.days, selectedDoc.timing.time).map((dateInfo) => {
                            const isSelected = formState.preferredDate === dateInfo.dateStr;
                            return (
                              <button
                                key={dateInfo.dateStr}
                                type="button"
                                onClick={() => {
                                  setFormState((prev) => ({ 
                                    ...prev, 
                                    preferredDate: dateInfo.dateStr,
                                    preferredTime: selectedDoc.timing.time 
                                  }));
                                  setErrors((prev) => ({ ...prev, preferredDate: '' }));
                                }}
                                className={cn(
                                  "flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2",
                                  isSelected
                                    ? "bg-gold-50/80 border-gold-500 text-gold-950 shadow-sm"
                                    : "bg-white border-neutral-200 text-navy-950 hover:border-neutral-300 hover:bg-neutral-50/50"
                                )}
                                style={{ minHeight: '56px' }}
                              >
                                <span className={cn(
                                  "text-[10px] font-bold uppercase tracking-wider mb-0.5",
                                  isSelected ? "text-gold-700" : "text-neutral-400"
                                )}>
                                  {dateInfo.displayDay}
                                </span>
                                <span className="text-sm font-extrabold tracking-tight">
                                  {dateInfo.displayDate}
                                </span>
                                {isSelected && (
                                  <div className="mt-1 bg-gold-500 text-white rounded-full p-0.5">
                                    <Check className="h-3 w-3 font-bold" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {errors.preferredDate && (
                          <span className="text-[11px] text-red-500 mt-2 block">{errors.preferredDate}</span>
                        )}
                      </div>

                      {/* Read-Only Consultation Timings Display */}
                      <div className="p-4 bg-navy-50/50 border border-navy-100/50 rounded-xl flex items-start gap-3">
                        <Clock className="h-5 w-5 text-navy-700 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wide">
                            Selected Timing Slot & Fee
                          </h4>
                          <p className="mt-1 text-sm text-navy-800 font-medium">
                            Dr. {selectedDoc.doctor.name} will consult on <span className="font-extrabold text-navy-950">{selectedDoc.timing.days}</span> at <span className="font-extrabold text-navy-950">{selectedDoc.timing.time}</span>. Consultation Fee: <span className="font-extrabold text-emerald-700">{typeof selectedDoc.fees === 'string' ? selectedDoc.fees : `₹${selectedDoc.fees || 500}`}</span>.
                          </p>
                          <p className="mt-1.5 text-[10px] text-navy-600/80 leading-relaxed font-semibold italic">
                            * The appointment slot is dynamically pre-filled to match this doctor's precise hospital timing profile.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Visual Placeholder if Doctor is Not Selected */
                    <div className="text-center py-8 px-6 bg-neutral-50 rounded-xl border border-neutral-200/40">
                      <Stethoscope className="h-8 w-8 text-neutral-350 mx-auto mb-2.5 animate-pulse" />
                      <p className="text-sm font-bold text-navy-950">Select a Specialist Doctor</p>
                      <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto leading-relaxed">
                        Choose a specialist clinical consultant above to unlock their customized consultation dates and weekly schedule grids.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Section 3: Home Sample Collection (Lab Form A Only) */}
            {activeTab === 'lab' && (
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
            )}

            {/* Submit Bar */}
            <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <ShieldCheck className="h-4.5 w-4.5 text-green-500 flex-shrink-0" />
                <span>Secure, HIPAA-compliant patient diagnostics handling.</span>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold-500 hover:bg-gold-600 text-white font-extrabold h-12 px-8 rounded tracking-wide shadow-sm w-full sm:w-auto cursor-pointer"
              >
                {isSubmitting ? 'Confirming Appointment...' : 'Submit Booking Request'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
