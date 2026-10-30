"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ClinicFilm } from "@/components/remotion/ClinicFilm";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ctaLabels, experience } from "@/lib/content";

const sidePanels = [
  {
    src: "/assets/barbara/videos/clinica-identidade.jpg",
    alt: "Identificação do consultório em letras douradas sobre painel de madeira",
  },
  {
    src: "/assets/barbara/videos/clinica-cafe.jpg",
    alt: "Estação de café preparada para receber os pacientes",
  },
];

export function ClinicExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [chapter, setChapter] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const panelUp = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const panelDown = useTransform(scrollYProgress, [0, 1], [-30, 50]);

  return (
    <section
      id="espaco"
      ref={sectionRef}
      aria-labelledby="experience-title"
      className="relative isolate overflow-hidden bg-espresso py-24 text-ivory sm:py-28 lg:py-36"
    >
      <div aria-hidden="true" className="paper-texture pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(210_180_119/0.12),transparent_65%)]"
      />

      <div className="container-editorial relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Texto (sticky no desktop) */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+4rem)]">
            <p className="eyebrow flex items-center gap-3 text-gold" data-reveal="fade">
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              {experience.eyebrow}
            </p>
            <RevealTitle
              id="experience-title"
              className="mt-6 text-[clamp(2.3rem,2.8vw+1rem,3.9rem)] font-light leading-[1.04] text-ivory"
              lines={[
                "Um espaço pensado",
                <em key="c" className="italic text-champagne">
                  para acolher você.
                </em>,
              ]}
            />
            <p className="mt-7 max-w-sm text-[0.9375rem] leading-[1.8] text-champagne/80" data-reveal>
              {experience.text}
            </p>

            <ol className="mt-10 hidden border-t border-champagne/15 lg:block" aria-label="Capítulos do filme">
              {experience.chapters.map((name, index) => (
                <li
                  key={name}
                  aria-current={index === chapter ? "step" : undefined}
                  className="flex items-center gap-4 border-b border-champagne/15 py-3"
                >
                  <span
                    className={`font-serif text-sm transition-colors duration-500 ${index === chapter ? "text-gold" : "text-champagne/40"}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[0.6875rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ${
                      index === chapter ? "text-ivory" : "text-champagne/45"
                    }`}
                  >
                    {name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`ml-auto h-px bg-gold transition-[width] duration-700 ease-[var(--ease-editorial)] ${index === chapter ? "w-10" : "w-0"}`}
                  />
                </li>
              ))}
            </ol>

            <div className="mt-10 hidden lg:block" data-reveal>
              <WhatsAppCTA label={ctaLabels.consultation} location="experience" variant="light" />
            </div>
          </div>
        </div>

        {/* Filme (Remotion Player) */}
        <div className="lg:col-span-4 lg:col-start-6">
          <div className="relative mx-auto w-full max-w-[26rem]" data-reveal="fade">
            <span aria-hidden="true" className="absolute -inset-3 rounded-[10px] border border-gold/25 sm:-inset-4" />
            <ClinicFilm onChapterChange={setChapter} />
          </div>
          <p className="mt-6 text-center text-xs text-champagne/55">
            Imagens reais do Instituto Bárbara Lopes. Reprodução sem áudio.
          </p>
        </div>

        {/* Painéis laterais com imagens reais (desktop) */}
        <div className="relative hidden lg:col-span-2 lg:col-start-11 lg:block">
          <div className="flex h-full flex-col justify-center gap-8">
            {sidePanels.map((panel, index) => (
              <m.figure
                key={panel.src}
                style={{ y: index === 0 ? panelUp : panelDown }}
                className={`relative aspect-[464/832] w-full overflow-hidden rounded-[4px] ring-1 ring-champagne/15 ${index === 1 ? "ml-6" : ""}`}
              >
                <Image src={panel.src} alt={panel.alt} fill sizes="12vw" className="object-cover opacity-85" />
              </m.figure>
            ))}
          </div>
        </div>
      </div>

      <div className="container-editorial relative mt-12 lg:hidden">
        <WhatsAppCTA label={ctaLabels.consultation} location="experience" variant="light" className="w-full sm:w-auto" />
      </div>
    </section>
  );
}
