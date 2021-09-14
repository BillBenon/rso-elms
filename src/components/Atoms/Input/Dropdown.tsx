import React from 'react';
import Select from 'react-select';

import { commonInputProps } from '../../../types';

interface Props extends commonInputProps {
  disabled?: boolean;
  isMulti?: boolean;
  getOptionLabel?: any;
  getOptionValue?: any;
  noOptionsMessage?: string;
}

export default function DropDown(props: Props) {
  return (
    <>
      <Select
        disabled={props.disabled || false}
        name={props.name}
        options={props.options}
        placeholder={props.placeholder || `Select ${props.name}`}
        onChange={(e: object) => props.onChange({ ...e, name: props.name })}
        className={`w-full md:w-72 select ${props.className || ''}`}
        noOptionsMessage={props.noOptionsMessage || `no ${props.name} available`}
        isMulti={props.isMulti}
      />
    </>
  );
}
