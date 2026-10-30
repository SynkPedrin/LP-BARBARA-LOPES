/**
 * Configuração central do site.
 * Dados de contato, registro e integrações vêm de variáveis de ambiente (ver .env.example).
 * Nada aqui deve ser preenchido com valores fictícios: campos ausentes ficam `null`
 * e aparecem no checklist de publicação (PUBLICACAO.md).
 */

const env = (value: string | undefined) => (value && value.trim() !== "" ? value.trim() : null);

const siteUrl =
  env(process.env.NEXT_PUBLIC_SITE_URL) ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

const address = {
  name: "Instituto Bárbara Lopes",
  building: "New York Tower — 6º andar, sala 616",
  street: "Av. Brasília, 2121",
  district: "Vila São Paulo",
  city: "Araçatuba",
  state: "SP",
  postalCode: "16018-000",
} as const;

const mapsQuery = `${address.street}, ${address.district}, ${address.city} - ${address.state}, ${address.postalCode}`;

export const siteConfig = {
  url: siteUrl.replace(/\/$/, ""),
  name: "Instituto Bárbara Lopes",
  tagline: "Tricologia avançada",
  title: "Instituto Bárbara Lopes | Tricologia Avançada em Araçatuba",
  description:
    "Conheça o Método Trico da Dra. Bárbara Lopes: uma abordagem integrativa e individualizada para avaliação, cuidado e acompanhamento capilar em Araçatuba, SP.",
  locale: "pt_BR",

  professional: {
    name: "Dra. Bárbara Lopes",
    role: "Biomédica esteta e tricologista",
    /** Registro no conselho profissional. Exibido apenas quando informado e validado. */
    registration: env(process.env.NEXT_PUBLIC_PROFESSIONAL_REGISTRATION),
  },

  /** Razão social / CNPJ, quando houver. */
  legalEntity: env(process.env.NEXT_PUBLIC_LEGAL_ENTITY),

  address,
  maps: {
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`,
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`,
  },

  contact: {
    /** WhatsApp oficial (+55 18 98827-0018). Pode ser substituído por NEXT_PUBLIC_WHATSAPP_NUMBER. */
    whatsapp: (env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) ?? "5518988270018").replace(/\D/g, "") || null,
    whatsappMessage:
      "Olá, Dra. Bárbara! Conheci o Instituto pelo site e gostaria de informações para agendar uma avaliação capilar.",
    /** PENDENTE: perfil oficial ainda não fornecido. */
    instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  },

  analytics: {
    gaId: env(process.env.NEXT_PUBLIC_GA_ID),
    gtmId: env(process.env.NEXT_PUBLIC_GTM_ID),
    metaPixelId: env(process.env.NEXT_PUBLIC_META_PIXEL_ID),
  },

  /** Seção de destino dos CTAs enquanto o WhatsApp não estiver configurado. */
  contactAnchor: "#contato",
} as const;

export const hasAnalytics = Boolean(siteConfig.analytics.gaId || siteConfig.analytics.gtmId || siteConfig.analytics.metaPixelId);

/** Link de agendamento: WhatsApp quando configurado; caso contrário, a seção de contato. */
export function getBookingHref() {
  const { whatsapp, whatsappMessage } = siteConfig.contact;
  if (!whatsapp) return siteConfig.contactAnchor;
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
}

export const isWhatsAppConfigured = Boolean(siteConfig.contact.whatsapp);
