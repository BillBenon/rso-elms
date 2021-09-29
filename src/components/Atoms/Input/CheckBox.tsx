import '../../../styles/components/Atoms/input/checkbox.scss';

import React from 'react';

interface Props {
  label: string;
  name: string;
  error?: string | null;
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
        className={
          'checkbox text-primary-500 mr-2 focus:ring-primary-400 focus:ring-opacity-25 border border-gray-300 rounded' +
          className
        }
      />
      <label className="checkbox-label">{label}</label>
    </>
  );
}
