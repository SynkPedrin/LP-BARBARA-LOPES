import Image from "next/image";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { bridal, ctaLabels } from "@/lib/content";

export function Bridal() {
  return (
    <section id="noivos" aria-labelledby="bridal-title" className="paper-texture relative bg-ivory py-24 sm:py-28 lg:py-36">
      <div className="container-editorial grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-10">
        {/* Texto */}
        <div className="lg:col-span-6">
          <p className="eyebrow flex items-center gap-3 text-taupe" data-reveal="fade">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            {bridal.eyebrow}
          </p>
          <RevealTitle
            id="bridal-title"
            className="mt-5 text-[clamp(2.3rem,3vw+1rem,4.1rem)] font-light leading-[1.02] text-espresso"
            lines={[
              "Tratamento para",
              <em key="b" className="italic text-brown">
                noivos e noivas.
              </em>,
            ]}
          />
          <p className="mt-8 max-w-xl text-[0.9375rem] leading-[1.85] text-warmgray sm:text-base" data-reveal>
            {bridal.text}
          </p>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-champagne bg-champagne sm:grid-cols-2">
            {bridal.items.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": index * 90 } as React.CSSProperties}
                className="bg-ivory p-6"
              >
                <span aria-hidden="true" className="block h-px w-6 bg-gold" />
                <h3 className="mt-4 font-serif text-[1.4rem] leading-tight text-espresso">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-warmgray">{item.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-5" data-reveal>
            <span
              aria-hidden="true"
              className="grid size-[4.5rem] shrink-0 place-items-center rounded-full border border-gold text-center font-serif leading-none text-brown"
            >
              <span>
                <span className="block text-[1.7rem]">90</span>
                <span className="block text-[0.625rem] uppercase tracking-[0.2em] text-taupe">dias</span>
              </span>
            </span>
            <p className="max-w-sm font-serif text-[1.35rem] italic leading-snug text-brown">{bridal.tip}</p>
          </div>

          <div className="mt-10" data-reveal>
            <WhatsAppCTA
              label={ctaLabels.bridal}
              event="bridal_cta_click"
              location="bridal"
              message={bridal.whatsappMessage}
            />
          </div>
        </div>

        {/* Fotografia em arco */}
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="relative mx-auto max-w-[28rem]">
            <span aria-hidden="true" className="absolute -inset-3 rounded-t-full border border-gold/50 sm:-inset-4" />
            <figure className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-champagne" data-reveal="mask">
              <Image
                src="/assets/barbara/fotos/poltrona-arco.jpg"
                alt="Poltrona clara diante de parede curva com iluminação indireta e quadro em tons terrosos"
                fill
                quality={90}
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 28rem, 90vw"
                className="object-cover object-[50%_60%]"
              />
            </figure>
            <p className="mt-8 text-center font-script text-[2.6rem] leading-none text-brown" aria-hidden="true">
              Noivos &amp; Noivas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
