import '../../../styles/components/atoms/custom/checkbox.scss';

import React from 'react';

interface Props {
  label: string;
  disabled?: boolean;
  onChange: Function;
  checked?: boolean;
  value: string;
  className?: string;
}

export default function Checkbox({
  label,
  value,
  onChange,
  checked = false,
  disabled = false,
  className = '',
}: Props) {
  return (
    <>
      <input
        type="checkbox"
        name="checkbox"
        disabled={disabled}
        checked={checked}
        value={value}
        onChange={() => onChange()}
        className={'checkbox ' + className}
      />
      <label className="checkbox-label">{label}</label>
    </>
  );
}
