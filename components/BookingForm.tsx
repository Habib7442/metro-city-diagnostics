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

const DEFAULT_CONSULTATION_FEE = 550;

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

  const queryDoctorId = searchParams.get('doctor') || '';
  const isPreselected = !!queryDoctorId && doctorsData.some((d) => d.id === queryDoctorId);
  const dropdownDoctors = isPreselected
    ? doctorsData.filter((doc) => doc.id === queryDoctorId)
    : doctorsData;
  
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

  const [razorpayOrderId, setRazorpayOrderId] = useState<string>('');
  const [razorpayPaymentId, setRazorpayPaymentId] = useState<string>('');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Load Razorpay Script on mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

  const getWhatsAppMessage = (overrideOrderId?: string, overridePaymentId?: string) => {
    let message = '';
    const activeOrderId = overrideOrderId || razorpayOrderId;
    const activePaymentId = overridePaymentId || razorpayPaymentId;

    if (activeTab === 'lab') {
      const selectedService = services.find((s) => s.slug === formState.testSlug);
      const selectedTest = selectedService?.name || 'N/A';
      const priceLabel = selectedService?.price ? `Rs. ${selectedService.price}` : 'Price on Call (Quote Requested)';
      message = `Hello Metro-City Diagnostics,

I would like to book a Diagnostic Lab Test. Here are my details:

PATIENT DETAILS:
- Name: ${formState.name}
- Mobile: ${formState.phone}
- Email: ${formState.email || 'N/A'}

DIAGNOSTIC TEST DETAILS:
- Test/Package: ${selectedTest}
- Price / Fee: ${priceLabel}
${activeOrderId && activePaymentId ? `- Payment Status: PAID (Online)\n- Razorpay Order ID: ${activeOrderId}\n- Razorpay Payment ID: ${activePaymentId}` : ''}
- Preferred Date: ${formState.preferredDate}
- Preferred Time: ${formState.preferredTime}

SAMPLE COLLECTION:
- Home Collection: ${formState.homeCollection ? 'Yes (Requested)' : 'No (Walk-in)'}
${formState.homeCollection ? `- Address: ${formState.address}\n- Landmark: ${formState.landmark || 'N/A'}` : ''}`;
    } else {
      const selectedDoctor = doctorsData.find((d) => d.id === formState.doctorId);
      const doctorName = selectedDoctor ? selectedDoctor.doctor.name : 'N/A';
      const designation = selectedDoctor ? selectedDoctor.doctor.designation : 'N/A';
      const fees = selectedDoctor ? (selectedDoctor.fees !== undefined ? selectedDoctor.fees : DEFAULT_CONSULTATION_FEE) : DEFAULT_CONSULTATION_FEE;
      const feeText = typeof fees === 'string' ? fees : `Rs. ${fees || DEFAULT_CONSULTATION_FEE}`;
      message = `Hello Metro-City Diagnostics,

I would like to book a Specialist Doctor Consultation. Here are my details:

PATIENT DETAILS:
- Name: ${formState.name}
- Mobile: ${formState.phone}
- Email: ${formState.email || 'N/A'}

CONSULTATION DETAILS:
- Consultant Doctor: Dr. ${doctorName} (${designation})
- Appointment Date: ${formState.preferredDate}
- Timing Slot: ${formState.preferredTime}
- Consultation Fee: ${feeText}
${activeOrderId && activePaymentId ? `- Payment Status: PAID (Online)\n- Razorpay Order ID: ${activeOrderId}\n- Razorpay Payment ID: ${activePaymentId}` : ''}
- Clinic Location: Near Vivekananda Co-operative, Meherpur, Silchar`;
    }
    return message;
  };

  const handleSendWhatsApp = (overrideOrderId?: string, overridePaymentId?: string) => {
    const message = getWhatsAppMessage(overrideOrderId, overridePaymentId);
    const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=919957357278&text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=919957357278&text=${encodeURIComponent(message)}`;
    
    if (isMobile) {
      window.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  const handlePaymentAndSubmit = async (
    amountInPaise: number,
    selectedDoctor: any,
    selectedService: any,
    bookingDetails: any,
    successCallback: (orderId: string, paymentId: string) => void
  ) => {
    try {
      setPaymentError(null);

      if (!(window as any).Razorpay) {
        setPaymentError('Razorpay payment gateway failed to load. Please check your internet connection and refresh.');
        setIsSubmitting(false);
        return;
      }

      // 1. Call Create Order API (passing full bookingDetails to log as PENDING)
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: formState.doctorId,
          testSlug: formState.testSlug,
          bookingDetails,
        }),
      });

      const orderData = await res.json();
      if (!orderData.success) {
        setPaymentError(orderData.error || 'Failed to create payment order');
        setIsSubmitting(false);
        return;
      }

      // 2. Open Razorpay checkout modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Metro-City Diagnostics',
        description: activeTab === 'lab' ? `Lab Test: ${selectedService?.name}` : `Consultation: Dr. ${selectedDoctor?.doctor.name}`,
        order_id: orderData.order_id,
        handler: async function (response: any) {
          try {
            setIsSubmitting(true);
            // 3. Verify signature on backend (updates status to PAID)
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              successCallback(response.razorpay_order_id, response.razorpay_payment_id);
            } else {
              setPaymentError(verifyData.error || 'Payment signature verification failed');
              setIsSubmitting(false);
            }
          } catch (err) {
            setPaymentError('Network error during payment verification');
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: formState.name,
          contact: formState.phone,
          email: formState.email || '',
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
            setPaymentError('Payment was cancelled');
            // Log CANCELLED status to Google Sheet
            fetch('/api/log-booking', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: orderData.order_id,
                status: 'CANCELLED',
              }),
            }).catch((err) => console.error('Google Sheets Integration: Error updating log to CANCELLED status:', err));
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setPaymentError(resp.error.description || 'Payment failed');
        setIsSubmitting(false);
        // Log FAILED status to Google Sheet
        fetch('/api/log-booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderData.order_id,
            status: 'FAILED',
          }),
        }).catch((err) => console.error('Google Sheets Integration: Error updating log to FAILED status:', err));
      });
      rzp.open();
    } catch (err: any) {
      setPaymentError(err.message || 'Payment initiation failed');
      setIsSubmitting(false);
    }
  };

  const handleDownloadInvoice = (overrideOrderId?: string, overridePaymentId?: string) => {
    const activeOrderId = overrideOrderId || razorpayOrderId;
    const activePaymentId = overridePaymentId || razorpayPaymentId;

    const escapeHtml = (str: string) =>
      str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download/print the invoice.');
      return;
    }

    const patientName = formState.name;
    const patientPhone = formState.phone;
    const patientEmail = formState.email || 'N/A';
    const preferredDate = formState.preferredDate;
    const preferredTime = formState.preferredTime;
    
    let description = 'N/A';
    let amountText = 'N/A';
    
    if (activeTab === 'lab') {
      const selectedService = services.find((s) => s.slug === formState.testSlug);
      description = selectedService ? `Lab Test / Package: ${selectedService.name}` : 'Lab Test / Package';
      amountText = selectedService?.price ? `₹${selectedService.price}` : 'Price on Call';
    } else {
      const selectedDoctor = doctorsData.find((d) => d.id === formState.doctorId);
      description = selectedDoctor 
        ? `Consultation: Dr. ${selectedDoctor.doctor.name} (${selectedDoctor.doctor.designation})`
        : 'Doctor Consultation';
      const fees = selectedDoctor ? (selectedDoctor.fees !== undefined ? selectedDoctor.fees : DEFAULT_CONSULTATION_FEE) : DEFAULT_CONSULTATION_FEE;
      amountText = typeof fees === 'string' ? fees : `₹${fees}`;
    }

    const currentFullDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt_Metro_City_Diagnostics</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1f2937;
            margin: 0;
            padding: 40px;
            font-size: 14px;
            line-height: 1.5;
          }
          .invoice-box {
            max-width: 800px;
            margin: auto;
            border: 1px solid #e5e7eb;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #0a1f44;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header-left {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .logo {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #0a1f44;
            background-color: #ffffff;
            flex-shrink: 0;
          }
          .clinic-info h1 {
            color: #0a1f44;
            margin: 0 0 5px 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.5px;
          }
          .clinic-info p {
            margin: 3px 0;
            color: #4b5563;
            font-size: 12px;
          }
          .invoice-title {
            text-align: right;
          }
          .invoice-title h2 {
            margin: 0 0 10px 0;
            color: #9c7b26;
            font-size: 20px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .invoice-title p {
            margin: 3px 0;
            font-size: 12px;
            color: #6b7280;
          }
          .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            color: #9c7b26;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 6px;
            margin-bottom: 12px;
            letter-spacing: 0.5px;
          }
          .details-block p {
            margin: 6px 0;
            font-size: 13px;
          }
          .details-block strong {
            color: #111827;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th {
            background-color: #f3f4f6;
            color: #374151;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
            text-align: left;
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
          }
          td {
            padding: 14px 12px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 13.5px;
          }
          .text-right {
            text-align: right;
          }
          .total-section {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 40px;
          }
          .total-table {
            width: 250px;
            margin-bottom: 0;
          }
          .total-table td {
            padding: 8px 12px;
            border-bottom: none;
          }
          .total-row {
            font-weight: 800;
            font-size: 16px;
            color: #0a1f44;
            border-top: 1px solid #e5e7eb;
          }
          .footer {
            text-align: center;
            border-top: 1px dashed #e5e7eb;
            padding-top: 20px;
            color: #9ca3af;
            font-size: 11px;
            margin-top: 50px;
          }
          @media print {
            body {
              padding: 0;
            }
            .invoice-box {
              border: none;
              box-shadow: none;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <div class="header">
            <div class="header-left">
              <img src="${window.location.origin}/logo.png" alt="Metro-City Diagnostics Logo" class="logo" />
              <div class="clinic-info">
                <h1>METRO-CITY DIAGNOSTICS</h1>
                <p>Birbal Bazar, Meherpur, Silchar, Assam 788015</p>
                <p>Phone: +91 99573 57278, +91 99540 25101</p>
                <p>Email: metrocitydiagnostics1978@gmail.com</p>
              </div>
            </div>
            <div class="invoice-title">
              <h2>Payment Receipt</h2>
              <p><strong>Receipt Date:</strong> ${currentFullDate}</p>
              <p><strong>Order ID:</strong> ${escapeHtml(activeOrderId || 'N/A')}</p>
              <p><strong>Payment ID:</strong> ${escapeHtml(activePaymentId || 'N/A')}</p>
            </div>
          </div>
          
          <div class="details-grid">
            <div class="details-block">
              <div class="section-title">Patient Details</div>
              <p><strong>Name:</strong> ${escapeHtml(patientName)}</p>
              <p><strong>Mobile:</strong> ${escapeHtml(patientPhone)}</p>
              <p><strong>Email:</strong> ${escapeHtml(patientEmail)}</p>
            </div>
            <div class="details-block">
              <div class="section-title">Appointment Summary</div>
              <p><strong>Preferred Date:</strong> ${escapeHtml(preferredDate)}</p>
              <p><strong>Preferred Time:</strong> ${escapeHtml(preferredTime)}</p>
              <p><strong>Status:</strong> PAID (Online)</p>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Item / Description</th>
                <th class="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>${escapeHtml(description)}</strong><br>
                  <span style="font-size: 11px; color: #6b7280;">Scheduled for ${escapeHtml(preferredDate)} (${escapeHtml(preferredTime)})</span>
                </td>
                <td class="text-right"><strong>${escapeHtml(amountText)}</strong></td>
              </tr>
            </tbody>
          </table>
          
          <div class="total-section">
            <table class="total-table">
              <tr>
                <td>Subtotal:</td>
                <td class="text-right">${amountText}</td>
              </tr>
              <tr>
                <td>Taxes (0%):</td>
                <td class="text-right">₹0.00</td>
              </tr>
              <tr class="total-row">
                <td>Total Paid:</td>
                <td class="text-right">${amountText}</td>
              </tr>
            </table>
          </div>
          
          <div class="footer">
            <p>This is a secure computer-generated receipt for your diagnostics/consultation request.</p>
            <p>Thank you for choosing Metro-City Diagnostics. For support, call +91 99573 57278.</p>
          </div>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;
    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setPaymentError(null);

    // Calculate billing amount in paise
    let amountInPaise = 0;
    let selectedDoctor: any = null;
    let selectedService: any = null;

    if (activeTab === 'lab') {
      selectedService = services.find((s) => s.slug === formState.testSlug);
      if (selectedService && selectedService.price) {
        amountInPaise = selectedService.price * 100;
      }
    } else {
      selectedDoctor = doctorsData.find((d) => d.id === formState.doctorId);
      const fees = selectedDoctor ? (selectedDoctor.fees !== undefined ? selectedDoctor.fees : DEFAULT_CONSULTATION_FEE) : DEFAULT_CONSULTATION_FEE;
      amountInPaise = typeof fees === 'number' ? fees * 100 : 0;
    }

    const bookingDetails = {
      type: activeTab === 'lab' ? 'Lab Test / Package' : 'Doctor Consultation',
      name: formState.name,
      phone: formState.phone,
      email: formState.email || 'N/A',
      details: activeTab === 'lab'
        ? (selectedService?.name || 'N/A')
        : `Dr. ${selectedDoctor?.doctor.name || 'N/A'} (${selectedDoctor?.doctor.designation || 'N/A'})`,
      preferredDate: formState.preferredDate,
      preferredTime: formState.preferredTime,
      homeCollection: activeTab === 'lab' ? formState.homeCollection : false,
      address: activeTab === 'lab' && formState.homeCollection
        ? `${formState.address}${formState.landmark ? ` (Landmark: ${formState.landmark})` : ''}`
        : 'N/A',
    };

    const processFinalBooking = (orderId?: string, paymentId?: string) => {
      handleSendWhatsApp(orderId, paymentId);
      setSubmitSuccess(true);
      setIsSubmitting(false);
    };

    // If amount is less than 100 paise (i.e. free booking or Price on Call), skip payment
    if (amountInPaise < 100) {
      // Log the direct unpaid booking as CONFIRMED in the Google Sheet
      fetch('/api/log-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingDetails,
          amount: 0,
          status: 'CONFIRMED',
          orderId: 'N/A',
          paymentId: 'N/A',
        }),
      }).catch((err) => console.error('Google Sheets Integration: Error logging direct booking:', err));

      processFinalBooking();
    } else {
      handlePaymentAndSubmit(amountInPaise, selectedDoctor, selectedService, bookingDetails, (orderId, paymentId) => {
        setRazorpayOrderId(orderId);
        setRazorpayPaymentId(paymentId);
        processFinalBooking(orderId, paymentId);
        // Automatically open the printed invoice/download layout
        setTimeout(() => {
          handleDownloadInvoice(orderId, paymentId);
        }, 300);
      });
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
              Thank you, <span className="font-bold text-navy-900">{formState.name}</span>. Your booking request has been securely compiled. Please click the <strong className="text-green-600 font-bold">"Send WhatsApp Details"</strong> button below if WhatsApp did not open automatically, to ensure your confirmation is sent directly to our helpdesk.
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
                        const fees = feeVal !== undefined ? feeVal : DEFAULT_CONSULTATION_FEE;
                        return typeof fees === 'string' ? fees : `₹${fees || DEFAULT_CONSULTATION_FEE}`;
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

              {razorpayPaymentId && (
                <>
                  <div className="flex justify-between text-xs border-t border-neutral-200/40 pt-2 pb-2">
                    <span className="text-neutral-400 font-medium">Payment ID:</span>
                    <span className="font-mono text-[10px] font-extrabold text-navy-950">{razorpayPaymentId}</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-neutral-200/40 pb-2">
                    <span className="text-neutral-400 font-medium">Payment Status:</span>
                    <span className="font-extrabold text-green-700">PAID (Online)</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
              <Button
                type="button"
                onClick={() => handleSendWhatsApp()}
                className="bg-green-600 hover:bg-green-700 text-white font-extrabold h-11 px-6 rounded cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current"
                >
                  <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z" fill="#25D366" />
                  <path d="M12 4.3c-4.25 0-7.7 3.45-7.7 7.7 0 1.36.35 2.68 1.02 3.86l-1.09 3.98 4.07-1.07c1.14.62 2.43.95 3.73.95 4.25 0 7.7-3.45 7.7-7.7S16.25 4.3 12 4.3zm4.56 10.92c-.25.7-1.22 1.3-1.68 1.35-.46.05-.9-.15-2.88-.94-2.53-1.02-4.14-3.6-4.27-3.77-.12-.17-1.03-1.37-1.03-2.62 0-1.25.65-1.86.88-2.1.23-.25.5-.31.67-.31.17 0 .34 0 .49.01.16.01.37-.06.58.45.21.52.73 1.78.79 1.91.06.13.1.28.01.46-.08.18-.13.3-.26.45-.13.15-.27.34-.39.46-.14.14-.28.29-.12.57.16.27.71 1.17 1.52 1.9.1.09.2.18.3.26 1.04.81 1.83 1.05 2.14 1.18.3.13.48.11.66-.09.18-.21.78-.91.99-1.22.2-.31.41-.26.69-.16.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.75-.18 1.45z" fill="#FFF" fillRule="evenodd" />
                </svg>
                <span>Send WhatsApp Details</span>
              </Button>

              {razorpayPaymentId && (
                <Button
                  type="button"
                  onClick={() => handleDownloadInvoice()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold h-11 px-6 rounded cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <FileText className="h-4.5 w-4.5" />
                  <span>Download Receipt (PDF)</span>
                </Button>
              )}

              <Button
                type="button"
                onClick={() => {
                  setSubmitSuccess(false);
                  setRazorpayOrderId('');
                  setRazorpayPaymentId('');
                  setPaymentError(null);
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold h-11 px-6 rounded cursor-pointer w-full sm:w-auto"
              >
                Submit Another Booking
              </Button>
            </div>
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
                      {!isPreselected && <option value="">-- Choose Specialist Doctor --</option>}
                      {dropdownDoctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.doctor.name} - {doc.doctor.designation} ({typeof doc.fees === 'string' ? doc.fees : `₹${doc.fees || DEFAULT_CONSULTATION_FEE}`})
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
                                  "flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                                  isSelected
                                    ? "bg-blue-50/80 border-blue-500 text-blue-950 shadow-sm"
                                    : "bg-white border-neutral-200 text-navy-950 hover:border-neutral-300 hover:bg-neutral-50/50"
                                )}
                                style={{ minHeight: '56px' }}
                              >
                                <span className={cn(
                                  "text-[10px] font-bold uppercase tracking-wider mb-0.5",
                                  isSelected ? "text-blue-700" : "text-neutral-400"
                                )}>
                                  {dateInfo.displayDay}
                                </span>
                                <span className="text-sm font-extrabold tracking-tight">
                                  {dateInfo.displayDate}
                                </span>
                                {isSelected && (
                                  <div className="mt-1 bg-blue-650 text-white rounded-full p-0.5">
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
                            Dr. {selectedDoc.doctor.name} will consult on <span className="font-extrabold text-navy-950">{selectedDoc.timing.days}</span> at <span className="font-extrabold text-navy-950">{selectedDoc.timing.time}</span>. Consultation Fee: <span className="font-extrabold text-emerald-700">{typeof selectedDoc.fees === 'string' ? selectedDoc.fees : `₹${selectedDoc.fees || DEFAULT_CONSULTATION_FEE}`}</span>.
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

            {paymentError && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold leading-relaxed">
                ⚠️ {paymentError}
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold h-12 px-8 rounded tracking-wide shadow-sm w-full sm:w-auto cursor-pointer"
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
