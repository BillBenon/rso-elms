import React from 'react';

import { ValueType } from '../../../types';
import Input from '../../Atoms/Input/Input';
import Error from '../../Atoms/Text/Error';
import ILabel from '../../Atoms/Text/ILabel';

type IError = {
  name: string;
  value: string;
  handleChange: (_e: ValueType) => void;
  children: React.ReactNode;
  error: string | null;
  placeholder?: string;
  type?: string;
};
export default function InputMolecule({
  name,
  value,
  handleChange,
  children,
  error,
  placeholder = '',
  type = 'text',
}: IError) {
  return (
    <div className="flex flex-col gap-3">
      <ILabel>{children}</ILabel>
      <Input
        name={name}
        placeholder={placeholder}
        fcolor={error ? 'error' : undefined}
        type={type}
        value={value}
        /* @ts-ignore */
        handleChange={(event) => handleChange({ name, value, event })}
      />
      <Error>{error && error}</Error>
    </div>
  );
}
