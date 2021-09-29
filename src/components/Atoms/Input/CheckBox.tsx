import React, { FormEvent, useState } from 'react';

import { ValueType } from '../../../types';

interface Props {
  label: string;
  name: string;
  disabled?: boolean;
  handleChange: (_e: ValueType<HTMLInputElement>) => any;
  checked?: boolean;
  value: string;
  className?: string;
}

export default function Checkbox(props: Props) {
  const [checked, setChecked] = useState(props.checked || false);

  const handleCheck = (e: FormEvent<HTMLInputElement>) => {
    setChecked(!checked);
    props.handleChange({ name: props.name, value: props.value, event: e });
  };
  return (
    <>
      <label className="inline-flex items-center">
        <input
          name={props.name}
          type="checkbox"
          className={`form-checkbox h-4 w-4 text-primary-500 mr-2 focus:ring-primary-400 focus:ring-opacity-25 border border-gray-300 rounded ${props.className}`}
          checked={checked}
          disabled={props.disabled}
          value={props.value}
          onChange={handleCheck}
        />
        <span className="text-sm px-2 text-gray-700 capitalize">{props.label}</span>
      </label>
    </>
  );
}
