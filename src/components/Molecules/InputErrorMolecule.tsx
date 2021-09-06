import React, { useState } from 'react';

import Input from '../Atoms/Input/Input';
import Error from '../Atoms/Text/Error';
import ILabel from '../Atoms/Text/ILabel';

type IError = { children: React.ReactNode; error?: string };

export default function InputErrorMolecule({ children, error }: IError) {
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col gap-3">
      <ILabel>{children}</ILabel>
      <Input
        placeholder="First"
        fcolor={error ? 'error' : undefined}
        type="text"
        value={name}
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
      />
      <Error>{error && error}</Error>
    </div>
  );
}
