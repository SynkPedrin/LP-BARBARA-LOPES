import { GoldRule } from "@/components/ui/GoldRule";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { followUp } from "@/lib/content";

export function ClinicalFollowUp() {
  return (
    <section aria-labelledby="followup-title" className="relative overflow-hidden bg-sand py-24 sm:py-28 lg:py-36">
      <div className="container-editorial">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-taupe" data-reveal="fade">
              {followUp.eyebrow}
            </p>
            <RevealTitle
              id="followup-title"
              className="mt-5 text-[clamp(2.3rem,3vw+1rem,4.1rem)] font-light leading-[1.02] text-espresso"
              lines={[
                "Cuidado contínuo.",
                <em key="d" className="italic text-brown">
                  Decisões personalizadas.
                </em>,
              ]}
            />
          </div>
          <p
            className="max-w-md text-[0.9375rem] leading-[1.8] text-warmgray sm:text-base lg:col-span-4 lg:col-start-9 lg:pb-2"
            data-reveal
          >
            {followUp.text}
          </p>
        </div>

        <div className="relative mt-16 lg:mt-24">
          <GoldRule className="absolute left-0 right-0 top-[0.6rem] hidden lg:block" />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {followUp.items.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": 200 + index * 120 } as React.CSSProperties}
                className="relative border-l border-champagne pl-6 lg:border-l-0 lg:pl-0 lg:pt-12"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 size-[9px] rounded-full border border-gold bg-sand lg:left-0 lg:top-1 lg:size-[11px]"
                />
                <span className="font-serif text-sm text-taupe">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-serif text-[1.65rem] leading-tight text-espresso">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.75] text-warmgray">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <p
          className="mx-auto mt-24 max-w-3xl text-center font-serif text-[clamp(1.7rem,2vw+1rem,2.8rem)] font-light italic leading-[1.25] text-brown lg:mt-32"
          data-reveal
        >
          {followUp.quote}
        </p>
      </div>
    </section>
  );
}
