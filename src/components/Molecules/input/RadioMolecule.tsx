import React, { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';

import { SelectData } from '../../../types';
import Radio from '../../Atoms/Input/Radio';
import Error from '../../Atoms/Text/Error';
import ILabel from '../../Atoms/Text/ILabel';

type PropType = {
  children: ReactNode;
  error?: string;
  handleChange: (
    _value: string,
    _event: MouseEventHandler<HTMLDivElement> | KeyboardEventHandler<HTMLDivElement>,
  ) => void;
};

/**
 * Radio molecule  component that has error output
 */
export default function RadioMolecule({ children, handleChange, error }: PropType) {
  const list: SelectData[] = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];
  return (
    <div>
      <ILabel>{children}</ILabel>
      <Radio list={list} handleChange={handleChange}></Radio>
      {error && <Error>{error}</Error>}
    </div>
  );
}
