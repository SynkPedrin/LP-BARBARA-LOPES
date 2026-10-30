import { getImageProps } from "next/image";
import { MapPin } from "lucide-react";
import { preload } from "react-dom";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ctaLabels, hero } from "@/lib/content";

const titleLines = [
  <>{hero.titleLead}</>,
  <em key="a" className="italic text-brown">
    mais do que uma
  </em>,
  <em key="b" className="italic text-brown">
    fórmula pronta.
  </em>,
];

const PHOTO_ALT = "Dra. Bárbara Lopes, biomédica esteta e tricologista, sentada em uma poltrona clara no Instituto Bárbara Lopes";
const DESKTOP_QUERY = "(min-width: 1024px)";
const DESKTOP_SIZES = "(min-width: 1792px) 56vw, (min-width: 1280px) 60vw, 57vw";

// Direção de arte: retrato vertical no mobile/tablet; fotografia horizontal no desktop
const desktopPhoto = getImageProps({
  src: "/assets/barbara/dra-barbara-lopes.png",
  alt: PHOTO_ALT,
  width: 1672,
  height: 941,
  sizes: DESKTOP_SIZES,
}).props;
const mobilePhoto = getImageProps({
  src: "/assets/barbara/dra-barbara-lopes-retrato.png",
  alt: PHOTO_ALT,
  width: 1024,
  height: 1536,
  sizes: "100vw",
  fetchPriority: "high",
  loading: "eager",
}).props;

export function Hero() {
  // Cada viewport baixa apenas a sua versão (asset do LCP)
  preload(mobilePhoto.src, {
    as: "image",
    imageSrcSet: mobilePhoto.srcSet,
    imageSizes: mobilePhoto.sizes,
    fetchPriority: "high",
    media: "(max-width: 1023.98px)",
  });
  preload(desktopPhoto.src, {
    as: "image",
    imageSrcSet: desktopPhoto.srcSet,
    imageSizes: desktopPhoto.sizes,
    fetchPriority: "high",
    media: DESKTOP_QUERY,
  });

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate bg-ivory pt-[var(--header-height)] lg:flex lg:min-h-[min(100svh,60rem)] lg:items-center lg:pt-[var(--header-height)]"
    >
      {/* Fotografia original da Dra. Bárbara: no mobile é um bloco no topo; no desktop ocupa a metade direita */}
      <div className="relative h-[clamp(20rem,47svh,34rem)] overflow-hidden sm:h-[clamp(24rem,52svh,38rem)] lg:absolute lg:inset-y-0 lg:right-0 lg:top-[var(--header-height)] lg:h-auto lg:w-[57%] xl:w-[60%] 3xl:w-[56%]">
        <div className="hero-photo absolute inset-0 will-change-transform">
          <picture>
            <source media={DESKTOP_QUERY} srcSet={desktopPhoto.srcSet} sizes={desktopPhoto.sizes} />
            {/* eslint-disable-next-line jsx-a11y/alt-text -- alt vem de getImageProps */}
            <img
              {...mobilePhoto}
              className="absolute inset-0 size-full object-cover object-[50%_12%] lg:object-[60%_28%]"
            />
          </picture>
        </div>
        {/* Transições suaves para o marfim (não alteram a fotografia, apenas a borda da composição) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--color-ivory)_0%,rgb(250_248_244/0.82)_20%,rgb(250_248_244/0)_46%)] lg:bg-[linear-gradient(to_right,var(--color-ivory)_0%,rgb(250_248_244/0.78)_12%,rgb(250_248_244/0)_34%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-32 bg-[linear-gradient(to_top,var(--color-ivory),rgb(250_248_244/0))] lg:block"
        />
        <span aria-hidden="true" className="absolute inset-y-10 right-[var(--gutter)] hidden w-px bg-gold/40 xl:block" />
      </div>

      <div className="container-editorial relative z-10 -mt-20 pb-14 sm:-mt-24 lg:mt-0 lg:pb-20 lg:pt-12">
        <div className="max-w-[36rem] lg:max-w-[min(40%,34rem)] xl:max-w-[37%] 3xl:max-w-[38rem]">
          <p className="hero-eyebrow eyebrow flex items-center gap-3 text-brown">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-5 font-serif text-[clamp(2.6rem,3.85vw+0.6rem,5rem)] font-light leading-[0.98] text-espresso"
          >
            {titleLines.map((line, index) => (
              <span key={index} className="line-mask">
                <span className="hero-line block" style={{ "--line-index": index } as React.CSSProperties}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <span
            aria-hidden="true"
            className="hero-gold mt-4 block h-px w-40 bg-gradient-to-r from-gold to-gold/0 lg:mt-6 lg:w-56"
          />

          <p className="hero-sub mt-6 max-w-[33rem] text-[0.9375rem] leading-[1.7] text-warmgray sm:text-base lg:mt-8">
            {hero.subheadline}
          </p>

          <div className="hero-cta mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <WhatsAppCTA label={ctaLabels.primary} event="hero_cta_click" location="hero" />
            <a
              href="#metodo-trico"
              className="link-editorial self-start whitespace-nowrap py-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brown sm:self-auto"
            >
              Conhecer o Método Trico
            </a>
          </div>

          <p className="hero-cta mt-5 flex items-center gap-2 text-[0.8125rem] text-warmgray">
            <MapPin aria-hidden="true" className="size-3.5 text-taupe" strokeWidth={1.5} />
            {hero.microcopy}
          </p>

          <dl className="hero-meta mt-10 grid grid-cols-3 border-t border-champagne pt-6 lg:mt-14">
            {hero.credentials.map((item, index) => (
              <div
                key={item.label}
                className={`flex flex-col-reverse justify-end gap-1 pr-3 ${index > 0 ? "border-l border-champagne pl-3 sm:pl-5" : ""}`}
              >
                <dt className="text-[0.6875rem] leading-snug text-warmgray sm:text-xs">{item.label}</dt>
                <dd className="font-serif text-xl leading-none text-brown sm:text-2xl">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
