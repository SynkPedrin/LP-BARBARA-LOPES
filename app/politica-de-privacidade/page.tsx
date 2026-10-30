import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Política de Privacidade | ${siteConfig.name}`,
  description: `Como o site do ${siteConfig.name} trata dados pessoais, em conformidade com a LGPD.`,
  alternates: { canonical: "/politica-de-privacidade" },
};

const sections = [
  {
    title: "1. Sobre esta política",
    body: [
      `Esta política explica como o site do ${siteConfig.name} trata dados pessoais, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).`,
    ],
  },
  {
    title: "2. Dados coletados pelo site",
    body: [
      "Este site não possui formulários e não solicita informações de saúde. A navegação pode gerar dados técnicos (como tipo de dispositivo e páginas visitadas) quando ferramentas de medição estiverem ativas e somente após o seu consentimento.",
      "Ao clicar em um botão de agendamento, você é direcionado ao WhatsApp. As mensagens trocadas nesse canal seguem também os termos e a política de privacidade do próprio WhatsApp.",
    ],
  },
  {
    title: "3. Finalidade",
    body: [
      "Os dados técnicos são utilizados apenas para entender como o site é utilizado e melhorar a experiência. Os contatos realizados pelo WhatsApp são utilizados para responder à sua solicitação e organizar o agendamento.",
    ],
  },
  {
    title: "4. Cookies e ferramentas de terceiros",
    body: [
      "Ferramentas de medição só são carregadas após a sua autorização, que pode ser recusada sem prejuízo da navegação. O mapa interativo é fornecido pelo Google e só é carregado quando você solicita.",
    ],
  },
  {
    title: "5. Seus direitos",
    body: [
      "Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade ou eliminação dos seus dados, além de revogar o consentimento a qualquer momento, pelos canais oficiais de atendimento do Instituto.",
    ],
  },
  {
    title: "6. Contato",
    body: [
      `${siteConfig.name} · ${siteConfig.address.building} · ${siteConfig.address.street}, ${siteConfig.address.district} · ${siteConfig.address.city}, ${siteConfig.address.state} · CEP ${siteConfig.address.postalCode}.`,
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <header className="border-b border-champagne bg-ivory">
        <div className="container-editorial flex h-20 items-center justify-between">
          <Link href="/" aria-label={`${siteConfig.name}, página inicial`}>
            <Image
              src="/assets/barbara/logo-monograma.png"
              alt=""
              width={778}
              height={752}
              sizes="48px"
              className="h-11 w-auto"
            />
          </Link>
          <Link href="/" className="link-editorial text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-brown">
            Voltar ao site
          </Link>
        </div>
      </header>
      <main className="paper-texture bg-ivory py-20 lg:py-28">
        <article className="container-editorial max-w-3xl">
          <p className="eyebrow text-taupe">Privacidade</p>
          <h1 className="mt-5 text-[clamp(2.4rem,3vw+1rem,3.8rem)] font-light leading-[1.05] text-espresso">
            Política de Privacidade
          </h1>
          <PendingNotice className="mt-8">
            Texto-base para revisão jurídica. Incluir controlador (razão social e CNPJ), encarregado de dados e canal oficial de
            atendimento antes da publicação.
          </PendingNotice>
          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-serif text-2xl text-espresso">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-[0.9375rem] leading-[1.85] text-warmgray">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
