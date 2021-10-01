import React from 'react';

import { SelectData, ValueType } from '../../../../types';
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

    const dayOptions: SelectData[] = [];
    for (let i = 1; i <= days; ++i) {
      dayOptions.push({ value: i + '', label: i + '' });
    }
    return dayOptions;
  };

  let days = renderDateOptions();
  let newDefaultValue = days.find((month) => month.value === dprop.defaultValue);

  return (
    <DropDown
      defaultValue={newDefaultValue}
      disabled={dprop.disabled}
      name={dprop.name}
      placeholder={dprop.placeholder}
      width={dprop.width}
      className={dprop.className}
      options={days}
      handleChange={(e: ValueType) => dprop.onChange(e)}
    />
  );
};

export default DaySelect;
