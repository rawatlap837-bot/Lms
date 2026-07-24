"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import { Clock, TrendingDown, Sparkles } from "lucide-react";

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
    icon: TrendingDown,
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

const ringColor: Record<string, string> = {
  coral: "group-hover:ring-[#e05d2c]/40",
  indigo: "group-hover:ring-[#2f6fd6]/40",
  emerald: "group-hover:ring-[#1ea56b]/40",
};

/* ------------------------------ scroll reveal ----------------------------- */
/**
 * Fades + lifts an element into place the first time it enters the viewport.
 * Fires once, respects prefers-reduced-motion, supports a stagger delay.
 */
function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setVisible(true), delay);
          observer.unobserve(node);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(delay);
  return (
    <div
      ref={ref}
      className={[
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

/* ------------------------------- component ------------------------------- */

export default function ClientSavings() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 md:py-32 overflow-hidden">
      {/* ambient background glows, visible through the glass cards */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#e05d2c]/20 blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute top-40 right-1/4 h-72 w-72 rounded-full bg-[#2f6fd6]/20 blur-[100px] animate-[pulse_9s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#1ea56b]/20 blur-[100px] animate-[pulse_10s_ease-in-out_infinite]" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow>Real results, not promises</Eyebrow>
            <h2 className="font-display text-3xl md:text-5xl text-white text-balance">
              What Our Clients Usually Save
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {savings.map(({ icon: Icon, value, label, body, accent }, i) => (
            <Reveal key={label} delay={i * 130}>
              <div
                className={`group relative h-full rounded-2xl p-8 md:p-10 text-center flex flex-col items-center
                  backdrop-blur-xl border border-white/[0.12]
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_32px_rgba(0,0,0,0.35)]
                  transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 ${cardGradient[accent]}`}
              >
                {/* subtle top highlight sheen */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <span
                  className={`h-11 w-11 rounded-xl flex items-center justify-center backdrop-blur-md ring-1 ring-white/20 transition-all duration-300 group-hover:scale-110 ${ringColor[accent]} ${iconBg[accent]}`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </span>
                <p className="mt-6 font-display font-bold text-4xl md:text-5xl text-white tracking-tight">
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
                  className={`pointer-events-none absolute -z-10 -bottom-6 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full opacity-20 blur-[60px] transition-opacity duration-300 group-hover:opacity-35 ${glowColor[accent]}`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}