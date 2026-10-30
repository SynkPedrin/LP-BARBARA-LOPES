"use client";

import { ArrowRight } from "lucide-react";
import type { AnalyticsEvent } from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";
import { getBookingHref, isWhatsAppConfigured } from "@/lib/site-config";

type Variant = "primary" | "light" | "outline" | "outline-light";

type WhatsAppCTAProps = {
  label: string;
  /** Evento específico da posição do CTA (além de whatsapp_click). */
  event?: AnalyticsEvent;
  location: string;
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
  showIcon?: boolean;
};

/**
 * CTA de agendamento. Abre o WhatsApp com mensagem pré-preenchida quando o número está configurado;
 * enquanto isso não acontece, leva à seção de contato (nunca um link quebrado).
 */
export function WhatsAppCTA({
  label,
  event,
  location,
  variant = "primary",
  size = "md",
  className = "",
  showIcon = true,
}: WhatsAppCTAProps) {
  const href = getBookingHref();

  const handleClick = () => {
    if (event) trackEvent(event, { location });
    if (isWhatsAppConfigured) trackEvent("whatsapp_click", { location });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`}
      {...(isWhatsAppConfigured
        ? { target: "_blank", rel: "noopener noreferrer", "aria-label": `${label} (abre o WhatsApp em nova aba)` }
        : {})}
    >
      <span>{label}</span>
      {showIcon && <ArrowRight aria-hidden="true" className="btn-icon size-4" strokeWidth={1.5} />}
    </a>
  );
}
