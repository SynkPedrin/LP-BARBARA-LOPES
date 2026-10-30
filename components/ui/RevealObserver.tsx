"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __iblReady?: boolean;
  }
}

/** Observa elementos com [data-reveal] / [data-reveal-lines] e adiciona .is-visible ao entrarem na tela. */
export function RevealObserver() {
  useEffect(() => {
    window.__iblReady = true;
    const selector = "[data-reveal], [data-reveal-lines]";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const observeAll = () =>
      document.querySelectorAll(selector).forEach((el) => {
        if (!el.classList.contains("is-visible")) observer.observe(el);
      });

    observeAll();
    // Conteúdo montado depois (ex.: componentes carregados sob demanda)
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
