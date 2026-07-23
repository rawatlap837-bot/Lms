import Eyebrow from "./Eyebrow";
import { audience } from "@/data/content";

export default function WhoIsThisFor() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow>Who is this for?</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl text-ink text-balance">
            Perfect For
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audience.map(({ icon: Icon, title }, i) => {
            const isLast = i === audience.length - 1;
            return (
              <div
                key={title}
                className={`rounded-2xl border p-7 flex flex-col items-start gap-4 transition-colors ${isLast
                  ? "sm:col-span-2 lg:col-span-4 bg-gradient-to-r from-plum/[0.06] to-violet/[0.06] border-plum/15"
                  : "bg-white border-ink/[0.06] hover:border-plum/30"
                  }`}
              >
                <div
                  className="h-11 w-11 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, #D6C1E8 0%, #B89ADC 70%)",
                  }}
                >
                  <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-base md:text-lg text-ink text-balance">
                  {title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* closing line — the "if you have 20+ students" hook */}
        <div className="mt-14 flex justify-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white border border-ink/10 px-6 py-3.5 text-sm md:text-base text-ink/75 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)]">
            If you have{" "}
            <span className="font-display font-semibold text-plum">
              20+ students
            </span>
            , this will save you hours every week.
          </p>
        </div>
      </div>
    </section>
  );
}