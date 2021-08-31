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
      'primary-hoover': '#4F5FD6',
      secondary: '#FAFBFC',
      main: '#FFFFFF',
      error: '#EE4040',
      warning: '#FACD23',
      succes: '#3CD278',
      'txt-primary': '#050825',
      'txt-secondary': '#97A0A8',
    },
  },
  variants: {},
  plugins: [],
};
