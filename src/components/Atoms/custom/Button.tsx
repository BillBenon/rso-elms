import '../../../styles/components/Atoms/custom/button.scss';

import React, { ButtonHTMLAttributes, DOMAttributes, ReactNode } from 'react';

import { bgStyleButton, colorStyle } from '../../../global/global-vars';
import { Color } from '../../../types';

type ButtonType = 'fill' | 'outline' | 'text';
type ButtonStyleType = {
  // eslint-disable-next-line no-unused-vars
  [index in ButtonType]: string;
};

interface PropTypes<T> extends ButtonHTMLAttributes<DOMAttributes<T>> {
  children: ReactNode;
  full?: boolean;
  icon?: boolean;
  styleType?: ButtonType;
  color?: Color;
  className?: string;
  onClick?: () => any;
}

export default function Button<T>({
  children,
  styleType = 'fill',
  color = 'primary',
  full,
  icon,
  className = '',
  onClick,
  ...attrs
}: PropTypes<T>) {
  const buttonStyle: ButtonStyleType = {
    fill: ` ${!icon && 'with-width'}   border-2 border-solid border-${
      colorStyle[color]
    } ${bgStyleButton[color]} text-main`,
    outline: ` ${!icon && 'with-width'}  border-2 border-solid border-${
      colorStyle[color]
    } text-${colorStyle[color]}`,
    text: `text-${colorStyle[color]} hover:underline`,
  };

  // determine padding based on the style type of button
  const padding = icon ? '' : full ? 'py-3' : 'py-3 px-6';

  return (
    <button
      {...attrs}
      onClick={onClick}
      className={`${buttonStyle[styleType]} rounded-lg text-sm outline-none 
      ${full && 'w-full'}
      ${padding} ${className}
      `}>
      {children}
    </button>
  );
}
