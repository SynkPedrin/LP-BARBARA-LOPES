"use client";

import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ctaLabels, nav } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#inicio");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: destaca a seção visível na navegação
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Menu mobile: trava a rolagem, fecha com Esc e devolve o foco
  useEffect(() => {
    const root = document.documentElement;
    if (!open) {
      delete root.dataset.menu;
      return;
    }
    root.dataset.menu = "open";
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      delete root.dataset.menu;
      toggle?.focus();
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,height] duration-500 ease-[var(--ease-editorial)] ${
          scrolled || open
            ? "h-16 border-b border-champagne/70 bg-ivory/88 shadow-[0_8px_30px_-20px_rgb(48_35_29/0.25)] backdrop-blur-md lg:h-[4.25rem]"
            : "h-[var(--header-height)] border-b border-transparent bg-ivory"
        }`}
      >
        <div className="container-editorial flex h-full items-center justify-between gap-6">
          <a
            href="#inicio"
            className="relative flex shrink-0 items-center"
            aria-label={`${siteConfig.name}, voltar ao início`}
            onClick={() => setOpen(false)}
          >
            <Image
              src="/assets/barbara/logo-monograma.png"
              alt=""
              width={778}
              height={752}
              preload
              sizes="56px"
              className={`w-auto transition-[height] duration-500 ease-[var(--ease-editorial)] ${
                scrolled ? "h-9 lg:h-10" : "h-10 lg:h-12"
              }`}
            />
          </a>

          <nav aria-label="Navegação principal" className="hidden xl:block">
            <ul className="flex items-center gap-1 2xl:gap-3">
              {nav.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative block px-3 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                        isActive ? "text-espresso" : "text-warmgray hover:text-brown"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 -bottom-px h-px origin-left bg-gold transition-transform duration-500 ease-[var(--ease-editorial)] ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <WhatsAppCTA
              label={ctaLabels.header}
              location="header"
              size="sm"
              showIcon={false}
              className="hidden sm:inline-flex"
            />
            <button
              ref={toggleRef}
              type="button"
              className="relative -mr-2 flex size-11 items-center justify-center xl:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 top-0 h-px w-6 bg-espresso transition-transform duration-500 ease-[var(--ease-editorial)] ${
                    open ? "translate-y-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 right-0 h-px bg-espresso transition-all duration-500 ease-[var(--ease-editorial)] ${
                    open ? "w-6 -translate-y-1.5 -rotate-45" : "w-4"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-mobile"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="paper-texture fixed inset-0 z-40 flex flex-col bg-ivory pt-16 xl:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.45, ease: EASE } }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav aria-label="Navegação mobile" className="container-editorial flex flex-1 flex-col justify-center">
              <ul className="space-y-1">
                {nav.map((item, index) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 + index * 0.06 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-champagne/70 py-4"
                    >
                      <span className="w-6 font-sans text-[0.625rem] font-semibold tracking-[0.2em] text-taupe">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-serif text-[2rem] leading-none text-espresso transition-colors group-hover:text-brown">
                        {item.label}
                      </span>
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>
            <m.div
              className="container-editorial pb-[max(2rem,env(safe-area-inset-bottom))]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            >
              <WhatsAppCTA label={ctaLabels.primary} location="menu_mobile" className="w-full" />
              <p className="mt-4 text-center text-xs text-warmgray">
                {siteConfig.address.city}, {siteConfig.address.state}
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
