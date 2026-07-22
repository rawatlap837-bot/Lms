import { CheckCircle2 } from "lucide-react";
import { whyCustom } from "@/data/content";

export default function WhyCustom() {
  return (
    <section className="bg-vodka-fade py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4 text-indigo/70">
            Built for your business, not the other way around
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-ink text-balance">
            Why choose a custom LMS?
          </h2>
          <p className="mt-6 text-ink/65 leading-relaxed">
            Off-the-shelf platforms force your business to adapt to their
            limitations. A custom LMS does the opposite —{" "}
            <span className="font-display italic">
              your workflow comes first.
            </span>
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyCustom.map(({ title, body }) => (
            <div
              key={title}
              className="rounded-2xl bg-ink/95 border border-ink p-7"
            >
              <CheckCircle2 className="h-5 w-5 text-vodka" strokeWidth={1.6} />
              <h3 className="font-display text-lg text-cream mt-5">{title}</h3>
              <p className="mt-2 text-sm text-mist/55 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
