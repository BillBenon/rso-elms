import './input.scss';

import React, { useState } from 'react';

import { colorStyle } from '../../../global/global-vars';
import { Color, ValueType } from '../../../types';

export interface IProps {
  placeholder?: string;
  type?: string;
  readonly?: boolean;
  handleChange: (_e: ValueType) => void;
  value: string;
  name: string;
  full?: boolean;
  fcolor?: Color;
  bcolor?: Color;
  pcolor?: Color;
  width?: string;
}

export default function Textarea({
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
}: IProps) {
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
      className={`bg-transparent h-12 px-3 placeholder-${pcolor} rounded-md ${
        full ? 'w-full' : `w-${width}`
      } focus:outline-none border-${bcolor} focus:border-${colorStyle[fcolor]} border-2`}
      /* @ts-ignore */
      onChange={handleOnChange}
    />
  );
}
