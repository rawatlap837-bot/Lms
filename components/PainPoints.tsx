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
} from "lucide-react";

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
  mint: "from-[#e3f3e6]/60 to-[#cfe9d8]/50",
  sky: "from-[#e2edf6]/60 to-[#cfe0ee]/50",
  lavender: "from-[#ece4f6]/60 to-[#ddd1ee]/50",
  amber: "from-[#f7ecd9]/60 to-[#f0dcb8]/50",
  teal: "from-[#e0f2ec]/60 to-[#c9e8dd]/50",
};

const glowColor: Record<string, string> = {
  mint: "bg-[#7bc99a]",
  sky: "bg-[#7aa8d6]",
  lavender: "bg-[#a98ad6]",
  amber: "bg-[#e0b25c]",
  teal: "bg-[#5cc7ac]",
};

export default function TheProblem() {
  return (
    <section className="relative bg-[#0e0e12] py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#7bc99a]/20 blur-[100px]" />
      <div className="pointer-events-none absolute top-40 right-1/4 h-72 w-72 rounded-full bg-[#a98ad6]/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#e0b25c]/20 blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex justify-center">
          <span className="text-sm px-4 py-1.5 rounded-full bg-white text-ink">
            The Problem
          </span>
        </div>

        <h2 className="mt-6 text-center font-display text-3xl md:text-5xl text-white max-w-3xl mx-auto">
          Still Doing These Tasks Manually Every Day?
        </h2>
        <p className="mt-4 text-center text-white/50 max-w-xl mx-auto">
          Most coaches and institutes waste 2–5 hours daily on repetitive
          work.
        </p>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {painPoints.map(({ icons, title, body, tag, accent }) => {
            const [IconA, IconB] = icons;
            return (
              <div
                key={title}
                className={`group relative rounded-3xl p-6 md:p-7
                  bg-gradient-to-br ${cardBg[accent]}
                  backdrop-blur-xl border border-white/[0.15]
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_32px_rgba(0,0,0,0.3)]
                  transition-transform duration-300 hover:-translate-y-1`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                <div className="flex items-center gap-2">
                  <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/60 backdrop-blur-md ring-1 ring-white/40">
                    <IconA className="h-5 w-5 text-ink/70" strokeWidth={1.8} />
                  </span>
                  <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/60 backdrop-blur-md ring-1 ring-white/40">
                    <IconB className="h-5 w-5 text-ink/70" strokeWidth={1.8} />
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl md:text-2xl text-ink leading-snug max-w-[28ch]">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-ink/60 leading-relaxed max-w-[32ch]">
                  {body}
                </p>

                <span className="mt-8 inline-flex items-center rounded-full bg-white/60 backdrop-blur-md px-3 py-1 text-xs font-medium text-ink/70 ring-1 ring-white/40">
                  {tag}
                </span>

                <div
                  className={`pointer-events-none absolute -z-10 -bottom-6 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full opacity-25 blur-[60px] ${glowColor[accent]}`}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10">
          <h3 className="text-center font-display text-2xl md:text-3xl text-white">
            The result?
          </h3>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {results.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-rose-500/10 ring-1 ring-rose-500/20">
                  <Icon className="h-5 w-5 text-rose-400" strokeWidth={1.8} />
                </span>
                <span className="text-sm text-white/70 leading-snug">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}