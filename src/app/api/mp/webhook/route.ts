import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/send";
import { orderConfirmationEmail } from "@/lib/email/templates";

// Mercado Pago webhook receiver.
// On a payment.created / payment.updated event, fetch the payment, verify it
// was approved, then:
//   - mark the coupon used (times_used++ if a coupon_code is in metadata)
//   - upsert an order record
//   - fire the confirmation email to the payer

type MpPayment = {
  id: number;
  status: string; // 'approved' | 'pending' | 'rejected' | ...
  transaction_amount: number;
  external_reference?: string | null;
  metadata?: {
    product_id?: string;
    personalization_note?: string;
    coupon_code?: string | null;
    discount_pct?: number;
  };
  additional_info?: {
    items?: Array<{ id?: string; title?: string; picture_url?: string }>;
    payer?: { first_name?: string; last_name?: string };
  };
  payer?: { email?: string };
};

async function fetchPayment(paymentId: string, token: string): Promise<MpPayment | null> {
  try {
    const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return (await res.json()) as MpPayment;
  } catch (e) {
    console.warn("[mp webhook] payment fetch failed", e);
    return null;
  }
}

export async function POST(req: Request) {
  const token = process.env.MP_ACCESS_TOKEN;
  const url = new URL(req.url);
  const topic = url.searchParams.get("topic") || url.searchParams.get("type");
  const queryId = url.searchParams.get("id") || url.searchParams.get("data.id");

  let body: { action?: string; data?: { id?: string | number }; type?: string } = {};
  try {
    body = await req.json();
  } catch {
    /* empty body is fine for GET-style notifications */
  }

  const paymentId = String(body?.data?.id ?? queryId ?? "");
  const eventType = body?.type || topic || "unknown";

  console.log("[mp webhook]", { eventType, paymentId });

  if (!paymentId || !token || eventType !== "payment") {
    return NextResponse.json({ received: true, ignored: true });
  }

  const payment = await fetchPayment(paymentId, token);
  if (!payment) {
    return NextResponse.json({ received: true, error: "payment fetch failed" });
  }

  const supabase = await createClient();

  // Log the event regardless of status for debugging
  await supabase.from("events").insert({
    email: payment.payer?.email || null,
    event_type: `mp_${payment.status}`,
    metadata: {
      payment_id: paymentId,
      amount: payment.transaction_amount,
      product_id: payment.external_reference,
      coupon_code: payment.metadata?.coupon_code || null,
    },
  });

  if (payment.status !== "approved") {
    return NextResponse.json({ received: true, status: payment.status });
  }

  // 1. Mark coupon used
  if (payment.metadata?.coupon_code) {
    const code = payment.metadata.coupon_code.toUpperCase();
    const { data: coupon } = await supabase
      .from("coupons")
      .select("id, times_used, max_uses")
      .eq("code", code)
      .maybeSingle();
    if (coupon && coupon.times_used < coupon.max_uses) {
      await supabase
        .from("coupons")
        .update({ times_used: coupon.times_used + 1 })
        .eq("id", coupon.id);
    }
  }

  // 2. Upsert order
  const productId = payment.external_reference || payment.metadata?.product_id || "unknown";
  const item = payment.additional_info?.items?.[0];
  const title = item?.title || "Imprimible";
  const image = item?.picture_url;
  const discount = payment.metadata?.discount_pct
    ? (payment.transaction_amount * payment.metadata.discount_pct) / 100
    : 0;

  // Parse personalization_note back into something structured (best-effort)
  const note = payment.metadata?.personalization_note || "";
  const nameMatch = note.match(/Personalizacion:\s*([^()]+?)\s*\((\d+)\s*años\)/i);
  const personalization = nameMatch
    ? { name: nameMatch[1].trim(), age: Number(nameMatch[2]) }
    : null;

  await supabase.from("orders").insert({
    email: payment.payer?.email || "",
    product_id: productId,
    product_title: title,
    product_image: image || null,
    amount: payment.transaction_amount,
    discount_applied: discount,
    personalization,
    mp_preference_id: null,
    mp_payment_id: paymentId,
    mp_status: "approved",
  });

  // 3. Send confirmation email
  if (payment.payer?.email) {
    const tpl = orderConfirmationEmail({
      title,
      amount: payment.transaction_amount,
      paymentId,
      personalization,
    });
    sendEmail({ to: payment.payer.email, subject: tpl.subject, html: tpl.html }).catch((e) =>
      console.warn("[order email] failed", e)
    );
  }

  return NextResponse.json({ received: true, processed: true });
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
