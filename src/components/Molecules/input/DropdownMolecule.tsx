import React, { ReactNode } from 'react';

import { DropdownProps } from '../../../types';
import DropDown from '../../Atoms/Input/Dropdown';
import Error from '../../Atoms/Text/Error';
import ILabel from '../../Atoms/Text/ILabel';

interface Props extends DropdownProps {
  children?: ReactNode | string;
  error?: string;
}
export default function DropdownMolecule(props: Props) {
  return (
    <div className="py-2">
      <ILabel size="sm" weight="semibold">
        {props.children}
      </ILabel>
      <DropDown
        disabled={props.disabled}
        name={props.name}
        options={props.options}
        placeholder={props.placeholder || `Select ${props.name}`}
        onChange={(e: any) => props.onChange({ ...e, name: props.name })}
        className={`w-${props.width || 'full md:w-80'} select ${props.className || ''}`}
        isMulti={props.isMulti}
        searchable={props.searchable}
        defaultValue={props.defaultValue}
        getOptionLabel={props.getOptionLabel}
        getOptionValue={props.getOptionValue}
        hasError={props.error ? true : false}
        styles={{
          control: (base: any, _state: any) => ({
            ...base,
            borderColor: props.error ? 'rgb(238,64,64)' : '#F0F1F1',
          }),
        }}
      />
      <p className="pt-2">{props.error ? <Error>{props.error}</Error> : <></>}</p>
    </div>
  );
}
