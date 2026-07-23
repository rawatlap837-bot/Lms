import Eyebrow from "./Eyebrow";
import { painPoints } from "@/data/content";

export default function PainPoints() {
  return (
    <section className="bg-[#ffffff] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* centered header, matching the reference's centered "Our Services" block */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl text-ink text-balance">
            Still Doing These Tasks Manually Every Day?
          </h2>
          <p className="mt-4 font-display italic text-lg md:text-xl text-plum">
            Most coaches and institutes waste 2–5 hours daily on repetitive work.
          </p>
        </div>

        {/* plain 2-column icon rows, no card borders — mirrors the reference layout */}
        <div className="mt-16 md:mt-20 grid sm:grid-cols-2 gap-x-16 gap-y-12">
          {painPoints.map(({ icon: Icon, title, body }, i) => (
            <div key={title} className="flex gap-5">
              <div
                className="shrink-0 h-12 w-12 rounded-full flex items-center justify-center"
                style={{
                  background:
                    i % 2 === 0
                      ? "radial-gradient(circle at 35% 30%, #D6C1E8 0%, #B89ADC 70%)"
                      : "radial-gradient(circle at 35% 30%, #B89ADC 0%, #7B4DB5 70%)",
                }}
              >
                <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-display text-lg text-ink">{title}</h3>
                <p className="mt-2 text-sm text-ink/55 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* bottom pill CTA, matching the reference's "Want to discuss..." pill */}
        <div className="mt-16 flex justify-center">
          <a
            href="#consultation"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-ink/10 px-6 py-3 text-sm text-ink/80 hover:bg-white transition-colors"
          >
            Want to discuss?{" "}
            <span className="underline underline-offset-2 font-medium text-plum">
              Let&apos;s Schedule a Call
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}