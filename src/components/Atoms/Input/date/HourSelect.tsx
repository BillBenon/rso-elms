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

const HourSelect = (mprops: MProp) => {
  const renderHourOptions = () => {
    let hr = 24;
    const hrOptions: { value: string; label: string }[] = [];
    for (let i = 0; i < hr; ++i) {
      hrOptions.push({
        value: i < 10 ? '0' + i : '' + i,
        label: i < 10 ? '0' + i : '' + i,
      });
    }
    return hrOptions;
  };

  return (
    <DropDown
      disabled={mprops.disabled}
      name={mprops.name}
      placeholder={mprops.placeholder}
      width={mprops.width}
      className={mprops.className}
      options={renderHourOptions()}
      onChange={(e: ValueType) => mprops.onChange(e)}
    />
  );
};

export default HourSelect;
