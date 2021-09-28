import './input.scss';

import React, { useState } from 'react';

import { colorStyle } from '../../../global/global-vars';
import { Color, CommonInputProps, ValueType } from '../../../types';

export interface IProps<T> extends CommonInputProps<T> {
  placeholder?: string;
  type?: string;
  readonly?: boolean;
  handleChange: (_e: ValueType) => void;
  value: string;
  name: string;
  full?: boolean;
  padding?: string;
  fcolor?: Color;
  bcolor?: Color;
  pcolor?: Color;
  width?: string | number;
  className?: string;
}

export default function Input<T>({
  placeholder = '',
  padding = 'px-3',
  type = 'text',
  readonly = false,
  value,
  name,
  full,
  fcolor = 'primary',
  bcolor = 'bcolor',
  pcolor = 'txt-secondary',
  width = '80',
  handleChange,
  className = '',
  ...attrs
}: IProps<T>) {
  const [_value, _setValue] = useState(value);

  function handleOnChange(e: any) {
    _setValue(e.target.value);
    handleChange({ name, value: e.target.value, event: e });
  }
  return (
    <input
      {...attrs}
      placeholder={placeholder}
      name={name}
      type={type}
      value={_value}
      readOnly={readonly}
      className={`bg-transparent h-12 ${padding} placeholder-${pcolor} rounded-md ${
        full ? 'w-full' : `w-full md:w-${width}`
      } focus:outline-none border-${bcolor} focus:border-${
        colorStyle[fcolor]
      } border-2 ${className}`}
      /* @ts-ignore */
      onChange={handleOnChange}
    />
  );
}
