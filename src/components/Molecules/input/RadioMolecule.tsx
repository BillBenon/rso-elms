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
  className?: string;
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
  className,
  loading = false,
  list,
  ...attrs
}: PropType) {
  return (
    <div {...attrs} className={className}>
      {loading ? (
        <div className="animate-pulse w-24 h-4 bg-secondary rounded"></div>
      ) : (
        <>
          <ILabel>{children}</ILabel>
          <div className="mt-2">
            <Radio
              name={name}
              value={value}
              type={type}
              list={list}
              handleChange={handleChange}></Radio>
          </div>
          {error && <Error>{error}</Error>}
        </>
      )}
    </div>
  );
}
