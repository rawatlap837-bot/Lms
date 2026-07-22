import Eyebrow from "./Eyebrow";
import { process } from "@/data/content";

export default function Process() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <Eyebrow dark>How we build your LMS</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl text-cream text-balance">
            From business idea to fully functional platform.
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {process.map((step) => (
            <div key={step.n}>
              <span className="font-display text-4xl text-violet/50">
                {step.n}
              </span>
              <h3 className="font-display text-xl text-cream mt-3">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-mist/50 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-16 font-mono text-xs tracking-widest uppercase text-lilac/60">
          From your workflow → to your platform → to your growth
        </p>
      </div>
    </section>
  );
}
