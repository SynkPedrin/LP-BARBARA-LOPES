import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Até 3840 px para servir as fotografias em 4K em telas grandes e de alta densidade
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1280, 1536, 1920, 2560, 3840],
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: "/assets/barbara/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
