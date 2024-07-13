import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        white: "rgba(var(--white))",
        black: "rgba(var(--black))",
        primary: "rgba(var(--primary))",
        blackLight: "rgba(var(--black), 0.2)",
        secondary: "rgba(var(--secondary))",
      },
    },
    tokens: {
      colors: {
        white: "255, 255, 255",
        black: "0, 0, 0",
        primary: "128, 28, 62",
        secondary: "217, 229, 232",
      },
      header: {
        height: "72px",
      },
    },
  },
  plugins: [],
};
export default config;
