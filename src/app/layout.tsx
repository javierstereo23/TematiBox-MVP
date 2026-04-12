import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Tematibox | Su tema favorito, listo para festejar",
  description:
    "Combos tematicos para el cumple o regalo de tus hijos. Fisicos o digitales. De Stranger Things a Bluey, todo en un solo lugar.",
  openGraph: {
    type: "website",
    siteName: "Tematibox",
    title: "Tematibox | Su tema favorito, listo para festejar",
    description:
      "Combos tematicos para cumpleanos: cotillon, regalos, tortas e imprimibles digitales.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text-primary">
        <CartProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
