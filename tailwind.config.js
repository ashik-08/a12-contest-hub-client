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
        special: "#9b59b6",
        head: "#3498db",
        "sub-head": "#333333",
        details: "#888888",
      },
    },
  },
  plugins: [require("daisyui")],
});
