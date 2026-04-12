export const SITE = {
  name: "Tematibox",
  url: "https://tematibox.com",
  description:
    "Combos tematicos listos e imprimibles personalizados con el nombre del chico. Del cumple al salon de clases.",
} as const;

export const WHATSAPP = {
  number: "5491154966031",
  display: "+54 9 11 5496-6031",
  url: "https://wa.me/5491154966031",
  defaultMessage: "Hola! Estaba viendo Tematibox y queria consultar por",
} as const;

export function waLink(message?: string): string {
  const base = WHATSAPP.url;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
