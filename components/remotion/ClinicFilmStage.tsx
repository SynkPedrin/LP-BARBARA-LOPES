"use client";

import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useEffectEvent, useMemo, useRef } from "react";
import { ClinicExperienceFilm } from "./ClinicExperienceFilm";
import { FILM_FPS, FILM_HEIGHT, FILM_SCENES, FILM_WIDTH, getFilmDuration, resolveFilmProps } from "./film-config";

export type ClinicFilmStageProps = {
  playing: boolean;
  onFrame: (frame: number, durationInFrames: number) => void;
  onPlay: () => void;
  onLoop: () => void;
  onReady: () => void;
};

const DURATION = getFilmDuration(FILM_SCENES, FILM_FPS);

/** Remotion Player com a composição do consultório. Carregado apenas quando a seção se aproxima da tela. */
export function ClinicFilmStage({ playing, onFrame, onPlay, onLoop, onReady }: ClinicFilmStageProps) {
  const playerRef = useRef<PlayerRef>(null);
  const inputProps = useMemo(() => resolveFilmProps((path) => `/${path}`), []);
  const emitFrame = useEffectEvent((frame: number) => onFrame(frame, DURATION));
  const emitPlay = useEffectEvent(() => onPlay());
  const emitLoop = useEffectEvent(() => onLoop());
  const emitReady = useEffectEvent(() => onReady());

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    let lastFrame = 0;

    const handleFrame = (event: { detail: { frame: number } }) => {
      const { frame } = event.detail;
      if (frame < lastFrame - FILM_FPS) emitLoop();
      lastFrame = frame;
      emitFrame(frame);
    };
    const handlePlay = () => emitPlay();

    player.addEventListener("frameupdate", handleFrame);
    player.addEventListener("play", handlePlay);
    emitReady();
    return () => {
      player.removeEventListener("frameupdate", handleFrame);
      player.removeEventListener("play", handlePlay);
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (playing) player.play();
    else player.pause();
  }, [playing]);

  return (
    <Player
      ref={playerRef}
      component={ClinicExperienceFilm}
      inputProps={inputProps}
      durationInFrames={DURATION}
      fps={FILM_FPS}
      compositionWidth={FILM_WIDTH}
      compositionHeight={FILM_HEIGHT}
      style={{ width: "100%", height: "100%" }}
      loop
      initiallyMuted
      numberOfSharedAudioTags={0}
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false}
      acknowledgeRemotionLicense
    />
  );
}
