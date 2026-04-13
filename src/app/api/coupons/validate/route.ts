import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  let body: { code?: string };
  try {
    body = (await req.json()) as { code?: string };
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const code = (body.code || "").trim().toUpperCase();
  if (!code) {
    return NextResponse.json({ valid: false, error: "Código vacío" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: coupon } = await supabase
    .from("coupons")
    .select("code, percent_off, times_used, max_uses, valid_until")
    .eq("code", code)
    .maybeSingle();

  if (!coupon) return NextResponse.json({ valid: false, error: "Cupón no encontrado" });

  if (coupon.valid_until && new Date(coupon.valid_until).getTime() < Date.now()) {
    return NextResponse.json({ valid: false, error: "Cupón vencido" });
  }

  if (coupon.times_used >= coupon.max_uses) {
    return NextResponse.json({ valid: false, error: "Cupón ya usado" });
  }

  return NextResponse.json({
    valid: true,
    code: coupon.code,
    percent_off: coupon.percent_off,
  });
}
