/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Poppins", "sans-serif"],
      },
      width: {
        main: "90%", 
      },
    },
  },
  plugins: [],
}

