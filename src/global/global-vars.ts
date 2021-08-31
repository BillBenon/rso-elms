import { colorStyleType, fontSizeStyleType, fontWeightStyleType } from '../types';

export const fontWeightStyle: fontWeightStyleType = {
  normal: 'font-normal',
  medium: 'font-medium',
  bold: 'font-bold',
};

export const fontSizeStyle: fontSizeStyleType = {
  xs: 'text-xs',
  sm: 'text-sm',
  tiny: 'text-tiny',
  lg: 'text-lg',
  '2xl': 'text-2xl',
};

export const bgStyle: colorStyleType = {
  primary: 'bg-primary-500 active:bg-primary-600 hover:bg-primary-400',
  secondary: 'bg-secondary',
  main: 'bg-main',
  error: 'bg-error',
  warning: 'bg-warning',
  success: 'bg-succes',
  'txt-primary': 'bg-txt-primary',
  'txt-secondary': 'bg-txt-primary',
};

export const colorStyle: colorStyleType = {
  primary: 'text-primary-500 active:text-primary-600 hover:text-primary-400',
  secondary: 'text-secondary',
  main: 'text-main',
  error: 'text-error',
  warning: 'text-warning',
  success: 'text-succes',
  'txt-primary': 'text-txt-primary',
  'txt-secondary': 'text-txt-primary',
};
