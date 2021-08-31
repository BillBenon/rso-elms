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
  console.log(weight);
  return (
    <label
      htmlFor={title}
      className={`${fontWeightStyle[weight]} ${fontSizeStyle[size]}  ${colorStyle[color]}`}>
      {title}
    </label>
  );
}
