import React, { FormEvent } from 'react';

import { CommonFormProps, ValueType } from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface PropType<K> extends CommonFormProps<K> {}

export default function NewSubjectForm<E>({ onSubmit }: PropType<E>) {
  function handleChange(_e: ValueType) {}

  function submitForm(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:
    if (onSubmit) onSubmit(e);
  }

  return (
    <form onSubmit={submitForm}>
      {/* model name */}
      <InputMolecule value="" error="" handleChange={handleChange} name="subject-name">
        Subject name
      </InputMolecule>
      {/* model code

      {/* module description */}
      <TextAreaMolecule value="" name="description" handleChange={handleChange}>
        Subject remarks
      </TextAreaMolecule>
      {/* program
      <DropdownMolecule name="radio" handleChange={handleChange}>
        Program
      </DropdownMolecule> */}
      {/* model initial status */}
      <RadioMolecule
        className="mt-4"
        value="ACTIVE"
        name="status"
        options={[
          { label: 'Active', value: 'ACTIVE' },
          { label: 'Inactive', value: 'INACTIVE' },
        ]}
        handleChange={handleChange}>
        Status
      </RadioMolecule>

      {/* TODO: dropdown, where user could select module on the subject */}

      {/* save button */}
      <div className="mt-5">
        <Button type="submit" full>
          Add
        </Button>
      </div>
    </form>
  );
}
