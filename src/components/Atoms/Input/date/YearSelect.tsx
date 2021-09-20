import React from 'react';

import { SelectData, ValueType } from '../../../../types';
import DropDown from '../Dropdown';

type YProp = {
  value: number;
  onChange: Function;
  id?: string;
  name: string;
  placeholder?: string;
  width?: string;
  defaultValue?: string;
  start?: number;
  end?: number;
  reverse?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

type YOptProp = {
  start?: number;
  end?: number;
  reverse?: boolean;
  defaultValue?: string;
};

const YearSelect = (props: YProp) => {
  const renderYearOptions = ({
    start = 1910,
    end = new Date().getFullYear(),
    reverse = false,
  }: YOptProp) => {
    const years = [];
    if (start <= end) {
      for (let i = start; i <= end; ++i) {
        years.push(i);
      }
    } else {
      for (let i = end; i >= start; --i) {
        years.push(i);
      }
    }
    if (reverse) {
      years.reverse();
    }
    const yearOptions: SelectData[] = [];
    years.forEach((year) => {
      yearOptions.push({ value: year + '', label: year + '' });
    });
    return yearOptions;
  };

  return (
    <DropDown
      name={props.name}
      placeholder={props.placeholder}
      className={props.className}
      options={renderYearOptions({
        start: props.start,
        end: props.end,
        reverse: false,
        defaultValue: props.defaultValue,
      })}
      width={props.width}
      onChange={(e: ValueType) => props.onChange(e)}
    />
  );
};

export default YearSelect;
