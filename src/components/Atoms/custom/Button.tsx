import '../../../styles/components/atoms/custom/button.scss';

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
  type?: ButtonType;
  color?: Color;
}

// button type
// color type
// width type

export default function Button({
  children,
  type = 'fill',
  color = 'primary',
}: PropTypes) {
  const buttonStyle: ButtonStyleType = {
    fill: ` border-2 border-solid border-${colorStyle[color]} ${bgStyleButton[color]} text-main`,
    outline: `border-2 border-solid border-${colorStyle[color]} text-${colorStyle[color]}`,
    text: `text-${colorStyle[color]} hover:underline`,
  };
  return (
    <button className={`${buttonStyle[type]} py-3 px-6 rounded-lg outline-none`}>
      {' '}
      {children}{' '}
    </button>
  );
}
