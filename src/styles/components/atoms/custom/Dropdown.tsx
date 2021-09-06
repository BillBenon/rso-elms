import React from 'react';
import Select from 'react-select';

interface Props {
  name: string;
  placeholder?: string;
  disabled?: boolean;
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
  noOptionsMessage = `no ${name} available`,
}: Props) {
  return (
    <>
      <Select
        disabled={disabled}
        name={name}
        options={options}
        placeholder={placeholder}
        // getOptionLabel={getOptionLabel}
        onChange={() => onChange()}
        className={`select ${className}`}
        noOptionsMessage={noOptionsMessage}
      />
    </>
  );
}

/*
 <Select
name="vehicles"
options={companies}
placeholder={"Select vehicle"}
styles={selectCustomStyles("0.9em", "0.85em")}

getOptionLabel={option => `${option.name}`}
onChange={handleModelChange("vehicle")}
classNamePrefix="select"
isLoading={isLoading.vehicle}
noOptionsMessage={() => !isLoading.vehicle && companies.length < 1 ? 'Vehicle Not Found' : "Loading ... "}

/>

*/
