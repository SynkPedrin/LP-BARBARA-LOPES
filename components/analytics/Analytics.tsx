"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";
import type { ConsentState } from "@/lib/analytics";
import { CONSENT_EVENT, readConsent, writeConsent } from "@/lib/analytics";
import { hasAnalytics, siteConfig } from "@/lib/site-config";

/**
 * Ferramentas de análise opcionais (GA4, GTM, Meta Pixel).
 * Nada é carregado sem ID configurado e sem consentimento explícito do visitante.
 */
export function Analytics() {
  const consent = useSyncExternalStore<ConsentState | null | "unknown">(subscribeConsent, readConsent, () => "unknown");

  if (!hasAnalytics || consent === "unknown") return null;

  const { gaId, gtmId, metaPixelId } = siteConfig.analytics;

  return (
    <>
      {consent === null && <ConsentBanner />}
      {consent === "granted" && (
        <>
          {gtmId && (
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
            </Script>
          )}
          {gaId && (
            <>
              <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
              <Script id="ga4" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`}
              </Script>
            </>
          )}
          {metaPixelId && (
            <Script id="meta-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
            </Script>
          )}
        </>
      )}
    </>
  );
}

function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

function ConsentBanner() {
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Preferências de privacidade"
      className="fixed inset-x-3 bottom-3 z-40 rounded-lg border border-champagne bg-ivory p-5 shadow-[var(--shadow-lift)] sm:inset-x-auto sm:left-6 sm:max-w-sm"
    >
      <p className="text-sm leading-relaxed text-espresso">
        Usamos ferramentas de medição para entender como o site é utilizado. Nenhuma informação de saúde é coletada.{" "}
        <Link href="/politica-de-privacidade" className="underline decoration-gold underline-offset-4">
          Saiba mais
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" className="btn btn-primary btn-sm flex-1" onClick={() => writeConsent("granted")}>
          Aceitar
        </button>
        <button type="button" className="btn btn-outline btn-sm flex-1" onClick={() => writeConsent("denied")}>
          Recusar
        </button>
      </div>
    </div>
  );
}
