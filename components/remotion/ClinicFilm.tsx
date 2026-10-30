"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import type { ComponentType } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { ClinicFilmStageProps } from "./ClinicFilmStage";
import { FILM_FPS, FILM_SCENES, getSceneTimeline } from "./film-config";

const TIMELINE = getSceneTimeline(FILM_SCENES, FILM_FPS);
const POSTER = `/${FILM_SCENES[0]?.poster ?? ""}`;

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/** Aparelhos com economia de dados, rede lenta ou movimento reduzido não recebem autoplay. */
function prefersLightExperience() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  const slow = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return Boolean(slow || reduced);
}

type ClinicFilmProps = {
  /** Recebe o índice da cena ativa (para o índice de capítulos fora do player). */
  onChapterChange?: (index: number) => void;
};

export function ClinicFilm({ onChapterChange }: ClinicFilmProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [Stage, setStage] = useState<ComponentType<ClinicFilmStageProps> | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [userStarted, setUserStarted] = useState(false);
  const chapterRef = useRef(-1);
  const tracked = useRef({ play: false, complete: false });

  const loadStage = useCallback(() => {
    if (Stage || failed) return;
    import("./ClinicFilmStage").then((module) => setStage(() => module.ClinicFilmStage)).catch(() => setFailed(true));
  }, [Stage, failed]);

  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;
    const allowAutoplay = !prefersLightExperience();
    setAutoplay(allowAutoplay);

    // Pré-carrega o player quando a seção se aproxima (somente se o autoplay for permitido)
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && allowAutoplay) {
          loadStage();
          near.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    // Reproduz apenas enquanto estiver visível
    const visible = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.35,
    });
    near.observe(element);
    visible.observe(element);
    return () => {
      near.disconnect();
      visible.disconnect();
    };
  }, [loadStage]);

  const playing = Boolean(Stage) && ready && inView && !userPaused && (autoplay || userStarted);

  const handleFrame = useCallback(
    (frame: number, duration: number) => {
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${frame / (duration - 1)})`;
      const index = TIMELINE.filter((slot) => frame >= slot.from).length - 1;
      if (index !== chapterRef.current) {
        chapterRef.current = index;
        onChapterChange?.(index);
      }
      if (frame >= duration - 2 && !tracked.current.complete) {
        tracked.current.complete = true;
        trackEvent("video_complete", { location: "clinic_film" });
      }
    },
    [onChapterChange],
  );

  const handlePlay = useCallback(() => {
    if (tracked.current.play) return;
    tracked.current.play = true;
    trackEvent("video_play", { location: "clinic_film" });
  }, []);

  const handleLoop = useCallback(() => {
    if (tracked.current.complete) return;
    tracked.current.complete = true;
    trackEvent("video_complete", { location: "clinic_film" });
  }, []);

  const toggle = () => {
    if (!Stage) {
      setUserStarted(true);
      setUserPaused(false);
      loadStage();
      return;
    }
    if (playing) setUserPaused(true);
    else {
      setUserStarted(true);
      setUserPaused(false);
    }
  };

  const showStartButton = !playing && (!autoplay || userPaused || failed || !Stage);

  return (
    <div
      ref={frameRef}
      className="relative aspect-[464/832] w-full overflow-hidden rounded-[6px] bg-espresso-deep shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]"
    >
      {/* Poster: visível antes do carregamento e como fallback */}
      <Image
        src={POSTER}
        alt="Detalhe de plantas e painéis de madeira no Instituto Bárbara Lopes"
        fill
        sizes="(min-width: 1024px) 420px, (min-width: 640px) 26rem, 90vw"
        className={`object-cover transition-opacity duration-700 ${ready && !failed ? "opacity-0" : "opacity-100"}`}
      />

      {Stage && !failed && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <Stage playing={playing} onFrame={handleFrame} onPlay={handlePlay} onLoop={handleLoop} onReady={() => setReady(true)} />
        </div>
      )}

      {/* Controles */}
      {showStartButton && !failed ? (
        <button
          type="button"
          onClick={toggle}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-espresso-deep/25 text-ivory"
          aria-label="Reproduzir o filme do Instituto Bárbara Lopes (sem áudio)"
        >
          <span className="flex size-16 items-center justify-center rounded-full border border-champagne/60 bg-espresso/40 backdrop-blur-sm transition-[transform,border-color] duration-500 ease-[var(--ease-editorial)] group-hover:scale-105 group-hover:border-champagne">
            <Play aria-hidden="true" className="ml-0.5 size-5" strokeWidth={1.25} />
          </span>
          <span className="eyebrow text-champagne">Assistir ao filme</span>
        </button>
      ) : (
        !failed && (
          <button
            type="button"
            onClick={toggle}
            className="absolute bottom-3 right-3 z-10 flex size-10 items-center justify-center rounded-full border border-champagne/40 bg-espresso/40 text-ivory backdrop-blur-sm transition-colors hover:border-champagne"
            aria-label={playing ? "Pausar o filme" : "Reproduzir o filme"}
          >
            {playing ? (
              <Pause aria-hidden="true" className="size-4" strokeWidth={1.25} />
            ) : (
              <Play aria-hidden="true" className="ml-0.5 size-4" strokeWidth={1.25} />
            )}
          </button>
        )
      )}

      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-champagne/15">
        <span ref={progressRef} className="block h-full origin-left scale-x-0 bg-gold" />
      </span>
    </div>
  );
}
