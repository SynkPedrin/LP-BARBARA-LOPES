import type { ImageLoaderProps } from "next/image";
import { PHOTO_WIDTHS, photoManifest } from "@/lib/photo-manifest";

export const PHOTO_BASE = "/assets/barbara/fotos";

export const photoSrc = (slug: string) => `${PHOTO_BASE}/${slug}.jpg`;

/**
 * Aponta cada largura pedida pelo next/image para a variante WebP pré-gerada mais próxima
 * (scripts/prepare-photo-variants.mjs). Servidas como estáticos, sem otimização sob demanda.
 */
export function photoLoader({ src, width }: ImageLoaderProps) {
  const slug = src.slice(src.lastIndexOf("/") + 1).replace(/\.jpg$/, "");
  const max = photoManifest[slug]?.width ?? Infinity;
  const available: number[] = PHOTO_WIDTHS.filter((w) => w <= max);
  const chosen = available.find((w) => w >= width) ?? available.at(-1) ?? PHOTO_WIDTHS[0];
  return `${PHOTO_BASE}/web/${slug}-${chosen}.webp`;
}
