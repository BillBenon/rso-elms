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
  className?: string;
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
  className,
  error,
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
            <Switch name={name} value={value} handleChange={handleChange}></Switch>
          </div>
          {error && <Error>{error}</Error>}
        </>
      )}
    </div>
  );
}
