import React from 'react';
import Select from 'react-select';

import { DropdownProps } from '../../../types';
import Error from '../../Atoms/Text/Error';
import Heading from '../../Atoms/Text/Heading';

interface Props extends DropdownProps {
  label?: string;
  error?: string;
}
export default function DropdownMolecule(props: Props) {
  return (
    <div className="py-2">
      <Heading fontSize="sm" fontWeight="semibold" className="py-2">
        {props.label}
      </Heading>
      <Select
        isDisabled={props.disabled || false}
        name={props.name}
        options={props.options}
        placeholder={props.placeholder || `Select ${props.name}`}
        onChange={(e: object) => props.onChange({ ...e, name: props.name })}
        className={`w-${props.width || 'full md:w-80'} select ${props.className || ''}`}
        isMulti={props.isMulti}
        isSearchable={props.searchable}
        defaultValue={props.defaultValue || null}
        getOptionLabel={props.getOptionLabel}
        getOptionValue={props.getOptionValue}
        noOptionsMessage={(_query: any) =>
          `No ${props.name} matched "${_query.inputValue}"`
        }
        styles={{
          control: (base: any, _state: any) => ({
            ...base,
            borderColor: props.error ? 'rgb(238,64,64)' : base.borderColor,
          }),
        }}
      />
      {props.error ? <Error>{props.error}</Error> : <></>}
    </div>
  );
}
