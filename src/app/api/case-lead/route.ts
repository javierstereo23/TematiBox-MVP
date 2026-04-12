import { NextResponse } from 'next/server';
import { notifyLead } from '@/lib/notify';

interface CaseLeadData {
  nombre: string;
  email: string;
  empresa: string;
  cargo: string;
  caseId: string;
}

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CaseLeadData;

    if (!body.email || !validateEmail(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email' },
        { status: 400 }
      );
    }

    if (!body.nombre || !body.empresa || !body.cargo) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Notify CRM + email
    await notifyLead({
      email: body.email,
      name: body.nombre,
      company: body.empresa,
      role: body.cargo,
      source: 'Case Study Download',
      details: { caseId: body.caseId },
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
