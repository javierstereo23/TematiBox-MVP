import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { ChatBot } from "@/components/ChatBot";
import { Analytics } from "@/components/Analytics";
import { OrganizationJsonLd } from "@/components/seo/ProductJsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tematibox.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tematibox Digital | Imprimibles personalizados al instante",
    template: "%s | Tematibox Digital",
  },
  description:
    "Imprimibles personalizados con el nombre de tu hijo. Invitaciones, etiquetas escolares, libros para colorear, cliparts y mas. De Bluey a Stranger Things. Descarga al instante.",
  keywords: [
    "imprimibles personalizados",
    "invitaciones digitales cumpleaños",
    "etiquetas escolares personalizadas",
    "libro para colorear personalizado",
    "cliparts para sublimar",
    "imprimibles bluey",
    "imprimibles stranger things",
    "material escolar personalizado argentina",
  ],
  authors: [{ name: "Tematibox" }],
  openGraph: {
    type: "website",
    siteName: "Tematibox Digital",
    title: "Tematibox Digital | Imprimibles personalizados al instante",
    description:
      "Imprimibles personalizados con el nombre del chico. De Bluey a Stranger Things. Descarga al instante.",
    locale: "es_AR",
    url: SITE_URL,
    images: [{ url: "/images/home/birthday-aesthetic.png", width: 1200, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tematibox Digital | Imprimibles personalizados",
    description:
      "Imprimibles personalizados con el nombre del chico. Descarga al instante.",
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
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,300;1,9..144,400;1,9..144,500;1,9..144,600;1,9..144,700&family=Caveat:wght@400;500;600;700&display=swap"
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
          <ChatBot />
        </CartProvider>
      </body>
    </html>
  );
}
