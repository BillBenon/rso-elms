import React, { ReactNode } from 'react';

import { Color } from '../../../types';

type BadgeProps = {
  badgecolor?: Color | string;
  badgetxtcolor?: Color | string;
  className?: string;
  children: ReactNode;
};

const Badge = ({ badgecolor, badgetxtcolor, className = '', children }: BadgeProps) => {
  const bg_colors: any = {
    error: 'bg-error-400',
    success: 'bg-success-400',
    warning: 'bg-warning-400',
    primary: 'bg-primary-600',
    secondary: 'bg-secondary',
    main: 'bg-main',
    'txt-primary': 'bg-txt-primary',
    'txt-secondary': 'bg-txt-secondary',
    bcolor: 'bg-bcolor',
    none: 'bg-none',
    gray: 'bg-gray',
    lightgray: 'bg-lightgray',
  };

  const txt_colors: any = {
    error: 'text-error-500',
    success: 'text-success-500',
    warning: 'text-warning-500',
    primary: 'text-primary-600',
    secondary: 'text-secondary',
    main: 'text-main',
    'txt-primary': 'text-txt-primary',
    'txt-secondary': 'text-txt-secondary',
    bcolor: 'text-bcolor',
    none: 'text-none',
    gray: 'text-gray',
    lightgray: 'text-lightgray',
  };

  return (
    <>
      <span
        className={`px-4 py-2 h-9 text-xs font-semibold rounded-full flex items-center 
        ${className}
        ${badgetxtcolor && txt_colors[`${badgetxtcolor}`]} 
        ${badgecolor && bg_colors[`${badgecolor}`]}`}>
        {children}
      </span>
    </>
  );
};

export default Badge;
