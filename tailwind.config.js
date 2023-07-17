/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        custom: "0.6fr 2fr 1.5fr 1.3fr 1.3fr 1.3fr 3.2rem",
        checkout: "0.8fr 0.8fr 0.4fr 0.5fr 4rem",
      },
      fontFamily: {
        raleway: ["raleway", "sans-serif"],
        helvetica: ["helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

//  0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
