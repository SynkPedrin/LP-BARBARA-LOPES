// Gera versões responsivas (WebP) das fotos 4K e as prévias borradas usadas como placeholder.
// Entrada: public/assets/barbara/fotos/*.jpg (gerados por scripts/prepare-photos.mjs)
// Saída:   public/assets/barbara/fotos/web/<slug>-<largura>.webp e lib/photo-manifest.ts
//
// As fotos são servidas como arquivos estáticos (CDN, cache imutável), sem passar pelo otimizador
// sob demanda — que levava segundos para converter cada foto 4K na primeira visita.
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const DIR = "public/assets/barbara/fotos";
const OUT = join(DIR, "web");
export const WIDTHS = [480, 960, 1440, 1920, 2880];

mkdirSync(OUT, { recursive: true });
const manifest = {};

for (const file of readdirSync(DIR).filter((f) => f.endsWith(".jpg") && !f.startsWith("tour-"))) {
  const slug = file.replace(/\.jpg$/, "");
  const input = join(DIR, file);
  const { width, height } = await sharp(input).metadata();
  for (const w of WIDTHS.filter((w) => w <= width)) {
    await sharp(input)
      .resize({ width: w, kernel: "lanczos3" })
      .webp({ quality: w >= 1920 ? 84 : 80, smartSubsample: true, effort: 5 })
      .toFile(join(OUT, `${slug}-${w}.webp`));
  }
  const blur = await sharp(input).resize({ width: 16 }).blur(1).webp({ quality: 50 }).toBuffer();
  manifest[slug] = { width, height, blur: `data:image/webp;base64,${blur.toString("base64")}` };
  console.log(`✓ ${slug}`);
}

writeFileSync(
  "lib/photo-manifest.ts",
  `// Gerado por scripts/prepare-photo-variants.mjs — não editar à mão.\n` +
    `export const PHOTO_WIDTHS = ${JSON.stringify(WIDTHS)} as const;\n\n` +
    `export const photoManifest: Record<string, { width: number; height: number; blur: string }> = ${JSON.stringify(manifest, null, 2)};\n`,
);
console.log("✓ lib/photo-manifest.ts");
