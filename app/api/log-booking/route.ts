import { NextResponse } from 'next/server';

function isValidPayload(payload: any): boolean {
  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) return false;

  // Case A: State Update (CANCELLED or FAILED)
  if (payload.status && ['CANCELLED', 'FAILED'].includes(payload.status)) {
    if (typeof payload.orderId !== 'string' || payload.orderId.trim() === '') return false;
    const allowedKeys = ['orderId', 'status'];
    return Object.keys(payload).every(k => allowedKeys.includes(k));
  }

  // Case B: Full Booking Log
  if (payload.status && !['CONFIRMED', 'PENDING', 'PAID'].includes(payload.status)) return false;

  if (typeof payload.type !== 'string' || !['Lab Test / Package', 'Doctor Consultation'].includes(payload.type)) return false;
  if (typeof payload.name !== 'string' || payload.name.trim() === '') return false;
  if (typeof payload.phone !== 'string' || payload.phone.trim().length < 10) return false;
  if (payload.email && typeof payload.email !== 'string') return false;
  if (typeof payload.details !== 'string' || payload.details.trim() === '') return false;
  if (typeof payload.preferredDate !== 'string' || payload.preferredDate.trim() === '') return false;
  if (typeof payload.preferredTime !== 'string' || payload.preferredTime.trim() === '') return false;
  
  if (payload.homeCollection !== undefined && typeof payload.homeCollection !== 'boolean') return false;
  if (payload.homeCollection && (typeof payload.address !== 'string' || payload.address.trim() === '')) return false;

  return true;
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Validate required fields
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return NextResponse.json({ success: false, error: 'Payload must be a valid object' }, { status: 400 });
    }

    // Validate status field if present
    const validStatuses = ['PENDING', 'PAID', 'CANCELLED', 'FAILED', 'CONFIRMED'];
    if (payload.status && !validStatuses.includes(payload.status)) {
      return NextResponse.json({ success: false, error: 'Invalid status value' }, { status: 400 });
    }

    // 1. Rigorous payload validation
    if (!isValidPayload(payload)) {
      return NextResponse.json({ success: false, error: 'Invalid or prohibited payload parameters' }, { status: 400 });
    }

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    const loggingSecret = process.env.LOGGING_SECRET;

    // Mask PII for local warning logs
    const mask = (val: any) => {
      if (typeof val !== 'string') return val;
      if (val === 'N/A') return val;
      if (val.length <= 3) return '***';
      return val.substring(0, 3) + '*'.repeat(val.length - 3);
    };

    const maskedPayload = {
      ...payload,
      name: payload.name ? mask(payload.name) : undefined,
      phone: payload.phone ? mask(payload.phone) : undefined,
      email: payload.email && payload.email !== 'N/A' ? '***@***.***' : undefined,
      address: payload.address && payload.address !== 'N/A' ? '***' : undefined,
    };

    if (!webhookUrl) {
      console.warn('Google Sheets Integration: GOOGLE_SHEET_WEBHOOK_URL is not configured. Booking logged locally in server console only:', maskedPayload);
      return NextResponse.json({ success: true, message: 'Local logging completed (Webhook not configured)' });
    }

    // 2. Inject LOGGING_SECRET to authenticate request to Apps Script Web App
    const authenticatedPayload = {
      ...payload,
      token: loggingSecret,
    };

    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 5000); // 5 second timeout

    let res;
    try {
      // Forward the authenticated booking log to the Google Apps Script Web App
      res = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authenticatedPayload),
        signal: abortController.signal,
      });
      clearTimeout(timeoutId);
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      console.error('Google Sheets Integration: Webhook fetch error or timeout:', fetchErr);
      return NextResponse.json({ success: false, error: 'Database write timed out or network failed' }, { status: 504 });
    }

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Google Sheets Integration: Failed to send log to webhook. Status:', res.status, errorText);
      return NextResponse.json({ success: false, error: 'Failed to write booking to spreadsheet' }, { status: 502 });
    }

    const resData = await res.json();
    if (!resData.success) {
      console.error('Google Sheets Integration: Webhook returned failure:', resData.error);
      return NextResponse.json({ success: false, error: resData.error || 'Webhook logging error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Google Sheet updated successfully' });
  } catch (err: any) {
    console.error('Google Sheets Integration error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Internal logging error' }, { status: 500 });
  }
}
