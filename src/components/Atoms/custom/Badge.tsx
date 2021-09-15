import React, { ReactNode } from 'react';

import { Color, colorStyleType } from '../../../types';

type BadgeProps = {
  badgecolor: Color;
  badgetxtcolor?: Color;
  roundWidth?: string;
  fontWeight?: string;
  className?: string;
  children: ReactNode;
};

/**
 * when using this Badge, you can provide just only  badge color, so txt and bacground color will be auto selected
 * based on their variants
 */
const Badge = ({
  badgecolor,
  badgetxtcolor,
  roundWidth = 'full',
  fontWeight = 'semibold',
  className = '',
  children,
}: BadgeProps) => {
  const bg_colors: colorStyleType = {
    error: 'bg-error-400',
    success: 'bg-success-400',
    warning: 'bg-warning-400',
    primary: 'bg-primary-400',
    // secondary: 'bg-secondary',
    // main: 'bg-main',
    // 'txt-primary': 'bg-txt-primary',
    // 'txt-secondary': 'bg-txt-secondary',
    // bcolor: 'bg-bcolor',
    // none: 'bg-none',
    // gray: 'bg-gray',
    // lightgray: 'bg-lightgray',
  };

  const txt_colors: colorStyleType = {
    error: 'text-error-500',
    success: 'text-success-500',
    warning: 'text-warning-500',
    primary: 'text-primary-500',
    // secondary: 'text-secondary',
    // main: 'text-main',
    // 'txt-primary': 'text-txt-primary',
    // 'txt-secondary': 'text-txt-secondary',
    // bcolor: 'text-bcolor',
    // none: 'text-none',
    // gray: 'text-gray',
    // lightgray: 'text-lightgray',
  };

  return (
    <>
      <span
        className={`px-4 py-2 text-xs font-${fontWeight} rounded-${roundWidth} inline-block ${className} ${
          (badgetxtcolor || badgecolor) && txt_colors[badgetxtcolor || badgecolor]
        } 
        ${badgecolor && bg_colors[badgecolor]}`}>
        {children}
      </span>
    </>
  );
};

export default Badge;
