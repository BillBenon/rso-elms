import React from 'react';

import { SelectData, ValueType } from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';

export default function AddPrerequesitForm() {
  function handleChange(_e: ValueType) {}

  const prere: SelectData[] = [
    { value: 'Math', label: 'Mathematics' },
    { value: 'Physics', label: 'Physics' },
    { value: 'English', label: 'English' },
  ];

  return (
    <form>
      <DropdownMolecule
        options={prere}
        name="prerequesiteCourse"
        handleChange={handleChange}>
        Prerequsite Modules
      </DropdownMolecule>
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
      {/* save button */}
      <div className="mt-5">
        <Button type="button" full>
          Save
        </Button>
      </div>
    </form>
  );
}
