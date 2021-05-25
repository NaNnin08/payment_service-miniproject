module.exports = {
  purge: ["./**/*.html"],
  darkMode: false,
  theme: {
    extend: {
      animation: {
        "pulse-normal": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite",
        "pulse-very-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) 2s infinite",
      },
    },
    height: {
      "5v": "5vh",
      "7v": "7vh",
      "10v": "10vh",
      "20v": "20vh",
      "30v": "30vh",
      "40v": "40vh",
      "50v": "50vh",
      "60v": "60vh",
      "70v": "70vh",
      "80v": "80vh",
      "90v": "90vh",
      "100v": "100vh",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
