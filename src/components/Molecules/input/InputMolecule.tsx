import React from 'react';

import { CommonInputProps, ValueType } from '../../../types';
import Input from '../../Atoms/Input/Input';
import Error from '../../Atoms/Text/Error';
import ILabel from '../../Atoms/Text/ILabel';

interface IInputMolecule<T> extends CommonInputProps<T> {
  value: string | undefined;
  handleChange: (_e: ValueType) => void;
  children: React.ReactNode;
  error?: string;
  placeholder?: string;
  type?: string;
  // readonly: boolean;
}
export default function InputMolecule<T>({
  name,
  value,
  handleChange,
  children,
  error = '',
  placeholder = '',
  type = 'text',
  readOnly = false,
  ...attrs
}: IInputMolecule<T>) {
  return (
    <div className="flex flex-col gap-2 pb-2" {...attrs}>
      <ILabel className="capitalize" size="sm" weight="medium">
        {children}
      </ILabel>
      <Input
        {...attrs}
        readonly={readOnly}
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
