import { omit } from 'lodash';

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
  primary: 'bg-primary-500',
  secondary: 'bg-secondary',
  main: 'bg-main',
  error: 'bg-error-400',
  warning: 'bg-warning-400',
  success: 'bg-succes-400',
  'txt-primary': 'bg-txt-primary',
  'txt-secondary': 'bg-txt-primary',
};

export const bgStyleButton: colorStyleType = {
  primary: 'bg-primary-500 active:bg-primary-600 hover:bg-primary-400',
  ...omit(bgStyle, 'primary'),
};

export const colorStyle: colorStyleType = {
  primary: 'text-primary-500',
  secondary: 'text-secondary',
  main: 'text-main',
  error: 'text-error-500',
  warning: 'text-warning-500',
  success: 'text-success-500',
  'txt-primary': 'text-txt-primary',
  'txt-secondary': 'text-txt-primary',
};

export const colorStyleButton: colorStyleType = {
  primary: 'text-primary-500 active:text-primary-600 hover:text-primary-400',
  ...omit(colorStyle, 'primary'),
};
