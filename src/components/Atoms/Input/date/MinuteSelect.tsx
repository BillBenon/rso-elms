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
  padding?: number;
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

  let defaultValue: string;
  if (mprops.defaultValue)
    defaultValue =
      parseInt(mprops.defaultValue) < 10
        ? `0${mprops.defaultValue}`
        : mprops.defaultValue;

  let minutes = renderMinuteOptions();
  let newDefaultValue = minutes.find((minute) => minute.value === defaultValue);

  return (
    <DropDown
      defaultValue={newDefaultValue}
      name={mprops.name}
      placeholder={mprops.placeholder}
      padding={mprops.padding}
      width={mprops.width}
      className={mprops.className}
      options={renderMinuteOptions()}
      handleChange={(e: ValueType) => mprops.onChange(e)}
    />
  );
};

export default MinuteSelect;
