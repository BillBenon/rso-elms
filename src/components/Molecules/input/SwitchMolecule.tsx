import React, { MouseEvent, ReactNode } from 'react';

import Switch from '../../atoms/Input/Switch';
import Error from '../../atoms/Text/Error';
import ILabel from '../../atoms/Text/ILabel';

type PropType = {
  children: ReactNode;
  value: boolean;
  loading: boolean;
  error?: string;
  handleChange: (_active: boolean, _event: MouseEvent<HTMLButtonElement>) => void;
};

/**
 * Switch molecule  component that has error output
 */
export default function SwitchMolecule({
  value = false,
  children,
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
          <Switch value={value} handleChange={handleChange}></Switch>
          {error && <Error>{error}</Error>}
        </>
      )}
    </div>
  );
}
