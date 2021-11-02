import React, { FormEvent, useState } from 'react';

import { GenericStatus, ValueType } from '../../../types';
import { CreateEvent, eventCategory } from '../../../types/services/event.types';
import { getDropDownStatusOptions } from '../../../utils/getOption';
import Button from '../../Atoms/custom/Button';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';

export default function NewEvent() {
  const [values, setvalues] = useState<CreateEvent>({
    code: '',
    description: '',
    eventCategory: eventCategory.VISIT,
    name: '',
    status: GenericStatus.ACTIVE,
  });

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputMolecule
          name="name"
          placeholder="Event title"
          value={values.name}
          handleChange={handleChange}>
          Intake title
        </InputMolecule>
        <div className="pb-4">
          <DropdownMolecule
            name="eventCategory"
            handleChange={handleChange}
            options={getDropDownStatusOptions(eventCategory)}
            placeholder="Select event category">
            Event Category
          </DropdownMolecule>
        </div>
        <TextAreaMolecule
          name="description"
          placeholder="Event Description"
          value={values.description}
          handleChange={handleChange}>
          Event Description
        </TextAreaMolecule>
        <div className="pt-4">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
