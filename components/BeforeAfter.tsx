"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Eyebrow from "./Eyebrow";
import { beforeAfter } from "@/data/content";

export default function BeforeAfter() {
  return (
    <section className="bg-cream py-10 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <Eyebrow>Before vs After</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl text-ink text-balance">
            See the Difference
          </h2>
          <p className="mt-6 text-ink/55 leading-relaxed">
            Same business. Same students. A completely different way of
            running it.
          </p>
        </motion.div>

        {/* two cards with a "VERSUS" medallion overlapping the seam */}
        <div className="mt-16 md:mt-20">
          <div className="flex flex-col md:grid md:grid-cols-[1fr_0px_1fr] md:gap-x-12">
            {/* BEFORE card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl overflow-hidden bg-white border border-ink/[0.06] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] md:col-start-1"
            >
              <div className="bg-gradient-to-r from-red-500 to-orange-400 py-5 text-center">
                <span className="font-display text-sm md:text-base tracking-wide text-white uppercase">
                  Before (Manual Work)
                </span>
              </div>
              <div>
                {beforeAfter.map((row, i) => (
                  <motion.div
                    key={row.before}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`flex items-center justify-between gap-4 px-6 py-5 ${i !== beforeAfter.length - 1
                      ? "border-b border-ink/[0.06]"
                      : ""
                      }`}
                  >
                    <span className="text-sm md:text-base text-ink/70 leading-snug">
                      {row.before}
                    </span>
                    <span className="shrink-0 h-9 w-9 rounded-full bg-red-50 border border-red-200 text-red-500 text-xs font-semibold flex items-center justify-center">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* mobile: VS divider, sits below the Before card in normal flow */}
            <div className="md:hidden flex items-center justify-center py-6">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="h-12 w-12 rounded-full bg-cream border-4 border-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.2)] flex items-center justify-center font-display text-xs tracking-wide text-ink/60 uppercase"
              >
                vs
              </motion.span>
            </div>

            {/* AFTER card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl overflow-hidden bg-white border border-ink/[0.06] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] md:col-start-3"
            >
              <div className="bg-gradient-to-r from-[#3FA98A] to-[#63D9AE] py-5 text-center">
                <span className="font-display text-sm md:text-base tracking-wide text-white uppercase">
                  After (Automated LMS)
                </span>
              </div>
              <div>
                {beforeAfter.map((row, i) => (
                  <motion.div
                    key={row.after}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.25 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`flex items-center justify-between gap-4 px-6 py-5 ${i !== beforeAfter.length - 1
                      ? "border-b border-ink/[0.06]"
                      : ""
                      }`}
                  >
                    <span className="text-sm md:text-base text-ink font-medium leading-snug">
                      {row.after}
                    </span>
                    <span className="shrink-0 h-9 w-9 rounded-full bg-[#3FA98A]/10 border border-[#3FA98A]/30 text-[#2E8A6E] text-xs font-semibold flex items-center justify-center">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* seam column (desktop only) — a real, zero-width grid track
                sitting exactly on the boundary between the two cards.
                The medallion is centered against THIS div, not the outer
                wrapper, so it lands precisely on the seam regardless of
                the wrapper's own box-sizing/width. */}
            <div className="hidden md:block md:col-start-2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >

              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}