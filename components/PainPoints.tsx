import Eyebrow from "./Eyebrow";
import { painPoints } from "@/data/content";

export default function PainPoints() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <Eyebrow>Your business shouldn&apos;t run on a patchwork of tools</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl text-ink text-balance">
            Still managing your learning business manually?
          </h2>
          <p className="mt-6 text-ink/60 leading-relaxed">
            As your student base grows, managing everything through
            spreadsheets, WhatsApp, and disconnected systems becomes
            increasingly difficult.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {painPoints.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl bg-white/70 border border-ink/5 p-7 hover:bg-white transition-colors"
            >
              <Icon className="h-6 w-6 text-plum" strokeWidth={1.6} />
              <h3 className="font-display text-lg text-ink mt-5">{title}</h3>
              <p className="mt-2 text-sm text-ink/55 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-ink px-8 py-10 md:px-12 md:py-12 text-center">
          <p className="font-display italic text-xl md:text-2xl text-vodka">
            Wasted time. Operational chaos. Poor student experience. Slower
            growth.
          </p>
          <p className="mt-4 text-mist/50 text-sm">
            Your business has grown. Your systems should grow with it.
          </p>
        </div>
      </div>
    </section>
  );
}
