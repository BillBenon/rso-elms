import React from 'react';

import { ValueType } from '../../../../types';
import { getDaysInMonth } from '../../../../utils/date-helper';
import DropDown from '../Dropdown';

type DProp = {
  year: number;
  month: number;
  value: number;
  placeholder?: string;
  width?: string;
  onChange: Function;
  id?: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

const DaySelect = (dprop: DProp) => {
  const renderDateOptions = () => {
    let days = dprop.month ? getDaysInMonth(dprop.year, dprop.month) : 31;

    const dayOptions: { value: number; label: number }[] = [];
    for (let i = 1; i <= days; ++i) {
      dayOptions.push({ value: i, label: i });
    }
    return dayOptions;
  };

  return (
    <DropDown
      name={dprop.name}
      placeholder={dprop.placeholder}
      width={dprop.width}
      className={dprop.className}
      options={renderDateOptions()}
      onChange={(e: ValueType) => dprop.onChange(e)}
    />
  );
};

export default DaySelect;
