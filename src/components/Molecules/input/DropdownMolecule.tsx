import React, { ReactNode } from 'react';
import Select from 'react-select';

import { DropdownProps } from '../../../types';
import Error from '../../Atoms/Text/Error';
import ILabel from '../../Atoms/Text/ILabel';

interface Props extends DropdownProps {
  children?: ReactNode | string;
  error?: string;
}
export default function DropdownMolecule(props: Props) {
  return (
    <div className="">
      <ILabel size="sm" weight="semibold">
        {props.children}
      </ILabel>
      <Select
        isDisabled={props.disabled || false}
        name={props.name}
        options={props.options}
        placeholder={props.placeholder || `Select ${props.name}`}
        onChange={(e: any) => props.onChange({ ...e, name: props.name })}
        className={`pt-2 w-${props.width || 'full md:w-80'} select ${
          props.className || ''
        }`}
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
            borderColor: props.error ? 'rgb(238,64,64)' : '#F0F1F1',
          }),
        }}
      />
      {props.error ? <Error>{props.error}</Error> : <></>}
    </div>
  );
}
