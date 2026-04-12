import { NextResponse } from 'next/server';
import { notifyLead } from '@/lib/notify';

interface QualifyData {
  companyType: 'telco' | 'content-provider';
  country?: string;
  countries?: string[];
  subscribers?: string;
  volume?: string;
  area?: string;
  operators?: string[];
  channels: string[];
  challenge?: string;
  categories?: string[];
  businessModel?: string;
  satPush?: string;
  name: string;
  email: string;
  company: string;
  role: string;
}

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QualifyData;

    const errors: Record<string, string> = {};

    if (!body.companyType) {
      errors.companyType = 'Company type is required';
    }

    if (!body.name || body.name.trim().length < 2) {
      errors.name = 'Name is required';
    }

    if (!body.email || !validateEmail(body.email)) {
      errors.email = 'Valid email is required';
    }

    if (!body.company || body.company.trim().length < 2) {
      errors.company = 'Company is required';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Notify CRM + email
    await notifyLead({
      email: body.email,
      name: body.name,
      company: body.company,
      role: body.role,
      source: 'Qualification Wizard',
      details: {
        companyType: body.companyType,
        country: body.country,
        countries: body.countries,
        subscribers: body.subscribers,
        volume: body.volume,
        area: body.area,
        operators: body.operators,
        channels: body.channels,
        challenge: body.challenge,
        categories: body.categories,
        businessModel: body.businessModel,
        satPush: body.satPush,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Qualification data received.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, errors: { general: 'Error processing request' } },
      { status: 500 }
    );
  }
}
