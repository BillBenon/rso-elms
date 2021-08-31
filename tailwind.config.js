const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontWeight: ['hover', 'focus'],
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      primary: '#2337CC',
      'primary-active': '#1C2CA3',
      'primary-hover': '#4F5FD6',
      secondary: '#FAFBFC',
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
    },
  },
  variants: {},
  plugins: [],
};
