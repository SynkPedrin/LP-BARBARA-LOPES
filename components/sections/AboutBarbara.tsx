import Image from "next/image";
import { GoldRule } from "@/components/ui/GoldRule";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { about, ctaLabels } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export function AboutBarbara() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <section id="sobre" aria-labelledby="about-title" className="paper-texture relative bg-ivory py-24 sm:py-28 lg:py-36">
      <div className="container-editorial grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Fotografia original em moldura em arco */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-[30rem] lg:sticky lg:top-[calc(var(--header-height)+3rem)]">
            <span aria-hidden="true" className="absolute -inset-3 rounded-t-full border border-gold/50 sm:-inset-4" />
            <figure className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-champagne" data-reveal="mask">
              <Image
                src="/assets/barbara/dra-barbara-lopes.png"
                alt="Retrato da Dra. Bárbara Lopes em seu consultório"
                fill
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 30rem, 90vw"
                className="object-cover object-[57%_center]"
              />
            </figure>
            <p className="mt-8 text-center font-script text-[2.6rem] leading-none text-brown" aria-hidden="true">
              Bárbara Lopes
            </p>
          </div>
        </div>

        {/* Texto editorial */}
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <p className="eyebrow text-taupe" data-reveal="fade">
            {about.eyebrow}
          </p>
          <RevealTitle
            id="about-title"
            className="mt-5 text-[clamp(2rem,2.2vw+1rem,3.1rem)] leading-[1.08] text-espresso"
            lines={["Conheça a profissional", "por trás do Método Trico."]}
          />

          <div className="mt-12 border-y border-champagne py-8" data-reveal>
            <p className="font-serif text-[clamp(2.8rem,3.4vw+1rem,4.6rem)] font-light leading-none text-brown">{about.name}</p>
            <p className="mt-4 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-warmgray">
              {about.role}
              {siteConfig.professional.registration && (
                <span className="ml-2 text-taupe">· {siteConfig.professional.registration}</span>
              )}
            </p>
          </div>

          <p className="mt-10 font-serif text-[1.55rem] leading-[1.45] text-espresso sm:text-[1.75rem]" data-reveal>
            {lead}
          </p>
          <div className="mt-6 space-y-5 text-[0.9375rem] leading-[1.85] text-warmgray sm:text-base">
            {rest.map((paragraph) => (
              <p key={paragraph} data-reveal>
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-champagne bg-champagne sm:grid-cols-2">
            {about.highlights.map((item, index) => (
              <li
                key={item}
                data-reveal
                style={{ "--reveal-delay": index * 90 } as React.CSSProperties}
                className="flex gap-4 bg-ivory p-5 text-sm leading-relaxed text-brown"
              >
                <span aria-hidden="true" className="mt-2.5 h-px w-5 shrink-0 bg-gold" />
                {item}
              </li>
            ))}
          </ul>

          <GoldRule className="mt-12 w-24" />
          <div className="mt-10" data-reveal>
            <WhatsAppCTA label={ctaLabels.about} location="about" />
          </div>
        </div>
      </div>
    </section>
  );
}
