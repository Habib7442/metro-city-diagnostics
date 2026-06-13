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

    const expectedSignatureBuffer = Buffer.from(expectedSignature, 'hex');
    const receivedSignatureBuffer = Buffer.from(razorpay_signature, 'hex');

    if (expectedSignatureBuffer.length !== receivedSignatureBuffer.length ||
        !crypto.timingSafeEqual(expectedSignatureBuffer, receivedSignatureBuffer)) {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed: Signature mismatch' },
        { status: 400 }
      );
    }

    // Update log status to PAID in Google Sheet if webhook is configured
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    const loggingSecret = process.env.LOGGING_SECRET;
    if (webhookUrl) {
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => abortController.abort(), 5000); // 5 second timeout
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            status: 'PAID',
            token: loggingSecret,
          }),
          signal: abortController.signal,
        });
        clearTimeout(timeoutId);
      } catch (logErr) {
        clearTimeout(timeoutId);
        console.error('Google Sheets Integration: Error updating log to PAID status:', logErr);
      }
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
