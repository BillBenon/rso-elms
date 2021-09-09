import React from 'react';

import { colorStyle } from '../../../global/global-vars';
import { Color } from '../../../types';

export interface IProps {
  placeholder: string;
  type?: string;
  readonly?: boolean;
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
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
  full,
  fcolor = 'primary',
  bcolor = 'bcolor',
  width = '72',
  handleChange,
}: IProps) {
  return (
    <input
      placeholder={placeholder}
      name={value}
      type={type}
      value={value}
      readOnly={readonly}
      className={`bg-transparent h-12 px-3 placeholder-red-500 rounded-md ${
        full ? 'w-full' : `w-${width}`
      } focus:outline-none border-${bcolor} focus:border-${colorStyle[fcolor]} border-2`}
      onChange={handleChange}
    />
  );
}
