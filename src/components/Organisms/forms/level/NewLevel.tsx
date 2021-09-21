import React, { FormEvent } from 'react';

import { CommonFormProps, ValueType } from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
interface PropType<K> extends CommonFormProps<K> {}

function NewLevel<E>({ onSubmit }: PropType<E>) {
  function handleChange(e: ValueType) {
    console.log(e);
  }

  function submitForm(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:
    if (onSubmit) onSubmit(e);
  }

  return (
    <form onSubmit={submitForm}>
      <InputMolecule
        value=""
        error=""
        handleChange={handleChange}
        placeholder="Enter level name"
        name="level-name">
        Level name
      </InputMolecule>
      <InputMolecule
        value=""
        error=""
        handleChange={handleChange}
        placeholder="Enter level code"
        name="level-name">
        Level code
      </InputMolecule>
      <Button>Save</Button>
    </form>
  );
}

export default NewLevel;
