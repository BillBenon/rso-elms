import React from 'react';

import DropDown from '../../../../styles/components/Atoms/custom/Dropdown';
import { ValueType } from '../../../../types';
import { getDaysInMonth } from '../../../../utils/date-helper';

type DProp = {
  year: number;
  month: number;
  value: number;
  onChange: Function;
  id?: string;
  name: string;
  defaultValue?: string;
  endYearGiven?: boolean;
  required?: boolean;
  disabled?: boolean;
  classes?: string;
  optionClasses?: string;
};

type DOptProp = {
  month: number;
  year: number;
  endYearGiven?: boolean;
  optionClasses?: string;
  defaultValue?: string;
};

const DaySelect = (dprop: DProp) => {
  const renderDateOptions = (props: DOptProp) => {
    let days = props.month ? getDaysInMonth(props.year, props.month) : 31;

    const today = new Date();
    if (!props.endYearGiven) {
      if (props.year === today.getFullYear() && props.month === today.getMonth()) {
        days = today.getDate();
      }
    }
    const dayOptions: { key: number; value: number }[] = [];
    for (let i = 1; i <= days; ++i) {
      dayOptions.push({ key: i, value: i });
    }
    return dayOptions;
  };

  return (
    <DropDown
      name={dprop.name}
      options={renderDateOptions({
        month: dprop.month,
        year: dprop.year,
        endYearGiven: dprop.endYearGiven,
        optionClasses: dprop.optionClasses,
        defaultValue: dprop.defaultValue,
      })}
      onChange={(e: ValueType) => dprop.onChange(e)}
    />
  );
};

export default DaySelect;
