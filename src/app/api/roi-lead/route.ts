import { NextResponse } from 'next/server';
import { notifyLead } from '@/lib/notify';

interface RoiLeadData {
  email: string;
  audienceSize: number;
  waCost: number;
  openRate: number;
  conversionRate: number;
  waOnlyCost: number;
  dynamoCost: number;
  savings: number;
}

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RoiLeadData;

    if (!body.email || !validateEmail(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email' },
        { status: 400 }
      );
    }

    // Notify CRM + email
    await notifyLead({
      email: body.email,
      source: 'ROI Calculator',
      details: {
        audienceSize: body.audienceSize,
        waCost: body.waCost,
        openRate: body.openRate,
        conversionRate: body.conversionRate,
        waOnlyCost: body.waOnlyCost,
        dynamoCost: body.dynamoCost,
        savings: body.savings,
      },
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
