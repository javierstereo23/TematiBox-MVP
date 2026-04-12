import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";
import { searchCatalog } from "@/lib/chat/search";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface ChatBody {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://temati-box-mvp.vercel.app";

function formatPrice(n: number | null): string {
  if (n == null) return "";
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
}

/**
 * Augment the last user message with a compact block of products relevant
 * to their query. Lets the bot recommend specific items with real URLs
 * without needing tool-use (keeps streaming simple + latency low).
 */
function augmentWithCatalogContext(
  messages: ChatBody["messages"]
): ChatBody["messages"] {
  if (messages.length === 0) return messages;
  const last = messages[messages.length - 1];
  if (last.role !== "user") return messages;

  const relevant = searchCatalog(last.content, 5);
  if (relevant.length === 0) return messages;

  const ctx = relevant
    .map((p) => {
      const price = p.price ? ` · ${formatPrice(p.price)}` : "";
      return `- ${p.title}${price} → ${SITE_URL}/producto/${p.slug}`;
    })
    .join("\n");

  const augmentedContent = `${last.content}

<productos_relacionados>
${ctx}
</productos_relacionados>`;

  return [...messages.slice(0, -1), { role: "user", content: augmentedContent }];
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

  // Truncate & sanitize
  const baseMessages = body.messages
    .slice(-20)
    .map((m) => ({
      role: m.role,
      content: typeof m.content === "string" ? m.content.slice(0, 4000) : "",
    }))
    .filter((m) => m.content.length > 0);

  if (baseMessages.length === 0 || baseMessages[0].role !== "user") {
    return NextResponse.json({ error: "First message must be from user" }, { status: 400 });
  }

  const messages = augmentWithCatalogContext(baseMessages);
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
            "\n\nUy, tuve un problema técnico. Probá escribirme de nuevo, o tocá 'Hablar con Daniela' acá abajo para contactarla directo."
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
