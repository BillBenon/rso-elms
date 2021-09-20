import React from 'react';
import Select from 'react-select';

import { DropdownProps } from '../../../types';

export default function DropDown(props: DropdownProps) {
  // @tsc-ignore
  return (
    <>
      {/*@tsc-ignore*/}
      <Select
        isDisabled={props.disabled || false}
        name={props.name}
        options={props.options}
        placeholder={props.placeholder || `Select ${props.name}`}
        onChange={(e: any) => props.onChange({ ...e, name: props.name })}
        className={`w-${props.width || 'full md:w-80'} select ${props.className || ''}`}
        isMulti={props.isMulti}
        isSearchable={props.searchable}
        defaultValue={props.defaultValue || null}
        getOptionLabel={props.getOptionLabel}
        getOptionValue={props.getOptionValue}
        noOptionsMessage={(_query: any) =>
          `No ${props.name} matched "${_query.inputValue}"`
        }
        closeMenuOnSelect={!props.isMulti}
        styles={{
          control: (base: any, _state: any) => ({
            ...base,
            backgroundColor: 'transparent',
            borderColor: props.hasError ? 'rgb(238,64,64)' : 'rgb(240, 241, 241)',
            borderWidth: 2,
            borderRadius: 8,
            cursor: 'pointer',
            minHeight: 48,
          }),
          clearIndicator: (_base: any, _state: any) => ({
            display: 'none',
          }),
          container: (base: any, _state: any) => ({
            ...base,
          }),
        }}
      />
    </>
  );
}
