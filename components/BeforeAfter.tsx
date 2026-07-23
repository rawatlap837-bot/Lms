import { Check, X } from "lucide-react";
import Eyebrow from "./Eyebrow";
import { beforeAfter } from "@/data/content";

export default function BeforeAfter() {
  return (
    <section className="bg-cream py-24 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow>Before vs After</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl text-ink text-balance">
            See the Difference
          </h2>
          <p className="mt-6 text-ink/55 leading-relaxed">
            Same business. Same students. A completely different way of
            running it.
          </p>
        </div>

        {/* two cards with a "VERSUS" medallion overlapping the seam */}
        <div className="relative mt-16 md:mt-20">
          <div className="grid md:grid-cols-2 gap-10 md:gap-0">
            {/* BEFORE card */}
            <div className="rounded-2xl overflow-hidden bg-white border border-ink/[0.06] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] md:mr-6">
              <div className="bg-gradient-to-r from-red-500 to-orange-400 py-5 text-center">
                <span className="font-display text-sm md:text-base tracking-wide text-white uppercase">
                  Before (Manual Work)
                </span>
              </div>
              <div>
                {beforeAfter.map((row, i) => (
                  <div
                    key={row.before}
                    className={`flex items-center justify-between gap-4 px-6 py-5 ${i !== beforeAfter.length - 1 ? "border-b border-ink/[0.06]" : ""
                      }`}
                  >
                    <span className="text-sm md:text-base text-ink/70 leading-snug">
                      {row.before}
                    </span>
                    <span className="shrink-0 h-9 w-9 rounded-full bg-red-50 border border-red-200 text-red-500 text-xs font-semibold flex items-center justify-center">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AFTER card */}
            <div className="rounded-2xl overflow-hidden bg-white border border-ink/[0.06] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] md:ml-6">
              <div className="bg-gradient-to-r from-[#3FA98A] to-[#63D9AE] py-5 text-center">
                <span className="font-display text-sm md:text-base tracking-wide text-white uppercase">
                  After (Automated LMS)
                </span>
              </div>
              <div>
                {beforeAfter.map((row, i) => (
                  <div
                    key={row.after}
                    className={`flex items-center justify-between gap-4 px-6 py-5 ${i !== beforeAfter.length - 1 ? "border-b border-ink/[0.06]" : ""
                      }`}
                  >
                    <span className="text-sm md:text-base text-ink font-medium leading-snug">
                      {row.after}
                    </span>
                    <span className="shrink-0 h-9 w-9 rounded-full bg-[#3FA98A]/10 border border-[#3FA98A]/30 text-[#2E8A6E] text-xs font-semibold flex items-center justify-center">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* center "VERSUS" medallion — desktop only, overlaps the seam */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <div className="relative h-36 w-36 rounded-full bg-cream border-[6px] border-cream flex items-center justify-center shadow-[0_15px_45px_-10px_rgba(0,0,0,0.25)]">
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center border border-ink/[0.06]">
                <span className="font-display text-sm tracking-[0.15em] text-ink/60 uppercase">
                  Versus
                </span>
              </div>

              {/* x badge, seated on the boundary (left) */}
              <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-red-500 flex items-center justify-center shadow-[0_6px_16px_rgba(239,68,68,0.4)]">
                <X className="h-5 w-5 text-white" strokeWidth={2.5} />
              </span>

              {/* check badge, seated on the boundary (right) */}
              <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-[#3FA98A] flex items-center justify-center shadow-[0_6px_16px_rgba(63,169,138,0.4)]">
                <Check className="h-5 w-5 text-white" strokeWidth={2.5} />
              </span>
            </div>
          </div>

          {/* mobile: simple VS divider between stacked cards */}
          <div className="md:hidden flex items-center justify-center -my-6 relative z-10">
            <span className="h-12 w-12 rounded-full bg-cream border-4 border-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.2)] flex items-center justify-center font-display text-xs tracking-wide text-ink/60 uppercase">
              vs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}