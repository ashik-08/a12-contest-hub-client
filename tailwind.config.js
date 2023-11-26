const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      slab: ["Roboto Slab", "serif"],
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        head: "#3498db",
        // primary: "#4CAF50",
        special: "#9b59b6",
        // head: "#2c3e50",
        // para: "#95a5a6",
        // details: "#bdc3c7",
        'sub-head': "#333333",
        details: "#888888",
      },
    },
  },
  plugins: [require("daisyui")],
});
