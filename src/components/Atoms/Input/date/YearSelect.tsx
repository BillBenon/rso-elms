import React from 'react';

import DropDown from '../../../../styles/components/Atoms/custom/Dropdown';
import { ValueType } from '../../../../types';

type YProp = {
  value?: string;
  onChange: Function;
  id?: string;
  name: string;
  defaultValue?: string;
  start?: number;
  end?: number;
  reverse?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  optionClasses?: string;
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
      for (let i = start; i < end; ++i) {
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
    const yearOptions: { key: number; value: number }[] = [];
    years.forEach((year, index) => {
      yearOptions.push({ key: index, value: year });
    });
    return yearOptions;
  };

  return (
    <DropDown
      name={props.name}
      className={props.className}
      options={renderYearOptions({
        start: props.start,
        end: new Date().getFullYear(),
        reverse: false,
      })}
      onChange={(e: ValueType) => props.onChange(e)}
    />
    // <select
    //   id={id}
    //   name={name}
    //   className={classes}
    //   required={required === true}
    //   disabled={disabled === true}
    //   onBlur={(e: ValueType) => onChange(e)}
    //   value={value}>
    //   {renderYearOptions()}
    // </select>
  );
};

export default YearSelect;
