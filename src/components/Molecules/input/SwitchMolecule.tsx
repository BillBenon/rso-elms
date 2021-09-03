import React, { MouseEvent, ReactNode } from 'react';

import Switch from '../../Atoms/Input/Switch';
import Error from '../../Atoms/Text/Error';
import ILabel from '../../Atoms/Text/ILabel';

type PropType = {
  children: ReactNode;
  value: boolean;
  error?: string;
  handleChange: (_active: boolean, _event: MouseEvent<HTMLButtonElement>) => void;
};

/**
 * Switch molecule  component that has error output
 */
export default function SwitchMolecule({
  value = false,
  children,
  handleChange,
  error,
}: PropType) {
  return (
    <div>
      <ILabel>{children}</ILabel>
      <Switch value={value} handleChange={handleChange}></Switch>
      {error && <Error>{error}</Error>}
    </div>
  );
}
