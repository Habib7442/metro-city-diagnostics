import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { services } from '@/lib/content';
import doctorsData from '@/lib/doctors.json';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { doctorId, testSlug, bookingDetails } = body;

    // Server-side price calculation
    let calculatedAmount = 0; // in Paise

    if (testSlug) {
      const service = services.find((s) => s.slug === testSlug);
      if (!service) {
        return NextResponse.json({ success: false, error: 'Selected service/test not found' }, { status: 400 });
      }
      if (!service.price) {
        return NextResponse.json({ success: false, error: 'Selected service has no online price (Price on Call)' }, { status: 400 });
      }
      calculatedAmount = service.price * 100;
    } else if (doctorId) {
      const doctor = doctorsData.find((d) => d.id === doctorId);
      if (!doctor) {
        return NextResponse.json({ success: false, error: 'Selected consultant doctor not found' }, { status: 400 });
      }
      const fees = doctor.fees !== undefined ? doctor.fees : 550;
      calculatedAmount = typeof fees === 'number' ? fees * 100 : 55000;
    } else {
      return NextResponse.json({ success: false, error: 'Either doctorId or testSlug is required' }, { status: 400 });
    }

    if (calculatedAmount < 100) {
      return NextResponse.json({ success: false, error: 'Amount must be at least ₹1 (100 paise)' }, { status: 400 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ success: false, error: 'Razorpay keys not configured on server' }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: calculatedAmount,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    };

    let timeoutId: NodeJS.Timeout | undefined;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error('Razorpay API request timed out')), 10000);
    });

    let order;
    try {
      order = await Promise.race([
        razorpay.orders.create(options),
        timeoutPromise,
      ]);
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }

    // Log pending transaction to Google Sheet if webhook is configured
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    const loggingSecret = process.env.LOGGING_SECRET;
    if (webhookUrl && bookingDetails) {
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => abortController.abort(), 5000); // 5 second timeout
      try {
        const logPayload = {
          ...bookingDetails,
          orderId: order.id,
          amount: calculatedAmount / 100, // Convert to INR
          status: 'PENDING',
          token: loggingSecret, // Secure token verification in Apps Script
        };
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logPayload),
          signal: abortController.signal,
        });
        clearTimeout(timeoutId);
      } catch (logErr) {
        clearTimeout(timeoutId);
        console.error('Google Sheets Integration: Error logging PENDING status:', logErr);
      }
    }

    return NextResponse.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: any) {
    console.error('Razorpay order creation error:', err);

    // Check for Razorpay authentication error (status 401)
    if (err.statusCode === 401 || (err.message && err.message.includes('401')) || (err.error && err.error.code === 'BAD_REQUEST_ERROR' && err.error.description.includes('API key'))) {
      return NextResponse.json({ success: false, error: 'Razorpay authentication failed' }, { status: 401 });
    }

    return NextResponse.json({ success: false, error: err.message || 'Internal server error during order creation' }, { status: 500 });
  }
}

