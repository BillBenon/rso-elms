import React from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import InputMolecule from '../../Molecules/input/InputMolecule';
import RadioMolecule from '../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';

export default function NewModuleForm() {
  function handleChange(e: ValueType) {
    console.log(e);
  }

  return (
    <form>
      {/* model name */}
      <InputMolecule value="" error="" handleChange={handleChange} name="model-name">
        Module name
      </InputMolecule>

      {/* model code
    <InputMolecule
      value=""
      error=""
      handleChange={handleChange}
      name="model-name">
      Module code
    </InputMolecule> */}

      {/* module description */}
      <TextAreaMolecule value="" name="description" handleChange={handleChange}>
        Descripiton
      </TextAreaMolecule>

      {/* model initial status */}
      <RadioMolecule
        className="mt-4"
        value="ACTIVE"
        name="status"
        list={[
          { label: 'Active', value: 'ACTIVE' },
          { label: 'Inactive', value: 'INACTIVE' },
        ]}
        handleChange={handleChange}>
        Status
      </RadioMolecule>

      {/* model has prerequesit */}
      <RadioMolecule
        className="mt-4"
        name="prerequsites"
        list={[
          { label: 'Yes', value: 'YES' },
          { label: 'No', value: 'NO' },
        ]}
        handleChange={handleChange}>
        Has Prerequesites
      </RadioMolecule>

      {/* save button */}
      <div className="mt-5">
        <Button full>Save</Button>
      </div>
    </form>
  );
}
