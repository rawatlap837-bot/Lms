import Eyebrow from "./Eyebrow";
import { pipeline } from "@/data/content";

export default function EcosystemPipeline() {
  return (
    <section id="ecosystem" className="bg-ink py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <Eyebrow dark>One powerful platform</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl text-cream text-balance">
            Your entire business, connected end to end.
          </h2>
          <p className="mt-6 text-mist/60 leading-relaxed">
            From the moment a student joins your program to the moment they
            complete their learning journey, every process is organized,
            automated, and easy to manage.
          </p>
        </div>

        <div className="mt-16 relative max-w-3xl">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-violet via-plum to-vodka/40" />
          <div className="space-y-10">
            {pipeline.map((step, i) => (
              <div key={step.title} className="relative pl-12">
                <span className="absolute left-0 top-0.5 h-8 w-8 rounded-full bg-ink-soft border border-violet/50 flex items-center justify-center font-mono text-[11px] text-lilac">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl text-cream">{step.title}</h3>
                <p className="mt-1.5 text-sm text-mist/55 leading-relaxed max-w-lg">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-16 text-mist/50 text-sm max-w-md">
          No unnecessary switching. No disconnected systems. No operational
          confusion.{" "}
          <span className="text-cream/90">
            Just one platform built around your business.
          </span>
        </p>
      </div>
    </section>
  );
}
