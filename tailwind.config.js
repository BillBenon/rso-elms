const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontWeight: ['hover', 'focus'],
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      borderWidth: {
        6: '6px',
      },
      colors: {
        primary: {
          400: '#4F5FD6',
          500: '#2337CC',
          600: '#1C2CA3',
        },
        secondary: '#FAFBFC',
        tertiary: '#F0F1F1',
        main: '#FFFFFF',
        bcolor: '#F0F1F1',
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
        silver: {
          400: '#FAFBFC',
          500: '#DAE0E5',
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
