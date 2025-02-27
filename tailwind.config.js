/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx, mdx}",
  ],
  theme: {
    extend: {
      colors: {
        simon: {
          primary: '#FF3B30',
          secondary: '#FFA50F',
          text: '#333333',
          'primary-light': '#FF5B52',
          'primary-dark': '#D42E24',
          'secondary-light': '#FFB53F',
          'secondary-dark': '#D88B0C',
          'bg-warm': '#FFF9F2',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // Otros plugins...
  ],
})

