import React from 'react';
import Select from 'react-select';

import { commonInputProps } from '../../../types';
import Error from '../../Atoms/Text/Error';
import Heading from '../../Atoms/Text/Heading';

interface Props extends commonInputProps {
  disabled?: boolean;
  isMulti?: boolean;
  getOptionLabel?: any;
  getOptionValue?: any;
  noOptionsMessage?: string;
  width?: string;
  label?: string;
  error?: string;
}
export default function DropdownMolecule(props: Props) {
  // const style=
  return (
    <div className="py-2">
      <Heading fontSize="sm" fontWeight="semibold" className="py-2">
        {props.label}
      </Heading>
      <Select
        disabled={props.disabled || false}
        name={props.name}
        options={props.options}
        placeholder={props.placeholder || `Select ${props.name}`}
        onChange={(e: object) => props.onChange({ ...e, name: props.name })}
        className={`w-${props.width || 'full md:w-72'} select ${props.className || ''}`}
        noOptionsMessage={props.noOptionsMessage || `no ${props.name} available`}
        isMulti={props.isMulti}
        styles={{
          control: (base: any, _state) => ({
            ...base,
            borderColor: props.error ? 'rgb(238,64,64)' : base.borderColor,
          }),
        }}
      />
      {props.error ? <Error>{props.error}</Error> : <></>}
    </div>
  );
}
