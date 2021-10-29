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
      outline: {
        red: "2px solid red",
      },
      zIndex: {
        "-10": "-10",
      },
      animation: {
        slideDown: "slide-down 0.4s ease-in-out forwards",
      },
    },
  },
  variants: {
    scale: ["group-hover"],
    extend: {
      borderWidth: ["last"],
    },
  },

  plugins: [require("tailwind-scrollbar-hide")],
};
