const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'ocean-green': {
          DEFAULT: '#459875',
          50: '#B7DECD',
          100: '#A8D8C4',
          200: '#8CCBB1',
          300: '#70BE9D',
          400: '#54B28A',
          500: '#459875',
          600: '#337157',
          700: '#224B3A',
          800: '#10241C',
          900: '#000000',
        },
      },
    },
  },
}
