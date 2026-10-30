"use client";

import { AnimatePresence, m, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { GoldRule } from "@/components/ui/GoldRule";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ctaLabels, method } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function MethodTrico() {
  const stepsRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const items = stepsRef.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const current = method.steps[active] ?? method.steps[0];

  return (
    <section id="metodo-trico" aria-labelledby="method-title" className="paper-texture relative bg-ivory py-24 sm:py-28 lg:py-36">
      {/* Abertura */}
      <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow text-taupe" data-reveal="fade">
            {method.eyebrow}
          </p>
          <RevealTitle
            id="method-title"
            className="mt-4 text-[clamp(3.6rem,8vw+0.5rem,9.5rem)] font-light leading-[0.9] tracking-[-0.025em] text-espresso"
            lines={[method.title]}
          />
          <p
            className="mt-5 font-serif text-[clamp(1.5rem,1.4vw+1rem,2.4rem)] italic leading-tight text-brown"
            data-reveal
            style={{ "--reveal-delay": 200 } as React.CSSProperties}
          >
            {method.subtitle}
          </p>
        </div>
        <div className="lg:col-span-5 lg:pb-3">
          <GoldRule className="mb-8 w-20" />
          <p className="text-[0.9375rem] leading-[1.75] text-warmgray sm:text-base" data-reveal>
            {method.text}
          </p>
          <p
            className="mt-5 border-l border-gold pl-5 text-[0.9375rem] leading-[1.7] text-brown"
            data-reveal
            style={{ "--reveal-delay": 120 } as React.CSSProperties}
          >
            {method.contrast}
          </p>
        </div>
      </div>

      {/* Etapas */}
      <div className="container-editorial mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-10">
        {/* Painel sticky (desktop) */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-[calc(var(--header-height)+4rem)] flex gap-10">
            <div className="relative w-px self-stretch bg-champagne" aria-hidden="true">
              <m.span className="absolute inset-x-0 top-0 h-full origin-top bg-gold" style={{ scaleY: progress }} />
            </div>
            <div className="flex-1">
              <div className="relative h-[11rem] overflow-hidden" aria-hidden="true">
                <AnimatePresence mode="popLayout" initial={false}>
                  <m.span
                    key={current.number}
                    className="absolute left-0 top-0 block font-serif text-[11rem] font-light leading-none text-gold"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-60%", opacity: 0, transition: { duration: 0.4, ease: EASE } }}
                    transition={{ duration: 0.8, ease: EASE }}
                  >
                    {current.number}
                  </m.span>
                </AnimatePresence>
              </div>
              <ul className="mt-8 space-y-1" aria-label="Etapas do Método Trico">
                {method.steps.map((step, index) => (
                  <li key={step.number} className="flex items-center gap-4 py-2">
                    <span
                      className={`h-px transition-all duration-700 ease-[var(--ease-editorial)] ${
                        index === active ? "w-10 bg-brown" : "w-4 bg-champagne"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`font-serif text-2xl transition-colors duration-500 ${
                        index === active ? "text-espresso" : "text-taupe/70"
                      }`}
                    >
                      {step.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Lista de etapas (mobile e desktop) */}
        <ol ref={stepsRef} className="relative space-y-5 lg:col-span-7 lg:space-y-8">
          <span aria-hidden="true" className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-champagne lg:hidden" />
          {method.steps.map((step, index) => (
            <li key={step.number} data-step={index} className={`relative pl-14 lg:flex lg:min-h-[58vh] lg:items-center lg:pl-0`}>
              <span
                aria-hidden="true"
                className="absolute left-0 top-8 flex size-[2.8rem] items-center justify-center rounded-full border border-gold/60 bg-ivory font-serif text-lg text-brown lg:hidden"
              >
                {step.number}
              </span>
              <article
                data-reveal
                className={`w-full rounded-lg border border-champagne/80 p-7 shadow-[var(--shadow-soft)] transition-[box-shadow,border-color] duration-700 sm:p-10 lg:p-14 ${
                  index % 2 === 0 ? "bg-white" : "bg-ivory"
                } ${index === active ? "lg:border-gold/50 lg:shadow-[var(--shadow-lift)]" : ""}`}
              >
                <p className="eyebrow text-taupe">Etapa {step.number}</p>
                <h3 className="mt-4 font-serif text-[2.4rem] font-light leading-none text-espresso sm:text-5xl lg:text-6xl">
                  {step.title}
                </h3>
                <span aria-hidden="true" className="mt-6 block h-px w-12 bg-gold" />
                <p className="mt-6 max-w-lg text-[0.9375rem] leading-[1.75] text-warmgray sm:text-base">{step.text}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>

      {/* Encerramento */}
      <div className="container-editorial mt-24 lg:mt-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <GoldRule className="w-24" />
          <p
            className="mt-10 font-serif text-[clamp(1.9rem,2.6vw+1rem,3.5rem)] font-light leading-[1.12] text-espresso"
            data-reveal
          >
            {method.closingLead} <em className="italic text-brown">{method.closingHighlight}</em>
          </p>
          <div className="mt-10" data-reveal style={{ "--reveal-delay": 150 } as React.CSSProperties}>
            <WhatsAppCTA label={ctaLabels.method} event="method_cta_click" location="method" />
          </div>
        </div>
      </div>
    </section>
  );
}
