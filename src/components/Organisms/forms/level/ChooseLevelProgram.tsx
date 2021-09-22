import React from 'react';

import { ValueType } from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';

function ChooseLevelProgram() {
  function handleChange(e: ValueType) {
    console.log(e);
  }

  return (
    <form>
      <DropdownMolecule
        placeholder="Select Program"
        name="program"
        onChange={handleChange}
        options={[
          { value: 'cadetteprogram', label: 'Cadette Program' },
          { value: 'program', label: 'Program' },
          { value: 'cadette', label: 'Cadette' },
          { value: 'progra', label: 'Progra' },
        ]}>
        Choose Program
      </DropdownMolecule>
      <div className="py-6 ">
        <Button type="button">Save</Button>
      </div>
    </form>
  );
}

export default ChooseLevelProgram;
