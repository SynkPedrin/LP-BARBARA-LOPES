import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { ClinicExperienceFilmProps, ResolvedScene } from "./film-config";
import { getSceneTimeline, transitionFrames } from "./film-config";

/* ───────────── Tema único do filme ───────────── */
const theme = {
  color: {
    ivory: "#FAF8F4",
    champagne: "#E8DCC9",
    gold: "#D2B477",
    espresso: "#30231D",
    espressoDeep: "#241A15",
  },
  font: {
    serif: 'var(--font-cormorant, "Cormorant Garamond"), Georgia, serif',
    sans: 'var(--font-manrope, "Manrope"), system-ui, sans-serif',
  },
  ease: {
    editorial: Easing.bezier(0.22, 1, 0.36, 1),
    inOut: Easing.bezier(0.65, 0, 0.35, 1),
    exit: Easing.bezier(0.55, 0, 1, 0.45),
  },
  spring: { soft: { damping: 200, mass: 0.9, stiffness: 90 } },
  textShadow: "0 2px 28px rgba(36, 26, 21, 0.55)",
} as const;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Textura de grão estática (deslocada a cada frame para parecer película, sem custo de filtro por frame)
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`;

/* ───────────── Palavras reveladas por máscara ───────────── */
function WordReveal({
  text,
  startFrame,
  exitFrame,
  style,
}: {
  text: string;
  startFrame: number;
  exitFrame: number;
  style?: CSSProperties;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const exitDuration = Math.round(fps / 3);
  const exit = interpolate(frame, [exitFrame, exitFrame + exitDuration], [0, 1], {
    ...clamp,
    easing: theme.ease.exit,
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: "0.24em", ...style }}>
      {text.split(" ").map((word, index) => {
        const progress = spring({
          frame: frame - startFrame - index * 4,
          fps,
          config: theme.spring.soft,
        });
        return (
          <span key={`${word}-${index}`} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.1em" }}>
            <span
              style={{
                display: "inline-block",
                transform: `translate3d(0, ${(1 - progress) * 110 - exit * 30}%, 0)`,
                opacity: Math.min(progress * 1.4, 1) * (1 - exit),
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </div>
  );
}

/* ───────────── Cena ───────────── */
function Scene({ scene, index, durationInFrames }: { scene: ResolvedScene; index: number; durationInFrames: number }) {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const t = transitionFrames(fps);

  // Entrada da cena (a anterior permanece por baixo, então a sobreposição forma a transição)
  const enter = interpolate(frame, [0, t], [0, 1], { ...clamp, easing: theme.ease.inOut });
  let reveal: CSSProperties = {};
  switch (scene.transition) {
    case "fade":
    case "dissolve":
      reveal = { opacity: enter };
      break;
    case "rise":
      reveal = { clipPath: `inset(${(1 - enter) * 100}% 0 0 0)`, opacity: interpolate(enter, [0, 0.4], [0.6, 1], clamp) };
      break;
    case "arch": {
      // Revelação em arco, ecoando os arcos da arquitetura do consultório
      const side = (1 - enter) * 30;
      const radius = (1 - enter) * width;
      reveal = {
        clipPath: `inset(${(1 - enter) * 22}% ${side}% ${(1 - enter) * 16}% ${side}% round ${radius}px ${radius}px 0 0)`,
        opacity: interpolate(enter, [0, 0.3], [0.5, 1], clamp),
      };
      break;
    }
  }

  // Câmera digital: zoom lento + leve deslocamento vertical (alternando a direção a cada cena)
  const drift = interpolate(frame, [0, durationInFrames], [0, 1], { ...clamp, easing: Easing.bezier(0.33, 0, 0.67, 1) });
  const scale = interpolate(drift, [0, 1], [1.04, 1.1]);
  const translateY = interpolate(drift, [0, 1], [-1.2, 1.2]) * scene.pan;

  // Etiqueta do capítulo
  const labelIn = spring({ frame: frame - Math.round(t * 0.6), fps, config: theme.spring.soft });
  const labelOut = interpolate(frame, [durationInFrames - t - fps / 3, durationInFrames - t], [0, 1], {
    ...clamp,
    easing: theme.ease.exit,
  });

  return (
    <AbsoluteFill style={{ ...reveal, backgroundColor: theme.color.espressoDeep }}>
      <AbsoluteFill style={{ transform: `scale(${scale}) translate3d(0, ${translateY}%, 0)`, transformOrigin: "50% 50%" }}>
        <OffthreadVideo src={scene.src} muted pauseWhenBuffering style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          top: 34,
          left: 34,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: theme.font.sans,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: theme.color.champagne,
          textShadow: theme.textShadow,
          opacity: labelIn * (1 - labelOut),
          transform: `translate3d(${(1 - labelIn) * -12}px, ${labelOut * -8}px, 0)`,
        }}
      >
        <span style={{ color: theme.color.gold }}>{String(index + 1).padStart(2, "0")}</span>
        <span style={{ width: 18 * labelIn, height: 1, background: theme.color.gold }} />
        <span>{scene.chapter}</span>
      </div>

      {scene.caption && (
        <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 36px 108px" }}>
          <WordReveal
            text={scene.caption}
            startFrame={Math.round(t + fps * 0.15)}
            exitFrame={durationInFrames - t - Math.round(fps / 2)}
            style={{
              fontFamily: theme.font.serif,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 40,
              lineHeight: 1.08,
              color: theme.color.ivory,
              textAlign: "center",
              textShadow: theme.textShadow,
            }}
          />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

/* ───────────── Encerramento: assinatura do Instituto ───────────── */
function Signature({ monogramSrc, durationInFrames }: { monogramSrc: string; durationInFrames: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const veil = interpolate(frame, [0, fps * 0.9], [0, 0.62], { ...clamp, easing: theme.ease.inOut });
  const mark = spring({ frame: frame - Math.round(fps * 0.3), fps, config: theme.spring.soft });
  const line = interpolate(frame, [fps * 0.7, fps * 1.6], [0, 1], { ...clamp, easing: theme.ease.editorial });
  const place = spring({ frame: frame - Math.round(fps * 1.2), fps, config: theme.spring.soft });
  const breathe = 1 + Math.sin(frame / (fps * 0.9)) * 0.006;
  // Escurece no fim para emendar suavemente com o início do loop
  const fadeOut = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [0, 1], {
    ...clamp,
    easing: theme.ease.inOut,
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: theme.color.espressoDeep, opacity: veil }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 0 }}>
        <Img
          src={monogramSrc}
          style={{
            width: 92,
            height: "auto",
            opacity: mark,
            transform: `translate3d(0, ${(1 - mark) * 18}px, 0) scale(${(0.92 + mark * 0.08) * breathe})`,
          }}
        />
        <div style={{ height: 26 }} />
        <WordReveal
          text="Instituto Bárbara Lopes."
          startFrame={Math.round(fps * 0.55)}
          exitFrame={durationInFrames + fps}
          style={{
            fontFamily: theme.font.serif,
            fontWeight: 400,
            fontSize: 34,
            letterSpacing: "0.01em",
            color: theme.color.ivory,
            textShadow: theme.textShadow,
          }}
        />
        <div
          style={{
            marginTop: 18,
            width: 120,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${theme.color.gold}, transparent)`,
            transform: `scaleX(${line})`,
          }}
        />
        <div
          style={{
            marginTop: 18,
            fontFamily: theme.font.sans,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: theme.color.champagne,
            opacity: place,
            transform: `translate3d(0, ${(1 - place) * 10}px, 0)`,
          }}
        >
          Araçatuba · SP
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: theme.color.espressoDeep, opacity: fadeOut }} />
    </AbsoluteFill>
  );
}

/* ───────────── Moldura editorial, gradação e grão ───────────── */
function Finish({ sceneStarts }: { sceneStarts: number[] }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = interpolate(frame, [fps * 0.2, fps * 1.4], [0, 1], { ...clamp, easing: theme.ease.editorial });
  const activeIndex = sceneStarts.filter((start) => frame >= start).length - 1;
  const grainShift = (frame % 6) * 23;
  const border = "rgba(232, 220, 201, 0.42)";

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Gradação quente e consistente entre os clipes */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(36,26,21,0.42) 0%, rgba(36,26,21,0) 24%, rgba(36,26,21,0) 58%, rgba(36,26,21,0.6) 100%)",
        }}
      />
      <AbsoluteFill style={{ backgroundColor: "rgba(210, 180, 119, 0.10)", mixBlendMode: "soft-light" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(36,26,21,0.42) 100%)" }} />
      <AbsoluteFill
        style={{
          backgroundImage: GRAIN,
          backgroundPosition: `${grainShift}px ${grainShift * 1.7}px`,
          opacity: 0.07,
          mixBlendMode: "overlay",
        }}
      />

      {/* Moldura fina desenhada na abertura */}
      <div style={{ position: "absolute", inset: 18 }}>
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: border,
            transform: `scaleX(${draw})`,
            transformOrigin: "left",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: border,
            transform: `scaleX(${draw})`,
            transformOrigin: "right",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 1,
            background: border,
            transform: `scaleY(${draw})`,
            transformOrigin: "bottom",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: 1,
            background: border,
            transform: `scaleY(${draw})`,
            transformOrigin: "top",
          }}
        />
      </div>

      {/* Índice de cenas */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 6,
          opacity: draw,
        }}
      >
        {sceneStarts.map((start, index) => (
          <span
            key={start}
            style={{
              width: index === activeIndex ? 22 : 10,
              height: 1,
              background: index === activeIndex ? theme.color.gold : "rgba(232, 220, 201, 0.45)",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
}

/* ───────────── Composição ───────────── */
export function ClinicExperienceFilm({ scenes, monogramSrc }: ClinicExperienceFilmProps) {
  const { fps } = useVideoConfig();
  const timeline = getSceneTimeline(scenes, fps);
  const last = timeline[timeline.length - 1];
  const signatureFrom = last ? last.from + Math.round(fps * 1.1) : 0;
  const signatureDuration = last ? last.durationInFrames - Math.round(fps * 1.1) : 1;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.color.espressoDeep }}>
      {scenes.map((scene, index) => {
        const slot = timeline[index];
        if (!slot) return null;
        return (
          <Sequence
            key={scene.src}
            from={slot.from}
            durationInFrames={slot.durationInFrames}
            premountFor={fps}
            name={`${String(index + 1).padStart(2, "0")} ${scene.chapter}`}
          >
            <Scene scene={scene} index={index} durationInFrames={slot.durationInFrames} />
          </Sequence>
        );
      })}

      <Finish sceneStarts={timeline.map((slot) => slot.from)} />

      <Sequence from={signatureFrom} durationInFrames={signatureDuration} name="Assinatura">
        <Signature monogramSrc={monogramSrc} durationInFrames={signatureDuration} />
      </Sequence>

      {/* Abertura a partir do café profundo */}
      <OpeningFade />
    </AbsoluteFill>
  );
}

function OpeningFade() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, fps * 0.6], [1, 0], { ...clamp, easing: theme.ease.inOut });
  if (opacity <= 0) return null;
  return <AbsoluteFill style={{ backgroundColor: theme.color.espressoDeep, opacity }} />;
}
