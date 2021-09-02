import React, { useState } from 'react';

import { SelectData } from '../../../types';

type PropType = {
  list: SelectData[];
};

export default function Radio({ list }: PropType) {
  const [active, setActive] = useState('');

  function handleClick(value: string) {
    setActive(value);
  }

  function handleKeyPress(value: string) {
    setActive(value);
  }

  return (
    <div className="flex" role="radiogroup">
      {list.map(({ label, value }) => (
        <div
          role="radio"
          tabIndex={0}
          key={value}
          aria-checked={active === value}
          aria-labelledby={label}
          className="flex cursor-pointer justify-center items-center"
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
