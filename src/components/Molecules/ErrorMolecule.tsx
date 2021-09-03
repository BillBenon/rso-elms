import React, { useState } from 'react';

import Input from '../Atoms/Input/Input';
import Error from '../Atoms/Text/Error';

type IError = { children: React.ReactNode };

export default function ErrorMolecule({ children }: IError) {
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col gap-3">
      <Input
        placeholder="First"
        fcolor="error"
        type="text"
        value={name}
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
      />
      <Error>{children}</Error>
    </div>
  );
}
