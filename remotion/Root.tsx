import { Composition, staticFile } from "remotion";
import { ClinicExperienceFilm } from "../components/remotion/ClinicExperienceFilm";
import {
  FILM_FPS,
  FILM_HEIGHT,
  FILM_SCENES,
  FILM_WIDTH,
  getFilmDuration,
  resolveFilmProps,
} from "../components/remotion/film-config";

/** Remotion Studio: `npm run remotion:studio` */
export function RemotionRoot() {
  return (
    <Composition
      id="ClinicExperienceFilm"
      component={ClinicExperienceFilm}
      durationInFrames={getFilmDuration(FILM_SCENES, FILM_FPS)}
      fps={FILM_FPS}
      width={FILM_WIDTH}
      height={FILM_HEIGHT}
      defaultProps={resolveFilmProps(staticFile)}
    />
  );
}
