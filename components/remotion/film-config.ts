/**
 * Roteiro do filme do consultório. Compartilhado entre o Player da página e o Remotion Studio.
 * Durações respeitam o comprimento real de cada vídeo (3,2 s a 5,2 s, 464 × 832, 30 fps).
 */

export type FilmTransition = "fade" | "dissolve" | "rise" | "arch";

export type FilmScene = {
  /** Caminho relativo à pasta /public. */
  path: string;
  poster: string;
  chapter: string;
  durationInSeconds: number;
  transition: FilmTransition;
  /** Pequena frase editorial sobre a cena (usada com parcimônia). */
  caption?: string;
  /** Direção do movimento de câmera digital. */
  pan: 1 | -1;
};

export const FILM_FPS = 30;
export const FILM_WIDTH = 464;
export const FILM_HEIGHT = 832;
export const TRANSITION_SECONDS = 0.7;

const dir = "assets/barbara/videos";

export const FILM_SCENES: FilmScene[] = [
  {
    path: `${dir}/clinica-vegetacao.mp4`,
    poster: `${dir}/clinica-vegetacao.jpg`,
    chapter: "Natureza",
    durationInSeconds: 3.8,
    transition: "fade",
    caption: "Um ambiente para cuidar.",
    pan: 1,
  },
  {
    path: `${dir}/clinica-ambiente.mp4`,
    poster: `${dir}/clinica-ambiente.jpg`,
    chapter: "Arquitetura",
    durationInSeconds: 3.1,
    transition: "rise",
    pan: -1,
  },
  {
    path: `${dir}/clinica-identidade.mp4`,
    poster: `${dir}/clinica-identidade.jpg`,
    chapter: "Identidade",
    durationInSeconds: 3.3,
    transition: "dissolve",
    pan: 1,
  },
  {
    path: `${dir}/clinica-cafe.mp4`,
    poster: `${dir}/clinica-cafe.jpg`,
    chapter: "Acolhimento",
    durationInSeconds: 3.6,
    transition: "arch",
    caption: "Cada detalhe importa.",
    pan: -1,
  },
  {
    path: `${dir}/clinica-arquitetura.mp4`,
    poster: `${dir}/clinica-arquitetura.jpg`,
    chapter: "Luz",
    durationInSeconds: 3.4,
    transition: "dissolve",
    pan: 1,
  },
  {
    path: `${dir}/clinica-vista.mp4`,
    poster: `${dir}/clinica-vista.jpg`,
    chapter: "Araçatuba",
    durationInSeconds: 4.5,
    transition: "rise",
    pan: -1,
  },
];

export const MONOGRAM_PATH = "assets/barbara/logo-monograma.png";

export type ResolvedScene = Omit<FilmScene, "path" | "poster"> & { src: string };

export type ClinicExperienceFilmProps = {
  scenes: ResolvedScene[];
  monogramSrc: string;
};

/** Converte caminhos relativos em URLs (na página: "/..."; no Studio: staticFile). */
export function resolveFilmProps(resolve: (path: string) => string): ClinicExperienceFilmProps {
  return {
    scenes: FILM_SCENES.map((scene) => ({
      chapter: scene.chapter,
      durationInSeconds: scene.durationInSeconds,
      transition: scene.transition,
      caption: scene.caption,
      pan: scene.pan,
      src: resolve(scene.path),
    })),
    monogramSrc: resolve(MONOGRAM_PATH),
  };
}

export const transitionFrames = (fps: number) => Math.round(TRANSITION_SECONDS * fps);

/** Frame inicial e duração de cada cena, considerando a sobreposição das transições. */
export function getSceneTimeline(scenes: Pick<FilmScene, "durationInSeconds">[], fps: number) {
  const overlap = transitionFrames(fps);
  let cursor = 0;
  return scenes.map((scene) => {
    const durationInFrames = Math.round(scene.durationInSeconds * fps);
    const from = cursor;
    cursor += durationInFrames - overlap;
    return { from, durationInFrames };
  });
}

export function getFilmDuration(scenes: Pick<FilmScene, "durationInSeconds">[], fps: number) {
  const timeline = getSceneTimeline(scenes, fps);
  const last = timeline[timeline.length - 1];
  return last ? last.from + last.durationInFrames : 1;
}
