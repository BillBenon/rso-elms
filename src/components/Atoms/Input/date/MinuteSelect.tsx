import React from 'react';

import { ValueType } from '../../../../types';
import DropDown from '../Dropdown';

type MProp = {
  value: number;
  onChange: (_e: ValueType) => void;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name: string;
  placeholder?: string;
  width?: string;
  className?: string;
};

const MinuteSelect = (mprops: MProp) => {
  const renderMinuteOptions = () => {
    let min = 60;
    const minOptions: { value: string; label: string }[] = [];
    for (let i = 0; i < min; ++i) {
      minOptions.push({
        value: i < 10 ? '0' + i : '' + i,
        label: i < 10 ? '0' + i : '' + i,
      });
    }
    return minOptions;
  };

  let minutes = renderMinuteOptions();
  let newDefaultValue = minutes.find((minute) => minute.value === mprops.defaultValue);

  return (
    <DropDown
      defaultValue={newDefaultValue}
      name={mprops.name}
      placeholder={mprops.placeholder}
      width={mprops.width}
      className={mprops.className}
      options={renderMinuteOptions()}
      handleChange={(e: ValueType) => mprops.onChange(e)}
    />
  );
};

export default MinuteSelect;
