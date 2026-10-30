import Image from "next/image";
import { GoldRule } from "@/components/ui/GoldRule";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ctaLabels, finalCta } from "@/lib/content";

export function FinalCTA() {
  return (
    <section
      id="agendar"
      aria-labelledby="final-cta-title"
      className="relative isolate overflow-hidden bg-espresso py-28 text-ivory sm:py-32 lg:py-44"
    >
      <div aria-hidden="true" className="paper-texture pointer-events-none absolute inset-0 opacity-50" />
      {/* Monograma original como marca d'água discreta */}
      <Image
        src="/assets/barbara/logo-monograma.png"
        alt=""
        aria-hidden="true"
        width={778}
        height={752}
        sizes="40rem"
        className="pointer-events-none absolute -right-24 top-1/2 -z-10 w-[min(44rem,90vw)] -translate-y-1/2 opacity-[0.05] sm:-right-10"
      />
      <span aria-hidden="true" className="absolute inset-x-[var(--gutter)] top-10 h-px bg-champagne/15" />
      <span aria-hidden="true" className="absolute inset-x-[var(--gutter)] bottom-10 h-px bg-champagne/15" />

      <div className="container-editorial relative flex flex-col items-center text-center">
        <p className="eyebrow text-gold" data-reveal="fade">
          Agende sua avaliação
        </p>
        <GoldRule className="mt-8 w-24" delay={150} />
        <RevealTitle
          id="final-cta-title"
          className="mt-10 max-w-5xl text-[clamp(2.6rem,5vw+0.5rem,6rem)] font-light leading-[1] text-ivory"
          lines={[
            "O primeiro passo é",
            <em key="c" className="italic text-champagne">
              compreender o seu cabelo.
            </em>,
          ]}
          delay={100}
        />
        <p
          className="mt-8 max-w-xl text-[0.9375rem] leading-[1.8] text-champagne/80 sm:text-base"
          data-reveal
          style={{ "--reveal-delay": 250 } as React.CSSProperties}
        >
          {finalCta.subtitle}
        </p>
        <div className="mt-12" data-reveal style={{ "--reveal-delay": 350 } as React.CSSProperties}>
          <WhatsAppCTA label={ctaLabels.primary} event="final_cta_click" location="final_cta" variant="light" />
        </div>
        <p
          className="mt-8 text-xs tracking-[0.08em] text-champagne/60"
          data-reveal="fade"
          style={{ "--reveal-delay": 450 } as React.CSSProperties}
        >
          {finalCta.microcopy}
        </p>
      </div>
    </section>
  );
}
