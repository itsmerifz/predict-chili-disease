/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Montserrat", "Arial", "sans-serif"],
      logo: ["Urbanist", "sans-serif"],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#12E081",

          secondary: "#FFCC4D",

          accent: "#9ca3af",

          neutral: "#111827",

          "base-100": "#f3f4f6",

          info: "#7c3aed",

          success: "#38bdf8",

          warning: "#fb923c",

          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), 
            require("daisyui")],
};
