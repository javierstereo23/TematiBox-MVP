"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function PageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    if (GA_ID && typeof window.gtag === "function") {
      window.gtag("config", GA_ID, { page_path: url });
    }
    if (META_PIXEL_ID && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  if (!GA_ID && !META_PIXEL_ID) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
      )}
      <Suspense fallback={null}>
        <PageTracker />
      </Suspense>
    </>
  );
}

type TrackableEvent =
  | "view_item"
  | "view_category"
  | "view_theme"
  | "add_to_cart"
  | "begin_checkout"
  | "purchase"
  | "search"
  | "whatsapp_click"
  | "coupon_claimed"
  | "chat_open"
  | "abandoned_cart";

export function track(event: TrackableEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  // GA4
  if (window.gtag) {
    window.gtag("event", event, params);
  }
  // Meta Pixel — map to standard events, fall back to Custom for non-standard ones
  if (window.fbq) {
    const map: Partial<Record<TrackableEvent, string>> = {
      view_item: "ViewContent",
      view_category: "ViewContent",
      view_theme: "ViewContent",
      add_to_cart: "AddToCart",
      begin_checkout: "InitiateCheckout",
      purchase: "Purchase",
      search: "Search",
      whatsapp_click: "Contact",
      coupon_claimed: "Lead",
      chat_open: "Contact",
      abandoned_cart: "AddToCart",
    };
    const standard = map[event];
    if (standard) window.fbq("track", standard, params);
    else window.fbq("trackCustom", event, params);
  }
}

// Advanced Matching — fire once with the user's email so Meta can match
// the pixel activity to their actual account (improves audience match rate).
export function identifyUser(email: string) {
  if (typeof window === "undefined") return;
  if (window.fbq) {
    window.fbq("init", process.env.NEXT_PUBLIC_META_PIXEL_ID || "", { em: email.trim().toLowerCase() });
  }
  if (window.gtag) {
    window.gtag("set", { user_id: email.trim().toLowerCase() });
  }
}
