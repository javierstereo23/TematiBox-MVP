import { NextResponse } from "next/server";

// Mercado Pago webhook (IPN/Webhook) receiver.
// For MVP: log the event and return 200. For production, verify signature and persist.
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic") || url.searchParams.get("type");
    const id = url.searchParams.get("id") || url.searchParams.get("data.id");
    console.log("[mp webhook]", { topic, id, body });
  } catch (e) {
    console.warn("[mp webhook] parse error", e);
  }
  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
