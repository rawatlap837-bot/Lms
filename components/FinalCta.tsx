import { ArrowUpRight } from "lucide-react";

export default function FinalCta() {
  return (
    <section
      id="consultation"
      className="relative overflow-hidden bg-ink-glow py-28 md:py-36"
    >
      <div className="absolute inset-0 bg-violet-glow pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-5xl text-cream text-balance">
          Stop managing your business.
          <br />
          Start building a system that works for you.
        </h2>
        <p className="mt-6 text-mist/60 max-w-xl mx-auto leading-relaxed">
          Your vision deserves more than a collection of disconnected tools.
          Let&apos;s build a custom LMS that brings your entire learning
          business together.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-cream shadow-glow hover:bg-violet/90 transition-colors"
          >
            Book Your Free Consultation
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-mist/25 px-7 py-3.5 text-sm font-semibold text-cream/90 hover:border-mist/50 transition-colors"
          >
            Request a Custom LMS Demo
          </a>
        </div>
        <p className="mt-10 font-mono text-xs tracking-widest uppercase text-lilac/50">
          Strategy · Design · Development · Deployment · Support
        </p>
      </div>
    </section>
  );
}
