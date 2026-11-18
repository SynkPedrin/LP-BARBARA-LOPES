// Prepara as fotografias e o vídeo de tour (iPhone, HEIC/MOV) para a web em 4K.
// Os arquivos em /assets nunca são alterados: tudo é gerado em /public/assets/barbara/fotos.
//
// Fotos: HEIC → JPEG com orientação aplicada, lado maior em 3840 px (4K), sem metadados (remove GPS).
//        A decodificação do HEIC usa o `sips` do macOS; o redimensionamento usa o sharp (dependência do Next).
// Vídeo: HEVC 4K 60 fps → H.264 4K (2160×3840) e 1080p (1080×1920), 30 fps, sem áudio, faststart + poster.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const SRC = "assets";
const OUT = "public/assets/barbara/fotos";
const LONG_SIDE = 3840;

export const photos = [
  ["IMG_8272.HEIC", "dra-barbara-lopes-instituto"],
  ["IMG_8287.HEIC", "dra-barbara-lopes-jaleco"],
  ["IMG_8290.HEIC", "dra-barbara-lopes-sorriso"],
  ["IMG_8291.HEIC", "recepcao-vista"],
  ["IMG_8294.HEIC", "poltrona-arco"],
  ["IMG_8298.HEIC", "detalhe-acolhimento"],
  ["IMG_8300.HEIC", "sala-de-espera"],
  ["IMG_8301.HEIC", "sala-de-espera-recepcao"],
  ["IMG_8305.HEIC", "sala-de-atendimento"],
  ["IMG_8308.HEIC", "sala-de-atendimento-detalhe"],
  ["IMG_8309.HEIC", "bancada-certificados"],
  ["IMG_8310.HEIC", "bancada-certificados-2"],
  ["IMG_8311.HEIC", "bancada-home-care"],
  ["IMG_8312.HEIC", "bancada-certificados-3"],
  ["IMG_8313.HEIC", "poltrona-atendimento"],
];

mkdirSync(OUT, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "ibl-photos-"));

try {
  for (const [file, slug] of photos) {
    const input = join(SRC, file);
    if (!existsSync(input)) throw new Error(`Foto ausente: ${input}`);
    const decoded = join(tmp, `${slug}.jpg`);
    execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "100", input, "--out", decoded], { stdio: "ignore" });

    const info = await sharp(decoded)
      .rotate() // aplica a orientação EXIF do iPhone
      .resize({ width: LONG_SIDE, height: LONG_SIDE, fit: "inside", withoutEnlargement: true, kernel: "lanczos3" })
      .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(join(OUT, `${slug}.jpg`)); // sharp não copia metadados por padrão (GPS removido)
    console.log(`✓ ${file} → ${slug}.jpg (${info.width}×${info.height})`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

// Vídeo de tour
const ffmpeg = (args) =>
  execFileSync("npx", ["remotion", "ffmpeg", "-y", "-loglevel", "error", ...args], { stdio: "inherit" });

const tour = join(SRC, "IMG_8314.MOV");
if (existsSync(tour)) {
  for (const [suffix, w, h, crf] of [
    ["4k", 2160, 3840, "22"],
    ["1080p", 1080, 1920, "23"],
  ]) {
    ffmpeg([
      "-i", tour,
      "-an",
      "-vf", `scale=${w}:${h}:flags=lanczos`,
      "-r", "30",
      "-c:v", "libx264", "-preset", "slow", "-crf", crf, "-profile:v", "high",
      "-pix_fmt", "yuv420p", "-movflags", "+faststart",
      join(OUT, `tour-instituto-${suffix}.mp4`),
    ]);
    console.log(`✓ IMG_8314.MOV → tour-instituto-${suffix}.mp4`);
  }
  ffmpeg(["-ss", "0.4", "-i", tour, "-frames:v", "1", "-vf", "scale=1080:1920:flags=lanczos", "-q:v", "2", join(OUT, "tour-instituto-poster.jpg")]);
}
