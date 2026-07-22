"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  UserPlus,
  Settings,
  LayoutDashboard,
  Video,
  CreditCard,
  BarChart3,
  Bell,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import Eyebrow from "./Eyebrow";
import { pipeline } from "@/data/content";

const COLS = 3;
const BULGE = 170; // outward push at row turns — must clear the widest
// rightmost-column text (see maxWidthRight below)
const CORNER_RADIUS = 52;

const DEFAULT_ICONS: LucideIcon[] = [
  UserPlus,
  Settings,
  LayoutDashboard,
  Video,
  CreditCard,
  BarChart3,
  Bell,
  CheckCircle2,
];

type Point = { x: number; y: number };
type PipelineItem = { title: string; body: string; icon?: LucideIcon };

function chunk<T>(arr: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < arr.length; i += size) rows.push(arr.slice(i, i + size));
  return rows;
}

function withBulges(points: Point[], rows: unknown[][], bulge: number): Point[] {
  const result: Point[] = [];
  let idx = 0;
  rows.forEach((row, rowIdx) => {
    for (let c = 0; c < row.length; c++) {
      result.push(points[idx]);
      idx++;
    }
    const isLastRow = rowIdx === rows.length - 1;
    if (!isLastRow) {
      const lastPoint = points[idx - 1];
      const nextPoint = points[idx];
      const dir = rowIdx % 2 === 0 ? 1 : -1;
      result.push({ x: lastPoint.x + dir * bulge, y: lastPoint.y });
      result.push({
        x: (nextPoint?.x ?? lastPoint.x) + dir * bulge,
        y: nextPoint?.y ?? lastPoint.y,
      });
    }
  });
  return result;
}

function roundedPath(points: Point[], radius = CORNER_RADIUS) {
  if (points.length < 2) return "";
  const d: string[] = [`M ${points[0].x} ${points[0].y}`];

  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    const v1 = { x: curr.x - prev.x, y: curr.y - prev.y };
    const v2 = { x: next.x - curr.x, y: next.y - curr.y };
    const len1 = Math.hypot(v1.x, v1.y) || 1;
    const len2 = Math.hypot(v2.x, v2.y) || 1;
    const r = Math.min(radius, len1 / 2, len2 / 2);

    const p1 = { x: curr.x - (v1.x / len1) * r, y: curr.y - (v1.y / len1) * r };
    const p2 = { x: curr.x + (v2.x / len2) * r, y: curr.y + (v2.y / len2) * r };

    d.push(`L ${p1.x} ${p1.y}`, `Q ${curr.x} ${curr.y} ${p2.x} ${p2.y}`);
  }

  const last = points[points.length - 1];
  d.push(`L ${last.x} ${last.y}`);
  return d.join(" ");
}

export default function EcosystemPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pathD, setPathD] = useState("");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  const rows = chunk(pipeline as PipelineItem[], COLS);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const containerRect = container.getBoundingClientRect();
      const points: Point[] = nodeRefs.current
        .filter((el): el is HTMLDivElement => !!el)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            x: r.left - containerRect.left + r.width / 2,
            y: r.top - containerRect.top + r.height / 2,
          };
        });
      if (points.length > 1) {
        setPathD(roundedPath(withBulges(points, rows, BULGE)));
      }
      setSvgSize({ width: containerRect.width, height: containerRect.height });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="ecosystem" className="bg-ink py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow dark>One powerful platform</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl text-cream text-balance">
            Your entire business, connected end to end.
          </h2>
          <p className="mt-6 text-mist/60 leading-relaxed">
            From the moment a student joins your program to the moment they
            complete their learning journey, every process is organized,
            automated, and easy to manage.
          </p>
        </div>

        {/* desktop: serpentine roadmap */}
        <div ref={containerRef} className="hidden md:block relative mt-24 mb-6">
          <svg
            className="absolute inset-0 pointer-events-none overflow-visible"
            width={svgSize.width}
            height={svgSize.height}
          >
            <defs>
              <linearGradient
                id="pipelineGradient"
                x1="0"
                y1="0"
                x2="0"
                y2={svgSize.height}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#7B4DB5" />
                <stop offset="55%" stopColor="#5D2E8C" />
                <stop offset="100%" stopColor="#3FA98A" />
              </linearGradient>
            </defs>

            {pathD && (
              <>
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#pipelineGradient)"
                  strokeWidth={26}
                  strokeLinecap="round"
                  opacity={0.15}
                  style={{ filter: "blur(10px)" }}
                />
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#pipelineGradient)"
                  strokeWidth={12}
                  strokeLinecap="round"
                />
                <path
                  d={pathD}
                  fill="none"
                  stroke="#F1E9FA"
                  strokeOpacity={0.5}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray="2 24"
                  className="pipeline-flow"
                />
              </>
            )}
          </svg>

          {pathD && (
            <>
              <span className="pipeline-comet" style={{ animationDelay: "0s" }} />
              <span className="pipeline-comet" style={{ animationDelay: "-1.3s" }} />
              <span className="pipeline-comet" style={{ animationDelay: "-2.6s" }} />
            </>
          )}

          <div className="flex flex-col gap-24">
            {rows.map((row, rowIndex) => {
              const isReversed = rowIndex % 2 === 1;
              const flatIndex = rowIndex * COLS;
              const isPartialRow = row.length < COLS;
              // For a short row (e.g. the trailing single-item row), offset
              // its starting grid column so it lands centered within the
              // same COLS-track grid every other row uses — e.g. a lone
              // item in a 3-col grid starts at column 2, putting it exactly
              // on the middle column's x-position (verified: middle column
              // center == midpoint of outer columns), not an approximation
              // via flexbox. This is what keeps the connector line's curve
              // landing precisely on the node instead of overshooting.
              const startCol = Math.floor((COLS - row.length) / 2);
              // Explicit reversal instead of CSS `direction: rtl` — guaranteed
              // to actually flip visual order, which is what the bulge math
              // (and therefore the "no overlap" guarantee) depends on.
              const renderedRow = isReversed ? [...row].reverse() : row;

              return (
                <div key={rowIndex} className="grid grid-cols-3 gap-8">
                  {renderedRow.map((step, physicalCol) => {
                    const originalCol = isReversed
                      ? row.length - 1 - physicalCol
                      : physicalCol;
                    const i = flatIndex + originalCol;
                    const Icon = step.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length];

                    // Only the rightmost physical column is ever the side a
                    // bulge travels toward (see explanation above the
                    // component) — cap its text width so it can never reach
                    // into the bulge's path, regardless of copy length.
                    const isRightmost = physicalCol === COLS - 1;

                    return (
                      <div
                        key={step.title}
                        style={{ gridColumnStart: startCol + physicalCol + 1 }}
                        className={
                          "relative flex flex-col gap-4" +
                          (isPartialRow
                            ? " items-center text-center"
                            : " items-start")
                        }
                      >
                        <div
                          ref={(el) => {
                            nodeRefs.current[i] = el;
                          }}
                          className="relative z-10 h-12 w-12 rounded-full bg-ink-soft border border-violet/50 flex items-center justify-center shrink-0 shadow-[0_0_0_6px_rgba(20,14,30,1)]"
                        >
                          <Icon className="h-5 w-5 text-lilac" strokeWidth={1.8} />
                        </div>
                        <div
                          className={
                            isPartialRow
                              ? "max-w-[220px] mx-auto"
                              : isRightmost
                                ? "max-w-[160px]"
                                : "max-w-[85%]"
                          }
                        >
                          <h3 className="font-display text-lg text-cream">
                            {step.title}
                          </h3>
                          <p className="mt-1.5 text-sm text-mist/55 leading-relaxed">
                            {step.body}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* mobile: simple vertical line, icons instead of numbers */}
        <div className="md:hidden mt-16 relative max-w-3xl">
          <div className="absolute left-[15px] top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-violet via-plum to-vodka/40 overflow-hidden">
            <div className="absolute inset-0 mobile-pipeline-flow" />
          </div>
          <span className="mobile-pipeline-comet" style={{ animationDelay: "0s" }} />
          <span className="mobile-pipeline-comet" style={{ animationDelay: "-1.3s" }} />
          <span className="mobile-pipeline-comet" style={{ animationDelay: "-2.6s" }} />
          <div className="space-y-10">
            {(pipeline as PipelineItem[]).map((step, i) => {
              const Icon = step.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length];
              return (
                <div key={step.title} className="relative pl-12">
                  <span className="absolute left-0 top-0.5 h-8 w-8 rounded-full bg-ink-soft border border-violet/50 flex items-center justify-center">
                    <Icon className="h-3.5 w-3.5 text-lilac" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-xl text-cream">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-mist/55 leading-relaxed max-w-lg">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-16 text-mist/50 text-sm max-w-md mx-auto md:mx-0 text-center md:text-left">
          No unnecessary switching. No disconnected systems. No operational
          confusion.{" "}
          <span className="text-cream/90">
            Just one platform built around your business.
          </span>
        </p>
      </div>

      <style jsx>{`
        @keyframes pipelineFlow {
          to {
            stroke-dashoffset: -104;
          }
        }
        .pipeline-flow {
          animation: pipelineFlow 3s linear infinite;
        }

        .pipeline-comet {
          position: absolute;
          top: 0;
          left: 0;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          background: radial-gradient(
            circle,
            #ffffff 0%,
            #f1e9fa 45%,
            transparent 75%
          );
          box-shadow: 0 0 18px 5px rgba(241, 233, 250, 0.75);
          offset-path: path("${pathD}");
          offset-rotate: 0deg;
          animation: cometMove 4s linear infinite;
        }
        @keyframes cometMove {
          from {
            offset-distance: 0%;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          to {
            offset-distance: 100%;
            opacity: 0;
          }
        }

        /* mobile: same dash-flow + comet treatment as desktop, adapted to a
           straight vertical line instead of an offset-path */
        .mobile-pipeline-flow {
          background: repeating-linear-gradient(
            to bottom,
            rgba(241, 233, 250, 0.5) 0px,
            rgba(241, 233, 250, 0.5) 2px,
            transparent 2px,
            transparent 26px
          );
          animation: mobilePipelineFlow 3s linear infinite;
        }
        @keyframes mobilePipelineFlow {
          to {
            transform: translateY(26px);
          }
        }

        .mobile-pipeline-comet {
          position: absolute;
          left: 9px;
          top: 0;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          background: radial-gradient(
            circle,
            #ffffff 0%,
            #f1e9fa 45%,
            transparent 75%
          );
          box-shadow: 0 0 18px 5px rgba(241, 233, 250, 0.75);
          animation: mobileCometMove 4s linear infinite;
        }
        @keyframes mobileCometMove {
          from {
            top: 0%;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          to {
            top: 100%;
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pipeline-flow,
          .pipeline-comet,
          .mobile-pipeline-flow,
          .mobile-pipeline-comet {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}