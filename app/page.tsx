import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { AboutBarbara } from "@/components/sections/AboutBarbara";
import { Bridal } from "@/components/sections/Bridal";
import { ClinicalFollowUp } from "@/components/sections/ClinicalFollowUp";
import { ClinicExperience } from "@/components/sections/ClinicExperience";
import { Concerns } from "@/components/sections/Concerns";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { HomeCare } from "@/components/sections/HomeCare";
import { Location } from "@/components/sections/Location";
import { MethodTrico } from "@/components/sections/MethodTrico";
import { Results90 } from "@/components/sections/Results90";
import { Technologies } from "@/components/sections/Technologies";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-espresso focus:px-4 focus:py-3 focus:text-sm focus:text-ivory"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Concerns />
        <MethodTrico />
        <Results90 />
        <Technologies />
        <HomeCare />
        <Bridal />
        <ClinicExperience />
        <Gallery />
        <AboutBarbara />
        <ClinicalFollowUp />
        <FAQ />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
