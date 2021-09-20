import React, { ReactNode } from 'react';

import { colorStyle, fontSizeStyle, fontWeightStyle } from '../../../global/global-vars';
import { Color, fontSize, fontWeight } from '../../../types';

interface ILabelProps {
  children: ReactNode;
  weight?: fontWeight;
  size?: fontSize;
  color?: Color;
}

export default function ILabel({
  children,
  weight = 'normal',
  size = 'base',
  color = 'txt-primary',
  ...rest
}: ILabelProps) {
  return (
    <label
      {...rest}
      className={`capitalize ${fontWeightStyle[weight]} ${fontSizeStyle[size]} text-${colorStyle[color]}`}>
      {children}
    </label>
  );
}
