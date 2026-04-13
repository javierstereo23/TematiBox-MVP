// HTML email templates — inline styles, safe for most clients.

const BRAND = {
  bg: "#FBF6EA",
  paper: "#FFFDF8",
  ink: "#2A2D25",
  primary: "#6B7257",
  pink: "#E54CA2",
  amber: "#E0B252",
};

const WRAPPER = (inner: string, preheader: string) => `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${BRAND.bg};font-family:Manrope,Helvetica,Arial,sans-serif;color:${BRAND.ink};">
    <span style="display:none;max-height:0;overflow:hidden;color:transparent;">${preheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.bg};">
      <tr><td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.paper};max-width:560px;">
          <tr><td style="padding:32px 28px 28px 28px;">
            <p style="margin:0 0 12px 0;font-family:Georgia,serif;font-size:22px;font-weight:500;color:${BRAND.primary};">tematibox</p>
            ${inner}
            <p style="margin:32px 0 0 0;color:#9a998c;font-size:11px;line-height:1.5;">
              Hecho a mano en Buenos Aires · Si tenés dudas respondé este mail.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

export function couponEmail({ code, percent }: { code: string; percent: number }) {
  const subject = `Tu ${percent}% OFF — código ${code}`;
  const html = WRAPPER(
    `
    <h1 style="font-family:Georgia,serif;font-weight:500;font-size:28px;line-height:1.2;margin:0 0 12px 0;">
      Te regalamos <em style="color:${BRAND.pink};">${percent}% OFF</em> en tu primer pedido.
    </h1>
    <p style="font-size:16px;line-height:1.6;margin:0 0 24px 0;">
      Copiá este código y pegalo al pagar — o usá el link de abajo y se aplica solo:
    </p>
    <div style="background:#FFF3A8;padding:20px;text-align:center;margin:0 0 24px 0;">
      <p style="margin:0 0 6px 0;font-size:12px;color:#8a7f3a;">tu cupón</p>
      <p style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:500;letter-spacing:0.08em;">${code}</p>
    </div>
    <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://tematibox.com"}/imprimibles"
       style="display:inline-block;background:${BRAND.ink};color:${BRAND.bg};text-decoration:none;padding:14px 24px;font-weight:600;">
      Ir al catálogo →
    </a>
    <p style="font-size:13px;line-height:1.6;margin:24px 0 0 0;color:#6b6e63;">
      Válido por 14 días. Un uso por cuenta.
    </p>
  `,
    `Tu cupón ${code} está listo para usar`
  );
  return { subject, html };
}

export function orderConfirmationEmail({
  title,
  amount,
  paymentId,
  personalization,
}: {
  title: string;
  amount: number;
  paymentId: string;
  personalization?: { name?: string; age?: number } | null;
}) {
  const persLine = personalization?.name
    ? `<p style="font-size:14px;margin:0 0 4px 0;color:#6b6e63;">personalizado para <strong style="color:${BRAND.ink};">${personalization.name}${personalization.age ? `, ${personalization.age} años` : ""}</strong></p>`
    : "";
  const subject = `¡Tu pedido está en camino! (${paymentId})`;
  const html = WRAPPER(
    `
    <h1 style="font-family:Georgia,serif;font-weight:500;font-size:28px;line-height:1.2;margin:0 0 12px 0;">
      ¡Listo! Tu pedido está <em style="color:${BRAND.primary};">confirmado</em>.
    </h1>
    <p style="font-size:16px;line-height:1.6;margin:0 0 24px 0;">
      Estamos preparando tus archivos. Si el imprimible es personalizado con nombre, lo recibís por
      este mismo mail en menos de 24hs.
    </p>
    <div style="background:#D9E8D3;padding:16px 20px;margin:0 0 24px 0;">
      <p style="margin:0 0 6px 0;font-size:12px;color:#4a5b3d;">tu pedido</p>
      <p style="margin:0 0 4px 0;font-family:Georgia,serif;font-size:18px;font-weight:500;">${title}</p>
      ${persLine}
      <p style="margin:8px 0 0 0;font-size:13px;color:#6b6e63;">Total: $${amount.toLocaleString("es-AR")} · Ref. ${paymentId}</p>
    </div>
    <p style="font-size:14px;line-height:1.6;color:#6b6e63;margin:0;">
      Imprimís en impresora hogareña o imprenta — las veces que necesites. El archivo queda tuyo.
    </p>
  `,
    `Pedido ${paymentId} confirmado`
  );
  return { subject, html };
}
