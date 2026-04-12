import Anthropic from "@anthropic-ai/sdk";
import { HANDOFF_SUMMARY_PROMPT } from "@/lib/chat/system-prompt";
import { NextResponse } from "next/server";
import { WHATSAPP } from "@/lib/config";

export const runtime = "nodejs";

interface HandoffBody {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const fallbackMsg = "Hola Daniela! Vengo del chat de la web y tengo una consulta.";

  if (!apiKey) {
    return NextResponse.json({
      wa_url: `${WHATSAPP.url}?text=${encodeURIComponent(fallbackMsg)}`,
      message: fallbackMsg,
      fallback: true,
    });
  }

  let body: HandoffBody;
  try {
    body = (await req.json()) as HandoffBody;
  } catch {
    return NextResponse.json({
      wa_url: `${WHATSAPP.url}?text=${encodeURIComponent(fallbackMsg)}`,
      message: fallbackMsg,
      fallback: true,
    });
  }

  const conversation = (body.messages || [])
    .slice(-12)
    .map((m) => `${m.role === "user" ? "Clienta" : "Vale"}: ${m.content.slice(0, 500)}`)
    .join("\n");

  if (!conversation) {
    return NextResponse.json({
      wa_url: `${WHATSAPP.url}?text=${encodeURIComponent(fallbackMsg)}`,
      message: fallbackMsg,
      fallback: true,
    });
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 300,
      system: HANDOFF_SUMMARY_PROMPT,
      messages: [{ role: "user", content: conversation }],
    });

    const summary =
      response.content
        .filter((b): b is Anthropic.TextBlock => b.type === "text")
        .map((b) => b.text)
        .join("")
        .trim() || fallbackMsg;

    return NextResponse.json({
      wa_url: `${WHATSAPP.url}?text=${encodeURIComponent(summary)}`,
      message: summary,
    });
  } catch (e) {
    console.error("[handoff] error:", e);
    return NextResponse.json({
      wa_url: `${WHATSAPP.url}?text=${encodeURIComponent(fallbackMsg)}`,
      message: fallbackMsg,
      fallback: true,
    });
  }
}
