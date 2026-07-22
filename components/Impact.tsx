import Eyebrow from "./Eyebrow";
import { impact } from "@/data/content";

export default function Impact() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <Eyebrow dark>The business impact</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl text-cream text-balance">
            Spend less time managing. More time growing.
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {impact.map(({ title, body }, i) => (
            <div
              key={title}
              className="rounded-2xl border border-mist/10 p-7 hover:border-violet/40 transition-colors"
            >
              <span className="font-mono text-xs text-lilac/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg text-cream mt-3">{title}</h3>
              <p className="mt-2 text-sm text-mist/50 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
