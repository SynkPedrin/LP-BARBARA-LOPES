"use client";

import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useState } from "react";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { trackEvent } from "@/lib/analytics";
import { ctaLabels } from "@/lib/content";
import { isWhatsAppConfigured, siteConfig } from "@/lib/site-config";

export function Location() {
  const [showMap, setShowMap] = useState(false);
  const { address, maps } = siteConfig;

  return (
    <section id="contato" aria-labelledby="location-title" className="paper-texture relative bg-ivory py-24 sm:py-28 lg:py-36">
      <div className="container-editorial grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow text-taupe" data-reveal="fade">
            Localização
          </p>
          <RevealTitle
            id="location-title"
            className="mt-5 text-[clamp(2.1rem,2.4vw+1rem,3.3rem)] leading-[1.06] text-espresso"
            lines={[
              "Seu cuidado começa em",
              "um espaço preparado",
              <em key="r" className="italic text-brown">
                para receber você.
              </em>,
            ]}
          />

          <address className="mt-10 border-l border-gold pl-6 not-italic" data-reveal>
            <p className="font-serif text-2xl text-espresso">{address.name}</p>
            <p className="mt-3 text-[0.9375rem] leading-[1.85] text-warmgray">
              {address.building}
              <br />
              {address.street} — {address.district}
              <br />
              {address.city} — {address.state}
              <br />
              CEP {address.postalCode}
            </p>
          </address>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap" data-reveal>
            {isWhatsAppConfigured && <WhatsAppCTA label={ctaLabels.primary} location="location" />}
            <a
              href={maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("maps_click", { location: "location" })}
              className="btn btn-outline"
            >
              <span>Abrir rota no Google Maps</span>
              <ArrowUpRight aria-hidden="true" className="btn-icon size-4" strokeWidth={1.5} />
            </a>
          </div>
          {!isWhatsAppConfigured && (
            <PendingNotice className="mt-6">
              WhatsApp do Instituto ainda não configurado (NEXT_PUBLIC_WHATSAPP_NUMBER). Os botões de agendamento levam a esta
              seção até a configuração.
            </PendingNotice>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-[2fr_3fr] lg:col-span-7">
          <figure
            className="relative aspect-[464/700] overflow-hidden rounded-lg sm:aspect-auto sm:min-h-[30rem]"
            data-reveal="mask"
          >
            <Image
              src="/assets/barbara/videos/clinica-vista.jpg"
              alt="Vista de Araçatuba a partir do edifício do Instituto Bárbara Lopes"
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 38vw, 90vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/70 to-transparent p-5 pt-16 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-champagne">
              Vista a partir do edifício
            </figcaption>
          </figure>

          <div
            className="relative min-h-[22rem] overflow-hidden rounded-lg border border-champagne bg-sand sm:min-h-[30rem]"
            data-reveal
            style={{ "--reveal-delay": 150 } as React.CSSProperties}
          >
            {showMap ? (
              <iframe
                src={maps.embedUrl}
                title={`Mapa: ${address.name}, ${address.street}, ${address.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0 grayscale-[35%] sepia-[15%]"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <span
                  aria-hidden="true"
                  className="flex size-14 items-center justify-center rounded-full border border-gold/60 text-brown"
                >
                  <MapPin className="size-5" strokeWidth={1.25} />
                </span>
                <p className="mt-6 font-serif text-2xl text-espresso">New York Tower</p>
                <p className="mt-2 text-sm text-warmgray">Vila São Paulo · Araçatuba</p>
                <button type="button" onClick={() => setShowMap(true)} className="btn btn-outline btn-sm mt-8">
                  Carregar mapa interativo
                </button>
                <p className="mt-4 max-w-[16rem] text-xs leading-relaxed text-warmgray">
                  O mapa é fornecido pelo Google e só é carregado após o seu clique.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
