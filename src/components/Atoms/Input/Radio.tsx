import React, { KeyboardEventHandler, MouseEventHandler, useState } from 'react';

import { SelectData } from '../../../types';

type PropType = {
  list: SelectData[];
  type: 'inline' | 'block';
  handleChange: (
    _value: string,
    _event: MouseEventHandler<HTMLDivElement> | KeyboardEventHandler<HTMLDivElement>,
  ) => void;
};

/**
 * Radio button that will be taking list of options to be used
 * list should contain array of object that has {label:'',value:''}, the value will be used as unique identifier
 * while lable will be displayed on the UI
 */
export default function Radio({ list, type = 'block', handleChange }: PropType) {
  const [active, setActive] = useState('');

  function handleClick(value: string, event: MouseEventHandler<HTMLDivElement>) {
    setActive(value);
    handleChange(value, event);
  }

  function handleKeyPress(value: string, event: KeyboardEventHandler<HTMLDivElement>) {
    setActive(value);
    handleChange(value, event);
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
          // @ts-ignore
          onClick={(e) => handleClick(value, e)}
          // @ts-ignore
          onKeyPress={(e) => handleKeyPress(value, e)}>
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
