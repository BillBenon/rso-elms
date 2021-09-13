import React, { useEffect, useState } from 'react';

import { SelectData, ValueType } from '../../../types';

type PropType = {
  list: SelectData[];
  type?: 'inline' | 'block';
  value?: string;
  name: string;
  handleChange: (_e: ValueType) => void;
};

/**
 * Radio button that will be taking list of options to be used
 * list should contain array of object that has {label:'',value:''}, the value will be used as unique identifier
 * while lable will be displayed on the UI
 */
export default function Radio({
  value = '',
  list,
  type = 'inline',
  name,
  handleChange,
  ...attrs
}: PropType) {
  const [active, setActive] = useState('');

  useEffect(() => setActive(value), []);

  function handleClick(value: string, e: any) {
    setActive(value);
    handleChange({ value, name, event: e });
  }

  function handleKeyPress(value: string, e: any) {
    setActive(value);
    handleChange({ value, name, event: e });
  }

  return (
    <div
      {...attrs}
      className={`flex ${type === 'block' && 'flex-col'}`}
      role="radiogroup">
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
