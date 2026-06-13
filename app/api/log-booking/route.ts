import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('Google Sheets Integration: GOOGLE_SHEET_WEBHOOK_URL is not configured. Booking logged locally in server console only:', payload);
      return NextResponse.json({ success: true, message: 'Local logging completed (Webhook not configured)' });
    }

    // Forward the booking log to the Google Apps Script Web App
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

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
