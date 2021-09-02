import React, { useState } from 'react';

import { SelectData } from '../../../types';

type PropType = {
  list: SelectData[];
  type: 'inline' | 'block';
};

export default function Radio({ list, type = 'block' }: PropType) {
  const [active, setActive] = useState('');

  function handleClick(value: string) {
    setActive(value);
  }

  function handleKeyPress(value: string) {
    setActive(value);
  }

  return (
    <div className={`flex ${type === 'block' && 'flex-col'}`} role="radiogroup">
      {list.map(({ label, value }) => (
        <div
          role="radio"
          tabIndex={0}
          key={value}
          aria-checked={active === value}
          aria-labelledby={label}
          className={`flex cursor-pointer items-center ${
            type === 'block' ? 'w-48 bg-main rounded-lg py-4 px-2 my-1' : 'mr-4'
          }`}
          onClick={() => handleClick(value)}
          onKeyPress={() => handleKeyPress(value)}>
          <span
            className={`mx-2 w-5 h-5 rounded-full border-solid 
            ${
              active === value ? 'border-6 border-primary-500' : 'border-4 border-bcolor'
            }`}></span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
