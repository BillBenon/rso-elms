import React from 'react';
import Select from 'react-select';

interface Props {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isMulti?: boolean;
  onChange: Function;
  getOptionLabel?: any;
  getOptionValue?: any;
  options: Object[];
  className?: string;
  noOptionsMessage?: string;
}

export default function DropDown(props: Props) {
  return (
    <>
      <Select
        disabled={props.disabled || false}
        name={props.name}
        options={props.options}
        placeholder={props.placeholder || `Select ${props.name.toLowerCase()}`}
        onChange={(e: Object) => props.onChange({ ...e, name: props.name })}
        className={`w-full md:w-72 select ${props.className || ''}`}
        noOptionsMessage={props.noOptionsMessage || `no ${props.name} available`}
        isMulti={props.isMulti}
      />
    </>
  );
}
