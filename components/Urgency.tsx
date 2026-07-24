"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { MessageCircle, FolderOpen, Table2, Plus } from "lucide-react";
import Eyebrow from "./Eyebrow";

const tools = [
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: FolderOpen, label: "Google Drive" },
  { icon: Table2, label: "Excel" },
];

/* ------------------------------ scroll reveal ----------------------------- */
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

export default function ScalingProblem() {
  return (
    <section className="bg-ink py-10 md:py-32">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <Eyebrow dark>The cost of staying manual</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl text-cream text-balance">
            Still using WhatsApp + Google Drive + Excel?
          </h2>
        </Reveal>

        {/* the "outdated stack" row */}
        <Reveal delay={120} className="mt-10 flex items-center justify-center gap-3 md:gap-4 flex-wrap">
          {tools.map(({ icon: Icon, label }, i) => (
            <span key={label} className="flex items-center gap-3 md:gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                <Icon className="h-4 w-4" strokeWidth={1.8} />
                {label}
              </span>
              {i < tools.length - 1 && (
                <Plus className="h-4 w-4 text-mist/25" strokeWidth={2} />
              )}
            </span>
          ))}
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-10 text-mist/60 leading-relaxed max-w-xl mx-auto">
            Every new student adds more manual work, more follow-ups, and more
            chances of missed payments.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-4 font-display text-xl md:text-2xl text-cream leading-snug max-w-2xl mx-auto text-balance">
            The earlier you automate, the easier it becomes to scale your
            institute{" "}
            <span className="text-plum">without hiring extra admin staff.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}