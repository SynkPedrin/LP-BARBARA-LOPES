"use client";

import { AnimatePresence, m } from "motion/react";
import { Plus } from "lucide-react";
import type { KeyboardEvent } from "react";
import { useRef, useState } from "react";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { trackEvent } from "@/lib/analytics";
import { ctaLabels, faq } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faq.items[0]?.id ?? null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = (id: string) => {
    const next = openId === id ? null : id;
    if (next) trackEvent("faq_open", { item_id: next });
    setOpenId(next);
  };

  // Navegação entre perguntas com as setas, Home e End
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const buttons = buttonsRef.current;
    const last = buttons.length - 1;
    const target = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    buttons[target]?.focus();
  };

  return (
    <section id="duvidas" aria-labelledby="faq-title" className="relative bg-white py-24 sm:py-28 lg:py-36">
      <div className="container-editorial grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+3rem)]">
            <p className="eyebrow text-taupe" data-reveal="fade">
              {faq.eyebrow}
            </p>
            <RevealTitle
              id="faq-title"
              className="mt-5 text-[clamp(2.2rem,2.4vw+1rem,3.4rem)] leading-[1.05] text-espresso"
              lines={[
                "Perguntas que",
                <em key="r" className="italic text-brown">
                  costumamos receber.
                </em>,
              ]}
            />
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-[1.75] text-warmgray" data-reveal>
              Ficou alguma dúvida sobre o seu caso? Converse com a equipe do Instituto.
            </p>
            <div className="mt-8" data-reveal>
              <WhatsAppCTA label={ctaLabels.conversation} location="faq" variant="outline" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-champagne">
            {faq.items.map((item, index) => {
              const open = openId === item.id;
              const buttonId = `faq-${item.id}-button`;
              const panelId = `faq-${item.id}-panel`;
              return (
                <li
                  key={item.id}
                  className="border-b border-champagne"
                  data-reveal
                  style={{ "--reveal-delay": index * 70 } as React.CSSProperties}
                >
                  <h3 className="m-0 font-sans">
                    <button
                      ref={(element) => {
                        buttonsRef.current[index] = element;
                      }}
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                      onKeyDown={(event) => onKeyDown(event, index)}
                      className="group flex w-full items-start justify-between gap-6 py-7 text-left"
                    >
                      <span
                        className={`font-serif text-[1.35rem] leading-snug transition-colors duration-300 sm:text-[1.6rem] ${
                          open ? "text-brown" : "text-espresso group-hover:text-brown"
                        }`}
                      >
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                          open ? "border-gold bg-gold/10 text-brown" : "border-champagne text-taupe group-hover:border-brown/40"
                        }`}
                      >
                        <Plus
                          className={`size-4 transition-transform duration-500 ease-[var(--ease-editorial)] ${open ? "rotate-45" : ""}`}
                          strokeWidth={1.25}
                        />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <m.div
                        key="panel"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0, transition: { duration: 0.35, ease: EASE } }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-8 pr-12 text-[0.9375rem] leading-[1.8] text-warmgray sm:text-base">
                          {item.answer}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
