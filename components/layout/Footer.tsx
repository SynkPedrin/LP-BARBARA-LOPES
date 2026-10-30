import Image from "next/image";
import Link from "next/link";
import { nav } from "@/lib/content";
import { getBookingHref, isWhatsAppConfigured, siteConfig } from "@/lib/site-config";

export function Footer() {
  const { address, professional, contact, legalEntity } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso-deep pb-12 pt-20 text-champagne/75">
      <div className="container-editorial">
        <div className="grid gap-14 border-b border-champagne/10 pb-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/assets/barbara/logo-trim.png"
              alt="Instituto Bárbara Lopes, tricologia avançada"
              width={1106}
              height={1164}
              sizes="10rem"
              className="h-auto w-36"
            />
            <p className="mt-8 font-serif text-2xl text-ivory">{professional.name}</p>
            <p className="mt-1 text-sm">
              {professional.role}
              {professional.registration && <> · {professional.registration}</>}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-gold">Endereço</h2>
            <address className="mt-5 text-sm not-italic leading-[1.9]">
              {address.name}
              <br />
              {address.building}
              <br />
              {address.street} — {address.district}
              <br />
              {address.city} — {address.state}
              <br />
              CEP {address.postalCode}
            </address>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-2">
            <h2 className="eyebrow text-gold">Navegação</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-editorial hover:text-ivory">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-gold">Contato</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {isWhatsAppConfigured && (
                <li>
                  <a
                    href={getBookingHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-editorial hover:text-ivory"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {contact.instagram && (
                <li>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-editorial hover:text-ivory"
                  >
                    Instagram
                  </a>
                </li>
              )}
              <li>
                <a
                  href={siteConfig.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial hover:text-ivory"
                >
                  Como chegar
                </a>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="link-editorial hover:text-ivory">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-10 text-xs leading-relaxed text-champagne/55 lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-2xl">
            As informações deste site têm caráter exclusivamente informativo e não substituem a avaliação profissional
            individualizada. Condutas e recursos são indicados de acordo com cada caso, sem promessa de resultado.
            {professional.registration && (
              <>
                {" "}
                Responsável técnica: {professional.name}, {professional.registration}.
              </>
            )}
          </p>
          <p className="shrink-0">
            © {year} {address.name}
            {legalEntity && <> · {legalEntity}</>}
          </p>
        </div>
      </div>
    </footer>
  );
}
