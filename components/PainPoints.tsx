"use client";

import {
  Table2,
  FileSpreadsheet,
  CreditCard,
  UserCheck,
  MessageCircle,
  Repeat,
  Video,
  FolderX,
  HelpCircle,
  AlertCircle,
  XCircle,
  UserX,
  Clock,
  FileWarning,
  User,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useFormModal } from "./FormModalContext";

// If you keep copy centrally in "@/data/content" like `services` and
// `pillars`, move this array there and import it the same way, e.g.
// `import { painPoints } from "@/data/content"`.
const painPoints = [
  {
    icons: [Table2, FileSpreadsheet],
    title: "Managing students on Excel/Google Sheets",
    body: "Tracking admissions, fees, and attendance manually.",
    tag: "Manual tracking",
    accent: "mint",
  },
  {
    icons: [CreditCard, UserCheck],
    title: "Collecting payments one-by-one",
    body: "Following up with every student personally.",
    tag: "No automation",
    accent: "sky",
  },
  {
    icons: [MessageCircle, Repeat],
    title: "Sending reminders on WhatsApp",
    body: "Typing the same fee and class reminders repeatedly.",
    tag: "Repetitive",
    accent: "lavender",
  },
  {
    icons: [Video, FolderX],
    title: "Sharing videos through Google Drive",
    body: "Links get forwarded, expire, or become disorganized.",
    tag: "Disorganized",
    accent: "amber",
  },
  {
    icons: [HelpCircle, AlertCircle],
    title: "Answering the same student questions repeatedly",
    body: `"Where is the recording?", "Did my payment go through?", "When is the next class?"`,
    tag: "Time drain",
    accent: "teal",
  },
] as const;

const results = [
  { icon: XCircle, label: "Missed payments" },
  { icon: UserX, label: "Confused students" },
  { icon: Clock, label: "Lost time" },
  { icon: FileWarning, label: "No proper records" },
  { icon: User, label: "Business depends completely on you" },
] as const;

const cardBg: Record<string, string> = {
  mint: "from-[#cdead4]/80 to-[#a9d9b8]/70",
  sky: "from-[#cce0f0]/80 to-[#a3c6e4]/70",
  lavender: "from-[#ddd0ef]/80 to-[#c0a3e0]/70",
  amber: "from-[#f2ddac]/80 to-[#e6bd6e]/70",
  teal: "from-[#c5e9dd]/80 to-[#9adcc6]/70",
};

const glowColor: Record<string, string> = {
  mint: "bg-[#7bc99a]",
  sky: "bg-[#7aa8d6]",
  lavender: "bg-[#a98ad6]",
  amber: "bg-[#e0b25c]",
  teal: "bg-[#5cc7ac]",
};

// Stagger timing: each card/item waits `i * 0.12s` before starting,
// so they cascade in left-to-right, row by row.
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function TheProblem() {
  const { open } = useFormModal();

  return (
    <section className="relative bg-white py-10 md:py-30 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#7bc99a]/15 blur-[100px]" />
      <div className="pointer-events-none absolute top-40 right-1/4 h-72 w-72 rounded-full bg-[#a98ad6]/15 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#e0b25c]/15 blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <span
            className="text-sm px-4 py-1.5 rounded-full text-white"
            style={{ background: "linear-gradient(to right, #5D2E8C, #7B4DB5)" }}
          >
            The Problem
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-center font-display text-3xl md:text-5xl text-ink max-w-3xl mx-auto"
        >
          Still Doing These Tasks Manually Every Day?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-center text-ink/50 max-w-xl mx-auto"
        >
          Most coaches and institutes waste 2–5 hours daily on repetitive
          work.
        </motion.p>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {painPoints.map(({ icons, title, body, tag, accent }, i) => {
            const [IconA, IconB] = icons;
            return (
              <motion.div
                key={title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className={`group relative rounded-3xl p-6 md:p-7
                  bg-gradient-to-br ${cardBg[accent]}
                  backdrop-blur-xl border border-ink/[0.08]
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_32px_rgba(0,0,0,0.08)]
                  transition-transform duration-300 hover:-translate-y-1`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-white/70 to-transparent" />

                <div className="flex items-center gap-2">
                  <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/70 backdrop-blur-md ring-1 ring-white/60">
                    <IconA className="h-5 w-5 text-ink/70" strokeWidth={1.8} />
                  </span>
                  <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/70 backdrop-blur-md ring-1 ring-white/60">
                    <IconB className="h-5 w-5 text-ink/70" strokeWidth={1.8} />
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl md:text-2xl text-ink leading-snug max-w-[28ch]">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-ink/60 leading-relaxed max-w-[32ch]">
                  {body}
                </p>

                <span className="mt-8 inline-flex items-center rounded-full bg-white/70 backdrop-blur-md px-3 py-1 text-xs font-medium text-ink/70 ring-1 ring-white/60">
                  {tag}
                </span>

                <div
                  className={`pointer-events-none absolute -z-10 -bottom-6 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full opacity-20 blur-[60px] ${glowColor[accent]}`}
                />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={open}
            className="group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 sm:px-10 sm:py-5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#5D2E8C] to-[#7B4DB5] shadow-[0_10px_40px_rgba(93,46,140,0.35)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_50px_rgba(93,46,140,0.5)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4DB5] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <span
              className="absolute inset-0 rounded-full pointer-events-none cta-pulse"
              style={{ backgroundColor: "#7B4DB5" }}
              aria-hidden="true"
            />
            <span className="relative">Book Your Free Consultation</span>
            <ArrowUpRight className="relative h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>

      <style jsx>{`
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
          .cta-pulse {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}