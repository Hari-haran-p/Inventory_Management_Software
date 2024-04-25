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
     
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

