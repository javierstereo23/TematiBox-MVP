import { NextResponse } from 'next/server';
import { notifyLead } from '@/lib/notify';

interface OnePagerLeadData {
  email: string;
}

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OnePagerLeadData;

    if (!body.email || !validateEmail(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email' },
        { status: 400 }
      );
    }

    // Notify CRM + email
    await notifyLead({
      email: body.email,
      source: 'One-Pager SMB Download',
    });

    return NextResponse.json(
      { success: true, message: 'Lead registered successfully.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error processing request' },
      { status: 500 }
    );
  }
}
