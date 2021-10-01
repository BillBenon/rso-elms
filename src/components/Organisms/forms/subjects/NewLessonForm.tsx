import React, { FormEvent } from 'react';

import { CommonFormProps, ValueType } from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface PropType<K> extends CommonFormProps<K> {}

export default function NewLessonForm<E>({ onSubmit }: PropType<E>) {
  function handleChange(_e: ValueType) {}

  function submitForm(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:
    if (onSubmit) onSubmit(e);
  }

  return (
    <form onSubmit={submitForm}>
      {/* TODO: use readonly dropdown to indicate module name */}

      {/* model name */}
      <InputMolecule value="" error="" handleChange={handleChange} name="lesson-name">
        Lesson name
      </InputMolecule>
      {/* model code

      {/* module description */}
      <TextAreaMolecule value="" name="description" handleChange={handleChange}>
        Lesson description
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

      {/* TODO: checkbox, where user could choose subject  */}

      {/* save button */}
      <div className="mt-5">
        <Button type="submit" full>
          Add
        </Button>
      </div>
    </form>
  );
}
