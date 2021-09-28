import './input.scss';

import React, { useState } from 'react';

import { colorStyle } from '../../../global/global-vars';
import { Color, CommonInputProps, ValueType } from '../../../types';

export interface IProps<T> extends CommonInputProps<T> {
  placeholder?: string;
  type?: string;
  readonly?: boolean;
  handleChange: (_e: ValueType) => void;
  value: string | undefined;
  name: string;
  full?: boolean;
  fcolor?: Color;
  bcolor?: Color;
  pcolor?: Color;
  width?: string | number;
}

export default function Textarea<T>({
  placeholder = '',
  readonly = false,
  value,
  name,
  full,
  fcolor = 'primary',
  bcolor = 'bcolor',
  pcolor = 'txt-secondary',
  width = '80',
  handleChange,
  ...attrs
}: IProps<T>) {
  const [_value, _setValue] = useState(value);

  function handleOnChange(e: any) {
    _setValue(e.target.value);
    handleChange({ name, value: e.target.value, event: e });
  }
  return (
    <textarea
      {...attrs}
      placeholder={placeholder}
      name={name}
      value={_value}
      readOnly={readonly}
      className={`bg-transparent h-16 px-3 pt-4 placeholder-${pcolor} rounded-md ${
        full ? 'w-full' : `w-${width}`
      } focus:outline-none border-${bcolor} focus:border-${colorStyle[fcolor]} border-2`}
      /* @ts-ignore */
      onChange={handleOnChange}
    />
  );
}
