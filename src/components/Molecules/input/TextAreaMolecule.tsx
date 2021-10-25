import React from 'react';

import { CommonInputProps, ValueType } from '../../../types';
import Textarea from '../../Atoms/Input/Textarea';
import Error from '../../Atoms/Text/Error';
import ILabel from '../../Atoms/Text/ILabel';

interface ITextareaMolecule<T> extends CommonInputProps<T> {
  name: string;
  value: string | undefined;
  handleChange: (_e: ValueType) => void;
  children: React.ReactNode;
  error?: string;
  placeholder?: string;
  type?: string;
}
export default function TextAreaMolecule<T>({
  name,
  value,
  handleChange,
  children,
  error = '',
  placeholder = '',
  type = 'text',
  ...attrs
}: ITextareaMolecule<T>) {
  return (
    <div className="flex flex-col gap-3">
      <ILabel size="sm" weight="medium">
        {children}
      </ILabel>
      <Textarea
        {...attrs}
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
