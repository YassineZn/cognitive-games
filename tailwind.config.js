/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-400": "#26272F",
        "bg-500": "#202229",
        "primary-400": "#131a53",
        "light-400": "#8c8da0",
      },
    },
  },
  plugins: [],
};
