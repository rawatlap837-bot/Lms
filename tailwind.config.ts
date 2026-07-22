import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — Chinese Black, the dominant surface
        ink: {
          DEFAULT: "#0D0E20",
          soft: "#151735",
          line: "#26284A",
        },
        // Secondary — Vodka, the signature light accent section
        vodka: {
          DEFAULT: "#C8B3F6",
          deep: "#B0A9E5",
        },
        // Supporting palette
        indigo: "#2D1C7F",
        violet: "#7546E8",
        plum: "#5D2E8C",
        lilac: "#B89ADC",
        mist: "#E7DDF3",
        pastel: "#F1E9FA",
        cream: "#FAF5FF",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "ink-glow":
          "radial-gradient(120% 120% at 15% 0%, #2D1C7F 0%, #0D0E20 55%)",
        "violet-glow":
          "radial-gradient(80% 120% at 85% 20%, rgba(117,70,232,0.35) 0%, rgba(13,14,32,0) 60%)",
        "vodka-fade":
          "linear-gradient(180deg, #C8B3F6 0%, #D9CBF9 100%)",
      },
      boxShadow: {
        card: "0 20px 60px -20px rgba(13,14,32,0.25)",
        glow: "0 0 0 1px rgba(117,70,232,0.25), 0 20px 60px -15px rgba(117,70,232,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
