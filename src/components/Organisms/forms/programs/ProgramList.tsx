import React, { FormEvent } from 'react';

import { CommonFormProps, ValueType } from '../../../../types';
import Badge from '../../../Atoms/custom/Badge';
import Button from '../../../Atoms/custom/Button';
import Heading from '../../../Atoms/Text/Heading';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
interface PropType<K> extends CommonFormProps<K> {}

function ProgramList<E>({ onSubmit }: PropType<E>) {
  function handleChange(e: ValueType) {
    console.log(e);
  }

  function submitForm(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:
    if (onSubmit) onSubmit(e);
  }
  return (
    <form onSubmit={submitForm}>
      <div className="flex justify-between items-center">
        <Heading fontWeight="semibold">RMA Gako</Heading>
        <Badge badgecolor="success">Active</Badge>
      </div>
      <div className="mt-6">
        <Heading fontWeight="semibold">
          A short desctiption of registration control
        </Heading>
        <p id="course-card-description" className="text-txt-secondary text-sm mt-4">
          02 Sep 2021 - 02 Nov 2021
        </p>
      </div>
      <RadioMolecule
        value="cadetteprogram"
        type="block"
        options={[
          { value: 'cadetteprogram', label: 'Cadette Program' },
          { value: 'program', label: 'Program' },
          { value: 'cadette', label: 'Cadette' },
          { value: 'progra', label: 'Progra' },
        ]}
        handleChange={handleChange}
        name="program"
      />
      <div className="mt-5">
        <Button type="submit">Register</Button>
      </div>
    </form>
  );
}

export default ProgramList;
