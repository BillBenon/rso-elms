import '../../../styles/components/Atoms/custom/button.scss';

import React, { ReactNode } from 'react';

import { bgStyleButton, colorStyle } from '../../../global/global-vars';
import { Color } from '../../../types';

type ButtonType = 'fill' | 'outline' | 'text';
type ButtonStyleType = {
  // eslint-disable-next-line no-unused-vars
  [index in ButtonType]: string;
};

interface PropTypes {
  children: ReactNode;
  full?: boolean;
  icon?: boolean;
  type?: ButtonType;
  color?: Color;
  onClick?: () => any;
}

export default function Button({
  children,
  type = 'fill',
  color = 'primary',
  full,
  icon,
  onClick,
  ...attrs
}: PropTypes) {
  const buttonStyle: ButtonStyleType = {
    fill: ` ${!icon && 'with-width'}   border-2 border-solid border-${
      colorStyle[color]
    } ${bgStyleButton[color]} text-main`,
    outline: ` ${!icon && 'with-width'}  border-2 border-solid border-${
      colorStyle[color]
    } text-${colorStyle[color]}`,
    text: `text-${colorStyle[color]} hover:underline`,
  };
  console.log(full, !full && 'py-3 px-6', children);

  // determine padding based on the style type of button
  const padding = icon ? '' : full ? 'py-3' : 'py-3 px-6';

  return (
    <button
      {...attrs}
      onClick={onClick}
      className={`${buttonStyle[type]} rounded-lg text-sm outline-none 
      ${full && 'w-full'}
      ${padding}
      `}>
      {children}
    </button>
  );
}
