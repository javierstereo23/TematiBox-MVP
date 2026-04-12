import { NextResponse } from 'next/server';
import { notifyLead } from '@/lib/notify';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  message?: string;
}

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactFormData;

    const errors: Record<string, string> = {};

    if (!body.name || body.name.trim().length < 2) {
      errors.name = 'El nombre es requerido (mínimo 2 caracteres)';
    }

    if (!body.email || !validateEmail(body.email)) {
      errors.email = 'Email inválido';
    }

    if (!body.company || body.company.trim().length < 2) {
      errors.company = 'La empresa es requerida';
    }

    if (!body.role || body.role.trim().length === 0) {
      errors.role = 'El rol/área es requerido';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Notify CRM + email
    await notifyLead({
      email: body.email,
      name: body.name,
      company: body.company,
      role: body.role,
      source: 'Contact Form',
      details: { message: body.message || '' },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Solicitud recibida correctamente. Nos pondremos en contacto pronto.',
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, errors: { general: 'Error al procesar la solicitud' } },
      { status: 500 }
    );
  }
}
