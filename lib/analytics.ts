/**
 * Camada de eventos de conversão.
 * - Só envia dados quando há ferramenta configurada E consentimento do visitante (LGPD).
 * - Nunca envia conteúdo sobre saúde: apenas o nome do evento e a posição do CTA na página.
 */

export type AnalyticsEvent =
  | "hero_cta_click"
  | "method_cta_click"
  | "technology_cta_click"
  | "final_cta_click"
  | "whatsapp_click"
  | "video_play"
  | "video_complete"
  | "faq_open"
  | "maps_click";

/** Parâmetros permitidos: identificadores de interface, nunca texto livre do visitante. */
export type AnalyticsParams = {
  location?: string;
  item_id?: string;
};

export type ConsentState = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "ibl-consent-v1";
export const CONSENT_EVENT = "ibl:consent-change";

type Gtag = (command: "event" | "consent" | "config" | "js", ...args: unknown[]) => void;
type Fbq = (command: "trackCustom" | "track" | "init" | "consent", ...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

// Fallback em memória quando o armazenamento do navegador está indisponível
let sessionConsent: ConsentState | null = null;

export function readConsent(): ConsentState | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : sessionConsent;
  } catch {
    return sessionConsent;
  }
}

export function writeConsent(state: ConsentState) {
  sessionConsent = state;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, state);
  } catch {
    // armazenamento indisponível: o consentimento vale apenas para esta visita
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
}

export function trackEvent(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    console.info(`[analytics] ${event}`, params);
  }

  if (readConsent() !== "granted") return;

  window.dataLayer?.push({ event, ...params });
  window.gtag?.("event", event, params);
  // Meta Pixel recebe apenas o nome do evento, sem parâmetros.
  if (event === "whatsapp_click") window.fbq?.("track", "Contact");
  else window.fbq?.("trackCustom", event);
}
