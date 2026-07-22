"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  LayoutDashboard,
  Users,
  Video,
  BarChart3,
  Check,
  Image as ImageIcon,
} from "lucide-react";
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
// Until a real screenshot exists at that path, the panel shows a placeholder
// instead of a blank box, so it never looks broken during development.
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
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [active]);

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

  const selectTab = (index: number) => {
    const nextIndex = (index + TABS.length) % TABS.length;
    setActive(TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      selectTab(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      selectTab(index - 1);
    }
  };

  return (
    <section
      className="relative overflow-hidden min-h-screen"
      style={{ backgroundColor: "#1E1C2F" }}
    >
      {/* light pillar background */}
      <div className="h-full">
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.003}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.01}
          pillarRotation={50}
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
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #1E1C2F)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-24 sm:pt-32 md:pt-40 pb-10 md:pb-14 text-center">
        <div
          className="font-mono text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-5"
          style={{ color: "#F1E9FA" }}
        >
          Custom LMS Development
        </div>

        <h1
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            color: "#F1E9FA",
          }}
          className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] sm:leading-[1.05] text-balance transition-all duration-75 will-change-transform ${mounted ? "opacity-100" : "opacity-0"
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
              className="!mt-1 sm:!mt-2 font-display italic"
              style={{
                fontSize: "clamp(2rem, 9vw, 5.5rem)",
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
          className={`mt-7 sm:mt-10 text-xs sm:text-base tracking-wide uppercase font-mono transition-all duration-700 delay-150 px-2 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          style={{ color: "white" }}
        >
          One Platform{" "}
          <span style={{ color: "rgba(184,154,220,0.4)" }} className="mx-1 sm:mx-2">|</span>{" "}
          Complete Control{" "}
          <span style={{ color: "rgba(184,154,220,0.4)" }} className="mx-1 sm:mx-2">|</span>{" "}
          Built Around Your Business
        </p>

        <div
          className={`mt-6 max-w-md sm:max-w-2xl mx-auto transition-all duration-700 delay-200 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
        >
          <a
            href="#consultation"
            className="group inline-flex items-center justify-center gap-2 rounded-full w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 text-sm font-semibold text-[#F1E9FA] bg-[#5D2E8C] shadow-[0_8px_30px_rgba(93,46,140,0.45)] transition-all duration-200 hover:bg-[#6a35a1] hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(93,46,140,0.55)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89ADC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E1C2F]"
          >
            Book Your Free Consultation
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#ecosystem"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.4)] w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 text-sm font-semibold text-[rgba(241,233,250,0.9)] transition-all duration-200 hover:border-[rgba(184,154,220,0.7)] hover:bg-[rgba(184,154,220,0.08)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89ADC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E1C2F]"
          >
            See How It Works
          </a>
        </div>

        <p
          className={`mt-5 font-display italic text-xs sm:text-sm transition-all duration-700 delay-500 ${mounted ? "opacity-100" : "opacity-0"
            }`}
          style={{ color: "rgba(227, 227, 227, 0.8)" }}
        >
          Custom-built for your workflow. Designed for your growth.
        </p>

        {/* ---------------------------------------------------------------- */}
        {/* Product tabs — sits inside the hero section, under the CTAs     */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-5 md:mt-5">
          {/* tab pills with sliding indicator — horizontally scrollable on mobile */}
          <div className="flex justify-center">
            <div
              role="tablist"
              aria-label="Platform features"
              className="no-scrollbar relative inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full p-1.5"
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
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(tab.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, i)}
                    className="relative z-10 flex shrink-0 items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-full px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={
                      {
                        color: isActive ? "#F1E9FA" : "rgba(184,154,220,0.65)",
                        "--tw-ring-color": activeTab.accent,
                        "--tw-ring-offset-color": "#1E1C2F",
                      } as React.CSSProperties
                    }
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* framed screenshot panel */}
          <div className="mt-8 sm:mt-10 relative">
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl opacity-50 pointer-events-none transition-colors duration-500"
              style={{
                background: `radial-gradient(60% 60% at 50% 40%, ${activeTab.accent}59 0%, ${activeTab.accent}00 75%)`,
              }}
            />
            <div
              role="tabpanel"
              id={`panel-${activeTab.id}`}
              aria-labelledby={`tab-${activeTab.id}`}
              className="relative rounded-2xl overflow-hidden transition-colors duration-500 text-left"
              style={{
                border: `1px solid ${activeTab.accent}40`,
                backgroundColor: "#241934",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              }}
            >
              {/* window chrome */}
              <div
                className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3"
                style={{ borderBottom: "1px solid rgba(184,154,220,0.1)" }}
              >
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full shrink-0" style={{ backgroundColor: "#7B4DB5" }} />
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full shrink-0" style={{ backgroundColor: "#5D2E8C" }} />
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full shrink-0" style={{ backgroundColor: "#45225F" }} />
                <span
                  className="ml-2 sm:ml-3 text-[10px] sm:text-xs font-mono truncate"
                  style={{ color: "rgba(184,154,220,0.5)" }}
                >
                  yourlms.com/{activeTab.id}
                </span>
              </div>

              {/* screenshot, scale+fade on tab change, with a placeholder if missing */}
              <div key={activeTab.id} className="relative aspect-[16/9] panel-in">
                {imgError ? (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-3 px-6 text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(93,46,140,0.15), rgba(43,27,61,0.4))",
                    }}
                  >
                    <ImageIcon
                      className="h-7 w-7 sm:h-8 sm:w-8"
                      style={{ color: "rgba(184,154,220,0.4)" }}
                    />
                    <span
                      className="text-[10px] sm:text-xs font-mono"
                      style={{ color: "rgba(184,154,220,0.45)" }}
                    >
                      Add your screenshot at {activeTab.image}
                    </span>
                  </div>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={activeTab.image}
                    alt={activeTab.label}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* feature highlights */}
            <div
              key={activeTab.id + "-highlights"}
              className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 panel-in text-left"
            >
              {activeTab.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-2 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm"
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
            className="mt-5 sm:mt-6 text-center text-xs sm:text-base px-4 panel-in"
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
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
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