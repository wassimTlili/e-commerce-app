/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  darkMode:"class",
   theme: {
    extend: {
      colors:{
        primary:"#3b82f6",
        secondary:"#2563eb",
      },
      container:{
        center: true,
        padding:{
          DEFAULT: "1rem",
          sm:"3rem",
        }


      }
    },
  },
  plugins: [],
}

