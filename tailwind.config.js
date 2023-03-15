/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fontNove: ["nove, sans-serif"],
        fontInforma: ["informapro, sans-serif"],
      },
      fontWeight: {
        thin: 300,
        normal: 400,
        black: 700,
        heavy: 900,
      },
    },
  },
  plugins: [],
};
