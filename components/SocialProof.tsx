import Eyebrow from "./Eyebrow";
import { Clock, MessageCircleOff, Sparkles } from "lucide-react";

// If you keep copy centrally in "@/data/content" like `audience` and
// `pillars`, move this array there and import it the same way, e.g.
// `import { savings } from "@/data/content"`.
const savings = [
  {
    icon: Clock,
    value: "3–5 hrs",
    label: "Saved every day",
    body: "No more manual reminders and payment tracking.",
    accent: "coral",
  },
  {
    icon: MessageCircleOff,
    value: "90%+",
    label: "Fewer support messages",
    body: "Students find recordings, payments, and updates themselves.",
    accent: "indigo",
  },
  {
    icon: Sparkles,
    value: "100%",
    label: "Professional experience",
    body: "Your own branded portal instead of WhatsApp + Drive.",
    accent: "emerald",
  },
] as const;

const cardGradient: Record<string, string> = {
  coral: "bg-gradient-to-b from-[#3a2016]/70 via-[#2a160f]/60 to-[#160b08]/70",
  indigo: "bg-gradient-to-b from-[#122845]/70 via-[#0d1c33]/60 to-[#070f1c]/70",
  emerald: "bg-gradient-to-b from-[#0f3324]/70 via-[#0a2419]/60 to-[#05120c]/70",
};

const glowColor: Record<string, string> = {
  coral: "bg-[#e05d2c]",
  indigo: "bg-[#2f6fd6]",
  emerald: "bg-[#1ea56b]",
};

const iconBg: Record<string, string> = {
  coral: "bg-[#e05d2c]/90",
  indigo: "bg-[#2f6fd6]/90",
  emerald: "bg-[#1ea56b]/90",
};

export default function ClientSavings() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 md:py-32 overflow-hidden">
      {/* ambient background glows, visible through the glass cards */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#e05d2c]/20 blur-[100px]" />
      <div className="pointer-events-none absolute top-40 right-1/4 h-72 w-72 rounded-full bg-[#2f6fd6]/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#1ea56b]/20 blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow>Real results, not promises</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl text-white text-balance">
            What Our Clients Usually Save
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {savings.map(({ icon: Icon, value, label, body, accent }) => (
            <div
              key={label}
              className={`group relative rounded-2xl p-8 md:p-10 text-center flex flex-col items-center
                backdrop-blur-xl border border-white/[0.12]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_32px_rgba(0,0,0,0.35)]
                transition-transform duration-300 hover:-translate-y-1 ${cardGradient[accent]}`}
            >
              {/* subtle top highlight sheen */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <span
                className={`h-11 w-11 rounded-xl flex items-center justify-center backdrop-blur-md ring-1 ring-white/20 ${iconBg[accent]}`}
              >
                <Icon className="h-5 w-5 text-white" />
              </span>
              <p className="mt-6 font-display text-4xl md:text-5xl text-white">
                {value}
              </p>
              <p className="mt-3 font-display text-base md:text-lg text-white">
                {label}
              </p>
              <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-[26ch]">
                {body}
              </p>

              {/* soft color glow anchored to this card's accent, sits behind the glass */}
              <div
                className={`pointer-events-none absolute -z-10 -bottom-6 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full opacity-20 blur-[60px] ${glowColor[accent]}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}