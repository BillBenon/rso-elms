import React, { FormEvent } from 'react';

import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface PropType {
  onSubmit: <E>(_e: FormEvent<E>) => void;
}

export default function NewRole({ onSubmit }: PropType) {
  function handleChange() {}
  function submitForm<T>(e: FormEvent<T>) {
    onSubmit(e);
  }
  return (
    <form onSubmit={submitForm}>
      {/* model name */}
      <InputMolecule value="" error="" handleChange={handleChange} name="model-name">
        Role name
      </InputMolecule>
      {/* model code
    {/* module description */}
      <TextAreaMolecule value="" name="description" handleChange={handleChange}>
        Descripiton
      </TextAreaMolecule>

      {/* save button */}
      <div className="mt-5">
        <Button type="submit" full>
          Add
        </Button>
      </div>
    </form>
  );
}
