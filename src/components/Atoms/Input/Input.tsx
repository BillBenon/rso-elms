import React from 'react';

import { colorStyle } from '../../../global/global-vars';
import { Color } from '../../../types';

export interface IProps {
  placeholder: string;
  type: string;
  readonly?: boolean;
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  full?: boolean;
  fcolor?: Color;
}

export default function Input({
  placeholder,
  type,
  readonly = false,
  value,
  full,
  fcolor = 'primary',
  handleChange,
}: IProps) {
  return (
    <input
      placeholder={placeholder}
      name={value}
      type={type}
      value={value}
      readOnly={readonly}
      className={`py-2 px-5 rounded-md ${
        full ? 'w-full' : 'w-72'
      } focus:outline-none border-bcolor focus:border-${colorStyle[fcolor]} border-2`}
      onChange={handleChange}
    />
  );
}
