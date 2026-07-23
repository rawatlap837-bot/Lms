import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import EcosystemPipeline from "@/components/EcosystemPipeline";
import BeforeAfter from "@/components/BeforeAfter";
import Features from "@/components/Feautres";
import WhoIsThisFor from "@/components/Whoisthisfor";
import SocialProof from "@/components/SocialProof";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <main className="bg-ink">
      <Hero />
      <PainPoints />
      <EcosystemPipeline />
      <BeforeAfter />
      <Features />
      <WhoIsThisFor />
      <SocialProof />
      <Process />
      <Faq />
      <FinalCta />
    </main>
  );
}