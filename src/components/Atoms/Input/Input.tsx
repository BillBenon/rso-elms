import React from 'react';

import { colorStyle } from '../../../global/global-vars';
import { Color, ValueType } from '../../../types';

export interface IProps {
  placeholder: string;
  type?: string;
  readonly?: boolean;
  handleChange: (_e: ValueType) => void;
  value: string;
  name: string;
  full?: boolean;
  fcolor?: Color;
  bcolor?: Color;
  width?: string;
}

export default function Input({
  placeholder,
  type = 'text',
  readonly = false,
  value,
  name,
  full,
  fcolor = 'primary',
  bcolor = 'bcolor',
  width = '80',
  handleChange,
}: IProps) {
  return (
    <input
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      readOnly={readonly}
      className={`bg-transparent h-12 px-5 rounded-md ${
        full ? 'w-full' : `w-${width}`
      } focus:outline-none border-${bcolor} focus:border-${colorStyle[fcolor]} border-2`}
      /* @ts-ignore */
      onChange={(event) => handleChange({ name, value, event })}
    />
  );
}
