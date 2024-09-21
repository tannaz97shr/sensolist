import type { Config } from "tailwindcss";

const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    colors: {
      error: "#DF2040",
      "error-light": "#FDAEB9",
      primary: "#0F172A",
      "primary-Shade-1": "#000911",
      "primary-Shade-2": "#001426",
      "primary-tint-1": "#192F44",
      "primary-tint-2": "#334759",
      "primary-tint-3": "#4C5E6E",
      "secondary-main": "#E67F3A",
      "neutral-2": "#F5F5F5",
      "neutral-3": "#DCDCDC",
      "neutral-4": "#CACACA",
      "neutral-5": "#B4B4B4",
      "neutral-6": "#9B9B9B",
      "neutral-7": "#6B6B6B",
      "neutral-8": "#343434",
      white: "#ffffff",
      black: "#090909",
      "dark-background-color": "#070B15",
      "white-opacity-900": "rgba(255, 255, 255, 0.90)",
      "white-opacity-800": "rgba(255, 255, 255, 0.80)",
      "white-opacity-700": "rgba(255, 255, 255, 0.70)",
      "white-opacity-500": "rgba(255, 255, 255, 0.50)",
      "white-opacity-200": "rgba(255, 255, 255, 0.20)",
      "white-opacity-100": "rgba(255, 255, 255, 0.10)",
      "white-opacity-50": "rgba(255, 255, 255, 0.05)",
      "white-opacity-30": "rgba(255, 255, 255, 0.03)",
      "black-opacity-400": "rgba(0, 0, 0, 0.4)",
      "black-opacity-200": "rgba(0, 0, 0, 0.2)",
      "black-opacity-100": "rgba(0, 0, 0, 0.1)",
      "black-opacity-50": "rgba(0, 0, 0, 0.05)",
      "exteremly-light-blue": "#F1F5F8",
      orange: "#E67F3A",
      grey: "#DBDFE2",
      "bg-success": "#dcf5cf",
      success: "#50CB0E",
      transparent: "transparent",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [flowbite.plugin()],
  darkMode: "class",
};
export default config;
