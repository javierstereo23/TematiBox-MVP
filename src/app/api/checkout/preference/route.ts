import { NextResponse } from "next/server";

// Mercado Pago Preference API integration
// If MP_ACCESS_TOKEN is missing, respond with { mlFallback: true } so the
// client redirects to the ML permalink (which also uses Mercado Pago internally).

interface CheckoutBody {
  productId: string;
  title: string;
  price: number;
  image?: string;
  personalization?: {
    name: string;
    age: number;
    eventDate?: string | null;
    eventTime?: string | null;
    venue?: string | null;
    address?: string | null;
  };
}

export async function POST(req: Request) {
  const token = process.env.MP_ACCESS_TOKEN;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!token) {
    return NextResponse.json({ mlFallback: true, reason: "MP_ACCESS_TOKEN not configured" });
  }

  let body: CheckoutBody;
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!body.productId || !body.price || !body.title) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const persNote = body.personalization
    ? `Personalizacion: ${body.personalization.name} (${body.personalization.age} anos)` +
      (body.personalization.eventDate ? ` | Fecha: ${body.personalization.eventDate}` : "") +
      (body.personalization.eventTime ? ` | Hora: ${body.personalization.eventTime}` : "") +
      (body.personalization.venue ? ` | Lugar: ${body.personalization.venue}` : "")
    : "";

  try {
    const { MercadoPagoConfig, Preference } = await import("mercadopago");
    const client = new MercadoPagoConfig({ accessToken: token });
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: body.productId,
            title: body.title.slice(0, 256),
            description: persNote.slice(0, 256) || "Imprimible digital personalizable",
            picture_url: body.image && body.image.startsWith("http") ? body.image : undefined,
            quantity: 1,
            unit_price: Number(body.price),
            currency_id: "ARS",
            category_id: "art",
          },
        ],
        back_urls: {
          success: `${baseUrl}/checkout/success`,
          failure: `${baseUrl}/checkout/failure`,
          pending: `${baseUrl}/checkout/success?status=pending`,
        },
        auto_return: "approved",
        external_reference: body.productId,
        metadata: {
          product_id: body.productId,
          personalization_note: persNote,
        },
        notification_url: `${baseUrl}/api/mp/webhook`,
        statement_descriptor: "TEMATIBOX",
      },
    });

    return NextResponse.json({
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
      preference_id: result.id,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("MP preference error:", msg);
    return NextResponse.json({ mlFallback: true, reason: `MP error: ${msg}` });
  }
}
