// Email scaffolding. If RESEND_API_KEY is set, sends via Resend.
// Otherwise logs the payload so we can see what would be sent in dev.

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

const FROM = process.env.EMAIL_FROM || "Tematibox <hola@tematibox.com>";

export async function sendEmail({ to, subject, html, replyTo }: SendArgs) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[email:dev] would send →", { to, subject });
    return { delivered: false, reason: "no RESEND_API_KEY" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        subject,
        html,
        reply_to: replyTo,
      }),
    });
    const data = (await res.json()) as { id?: string; message?: string };
    if (!res.ok) {
      console.warn("[email] resend error", data);
      return { delivered: false, reason: data.message || "resend error" };
    }
    return { delivered: true, id: data.id };
  } catch (e) {
    console.error("[email] send failed", e);
    return { delivered: false, reason: (e as Error).message };
  }
}
