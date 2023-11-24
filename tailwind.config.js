/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      merriweather: ["Merriweather", "serif"],
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#3498db",
        special: "#9b59b6",
        head: "#2c3e50",
        para: "#95a5a6",
        details: "#bdc3c7",
      },
    },
  },
  plugins: [],
};
