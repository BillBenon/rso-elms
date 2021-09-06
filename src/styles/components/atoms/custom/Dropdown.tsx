import React from 'react';
import Select from 'react-select';

interface Props {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isMulti?: boolean;
  onChange: Function;
  getOptionLabel?: Function;
  options: object[];
  className?: string;
  noOptionsMessage?: string;
}

export default function DropDown({
  name,
  placeholder,
  disabled = false,
  onChange,
  getOptionLabel,
  options = [],
  className = '',
  isMulti = false,
  noOptionsMessage = `no ${name} available`,
}: Props) {
  return (
    <>
      <Select
        disabled={disabled}
        name={name}
        options={options}
        placeholder={placeholder}
        onChange={() => onChange()}
        className={`select ${className}`}
        noOptionsMessage={noOptionsMessage}
        isMulti={isMulti}
      />
    </>
  );
}