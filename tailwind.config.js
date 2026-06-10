/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBF7F1',
          100: '#F8F0E5',
          200: '#F3E6D4',
          300: '#ECD9BF',
        },
        terracotta: {
          400: '#D98E73',
          500: '#C97B5D',
          600: '#B5664A',
        },
        cocoa: {
          700: '#5A4232',
          800: '#42301F',
          900: '#2E2118',
        },
        blush: '#F2DCD3',
        sand: '#F0E0C8',
        gold: '#C9A227',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
