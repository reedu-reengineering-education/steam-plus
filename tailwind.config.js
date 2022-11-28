const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
      height: {
        192: '48rem',
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
        'steam-green': {
          DEFAULT: '#398B28',
          50: '#DDEDE6',
          100: '#1D681D',
        },
        'steam-green-text': {
          DEFAULT: '#4C9277',
          50: '#1D681D',
        },
        'steam-white': {
          DEFAULT: '#F6F5F5',
        },
        trail: {
          teacher: {
            DEFAULT: '#2F2F8F',
            50: '#9898DD',
            100: '#8989D8',
            200: '#6A6ACE',
            300: '#4C4CC4',
            400: '#3939AE',
            500: '#2F2F8F',
            600: '#212165',
            700: '#13133B',
            800: '#050510',
            900: '#000000',
          },
          student: {
            DEFAULT: '#C42A31',
            50: '#EFB6B9',
            100: '#ECA5A9',
            200: '#E58488',
            300: '#DD6268',
            400: '#D64147',
            500: '#C42A31',
            600: '#962025',
            700: '#68161A',
            800: '#390C0E',
            900: '#0B0203',
          },
          educational: {
            DEFAULT: '#2D803E',
            50: '#8ED79D',
            100: '#7ED28F',
            200: '#60C775',
            300: '#42BC5B',
            400: '#389E4D',
            500: '#2D803E',
            600: '#1E562A',
            700: '#102D16',
            800: '#010302',
            900: '#000000',
          },
          policy: {
            DEFAULT: '#D6B133',
            50: '#F5EBCC',
            100: '#F1E5BB',
            200: '#EAD899',
            300: '#E4CB77',
            400: '#DDBE55',
            500: '#D6B133',
            600: '#AE8E23',
            700: '#7F681A',
            800: '#514210',
            900: '#221C07',
          },
        },
      },
    },
  },
}
