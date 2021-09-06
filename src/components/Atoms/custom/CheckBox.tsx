import React from 'react';
import '../../../styles/components/atoms/custom/checkbox.scss';
import ILabel from '../Text/ILabel';

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
        className={'inline checkbox ' + className}
      />
      <label className="checkbox-label">{label}</label>
    </>
  );
}
