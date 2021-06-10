const { inset } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./**/*.html"],
  darkMode: false,
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "4rem 1fr 2rem",
      },
      inset: {
        "10p": "10%",
        "20p": "20%",
        "30p": "30%",
        "40p": "40%",
        "45p": "45%",
        "50p": "50%",
        "60p": "60%",
        "70p": "70%",
        "80p": "80%",
        "90p": "90%",
        "100p": "100%",
      },
      animation: {
        "spin-5-f": "spin 3s linear",
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
      animation: ["hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
