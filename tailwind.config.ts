import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#37B7B8",
          dark: "#1E8183",
          light: "#68D6D6"
        }
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        sans: ["Inter", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 25px rgba(55, 183, 184, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
