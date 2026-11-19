"use client";

import Image, { type ImageProps } from "next/image";
import { photoLoader, photoSrc } from "@/lib/photo-loader";
import { photoManifest } from "@/lib/photo-manifest";

type PhotoProps = Omit<ImageProps, "src" | "loader" | "placeholder" | "blurDataURL" | "quality"> & {
  /** Nome do arquivo em public/assets/barbara/fotos, sem extensão. */
  slug: string;
};

/** Fotografia do Instituto: variantes WebP estáticas + prévia borrada instantânea enquanto carrega. */
export function Photo({ slug, alt, ...props }: PhotoProps) {
  const blur = photoManifest[slug]?.blur;
  return (
    <Image
      {...props}
      src={photoSrc(slug)}
      alt={alt}
      loader={photoLoader}
      {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
    />
  );
}
