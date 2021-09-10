import React, { ReactNode } from 'react';

import { ValueType } from '../../../types';
import Switch from '../../Atoms/Input/Switch';
import Error from '../../Atoms/Text/Error';
import ILabel from '../../Atoms/Text/ILabel';

type PropType = {
  children: ReactNode;
  value: boolean;
  name: string;
  loading: boolean;
  error?: string;
  handleChange: (_e: ValueType) => void;
};

/**
 * Switch molecule  component that has error output
 */
export default function SwitchMolecule({
  value = false,
  children,
  name,
  loading = false,
  handleChange,
  error,
}: PropType) {
  return (
    <div>
      {loading ? (
        <div className="animate-pulse w-24 h-4 bg-secondary rounded"></div>
      ) : (
        <>
          <ILabel>{children}</ILabel>
          <Switch name={name} value={value} handleChange={handleChange}></Switch>
          {error && <Error>{error}</Error>}
        </>
      )}
    </div>
  );
}
