"use client";

import {
  Users,
  CreditCard,
  BellRing,
  PlayCircle,
  BarChart3,
  Palette,
  Play,
  Check,
  Wallet,
  Globe,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/* ------------------------------ scroll reveal ----------------------------- */
/**
 * Fades + lifts an element into place the first time it enters the viewport.
 * - Fires once (unobserves after reveal) so re-scrolling doesn't replay it.
 * - `delay` (ms) lets siblings stagger in rather than popping together.
 * - Respects prefers-reduced-motion by skipping the animation entirely.
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

/* ----------------------------- shared shell ----------------------------- */

function Card({
  span,
  dark,
  children,
}: {
  span?: "1" | "2" | "3";
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={[
        "rounded-3xl p-7 md:p-8 transition-all duration-300",
        span === "2" ? "md:col-span-2" : span === "3" ? "md:col-span-3" : "",
        dark
          ? "bg-ink border border-ink"
          : "bg-white border border-ink/10 hover:border-vodka hover:-translate-y-1 hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.18)]",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function Badge({
  icon: Icon,
  tone,
}: {
  icon: typeof Users;
  tone: "indigo" | "vodka" | "mist" | "cream";
}) {
  const tones: Record<string, string> = {
    indigo: "bg-indigo/10 text-indigo",
    vodka: "bg-vodka/25 text-ink",
    mist: "bg-mist/20 text-ink",
    cream: "bg-cream text-ink",
  };
  return (
    <div
      className={`h-11 w-11 rounded-2xl flex items-center justify-center ${tones[tone]}`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.8} />
    </div>
  );
}

function MockFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl bg-mist/10 border border-ink/5 p-4 overflow-hidden">
      {children}
    </div>
  );
}

/* --------------------------------- mocks --------------------------------- */

function StudentMock() {
  const rows = [
    { name: "Aarav Mehta", batch: "Batch 04", pct: 82 },
    { name: "Isha Kapoor", batch: "Batch 02", pct: 64 },
    { name: "Rohan Shah", batch: "Batch 04", pct: 95 },
  ];
  return (
    <div className="space-y-2.5">
      {rows.map((r) => (
        <div
          key={r.name}
          className="flex items-center gap-3 bg-white rounded-xl border border-ink/5 px-3 py-2"
        >
          <div className="h-7 w-7 rounded-full bg-indigo/15 text-indigo font-display text-xs flex items-center justify-center">
            {r.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-ink truncate">{r.name}</p>
            <p className="text-[10px] text-ink/45">{r.batch}</p>
          </div>
          <div className="w-14 h-1.5 rounded-full bg-mist/30 overflow-hidden">
            <div
              className="h-full bg-vodka rounded-full"
              style={{ width: `${r.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CourseMock() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {["04:12", "07:48", "03:05"].map((t) => (
        <div
          key={t}
          className="aspect-square rounded-xl bg-ink/95 relative flex items-center justify-center"
        >
          <div className="h-7 w-7 rounded-full bg-white/15 flex items-center justify-center">
            <Play className="h-3 w-3 text-cream fill-cream" />
          </div>
          <span className="absolute bottom-1.5 right-1.5 text-[9px] text-cream/70 font-mono">
            {t}
          </span>
        </div>
      ))}
    </div>
  );
}

function PaymentMock() {
  return (
    <div className="bg-white rounded-xl border border-ink/5 p-3.5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-ink/50">Invoice #INV-0842</p>
        <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5">
          Paid
        </span>
      </div>
      <p className="font-display text-xl text-ink mt-1.5">₹12,500.00</p>
      <div className="flex items-center gap-1.5 mt-3">
        <Wallet className="h-3.5 w-3.5 text-ink/40" strokeWidth={1.8} />
        <span className="text-[10px] text-ink/45">
          UPI · auto-confirmation sent
        </span>
      </div>
    </div>
  );
}

function ReminderMock() {
  return (
    <div className="space-y-2">
      {[
        { title: "Fee due in 3 days", sub: "Batch 04 · ₹4,000 pending" },
        { title: "Class starts in 10 min", sub: "Live · Advanced Grammar" },
      ].map((n) => (
        <div
          key={n.title}
          className="flex items-start gap-2.5 bg-white rounded-xl border border-ink/5 px-3 py-2.5"
        >
          <div className="h-6 w-6 rounded-full bg-vodka/25 flex items-center justify-center shrink-0 mt-0.5">
            <BellRing className="h-3 w-3 text-ink" strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-medium text-ink">{n.title}</p>
            <p className="text-[10px] text-ink/45">{n.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BrandMock() {
  return (
    <div>
      <div className="flex items-center gap-2">
        {[Palette, Globe, Check].map((Icon, i) => (
          <div
            key={i}
            className="h-9 w-9 rounded-xl bg-white border border-ink/5 flex items-center justify-center"
          >
            <Icon className="h-4 w-4 text-ink/60" strokeWidth={1.8} />
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-white border border-ink/5 overflow-hidden">
        <div className="h-7 bg-indigo/90 flex items-center px-3 gap-1.5">
          <div className="h-2 w-2 rounded-full bg-white/40" />
          <span className="text-[10px] text-white/80 font-mono">
            learn.yourinstitute.com
          </span>
        </div>
        <div className="p-3 space-y-1.5">
          <div className="h-2 w-2/3 rounded-full bg-mist/30" />
          <div className="h-2 w-1/2 rounded-full bg-mist/20" />
        </div>
      </div>
    </div>
  );
}

function AnalyticsMock() {
  const bars = [40, 65, 50, 80, 60, 95, 70];
  return (
    <div className="flex items-end gap-2 h-24">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-md bg-vodka/80"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

/* ------------------------------- component ------------------------------- */

export default function Features() {
  return (
    <section className="bg-[#241132] py-10 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4 text-vodka/80">
              Everything under one roof
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-cream text-balance">
              Everything you need to run your institute in one place
            </h2>
            <p className="mt-6 text-cream/65 leading-relaxed">
              No more juggling spreadsheets, payment links, and three
              different apps.{" "}
              <span className="font-display italic text-cream">
                One dashboard runs the whole operation.
              </span>
            </p>
          </div>
        </Reveal>

        {/* Row 1 — three equal mockup cards */}
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          <Reveal delay={0}>
            <Card>
              <Badge icon={Users} tone="indigo" />
              <h3 className="font-display text-lg text-ink mt-5">
                Student Management
              </h3>
              <p className="mt-2 text-sm text-ink/55 leading-relaxed">
                Add students, organize batches, and track progress with
                complete records kept automatically.
              </p>
              <MockFrame>
                <StudentMock />
              </MockFrame>
            </Card>
          </Reveal>

          <Reveal delay={120}>
            <Card>
              <Badge icon={PlayCircle} tone="vodka" />
              <h3 className="font-display text-lg text-ink mt-5">
                Course Hosting
              </h3>
              <p className="mt-2 text-sm text-ink/55 leading-relaxed">
                Upload videos, PDFs, assignments, and tests into a secure
                student portal.
              </p>
              <MockFrame>
                <CourseMock />
              </MockFrame>
            </Card>
          </Reveal>

          <Reveal delay={240}>
            <Card>
              <Badge icon={CreditCard} tone="mist" />
              <h3 className="font-display text-lg text-ink mt-5">
                Payment Collection
              </h3>
              <p className="mt-2 text-sm text-ink/55 leading-relaxed">
                Accept fees online and send automatic invoices and payment
                confirmations.
              </p>
              <MockFrame>
                <PaymentMock />
              </MockFrame>
            </Card>
          </Reveal>
        </div>

        {/* Row 2 — half card + wide card */}
        <div className="mt-5 grid md:grid-cols-3 gap-5">
          <Reveal delay={0}>
            <Card>
              <Badge icon={BellRing} tone="vodka" />
              <h3 className="font-display text-lg text-ink mt-5">
                Auto Reminders
              </h3>
              <p className="mt-2 text-sm text-ink/55 leading-relaxed">
                Fee due reminders, class notifications, and renewal alerts
                sent automatically.
              </p>
              <MockFrame>
                <ReminderMock />
              </MockFrame>
            </Card>
          </Reveal>

          <Reveal delay={120} className="md:col-span-2">
            <Card span="2">
              <Badge icon={Palette} tone="indigo" />
              <h3 className="font-display text-lg text-ink mt-5">
                Branded Experience
              </h3>
              <p className="mt-2 text-sm text-ink/55 leading-relaxed max-w-md">
                Your logo, your colors, your domain — a professional
                dashboard your students recognize as yours.
              </p>
              <MockFrame>
                <BrandMock />
              </MockFrame>
            </Card>
          </Reveal>
        </div>

        {/* Row 3 — dark analytics card, full width */}
        <div className="mt-5">
          <Reveal>
            <Card dark span="3">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge icon={BarChart3} tone="cream" />
                  <h3 className="font-display text-lg text-cream mt-5">
                    Reports &amp; Analytics
                  </h3>
                  <p className="mt-2 text-sm text-mist/55 leading-relaxed max-w-sm">
                    Track revenue, active students, pending payments, and
                    course engagement — instantly, in one view.
                  </p>
                </div>
                <AnalyticsMock />
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}