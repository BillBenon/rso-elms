import React from 'react';

import { InputProps } from '../../../types';
import Input from '../../Atoms/Input/Input';
import Error from '../../Atoms/Text/Error';
import ILabel from '../../Atoms/Text/ILabel';

interface IInputMolecule<T> extends InputProps<T> {
  error?: string;
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
  required = true,
  ref,

  ...attrs
}: IInputMolecule<T>) {
  return (
    <div className="flex flex-col gap-2 pb-2" {...attrs}>
      <ILabel className="capitalize" size="sm" weight="medium">
        {children}
      </ILabel>
      <Input
        ref={ref}
        {...attrs}
        readonly={readOnly}
        required={required}
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
