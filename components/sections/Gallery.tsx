"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { trackEvent } from "@/lib/analytics";
import { gallery } from "@/lib/content";

const BASE = "/assets/barbara/fotos";
const TOUR = {
  uhd: `${BASE}/tour-instituto-4k.mp4`,
  hd: `${BASE}/tour-instituto-1080p.mp4`,
  poster: `${BASE}/tour-instituto-poster.jpg`,
};

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

function prefersLightExperience() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  const slow = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return Boolean(slow || reduced);
}

/** Tour em vídeo: 4K em telas grandes, 1080p nas demais; só carrega perto da tela e pausa fora dela. */
function TourVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const light = prefersLightExperience();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (!video.getAttribute("src")) {
            const large = window.matchMedia("(min-width: 1280px)").matches && !light;
            video.src = large ? TOUR.uhd : TOUR.hd;
          }
          if (!light) video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (!video.getAttribute("src")) video.src = TOUR.hd;
    if (video.paused) {
      video.play().catch(() => undefined);
      trackEvent("video_play", { location: "gallery_tour" });
    } else {
      video.pause();
    }
  };

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[4px] bg-espresso ring-1 ring-champagne">
      <video
        ref={ref}
        poster={TOUR.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={gallery.tourAlt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 size-full object-cover"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-espresso/70 to-transparent" />
      <p className="absolute bottom-5 left-5 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-ivory">
        Tour pelo Instituto
      </p>
      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-ivory/90 text-espresso backdrop-blur transition hover:bg-ivory"
        aria-label={playing ? "Pausar o tour em vídeo" : "Reproduzir o tour em vídeo"}
      >
        {playing ? <Pause className="size-4" strokeWidth={1.5} /> : <Play className="size-4 translate-x-px" strokeWidth={1.5} />}
      </button>
    </div>
  );
}

export function Gallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const total = gallery.photos.length;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
    trackEvent("gallery_open", { item_id: gallery.photos[i]?.src });
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback((delta: number) => setIndex((i) => (i === null ? i : (i + delta + total) % total)), [total]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  }, [step]);

  const current = index === null ? undefined : gallery.photos[index];

  return (
    <section id="galeria" aria-labelledby="gallery-title" className="relative bg-white py-24 sm:py-28 lg:py-36">
      <div className="container-editorial">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-taupe" data-reveal="fade">
              {gallery.eyebrow}
            </p>
            <RevealTitle
              id="gallery-title"
              className="mt-5 text-[clamp(2.3rem,3vw+1rem,4.1rem)] font-light leading-[1.02] text-espresso"
              lines={[
                "Cada detalhe,",
                <em key="g" className="italic text-brown">
                  pensado para você.
                </em>,
              ]}
            />
          </div>
          <p
            className="max-w-md text-[0.9375rem] leading-[1.8] text-warmgray sm:text-base lg:col-span-4 lg:col-start-9 lg:pb-2"
            data-reveal
          >
            {gallery.text}
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="mx-auto max-w-[24rem] lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:max-w-none" data-reveal="fade">
              <TourVideo />
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-8 lg:grid-cols-3 lg:gap-5 lg:pb-12">
            {gallery.photos.map((photo, i) => (
              <li
                key={photo.src}
                className={i % 3 === 1 ? "lg:translate-y-12" : undefined}
                data-reveal
                style={{ "--reveal-delay": (i % 3) * 90 } as React.CSSProperties}
              >
                <button
                  type="button"
                  onClick={() => open(i)}
                  className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[4px] bg-sand"
                  aria-label={`Ampliar foto: ${photo.alt}`}
                >
                  <Image
                    src={`${BASE}/${photo.src}.jpg`}
                    alt={photo.alt}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 22vw, 48vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-ivory/85 text-espresso opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <Maximize2 className="size-3.5" strokeWidth={1.5} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ampliação em tela cheia (fotos em até 4K) */}
      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(event) => event.target === event.currentTarget && close()}
        aria-label="Galeria de fotos do Instituto"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-espresso-deep/95 p-0 text-ivory backdrop:bg-espresso-deep/80"
      >
        {current && index !== null && (
          <div className="relative flex h-full flex-col">
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <p className="font-serif text-lg text-champagne">
                {String(index + 1).padStart(2, "0")} <span className="text-champagne/40">/ {String(total).padStart(2, "0")}</span>
              </p>
              <button
                type="button"
                onClick={close}
                className="grid size-11 place-items-center rounded-full border border-champagne/25 transition hover:bg-ivory/10"
                aria-label="Fechar galeria"
              >
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </div>
            <figure className="relative mx-4 flex-1 sm:mx-20" onClick={(event) => event.target === event.currentTarget && close()}>
              <Image
                key={current.src}
                src={`${BASE}/${current.src}.jpg`}
                alt={current.alt}
                fill
                quality={90}
                sizes="100vw"
                className="object-contain"
              />
            </figure>
            <p className="px-6 py-5 text-center text-sm text-champagne/75">{current.alt}</p>
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-espresso/70 transition hover:bg-espresso sm:left-6"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="size-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-espresso/70 transition hover:bg-espresso sm:right-6"
              aria-label="Próxima foto"
            >
              <ChevronRight className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
