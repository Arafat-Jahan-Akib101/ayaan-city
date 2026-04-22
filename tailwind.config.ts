import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0D1B3E",
          light: "#162650",
          dark: "#080F22",
        },
        gold: {
          DEFAULT: "#C8A951",
          light: "#E0C06A",
          dark: "#A88B38",
        },
        emerald: {
          DEFAULT: "#1B6B3A",
          light: "#22874A",
          dark: "#145029",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        dm: ["var(--font-dm)", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 4s ease-in-out infinite",
        "border-glow": "borderGlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        borderGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(200,169,81,0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(200,169,81,0.7)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
