import React from 'react';

import Input from '../../atoms/Input/Input';
import Error from '../../atoms/Text/Error';
import ILabel from '../../atoms/Text/ILabel';

type IError = {
  name: string;
  value: string;
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
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
        handleChange={handleChange}
      />
      <Error>{error && error}</Error>
    </div>
  );
}
