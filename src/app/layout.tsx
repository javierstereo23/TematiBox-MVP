import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Analytics } from "@/components/Analytics";
import { OrganizationJsonLd } from "@/components/seo/ProductJsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tematibox.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tematibox | Cumples y utiles escolares, sin dolor de cabeza",
    template: "%s | Tematibox",
  },
  description:
    "Combos tematicos listos + imprimibles personalizados con el nombre del chico. De Bluey a Stranger Things, del cumple al salon de clases. Hecho por mamas, para mamas.",
  keywords: [
    "imprimibles cumpleaños",
    "invitaciones digitales",
    "etiquetas escolares personalizadas",
    "cotillon temático",
    "imprimibles bluey",
    "imprimibles stranger things",
    "cumple temático argentina",
  ],
  authors: [{ name: "Tematibox" }],
  openGraph: {
    type: "website",
    siteName: "Tematibox",
    title: "Tematibox | Cumples y utiles, sin dolor de cabeza",
    description:
      "Combos tematicos listos + imprimibles personalizados. De Bluey a Stranger Things. Hecho por mamas, para mamas.",
    locale: "es_AR",
    url: SITE_URL,
    images: [{ url: "/images/home/birthday-aesthetic.png", width: 1200, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tematibox | Cumples sin dolor de cabeza",
    description:
      "Combos e imprimibles personalizados con el nombre del chico. Descarga al instante.",
    images: ["/images/home/birthday-aesthetic.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600;1,9..144,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text-primary">
        <OrganizationJsonLd />
        <Analytics />
        <CartProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
