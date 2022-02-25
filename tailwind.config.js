const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontWeight: ['hover', 'focus'],
      opacity: ['disabled'],
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      borderWidth: {
        6: '6px',
      },
      colors: {
        primary: {
          400: '#407E77',
          500: '#105E55',
          600: '#0D4B44',
        },
        info: {
          400: '#E9EBFA',
        },
        current: 'currentColor',
        lightblue: '#F6FAFF',
        lightgreen: '#E7EFEE',
        secondary: '#FAFBFC',
        tertiary: '#F0F1F1',
        main: '#FFFFFF',
        error: {
          400: '#FDECEC',
          500: '#EE4040',
        },
        warning: {
          400: '#FEF5D3',
          500: '#FACD23',
        },
        success: {
          400: '#E9F6F2',
          500: '#3CD278',
        },
        'txt-primary': '#050825',
        'txt-secondary': '#97A0A8',
        silver: '#DAE0E5',
      },
      boxShadow: {
        DEFAULT: '0px 28px 44px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  variants: {},
  plugins: [],
};
