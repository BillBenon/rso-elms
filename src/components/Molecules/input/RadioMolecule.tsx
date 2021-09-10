import React, { ReactNode } from 'react';

import { SelectData, ValueType } from '../../../types';
import Radio from '../../Atoms/Input/Radio';
import Error from '../../Atoms/Text/Error';
import ILabel from '../../Atoms/Text/ILabel';

type PropType = {
  children: ReactNode;
  type?: 'inline' | 'block';
  value?: string;
  name: string;
  error?: string;
  loading?: boolean;
  list: SelectData[];
  handleChange: (_e: ValueType) => void;
};

/**
 * Radio molecule  component that has error output
 */
export default function RadioMolecule({
  value = '',
  name,
  type = 'inline',
  children,
  handleChange,
  error,
  loading = false,
  list,
}: PropType) {
  return (
    <div>
      {loading ? (
        <div className="animate-pulse w-24 h-4 bg-secondary rounded"></div>
      ) : (
        <>
          <ILabel>{children}</ILabel>
          <Radio
            name={name}
            value={value}
            type={type}
            list={list}
            handleChange={handleChange}></Radio>
          {error && <Error>{error}</Error>}
        </>
      )}
    </div>
  );
}
