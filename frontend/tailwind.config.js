// tailwind.config.js

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        mont: "'Montserrat', sans-serif",
      },
      colors: {
        "main-bg": "#FAFAFA",
      },
    },
  },
  variants: {
    scale: ["group-hover"],
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
