import { Photo } from "@/components/ui/Photo";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ctaLabels, results } from "@/lib/content";

export function Results90() {
  return (
    <section
      id="resultados"
      aria-labelledby="results-title"
      className="relative isolate overflow-hidden bg-espresso py-24 text-ivory sm:py-28 lg:py-36"
    >
      <div aria-hidden="true" className="paper-texture pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-0 size-[40rem] rounded-full bg-[radial-gradient(circle,rgb(210_180_119/0.14),transparent_65%)]"
      />

      <div className="container-editorial relative grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3 text-gold" data-reveal="fade">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            {results.eyebrow}
          </p>
          <RevealTitle
            id="results-title"
            className="mt-6 text-[clamp(2.4rem,3vw+1rem,4.3rem)] font-light leading-[1.02] text-ivory"
            lines={[
              "Resultado expressivo",
              <em key="r" className="italic text-champagne">
                em 90 dias de tratamento.
              </em>,
            ]}
          />

          <div className="mt-10 flex items-end gap-6 sm:gap-8" data-reveal>
            <p aria-hidden="true" className="font-serif text-[clamp(6.5rem,12vw,11rem)] font-light leading-[0.78] text-gold">
              90
            </p>
            <p className="max-w-md pb-1 text-[0.9375rem] leading-[1.8] text-champagne/85 sm:text-base">{results.text}</p>
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="relative mx-auto max-w-[24rem] lg:max-w-none">
            <span aria-hidden="true" className="absolute -inset-3 rounded-[6px] border border-gold/30 sm:-inset-4" />
            <figure className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-espresso-deep" data-reveal="mask">
              <Photo
                slug="dra-barbara-lopes-sorriso"
                alt="Dra. Bárbara Lopes sorrindo, de jaleco branco, no Instituto Bárbara Lopes"
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 24rem, 90vw"
                className="object-cover object-[50%_30%]"
              />
            </figure>
          </div>
        </div>
      </div>

      {/* Linha do tempo do tratamento */}
      <div className="container-editorial relative mt-20 lg:mt-28">
        <span aria-hidden="true" className="absolute left-[var(--gutter)] right-[var(--gutter)] top-[0.6rem] hidden h-px bg-gradient-to-r from-gold/0 via-gold/60 to-gold lg:block" />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {results.milestones.map((item, index) => {
            const last = index === results.milestones.length - 1;
            return (
              <li
                key={item.day}
                data-reveal
                style={{ "--reveal-delay": 150 + index * 120 } as React.CSSProperties}
                className="relative border-l border-champagne/20 pl-6 lg:border-l-0 lg:pl-0 lg:pt-12"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[5px] top-1.5 size-[9px] rounded-full border border-gold lg:left-0 lg:top-1 lg:size-[11px] ${
                    last ? "bg-gold" : "bg-espresso"
                  }`}
                />
                <span className={`font-serif text-lg ${last ? "text-gold" : "text-champagne/60"}`}>{item.day}</span>
                <h3 className={`mt-2 font-serif text-[1.65rem] leading-tight ${last ? "text-gold" : "text-ivory"}`}>
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.75] text-champagne/75">{item.text}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-16 flex flex-col gap-8 border-t border-champagne/15 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-xl text-xs leading-relaxed text-champagne/55">{results.note}</p>
          <WhatsAppCTA label={ctaLabels.results} event="results_cta_click" location="results" variant="light" />
        </div>
      </div>
    </section>
  );
}
