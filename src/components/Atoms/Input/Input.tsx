import React from 'react';

import { colorStyle } from '../../../global/global-vars';
import { Color } from '../../../types';

type IProps = {
  placeholder: string;
  type: string;
  category?: string;
  readonly?: boolean;
  handleChange: (e: any) => void;
  value: string;
  full?: boolean;
  fcolor?: Color;
};

export default function Input({
  placeholder,
  type,
  category,
  readonly = false,
  value,
  full,
  fcolor = 'primary',
  handleChange,
}: IProps) {
  return category === 'text_area' ? (
    <textarea
      className={`py-2 px-5 rounded-md ${
        full ? 'w-full' : 'w-80'
      } focus:outline-none border-bcolor focus:border-${colorStyle[fcolor]} border-2`}
      placeholder={placeholder}
      value={value}
      defaultValue={value}
      onChange={handleChange}
    />
  ) : (
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
