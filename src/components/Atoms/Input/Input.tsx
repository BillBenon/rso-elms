import './input.scss';

import React, { useEffect, useState } from 'react';

import { colorStyle } from '../../../global/global-vars';
import { InputProps } from '../../../types';

export default function Input<T>({
  placeholder = '',
  padding = 'px-4',
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
}: InputProps<T>) {
  const [_value, setValue] = useState<string>();

  useEffect(() => setValue(value?.toString()), [value]);

  function handleOnChange(e: any) {
    setValue(e.target.value);
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
      autoComplete="off"
      className={`${
        readonly ? 'bg-gray-100' : 'bg-transparent'
      } h-12 ${padding} placeholder-${pcolor} rounded-md ${
        full ? 'w-full' : `w-full md:w-${width}`
      } focus:outline-none border-${bcolor} focus:border-${
        colorStyle[fcolor]
      } border-2 ${className}`}
      /* @ts-ignore */
      onChange={handleOnChange}
    />
  );
}
