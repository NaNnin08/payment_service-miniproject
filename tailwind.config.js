module.exports = {
  purge: ["./**/*.html"],
  darkMode: false,
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "4rem 1fr 2rem",
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
    extend: {
      borderWidth: ["hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
