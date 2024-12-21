/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
         DEFAULT: "#5E00F5",
         500: "#7722FF",
         50: "#924EFF",
         10: "#AD7BFF",
         0: "#E4D3FF"


        }
          ,
        secondary: {
          DEFAULT: "#e9ffe6",
          100: "#d0fdca",
          200: "#a5fb9b",
          300 : "#6df561",
          400 : "#32E925"
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          DEFAULT: "#8B8B9F",
          10: "#E0E0E6",
          20: "#C1C1CD",
          30: "#A2A2B5",
          40: "#89899C",
          50: "#666680",
          60: "#4E4E61",
          70: "#353542",
          80: "#1C1C23",
         
          
          300: "#161622",
          200: "#111211",
        },
      },  
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}

