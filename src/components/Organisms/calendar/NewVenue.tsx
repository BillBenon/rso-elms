import React, { FormEvent, useState } from 'react';

import { GenericStatus, ValueType } from '../../../types';
import { CreateVenue, venueType } from '../../../types/services/event.types';
import { getDropDownStatusOptions } from '../../../utils/getOption';
import Button from '../../Atoms/custom/Button';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../Molecules/input/InputMolecule';

export default function NewVenue() {
  const [values, setvalues] = useState<CreateVenue>({
    venueType: venueType.CLASS,
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
          placeholder="Venue name"
          value={values.name}
          handleChange={handleChange}>
          Intake title
        </InputMolecule>
        <DropdownMolecule
          name="venueType"
          handleChange={handleChange}
          options={getDropDownStatusOptions(venueType)}
          placeholder="Select venue category">
          Venue type
        </DropdownMolecule>
        <div className="pt-4">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
