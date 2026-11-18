import Image from "next/image";
import { GoldRule } from "@/components/ui/GoldRule";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ctaLabels, homeCare } from "@/lib/content";

export function HomeCare() {
  return (
    <section id="home-care" aria-labelledby="homecare-title" className="relative overflow-hidden bg-sand py-24 sm:py-28 lg:py-36">
      <div className="container-editorial grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Fotografia */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="relative mx-auto max-w-[30rem] lg:sticky lg:top-[calc(var(--header-height)+3rem)]">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-champagne shadow-[var(--shadow-lift)]" data-reveal="mask">
              <Image
                src="/assets/barbara/fotos/bancada-home-care.jpg"
                alt="Bancada da sala de atendimento com prateleiras douradas, certificados e produtos de cuidado capilar"
                fill
                quality={90}
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 30rem, 90vw"
                className="object-cover object-[50%_40%]"
              />
            </figure>
            <p
              className="absolute -bottom-6 right-4 rounded-full bg-espresso px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold shadow-[var(--shadow-soft)] sm:-right-6"
              data-reveal="fade"
            >
              Home care · Hair care
            </p>
          </div>
        </div>

        {/* Texto */}
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7 lg:pt-4">
          <p className="eyebrow text-taupe" data-reveal="fade">
            {homeCare.eyebrow}
          </p>
          <RevealTitle
            id="homecare-title"
            className="mt-5 text-[clamp(2.3rem,3vw+1rem,4.1rem)] font-light leading-[1.02] text-espresso"
            lines={[
              "Todo couro cabeludo",
              <em key="h" className="italic text-brown">
                precisa de home care.
              </em>,
            ]}
          />
          <p className="mt-8 max-w-xl text-[0.9375rem] leading-[1.85] text-warmgray sm:text-base" data-reveal>
            {homeCare.text}
          </p>

          <ol className="mt-12 divide-y divide-champagne border-y border-champagne">
            {homeCare.pillars.map((pillar, index) => (
              <li
                key={pillar.title}
                data-reveal
                style={{ "--reveal-delay": index * 110 } as React.CSSProperties}
                className="grid gap-2 py-7 sm:grid-cols-[11rem_1fr] sm:gap-8"
              >
                <div>
                  <span className="font-serif text-sm text-taupe">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-serif text-[1.75rem] leading-tight text-espresso">{pillar.title}</h3>
                  <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-taupe">{pillar.subtitle}</p>
                </div>
                <p className="text-[0.9375rem] leading-[1.75] text-warmgray sm:pt-6">{pillar.text}</p>
              </li>
            ))}
          </ol>

          <p className="mt-12 font-serif text-[clamp(1.6rem,1.6vw+1rem,2.3rem)] font-light italic leading-[1.25] text-brown" data-reveal>
            {homeCare.quote}
          </p>
          <GoldRule className="mt-8 w-24" />
          <div className="mt-10" data-reveal>
            <WhatsAppCTA label={ctaLabels.homecare} event="homecare_cta_click" location="homecare" />
          </div>
        </div>
      </div>
    </section>
  );
}
