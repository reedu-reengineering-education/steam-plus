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
        matisse: {
          DEFAULT: '#1B6AAA',
          50: '#8FC3ED',
          100: '#7EBAEA',
          200: '#5BA7E5',
          300: '#3794DF',
          400: '#2180CD',
          500: '#1B6AAA',
          600: '#134C7A',
          700: '#0C2E49',
          800: '#040F19',
          900: '#000000',
        },
      },
    },
  },
}
