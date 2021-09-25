import React, { FormEvent } from 'react';

import { CommonFormProps, SigninPropTypes, ValueType } from '../../../../types';
import Badge from '../../../Atoms/custom/Badge';
import Button from '../../../Atoms/custom/Button';
import Heading from '../../../Atoms/Text/Heading';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
interface PropType<K> extends CommonFormProps<K> {
  academy?: SigninPropTypes;
}

function ProgramList<E>({ academy, onSubmit }: PropType<E>) {
  function handleChange(e: ValueType) {
    console.log(e);
  }

  function submitForm(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:
    if (onSubmit) onSubmit(e);
  }
  return academy != undefined ? (
    <form onSubmit={submitForm}>
      <div className="flex justify-between items-center">
        <Heading fontWeight="semibold">{academy.code}</Heading>
        {academy.status && (
          <Badge badgecolor={academy.status.type}>{academy.status.text}</Badge>
        )}
      </div>
      <div className="mt-6">
        <Heading fontWeight="semibold">{academy.title}</Heading>
        <p id="course-card-description" className="text-txt-secondary text-sm mt-4">
          {academy.description}
        </p>
      </div>
      <RadioMolecule
        value="cadetteprogram"
        type="block"
        options={academy.programs}
        handleChange={handleChange}
        name="program"
      />
      <div className="mt-5">
        <Button type="submit">Register</Button>
      </div>
    </form>
  ) : (
    <Heading fontWeight="semibold"> No programs provided</Heading>
  );
}

export default ProgramList;
