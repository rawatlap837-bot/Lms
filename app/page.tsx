import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import EcosystemPipeline from "@/components/EcosystemPipeline";
import Features from "@/components/Features";
import WhyCustom from "@/components/WhyCustom";
import Impact from "@/components/Impact";
import BrandStatement from "@/components/BrandStatement";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <main className="bg-ink">
      <Hero />
      <PainPoints />
      <EcosystemPipeline />
      <Features />
      <WhyCustom />
      <Impact />
      <BrandStatement />
      <Process />
      <Faq />
      <FinalCta />
    </main>
  );
}
