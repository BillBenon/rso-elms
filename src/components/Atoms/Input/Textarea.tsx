import React from 'react';

import { colorStyle } from '../../../global/global-vars';
import { Color } from '../../../types';

export interface ITextarea {
  placeholder: string;
  type: string;
  readonly?: boolean;
  handleChange: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  full?: boolean;
  fcolor?: Color;
}

function Textarea({
  placeholder,
  readonly = false,
  value = '',
  full,
  fcolor = 'primary',
  handleChange,
  ...attrs
}: ITextarea) {
  return (
    <textarea
      {...attrs}
      className={`py-2 px-5 rounded-md ${
        full ? 'w-full' : 'w-80'
      } focus:outline-none border-bcolor focus:border-${colorStyle[fcolor]} border-2`}
      placeholder={placeholder}
      value={value}
      readOnly={readonly}
      onChange={handleChange}
    />
  );
}

export default Textarea;
