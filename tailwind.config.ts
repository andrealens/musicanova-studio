import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-dark": "#05070A",
        "brand-accent": "#FFB800",
        "brand-text": "#E2E8F0",
      },
    },
  },
  plugins: [],
};

export default config;

