import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: razorpay_order_id, razorpay_payment_id, and razorpay_signature are all required' },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { success: false, error: 'Razorpay keys not configured on server' },
        { status: 500 }
      );
    }

    // Verify signature algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(text)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed: Signature mismatch' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
    });
  } catch (err: any) {
    console.error('Razorpay signature verification error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error during verification' },
      { status: 500 }
    );
  }
}
