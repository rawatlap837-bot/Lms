"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Eyebrow from "./Eyebrow";
import { faqs } from "@/data/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <Eyebrow>Frequently asked</Eyebrow>
        <h2 className="font-display text-3xl md:text-5xl text-ink mb-4">
          Questions, answered.
        </h2>

        <div className="mt-10 divide-y divide-ink/10">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-display text-lg md:text-xl text-ink group-hover:text-plum transition-colors">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-plum transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                  }`}
                  style={{ display: "grid" }}
                >
                  <div className="overflow-hidden">
                    <p className="text-ink/60 leading-relaxed max-w-2xl">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
