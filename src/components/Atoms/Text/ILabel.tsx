import React from 'react';

import { colorStyle, fontSizeStyle, fontWeightStyle } from '../../../global/global-vars';
import { Color, fontSize, fontWeight } from '../../../types';

interface ILabelProps {
  title: string;
  weight: fontWeight;
  size: fontSize;
  color: Color;
}

export default function ILabel({ title, weight, size, color }: ILabelProps) {
  return (
    <label
      htmlFor={title}
      className={`${fontWeightStyle[weight]} ${fontSizeStyle[size]}  text-${colorStyle[color]}`}>
      {title}
    </label>
  );
}
