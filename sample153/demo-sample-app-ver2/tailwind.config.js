/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Vite の src 内を対象にする
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', "Helvetica", "Arial", "sans-serif"],
        heading: ['"Montserrat"', "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#4f46e5",
          light: "#6366f1",
          dark: "#4338ca",
        },
        accent: {
          DEFAULT: "#f97316",
          dark: "#ea580c",
        },
      },
    },
  },
  plugins: [],
};
