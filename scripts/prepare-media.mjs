// Prepara os assets originais da cliente para a web.
// Os arquivos em /assets nunca são alterados: tudo é gerado em /public/assets/barbara.
// Usa o ffmpeg que acompanha o Remotion (`npx remotion ffmpeg`), sem dependências extras.
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const SRC = "assets";
const OUT = "public/assets/barbara";
const VIDEO_OUT = join(OUT, "videos");

mkdirSync(VIDEO_OUT, { recursive: true });

const ffmpeg = (args) =>
  execFileSync("npx", ["remotion", "ffmpeg", "-y", "-loglevel", "error", ...args], {
    stdio: "inherit",
  });

// Originais preservados (cópia byte a byte)
copyFileSync(join(SRC, "logo.png"), join(OUT, "logo-instituto-barbara-lopes.png"));

// Logo: apenas recortes do arquivo original (sem redesenho, sem reamostragem)
const logo = join(SRC, "logo.png");
ffmpeg(["-i", logo, "-vf", "crop=1106:1164:75:64", join(OUT, "logo-trim.png")]);
ffmpeg(["-i", logo, "-vf", "crop=778:752:246:65", join(OUT, "logo-monograma.png")]);
// Favicon / ícones a partir do monograma original
ffmpeg(["-i", logo, "-vf", "crop=760:760:254:60,scale=512:512:flags=lanczos", "app/icon.png"]);
ffmpeg(["-i", logo, "-vf", "crop=760:760:254:60,scale=180:180:flags=lanczos", "app/apple-icon.png"]);

// A imagem de compartilhamento (Open Graph) é gerada em scripts/prepare-photos.mjs, a partir da foto do hero.

// Imagem da vista (seção Localização): quadro extraído do vídeo original da cliente.
const vista = join(SRC, "VIDEO2.mp4");
if (!existsSync(vista)) throw new Error(`Vídeo ausente: ${vista}`);
ffmpeg(["-ss", "1.2", "-i", vista, "-frames:v", "1", "-q:v", "3", join(VIDEO_OUT, "clinica-vista.jpg")]);
console.log("✓ VIDEO2.mp4 → clinica-vista.jpg");
