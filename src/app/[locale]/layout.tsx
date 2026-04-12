import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientLayout } from "@/components/ClientLayout";
import CookieConsent from "@/components/CookieConsent";
import ConsentAwareAnalytics from "@/components/ConsentAwareAnalytics";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyCTA from "@/components/StickyCTA";
import ExitIntent from "@/components/ExitIntent";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Generate static params for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming locale is valid
  if (!routing.locales.includes(locale as 'es' | 'en' | 'fr' | 'pt')) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load messages for this locale
  let messages;
  try {
    messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${outfit.variable} ${jakarta.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DYNAMO",
              url: "https://dynamo.tech",
              logo: "https://dynamo.tech/images/dynamo-logo.svg",
              description:
                "Omnichannel orchestration platform for Telcos",
              foundingDate: "2013",
              founders: [
                { "@type": "Person", name: "Javier Badaracco" },
                { "@type": "Person", name: "Andrés Boffa" },
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Francisco N. de Laprida 771, 7mo piso",
                addressLocality: "Florida",
                addressRegion: "Buenos Aires",
                addressCountry: "AR",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+5491123306752",
                contactType: "sales",
              },
              sameAs: [
                "https://linkedin.com/company/dynamo-tech",
                "https://instagram.com/dynamo.tech",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'DYNAMO',
                  item: 'https://dynamo.tech',
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-deep text-w80 font-body">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Skip to main content link for keyboard navigation */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-purple-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
            {locale === 'es' ? 'Ir al contenido principal' : locale === 'fr' ? 'Aller au contenu principal' : locale === 'pt' ? 'Ir para o conteúdo principal' : 'Skip to main content'}
          </a>
          {/* Noise texture overlay */}
          <div className="noise-overlay" aria-hidden="true" />
          <Navbar />
          <main id="main-content" className="flex-1 pt-20">
            <ClientLayout>{children}</ClientLayout>
          </main>
          <Footer />
          <WhatsAppButton />
          <StickyCTA />
          <ExitIntent />
          <CookieConsent />
          <ConsentAwareAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
