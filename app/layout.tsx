import type { Metadata, Viewport } from "next";
import { Allura, Cormorant_Garamond, Manrope } from "next/font/google";
import { Analytics } from "@/components/analytics/Analytics";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allura",
  display: "swap",
  preload: false,
});

const ogImage = {
  url: "/assets/barbara/og-instituto-barbara-lopes.jpg",
  width: 1200,
  height: 630,
  alt: "Dra. Bárbara Lopes no Instituto Bárbara Lopes, em Araçatuba",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.professional.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImage.url],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
  width: "device-width",
  initialScale: 1,
};

// Habilita os reveals somente com JS ativo; se os scripts não carregarem, tudo fica visível.
const revealBootstrap = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__iblReady)document.documentElement.classList.add('reveal-fallback')},2500);`;

function structuredData() {
  const { address, professional, contact } = siteConfig;
  const sameAs = [contact.instagram].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${siteConfig.url}/#instituto`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${ogImage.url}`,
    logo: `${siteConfig.url}/assets/barbara/logo-instituto-barbara-lopes.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.street}, ${address.building}`,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: "BR",
    },
    areaServed: { "@type": "City", name: "Araçatuba" },
    ...(contact.whatsapp ? { telephone: `+${contact.whatsapp}` } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    employee: {
      "@type": "Person",
      name: professional.name,
      jobTitle: professional.role,
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${manrope.variable} ${allura.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
        <RevealObserver />
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }} />
      </body>
    </html>
  );
}
