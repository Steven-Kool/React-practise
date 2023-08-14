// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         maxWidth: {
            '2/3': '80%',
            '1/3': '30%',
         },
         minWidth: {
            '2/3': '70%',
         },
         boxShadow: {
            'inset': 'inset 2px 0 rgba(0, 0, 0, 0.3), inset -2px 0 rgba(0, 0, 0, 0.3), inset 0 2px rgba(0, 0, 0, 0.3), inset 0 -2px rgba(0, 0, 0, 0.3)'
         },
      },
   },
   plugins: [
      function ({ addComponents }) {
         addComponents({
            '.clickable-link': {
               '@apply mx-3 text-xl text-emerald-500 font-semibold font-mono cursor-pointer': {},
            },
            '.clickable-link:hover': {
               '@apply hover:text-emerald-400 hover:font-bold': {},
            },
         });
      },
      require('tailwindcss'),
      require('autoprefixer'),
   ],   
};

