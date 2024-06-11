/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dull-lavender": {
          50: "#f4f3ff",
          100: "#eceafd",
          200: "#dcd7fd",
          300: "#c1b7fb",
          400: "#b09ef8",
          500: "#8560f2",
          600: "#743fe8",
          700: "#652dd4",
          800: "#5525b2",
          900: "#472092",
          950: "#2b1263",
        },
        black: "#2b1263",
      },
      fontFamily: { kool: ["Koulen"], inter: ["Inter"] },
    },
  },
  plugins: [],
};
