import React from 'react';
import Select from 'react-select';

import { DropdownProps } from '../../../types';

export default function DropDown(props: DropdownProps) {
  return (
    <>
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
            borderColor: '#F0F1F1',
          }),
        }}
      />
    </>
  );
}
