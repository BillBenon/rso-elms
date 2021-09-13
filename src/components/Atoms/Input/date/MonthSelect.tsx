import React from 'react';

import DropDown from '../../../../styles/components/Atoms/custom/Dropdown';
import { ValueType } from '../../../../types';
import { monthNum } from '../../../../utils/date-helper';

type MProp = {
  year: number;
  value: number;
  onChange: (_e: ValueType) => void;
  defaultValue?: string;
  numeric?: boolean;
  short?: boolean;
  caps?: boolean;
  endYearGiven?: boolean;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name: string;
  classes?: string;
  optionClasses?: string;
};

type MOptProp = {
  endYearGiven?: boolean;
  year: number;
  numeric?: boolean;
  caps?: boolean;
  short?: boolean;
  optionClasses?: string;
  defaultValue?: string;
};

const MonthSelect = (mprops: MProp) => {
  const renderMonthOptions = (props: MOptProp) => {
    const today = new Date();
    let months = [];
    let month = 11;
    if (!props.endYearGiven) {
      if (month && parseInt(month.toString()) === today.getFullYear())
        month = today.getMonth();
    }
    if (props.numeric) {
      for (let i = 0; i <= month; ++i) {
        months.push((i + 1).toString());
      }
    } else {
      for (let i = 0; i <= month; ++i) {
        months.push(monthNum[i]);
      }
      if (props.caps) {
        months = months.map((month) => {
          return month.toUpperCase();
        });
      }
      if (props.short) {
        months = months.map((month) => {
          return month.substring(0, 3);
        });
      }
    }
    const monthOptions: { key: number; value: string }[] = [];
    months.forEach((month, index) => {
      monthOptions.push({ key: index, value: month });
    });
    return monthOptions;
  };

  return (
    <DropDown
      name={mprops.name}
      options={renderMonthOptions({
        endYearGiven: mprops.endYearGiven,
        year: mprops.year,
        numeric: mprops.numeric,
        caps: mprops.caps,
        short: mprops.short,
      })}
      onChange={(e: ValueType) => mprops.onChange(e)}
    />
  );
};

export default MonthSelect;
