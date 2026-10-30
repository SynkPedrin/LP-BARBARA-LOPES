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
copyFileSync(join(SRC, "FUNDO-BARBARAA.png"), join(OUT, "dra-barbara-lopes.png"));
copyFileSync(join(SRC, "RETRATO-DRA-BARBARA.png"), join(OUT, "dra-barbara-lopes-retrato.png"));
copyFileSync(join(SRC, "logo.png"), join(OUT, "logo-instituto-barbara-lopes.png"));

// Logo: apenas recortes do arquivo original (sem redesenho, sem reamostragem)
const logo = join(SRC, "logo.png");
ffmpeg(["-i", logo, "-vf", "crop=1106:1164:75:64", join(OUT, "logo-trim.png")]);
ffmpeg(["-i", logo, "-vf", "crop=778:752:246:65", join(OUT, "logo-monograma.png")]);
// Favicon / ícones a partir do monograma original
ffmpeg(["-i", logo, "-vf", "crop=760:760:254:60,scale=512:512:flags=lanczos", "app/icon.png"]);
ffmpeg(["-i", logo, "-vf", "crop=760:760:254:60,scale=180:180:flags=lanczos", "app/apple-icon.png"]);

// Imagem de compartilhamento (Open Graph) a partir da fotografia original, sem retoque
ffmpeg([
  "-i", join(SRC, "FUNDO-BARBARAA.png"),
  "-vf", "scale=1200:-2:flags=lanczos,crop=1200:630:0:12",
  "-q:v", "3", join(OUT, "og-instituto-barbara-lopes.jpg"),
]);

// Vídeos verticais (464×832): sem trilha de áudio, faststart, sem upscale.
const videos = [
  ["VIDEO1.mp4", "clinica-vegetacao"],
  ["VIDEO6.mp4", "clinica-ambiente"],
  ["VIDEO 4.mp4", "clinica-identidade"],
  ["VIDEO3.mp4", "clinica-cafe"],
  ["VIDEO5.mp4", "clinica-arquitetura"],
  ["VIDEO2.mp4", "clinica-vista"],
];

for (const [file, slug] of videos) {
  const input = join(SRC, file);
  if (!existsSync(input)) throw new Error(`Vídeo ausente: ${input}`);
  ffmpeg([
    "-i", input,
    "-an",
    "-c:v", "libx264", "-preset", "slow", "-crf", "23",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    join(VIDEO_OUT, `${slug}.mp4`),
  ]);
  ffmpeg(["-ss", "1.2", "-i", input, "-frames:v", "1", "-q:v", "3", join(VIDEO_OUT, `${slug}.jpg`)]);
  console.log(`✓ ${file} → ${slug}`);
}
