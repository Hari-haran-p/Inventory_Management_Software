/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'tablet': '1080px',
        'phone':'300px'
      },
      scrollbar: {
        width: '12px',
        track: 'rgba(0,0,0,0.1)',
        thumb: 'rgba(0,0,0,0.3)',
      },
      fontFamily :{
        Poppins: ["Poppins","sans-serif"],
        Saira: ["Saira","sans-serif"],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        fadeIn2: 'fadeIn 2s ease-in-out',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

