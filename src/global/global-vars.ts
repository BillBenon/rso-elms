import { omit } from 'lodash';

import { colorStyleType, fontSizeStyleType, fontWeightStyleType } from '../types';

export const fontWeightStyle: fontWeightStyleType = {
  normal: 'font-normal',
  medium: 'font-medium',
  bold: 'font-bold',
};

export const fontSizeStyle: fontSizeStyleType = {
  xs: 'xs',
  sm: 'sm',
  tiny: 'tiny',
  lg: 'lg',
  '2xl': '2xl',
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
  primary: 'primary-500',
  secondary: 'secondary',
  main: 'main',
  error: 'error-500',
  warning: 'warning-500',
  success: 'success-500',
  'txt-primary': 'txt-primary',
  'txt-secondary': 'txt-primary',
};
