import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface ChatBody {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 503 }
    );
  }

  let body: ChatBody;
  try {
    body = (await req.json()) as ChatBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "Missing messages" }, { status: 400 });
  }

  // Truncate long user messages defensively
  const messages = body.messages
    .slice(-20)
    .map((m) => ({
      role: m.role,
      content: typeof m.content === "string" ? m.content.slice(0, 4000) : "",
    }))
    .filter((m) => m.content.length > 0);

  if (messages.length === 0 || messages[0].role !== "user") {
    return NextResponse.json({ error: "First message must be from user" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = client.messages.stream({
          model: "claude-haiku-4-5",
          max_tokens: 1024,
          system: [
            {
              type: "text",
              text: SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages,
        });

        response.on("text", (delta) => {
          controller.enqueue(encoder.encode(delta));
        });

        await response.finalMessage();
        controller.close();
      } catch (e) {
        const err = e instanceof Error ? e.message : String(e);
        console.error("[chat] error:", err);
        controller.enqueue(
          encoder.encode(
            "\n\nUy, tuve un problema. Probá escribirme de nuevo o tocá el botón de WhatsApp para hablar directo con Daniela."
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
