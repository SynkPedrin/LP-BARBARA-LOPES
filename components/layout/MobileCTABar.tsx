"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ctaLabels } from "@/lib/content";

/**
 * CTA fixo inferior no mobile. Aparece depois que o CTA do hero sai da tela
 * e se esconde quando o CTA final ou o rodapé estão visíveis, para não duplicar nem cobrir conteúdo.
 */
export function MobileCTABar() {
  const [pastHero, setPastHero] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const end = [document.getElementById("agendar"), document.querySelector("footer")].filter((el): el is HTMLElement =>
      Boolean(el),
    );
    const visibleEnds = new Set<Element>();

    const heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry?.isIntersecting), {
      rootMargin: "-40% 0px 0px 0px",
    });
    const endObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleEnds.add(entry.target);
        else visibleEnds.delete(entry.target);
      }
      setNearEnd(visibleEnds.size > 0);
    });

    if (hero) heroObserver.observe(hero);
    end.forEach((el) => endObserver.observe(el));
    return () => {
      heroObserver.disconnect();
      endObserver.disconnect();
    };
  }, []);

  const visible = pastHero && !nearEnd;

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="mobile-cta-bar fixed inset-x-0 bottom-0 z-30 border-t border-champagne/80 bg-ivory/92 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <WhatsAppCTA label={ctaLabels.primary} location="mobile_bar" className="w-full" />
        </m.div>
      )}
    </AnimatePresence>
  );
}
