import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, bookingDetails } = body;

    if (amount === undefined || amount === null) {
      return NextResponse.json({ success: false, error: 'Amount is required' }, { status: 400 });
    }

    const parsedAmount = parseInt(amount, 10);
    if (isNaN(parsedAmount) || parsedAmount < 100) {
      return NextResponse.json({ success: false, error: 'Amount must be at least 100 paise' }, { status: 400 });
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
      amount: parsedAmount,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Log pending transaction to Google Sheet if webhook is configured
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl && bookingDetails) {
      try {
        const logPayload = {
          ...bookingDetails,
          orderId: order.id,
          amount: parsedAmount / 100, // Convert to INR
          status: 'PENDING',
        };
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logPayload),
        });
      } catch (logErr) {
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
