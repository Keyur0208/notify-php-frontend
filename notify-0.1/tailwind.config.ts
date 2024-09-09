import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./section/**/*.{js,ts,jsx,tsx,mdx}",
    "./section_two/**/*.{js,ts,jsx,tsx,mdx}",
    "./componets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        "text-off-white": "#919FAE",
        "border-blue": "#0193DC",
        "bg-text-dashboard":"rgba(47, 128, 237, 0.5)",
      },
      backgroundColor: {
        "bg-off-white": "#F9FBFD",
        "bg-blue-notify":"#0193DC",
        "bg-off-white-dashboard":"#F7F7F7",
        "bg-blue-dashboard":"rgba(47, 128, 237, 0.1)",
      },
      dropShadow: {
        "text-shadow": "0 4px 4px rgba(0, 0, 0, 0.25)",
        'navigation': '0 0 20px 0 rgba(0, 0, 0, 0.5)'
      },
      zIndex: {
        999999: "999999",
        99999: "99999",
        9999: "9999",
        999: "999",
        99: "99",
        9: "9",
        1: "1",
      },
      backgroundImage:{
        "notify-logo":"url('/logo.png')"
      }
    },
  },
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary:"#0193DC",
          secondary:"#000000",
          warning:"#FFFFFF"
        },
      }
    }
  })],
};
export default config;
