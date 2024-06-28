// tailwind.config.js

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'boost': 'url("/images/bg-boost-desktop.svg")',
        'shorten': 'url("/images/bg-shorten-desktop.svg")'
      },
      colors: {
        // Define your custom colors here
        'Cyan': 'hsl(180, 66%, 49%)',
        'DarkViolet': 'hsl(257, 27%, 26%)',
        'Red': 'hsl(0, 87%, 67%)',
        'Gray': 'hsl(0, 0%, 75%)',
        'GrayishViolet': 'hsl(257, 7%, 63%)',
        'VeryDarkBlue': 'hsl(255, 11%, 22%)',
        'VeryDarkViolet': 'hsl(260, 8%, 14%)',
      },
    },
  },
  plugins: [],
};

export default config;
