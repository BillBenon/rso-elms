import React from 'react';

import { ValueType } from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';

export default function AddPrerequesitForm() {
  function handleChange(e: ValueType) {
    console.log(e);
  }

  return (
    <form>
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
      {/* save button */}
      <div className="mt-5">
        <Button type="button" full>
          Save
        </Button>
      </div>
    </form>
  );
}
