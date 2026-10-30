"use client";

import { AnimatePresence, m } from "motion/react";
import { Plus, ScanSearch, Sparkles, SunMedium } from "lucide-react";
import { useId, useState } from "react";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import type { TechnologyCategory } from "@/lib/content";
import { ctaLabels, technologies } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;
const ICONS = { scan: ScanSearch, light: SunMedium, sparkle: Sparkles } as const;

function CategoryCard({ category, index }: { category: TechnologyCategory; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const Icon = ICONS[category.icon];
  const items = category.items.filter((item) => item.publish);
  const hasItems = items.length > 0;

  return (
    <article
      data-reveal
      style={{ "--reveal-delay": index * 120 } as React.CSSProperties}
      className="group relative flex flex-col rounded-lg border border-champagne bg-white p-7 shadow-[var(--shadow-soft)] transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-editorial)] hover:-translate-y-1 hover:border-gold/60 hover:shadow-[var(--shadow-lift)] sm:p-9"
    >
      <div className="flex items-start justify-between">
        <span aria-hidden="true" className="font-serif text-[4.5rem] font-light leading-[0.8] text-gold">
          {category.letter}
        </span>
        <span className="flex size-11 items-center justify-center rounded-full border border-champagne text-brown transition-colors duration-500 group-hover:border-gold">
          <Icon aria-hidden="true" className="size-[1.15rem]" strokeWidth={1.25} />
        </span>
      </div>

      <h3 className="mt-8 font-serif text-[1.9rem] leading-[1.1] text-espresso">{category.title}</h3>
      <span
        aria-hidden="true"
        className="mt-5 block h-px w-10 bg-gold transition-[width] duration-700 ease-[var(--ease-editorial)] group-hover:w-16"
      />
      <p className="mt-5 text-[0.9375rem] leading-[1.7] text-warmgray">{category.intro}</p>

      {hasItems ? (
        <>
          <AnimatePresence initial={false}>
            {open && (
              <m.div
                id={panelId}
                key="panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0, transition: { duration: 0.35, ease: EASE } }}
                transition={{ duration: 0.6, ease: EASE }}
                className="overflow-hidden"
              >
                <ul className="mt-7 border-t border-champagne">
                  {items.map((item, itemIndex) => (
                    <m.li
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.08 + itemIndex * 0.05 }}
                      className="grid grid-cols-[2rem_1fr] gap-x-2 border-b border-champagne/70 py-4"
                    >
                      <span aria-hidden="true" className="pt-0.5 font-serif text-sm text-taupe">
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[0.9375rem] font-medium leading-snug text-espresso">{item.title}</p>
                        {item.detail && <p className="mt-1.5 text-sm leading-relaxed text-warmgray">{item.detail}</p>}
                      </div>
                    </m.li>
                  ))}
                </ul>
              </m.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
            className="mt-auto flex items-center gap-3 self-start pt-8 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-brown"
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-brown/30 transition-colors duration-300 hover:border-brown">
              <Plus
                aria-hidden="true"
                className={`size-3.5 transition-transform duration-500 ease-[var(--ease-editorial)] ${open ? "rotate-45" : ""}`}
                strokeWidth={1.5}
              />
            </span>
            {open ? "Recolher" : `Ver recursos (${items.length})`}
          </button>
        </>
      ) : (
        category.emptyNote && (
          <p className="mt-auto pt-8 font-serif text-lg italic leading-snug text-brown">{category.emptyNote}</p>
        )
      )}
    </article>
  );
}

export function Technologies() {
  return (
    <section id="tecnologias" aria-labelledby="technologies-title" className="relative bg-white py-24 sm:py-28 lg:py-36">
      <div className="container-editorial">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-taupe" data-reveal="fade">
              {technologies.eyebrow}
            </p>
            <RevealTitle
              id="technologies-title"
              className="mt-5 text-[clamp(2.2rem,3vw+1rem,4rem)] leading-[1.04] text-espresso"
              lines={[
                "Ciência, tecnologia",
                <em key="c" className="italic text-brown">
                  e cuidado em cada etapa.
                </em>,
              ]}
            />
          </div>
          <p
            className="max-w-md text-[0.9375rem] leading-[1.75] text-warmgray sm:text-base lg:col-span-4 lg:col-start-9 lg:pb-2"
            data-reveal
          >
            {technologies.subtitle}
          </p>
        </div>

        <div className="mt-14 grid items-start gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {technologies.categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-8 border-t border-champagne pt-10 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-warmgray" data-reveal="fade">
            {technologies.disclaimer}
          </p>
          <div data-reveal>
            <WhatsAppCTA label={ctaLabels.technologies} event="technology_cta_click" location="technologies" />
          </div>
        </div>
      </div>
    </section>
  );
}
