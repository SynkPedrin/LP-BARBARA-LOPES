import { GoldRule } from "@/components/ui/GoldRule";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { concerns, ctaLabels } from "@/lib/content";

export function Concerns() {
  return (
    <section aria-labelledby="concerns-title" className="relative bg-white py-24 sm:py-28 lg:py-36">
      <div className="container-editorial grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pr-6">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+3rem)]">
            <p className="eyebrow text-taupe" data-reveal="fade">
              Identificação
            </p>
            <RevealTitle
              id="concerns-title"
              className="mt-5 text-[clamp(2.1rem,2.6vw+1rem,3.4rem)] leading-[1.05] text-espresso"
              lines={[
                "Quando o cabelo muda,",
                "é importante compreender",
                <em key="c" className="italic text-brown">
                  o que está acontecendo.
                </em>,
              ]}
            />
            <p
              className="mt-7 max-w-md text-[0.9375rem] leading-[1.75] text-warmgray sm:text-base"
              data-reveal
              style={{ "--reveal-delay": 150 } as React.CSSProperties}
            >
              {concerns.text}
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ol className="border-t border-champagne">
            {concerns.items.map((item, index) => (
              <li
                key={item.number}
                data-reveal
                style={{ "--reveal-delay": index * 110 } as React.CSSProperties}
                className="group grid grid-cols-[3.25rem_1fr] gap-x-4 border-b border-champagne py-9 sm:grid-cols-[5rem_1fr] sm:py-11"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-[2.5rem] font-light leading-none text-gold transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:-translate-y-1 sm:text-5xl"
                >
                  {item.number}
                </span>
                <div>
                  <h3 className="font-serif text-[1.65rem] leading-tight text-espresso sm:text-[2rem]">{item.title}</h3>
                  <p className="mt-3 max-w-md text-[0.9375rem] leading-[1.75] text-warmgray">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[0.8125rem] leading-relaxed text-warmgray" data-reveal="fade">
            {concerns.note}
          </p>
        </div>
      </div>

      <div className="container-editorial mt-24 flex flex-col items-center text-center lg:mt-32">
        <GoldRule className="w-24" />
        <p
          className="mt-10 max-w-3xl font-serif text-[clamp(1.9rem,2.4vw+1rem,3.25rem)] font-light italic leading-[1.15] text-brown"
          data-reveal
        >
          {concerns.closing}
        </p>
        <div className="mt-10" data-reveal style={{ "--reveal-delay": 150 } as React.CSSProperties}>
          <WhatsAppCTA label={ctaLabels.conversation} location="concerns" variant="outline" />
        </div>
      </div>
    </section>
  );
}
