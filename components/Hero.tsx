"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, LayoutDashboard, Users, Video, BarChart3, Check } from "lucide-react";
import TextType from "../Animation/TextType";
import LightPillar from "../Animation/LightPillar";

// Palette reference (from provided swatch):
// 01 Royal Purple    #2B1B3D
// 02 Deep Violet     #45225F
// 03 Amethyst Purple #5D2E8C
// 04 Lavender Dream  #7B4DB5
// 06 Lilac Mist      #B89ADC
// 07 Mauve Glow      #D6C1E8
// 09 Pastel Purple   #F1E9FA

// ---------------------------------------------------------------------------
// EDIT ME: rename tabs, swap captions/highlights, and point `image` at your
// screenshots. Drop screenshots in /public/screenshots/ and update the paths.
// `accent` tints that tab's pill glow, panel border, and bullet checks.
// ---------------------------------------------------------------------------
const TABS = [
  {
    id: "builder",
    label: "Course Builder",
    icon: LayoutDashboard,
    accent: "#7B4DB5",
    caption: "Drag, drop, and structure lessons without touching code.",
    highlights: [
      "Reorder modules with drag-and-drop",
      "Drip content on a schedule",
      "Preview as a student, instantly",
    ],
    image: "/screenshots/course-builder.png",
  },
  {
    id: "students",
    label: "Student Progress",
    icon: Users,
    accent: "#5D2E8C",
    caption: "See exactly who's stuck, who's thriving, and why.",
    highlights: [
      "Per-student completion tracking",
      "Flag at-risk learners automatically",
      "Export progress reports in one click",
    ],
    image: "/screenshots/student-progress.png",
  },
  {
    id: "live",
    label: "Live Classes",
    icon: Video,
    accent: "#45225F",
    caption: "Host cohort calls and replays inside your own platform.",
    highlights: [
      "Built-in scheduling and reminders",
      "Auto-recorded replays for every session",
      "No Zoom links or third-party logins",
    ],
    image: "/screenshots/live-classes.png",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    accent: "#B89ADC",
    caption: "Revenue, completion, and engagement — one dashboard.",
    highlights: [
      "Revenue by course and cohort",
      "Engagement trends over time",
      "One view, no spreadsheet exports",
    ],
    image: "/screenshots/analytics.png",
  },
];

export default function Hero() {
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const maxScroll = 500;
    const maxScale = 1.15;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / maxScroll, 1);
        setScale(1 + progress * (maxScale - 1));
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- tabs state ---
  const [active, setActive] = useState(TABS[0].id);
  const activeIndex = TABS.findIndex((t) => t.id === active);
  const activeTab = TABS[activeIndex];

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[activeIndex];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleResize = () => {
      const el = tabRefs.current[activeIndex];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#1E1C2F" }}
    >
      {/* light pillar background */}
      <div className="absolute inset-0">
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="screen"
          quality="high"
        />
      </div>

      {/* mesh glow layers for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(55% 45% at 22% 15%, rgba(62,8,102,0.35) 0%, rgba(62,8,102,0) 70%), radial-gradient(50% 40% at 82% 75%, rgba(80,26,94,0.30) 0%, rgba(80,26,94,0) 70%), radial-gradient(70% 55% at 50% 0%, rgba(62,8,102,0.18) 0%, rgba(62,8,102,0) 70%)",
        }}
      />

      {/* fine grain texture for a premium, non-flat surface */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* fade to next section's background at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #1E1C2F)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-0 md:pt-40 md:pb-0 text-center">
        {mounted && (
          <TextType
            as="p"
            className="font-mono text-xs tracking-[0.3em] uppercase mb-8"
            text={[
              "Custom LMS Development",
              "Built For Course Creators",
              "Scalable. Branded. Yours.",
            ]}
            typingSpeed={55}
            deletingSpeed={30}
            pauseDuration={1800}
            loop
            showCursor
            cursorCharacter="_"
            cursorBlinkDuration={0.5}
            style={{ color: "#B89ADC" }}
          />
        )}

        <h1
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            color: "#F1E9FA",
          }}
          className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-7xl leading-[1.05] text-balance transition-all duration-75 will-change-transform ${mounted ? "opacity-100" : "opacity-0"
            }`}
        >
          Turn Your Learning Business
          <br />
          Into A
        </h1>

        <div className="w-full flex justify-center">
          {mounted && (
            <TextType
              as="div"
              className="!mt-2 font-display italic"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                lineHeight: 1.05,
                fontWeight: 700,
              }}
              textColors={["#D6C1E8"]}
              text={["Scalable Platform", "Powerful Ecosystem", "Growth Engine"]}
              typingSpeed={65}
              deletingSpeed={35}
              pauseDuration={1800}
              loop
              showCursor
              cursorCharacter="|"
              cursorBlinkDuration={0.5}
              cursorClassName="text-[#D6C1E8]"
            />
          )}
        </div>

        <p
          className={`mt-10 text-sm md:text-base tracking-wide uppercase font-mono transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          style={{ color: "rgba(184,154,220,0.6)" }}
        >
          One Platform{" "}
          <span style={{ color: "rgba(184,154,220,0.4)" }} className="mx-2">|</span>{" "}
          Complete Control{" "}
          <span style={{ color: "rgba(184,154,220,0.4)" }} className="mx-2">|</span>{" "}
          Built Around Your Business
        </p>

        <div
          className={`mt-6 text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 flex gap-4 justify-center ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
        >
          <a
            href="#consultation"
            className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "#5D2E8C",
              color: "#F1E9FA",
              boxShadow: "0 8px 30px rgba(93,46,140,0.45)",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "#6a35a1" }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "#5D2E8C" }}
          >
            Book Your Free Consultation
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#ecosystem"
            className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: "rgba(184,154,220,0.25)",
              color: "rgba(241,233,250,0.9)",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(184,154,220,0.5)" }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(184,154,220,0.25)" }}
          >
            See How It Works
          </a>
        </div>

        <p
          className={`mt-10 font-display italic text-sm transition-all duration-700 delay-500 ${mounted ? "opacity-100" : "opacity-0"
            }`}
          style={{ color: "rgba(184,154,220,0.7)" }}
        >
          Custom-built for your workflow. Designed for your growth.
        </p>

        {/* ---------------------------------------------------------------- */}
        {/* Product tabs — sits inside the hero section, under the CTAs     */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-24 md:mt-28">
          {/* tab pills with sliding indicator */}
          <div className="flex justify-center">
            <div
              className="relative inline-flex flex-wrap justify-center gap-1 rounded-full p-1.5"
              style={{
                backgroundColor: "rgba(43,27,61,0.6)",
                border: "1px solid rgba(184,154,220,0.15)",
              }}
            >
              {/* sliding highlight */}
              <span
                className="absolute top-1.5 bottom-1.5 rounded-full transition-all duration-300 ease-out"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  backgroundColor: activeTab.accent,
                  boxShadow: `0 4px 20px ${activeTab.accent}66`,
                }}
              />
              {TABS.map((tab, i) => {
                const Icon = tab.icon;
                const isActive = tab.id === active;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    onClick={() => setActive(tab.id)}
                    className="relative z-10 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300"
                    style={{
                      color: isActive ? "#F1E9FA" : "rgba(184,154,220,0.65)",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* framed screenshot panel */}
          <div className="mt-10 relative">
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl opacity-50 pointer-events-none transition-colors duration-500"
              style={{
                background: `radial-gradient(60% 60% at 50% 40%, ${activeTab.accent}59 0%, ${activeTab.accent}00 75%)`,
              }}
            />
            <div
              className="relative rounded-2xl overflow-hidden transition-colors duration-500 text-left"
              style={{
                border: `1px solid ${activeTab.accent}40`,
                backgroundColor: "#241934",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              }}
            >
              {/* window chrome */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: "1px solid rgba(184,154,220,0.1)" }}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#7B4DB5" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#5D2E8C" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#45225F" }} />
                <span className="ml-3 text-xs font-mono" style={{ color: "rgba(184,154,220,0.5)" }}>
                  yourlms.com/{activeTab.id}
                </span>
              </div>

              {/* screenshot, scale+fade on tab change */}
              <div key={activeTab.id} className="relative aspect-[16/9] panel-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeTab.image}
                  alt={activeTab.label}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* feature highlights */}
            <div
              key={activeTab.id + "-highlights"}
              className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 panel-in text-left"
            >
              {activeTab.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-2 rounded-xl px-4 py-3 text-sm"
                  style={{
                    backgroundColor: "rgba(43,27,61,0.5)",
                    border: "1px solid rgba(184,154,220,0.1)",
                    color: "rgba(241,233,250,0.85)",
                  }}
                >
                  <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: activeTab.accent }} />
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* caption */}
          <p
            key={activeTab.id + "-caption"}
            className="mt-6 text-center text-sm md:text-base panel-in"
            style={{ color: "rgba(184,154,220,0.7)" }}
          >
            {activeTab.caption}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes panelIn {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .panel-in {
          animation: panelIn 0.35s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .panel-in {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}