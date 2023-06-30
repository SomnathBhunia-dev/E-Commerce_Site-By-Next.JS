/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // backgroundColor: {
      //   'whityy': '#edeff2',
      //   'blacky': '#374151',
      //   'blueish': '#6366f3'
      // },
    },
  },
  plugins: [
    '@tailwindcss/forms',
  ],
}
