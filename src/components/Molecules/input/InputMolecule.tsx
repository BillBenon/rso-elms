import React from 'react';

import { ValueType } from '../../../types';
import Input from '../../Atoms/Input/Input';
import Error from '../../Atoms/Text/Error';
import ILabel from '../../Atoms/Text/ILabel';

type IInputMolecule = {
  name: string;
  value: string;
  handleChange: (_e: ValueType) => void;
  children: React.ReactNode;
  error?: string;
  placeholder?: string;
  type?: string;
};
export default function InputMolecule({
  name,
  value,
  handleChange,
  children,
  error = '',
  placeholder = '',
  type = 'text',
}: IInputMolecule) {
  return (
    <div className="flex flex-col gap-2 py-2">
      <ILabel className="capitalize" size="sm" weight="medium">
        {children}
      </ILabel>
      <Input
        name={name}
        placeholder={placeholder}
        fcolor={error ? 'error' : undefined}
        type={type}
        value={value}
        /* @ts-ignore */
        handleChange={handleChange}
      />
      <Error>{error && error}</Error>
    </div>
  );
}
