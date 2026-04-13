import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function randomCode(len = 8) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < len; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  let body: { email?: string; source?: string };
  try {
    body = (await req.json()) as { email?: string; source?: string };
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const source = body.source || "exit_intent";

  if (!email || !isEmail(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const supabase = await createClient();

  // If an active exit-intent coupon already exists for this email, return it.
  const { data: existing } = await supabase
    .from("coupons")
    .select("code, percent_off, times_used, max_uses, valid_until")
    .eq("email", email)
    .like("code", "VUELVE-%")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing && existing.times_used < existing.max_uses) {
    await supabase.from("events").insert({
      email,
      event_type: "coupon_retrieved",
      metadata: { source, code: existing.code },
    });
    return NextResponse.json({
      code: existing.code,
      percent_off: existing.percent_off,
      reused: true,
    });
  }

  // Otherwise, create a new one.
  const code = `VUELVE-${randomCode(8)}`;
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 14); // 14-day expiry

  const { error } = await supabase.from("coupons").insert({
    email,
    code,
    percent_off: 10,
    max_uses: 1,
    valid_until: validUntil.toISOString(),
  });

  if (error) {
    console.error("coupon insert error", error);
    return NextResponse.json({ error: "No pudimos generar el cupón" }, { status: 500 });
  }

  await supabase.from("events").insert({
    email,
    event_type: "coupon_created",
    metadata: { source, code, percent_off: 10 },
  });

  return NextResponse.json({
    code,
    percent_off: 10,
    valid_until: validUntil.toISOString(),
    reused: false,
  });
}
