"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  LayoutDashboard,
  Settings,
  Users,
  TrendingUp,
  BarChart3,
  Image as ImageIcon,
  MessageCircle,
  FileSpreadsheet,
  HardDrive,
} from "lucide-react";
import TextType from "../Animation/TextType";
import LightPillar from "../Animation/LightPillar";
import excel from "../app/ICONS/excel.svg"
import googlesheet from "../app/ICONS/googlesheet.svg"
import whatsapp from "../app/ICONS/whatsapp.svg"
import drive from "../app/ICONS/googledrive.svg"

// Palette reference (from provided swatch):
// 01 Royal Purple    #2B1B3D
// 02 Deep Violet     #45225F
// 03 Amethyst Purple #5D2E8C
// 04 Lavender Dream  #7B4DB5
// 06 Lilac Mist      #B89ADC
// 07 Mauve Glow      #D6C1E8
// 09 Pastel Purple   #F1E9FA

// ---------------------------------------------------------------------------
// EDIT ME: rename tabs, and point `image` at your screenshots. Drop
// screenshots in /public/screenshots/ and update the paths. Until a real
// screenshot exists at that path, the panel shows a placeholder instead of a
// blank box, so it never looks broken during development.
// ---------------------------------------------------------------------------
const TABS = [
  {
    id: "website",
    label: "Website",
    icon: LayoutDashboard,
    accent: "#7B4DB5",
    image: "/screenshots/website.png",
  },
  {
    id: "admin",
    label: "Admin Panel",
    icon: Settings,
    accent: "#5D2E8C",
    image: "/screenshots/admin-panel.png",
  },
  {
    id: "user",
    label: "User Panel",
    icon: Users,
    accent: "#45225F",
    image: "/screenshots/user-panel.png",
  },
  {
    id: "progress",
    label: "Student Progress",
    icon: TrendingUp,
    accent: "#B89ADC",
    image: "/screenshots/student-progress.png",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    accent: "#D6C1E8",
    image: "/screenshots/analytics.png",
  },
];

// The scattered tools this platform replaces — shown in the pain-point bar.
// The scattered tools this platform replaces — shown in the pain-point bar.
const PAIN_POINTS = [
  { id: "whatsapp", label: "", src: whatsapp.src },
  { id: "excel", label: "", src: excel.src },
  { id: "googlesheet", label: "", src: googlesheet.src },
  { id: "drive", label: "", src: drive.src },
];

// How long each tab stays active before auto-advancing to the next one.
// Kept in one place so the pill bar's progress-bar animation duration
// (see .progress-bar below) can be matched to it exactly.
const AUTO_ADVANCE_MS = 4000;

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

  // Auto-advance timer. Kept in a ref (not state) so starting/restarting it
  // doesn't itself trigger a re-render, and so a manual click can cleanly
  // reset the countdown instead of fighting with the running interval.
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoAdvance = () => {
    if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    autoAdvanceRef.current = setInterval(() => {
      setActive((prev) => {
        const idx = TABS.findIndex((t) => t.id === prev);
        return TABS[(idx + 1) % TABS.length].id;
      });
    }, AUTO_ADVANCE_MS);
  };

  // Kick off auto-advance on mount; clean up on unmount.
  useEffect(() => {
    startAutoAdvance();
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setImgError(false);
  }, [active]);

  useEffect(() => {
    const el = tabRefs.current[activeIndex];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
      // Keep the active pill visible inside its own horizontally-scrolling
      // bar only — never scroll the page itself. Using scrollIntoView here
      // previously dragged the whole viewport back up to the hero section
      // every time auto-advance changed tabs, even if the person had
      // scrolled away to read another section.
      const container = el.parentElement;
      if (container) {
        const elLeft = el.offsetLeft;
        const elRight = elLeft + el.offsetWidth;
        const visibleLeft = container.scrollLeft;
        const visibleRight = visibleLeft + container.clientWidth;
        if (elLeft < visibleLeft) {
          container.scrollTo({ left: elLeft - 12, behavior: "smooth" });
        } else if (elRight > visibleRight) {
          container.scrollTo({
            left: elRight - container.clientWidth + 12,
            behavior: "smooth",
          });
        }
      }
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

  // Any manual interaction (click or arrow-key nav) resets the auto-advance
  // countdown, so the tab the person just picked gets its full dwell time
  // instead of jumping away a moment later.
  const selectTab = (index: number) => {
    const nextIndex = (index + TABS.length) % TABS.length;
    setActive(TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
    startAutoAdvance();
  };

  const selectTabManually = (id: string) => {
    setActive(id);
    startAutoAdvance();
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
    <section className="relative min-h-screen overflow-hidden bg-[#0a0612]">
      {/* light pillar background */}
      <div className="absolute inset-0 w-full h-full">
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-10 sm:pt-32 md:pt-40 pb-10 md:pb-14 text-center">
        {/* pain-point bar: the scattered tools this platform replaces */}
        <div
          className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-2 mb-6 sm:mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
        >
          <span
            className=" text-[15px] sm:text-[20px] tracking-[0.2em] uppercase mt-0"
            style={{ color: "rgba(241,233,250,0.6)" }}
          >
            Stop Managing Students On
          </span>
          <br />

          {PAIN_POINTS.map((point) => (
            <span
              key={point.id}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] sm:text-xs font-medium"
              style={{
                color: "#F1E9FA",
                backgroundColor: "rgba(255, 209, 209, 0.38)",
                border: "1px solid rgba(255, 61, 61, 0.38)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={point.src} alt="" className="h-5 w-5 shrink-0" />
              {point.label}
            </span>
          ))}
        </div>

        {/* primary headline — static, states the core promise up front */}
        {/* primary headline — static, states the core promise up front */}
        {/* primary headline — static, states the core promise up front */}
        <h1
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            color: "#F1E9FA",
            fontWeight: 600,
          }}
          className={`font-display mt-20 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] sm:leading-[1.05] text-balance transition-all duration-75 will-change-transform ${mounted ? "opacity-100" : "opacity-0"
            }`}
        >
          Automate Entire Coaching
          With One <br />
          <span className="relative inline-block text-3xl sm:text-3xl md:text-4xl lg:text-5xl align-middle ">
            MANAGMENT SYSTEM
            <svg
              className="absolute left-0 -bottom-1.5 sm:-bottom-2 w-full overflow-visible"
              height="16"
              viewBox="0 0 300 16"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 8 C 40 -2, 80 18, 120 8 C 160 -2, 200 18, 240 8 C 265 3, 285 12, 298 6"
                stroke="#B89ADC"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                pathLength="1"
                className={`headline-underline ${mounted ? "headline-underline--looping" : ""}`}
              />
            </svg>
          </span>
        </h1>


        {/* subheadline — the old animated headline, now supporting copy */}
        <div
          className={`mt-4 sm:mt-6 flex flex-col items-center justify-center transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
        >
          <span
            className="font-display text-lg sm:text-2xl md:text-3xl"
            style={{ color: "rgba(241,233,250,0.75)" }}
          >
            Turn your coaching business into a
          </span>
          {mounted && (
            <TextType
              as="span"
              className="font-display italic"
              style={{
                fontSize: "clamp(1.25rem, 4vw, 2.25rem)",
                lineHeight: 1.1,
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

        {/* single, higher-emphasis CTA */}
        <div
          className={`mt-8 flex justify-center transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
        >
          <a
            href="#consultation"

            className="group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 sm:px-10 sm:py-5 text-sm sm:text-base font-semibold text-[#F1E9FA] bg-gradient-to-r from-[#5D2E8C] to-[#7B4DB5] shadow-[0_10px_40px_rgba(93,46,140,0.55)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_50px_rgba(93,46,140,0.7)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89ADC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E1C2F]"
          >
            <span
              className="absolute inset-0 rounded-full pointer-events-none cta-pulse"
              style={{ backgroundColor: "#7B4DB5" }}
              aria-hidden="true"
            />
            <span className="relative">Book Your Free Consultation</span>
            <ArrowUpRight className="relative h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
        {/* Product tabs — auto-advancing carousel of headings, sits inside  */}
        {/* the hero section, under the CTA                                  */}
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
                    onClick={() => selectTabManually(tab.id)}
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

          {/* auto-advance progress indicator — restarts every time the
              active tab changes, whether by timer or by manual click */}
          <div
            className="mt-2.5 mx-auto h-0.5 w-full max-w-[220px] rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(184,154,220,0.15)" }}
          >
            <div
              key={activeTab.id + "-progress"}
              className="h-full progress-bar"
              style={{ backgroundColor: activeTab.accent }}
            />
          </div>

          {/* framed screenshot panel */}
          <div className="mt-6 sm:mt-8 relative">
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
          </div>
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

        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .progress-bar {
          width: 0%;
          animation: progressFill ${AUTO_ADVANCE_MS}ms linear;
        }

        @keyframes ctaPulse {
          0% {
            opacity: 0.35;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.25);
          }
        }
        .cta-pulse {
          animation: ctaPulse 2s ease-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .panel-in,
          .progress-bar,
          .cta-pulse {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}