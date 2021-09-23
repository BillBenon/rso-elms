import React from 'react';

import { Page, ValueType } from '../../../types';
import Textarea from '../../Atoms/Input/Textarea';
import Error from '../../Atoms/Text/Error';
import ILabel from '../../Atoms/Text/ILabel';

type ITextareaMolecule = {
  name: string;
  value: string;
  handleChange: (_e: ValueType, _page: Page) => void;
  children: React.ReactNode;
  error?: string;
  placeholder?: string;
  type?: string;
};
export default function TextAreaMolecule({
  name,
  value,
  handleChange,
  children,
  error = '',
  placeholder = '',
  type = 'text',
  ...attrs
}: ITextareaMolecule) {
  return (
    <div className="flex flex-col gap-3">
      <ILabel weight="medium">{children}</ILabel>
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
