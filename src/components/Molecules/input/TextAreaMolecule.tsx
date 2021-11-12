import React from 'react';

import { CommonInputProps, ValueType } from '../../../types';
import Textarea from '../../Atoms/Input/Textarea';
import Error from '../../Atoms/Text/Error';
import ILabel from '../../Atoms/Text/ILabel';

interface ITextareaMolecule<T> extends CommonInputProps<T> {
  name: string;
  value: string | undefined;
  handleChange: (_e: ValueType) => void;
  children?: React.ReactNode;
  error?: string;
  placeholder?: string;
  readOnly?: boolean;
  type?: string;
}
export default function TextAreaMolecule<T>({
  name,
  value,
  handleChange,
  children,
  error = '',
  readOnly = false,
  placeholder = '',
  type = 'text',
  ...attrs
}: ITextareaMolecule<T>) {
  return (
    <div className="flex flex-col gap-3">
      {children ? (
        <ILabel size="sm" weight="medium">
          {children}
        </ILabel>
      ) : null}
      <Textarea
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
