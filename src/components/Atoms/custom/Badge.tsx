import React, { ReactNode } from 'react';

type BadgeProps = {
  badgecolor: string;
  children: ReactNode;
};

const Badge = ({ badgecolor, children }: BadgeProps) => {
  const bg_colors: any = {
    error: 'bg-error-400',
    success: 'bg-success-400',
    warning: 'bg-warning-400',
  };

  const txt_colors: any = {
    error: 'text-error-500',
    success: 'text-success-500',
    warning: 'text-warning-500',
  };

  return (
    <>
      <span
        className={`px-4 py-2 font-semibold rounded-full 
        ${txt_colors[`${badgecolor}`]} 
        ${bg_colors[`${badgecolor}`]}`}>
        {children}
      </span>
    </>
  );
};

export default Badge;
