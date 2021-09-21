import '../../../styles/components/atoms/custom/checkbox.scss';

import React from 'react';

interface Props {
  label: string;
  name: string;
  error: string | null;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  value: string;
  className?: string;
}

export default function Checkbox({
  label,
  name,
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
        name={name}
        disabled={disabled}
        checked={checked}
        value={value}
        onChange={() => onChange}
        className={'checkbox ' + className}
      />
      <label className="checkbox-label">{label}</label>
    </>
  );
}
