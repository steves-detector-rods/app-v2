import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F3F1E8",
        surface: "#FFFFFF",
        "surface-alt": "#F3F1E8",
        ink: "#0A0B10",
        "ink-soft": "#0F1018",
        "ink-panel": "#141520",
        "ink-line": "#1A1A24",
        "ink-line-soft": "#1E1F28",
        "ink-hi": "#CDCBBF",
        "ink-lo": "#888888",
        "ink-lo-2": "#555555",
        text: "#14151E",
        "text-muted": "#6A6B73",
        border: "#E3E1D6",
        accent: "#B8452F",
        "accent-hover": "#9A3624",
        "accent-soft": "#FAF5E8",
        success: "#2F7D4F",
        "success-dot": "#5BB06B",
        warn: "#C89B3C",
        carbonpro: "#1E3A5F",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        meta: "0.08em",
        label: "0.1em",
        eyebrow: "0.25em",
      },
      borderRadius: {
        DEFAULT: "0",
        none: "0",
        sm: "2px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 8px 24px -12px rgba(10,11,16,0.18)",
        drawer: "-20px 0 60px -20px rgba(0,0,0,0.25)",
        glow: "0 40px 80px -10px rgba(0,0,0,0.8), 0 0 120px 20px rgba(184,69,47,0.18)",
      },
      maxWidth: {
        page: "1440px",
      },
      fontSize: {
        display: ["72px", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        h1: ["56px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h2: ["48px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      keyframes: {
        slideIn: {
          from: { transform: "translateX(20px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        slideIn: "slideIn 0.25s ease",
      },
    },
  },
  plugins: [],
};

export default config;
