import { omit } from 'lodash';

import {
  bgStyleType,
  colorStyleType,
  fontSizeStyleType,
  fontWeightStyleType,
} from '../types';

export const fontWeightStyle: fontWeightStyleType = {
  normal: 'font-normal',
  medium: 'font-medium',
  bold: 'font-bold',
  semibold: 'font-semibold',
};

export const fontSizeStyle: fontSizeStyleType = {
  xs: 'text-xs',
  xl: 'text-xl',
  sm: 'text-sm',
  tiny: 'text-tiny',
  lg: 'text-lg',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  base: 'text-base',
};

export const bgStyle: bgStyleType = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  main: 'bg-main',
  error: 'bg-error-400',
  warning: 'bg-warning-400',
  success: 'bg-succes-400',
  'txt-primary': 'bg-txt-primary',
  'txt-secondary': 'bg-txt-secondary',
};

export const bgStyleButton: colorStyleType = {
  primary: 'bg-primary-500 active:bg-primary-600 hover:bg-primary-400',
  ...omit(bgStyle, 'primary'),
};

export const colorStyle: colorStyleType = {
  primary: 'primary-500',
  secondary: 'secondary',
  main: 'main',
  error: 'error-500',
  warning: 'warning-500',
  success: 'success-500',
  gray: 'gray-500',
  lightgray: 'gray-200',
  'txt-primary': 'txt-primary',
  'txt-secondary': 'txt-secondary',
};

export const colorStyleButton: colorStyleType = {
  primary: 'primary-500 active:primary-600 hover:primary-400',
  ...omit(colorStyle, 'primary'),
};
