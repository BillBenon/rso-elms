import React from 'react';

import Button from '../../Atoms/custom/Button';
import Heading from '../../Atoms/Text/Heading';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';

export default function AddProgramToIntake() {
  let options = [
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'French',
      value: 'fr',
    },
    {
      label: 'Kinyarwanda',
      value: 'kiny',
    },
  ];
  return (
    <div className="px-5 pb-5">
      <Heading fontSize="lg" fontWeight="semibold" className="pb-5">
        Add a program to this intake
      </Heading>

      <DropdownMolecule
        name="program"
        onChange={(e: any) => console.log(e)}
        options={options}
        placeholder="Select period type">
        Choose Program
      </DropdownMolecule>
      <DropdownMolecule
        name="academicYear"
        onChange={(e: any) => console.log(e)}
        options={options}>
        Choose Academic Year
      </DropdownMolecule>
      <DropdownMolecule
        name="oic"
        onChange={(e: any) => console.log(e)}
        options={options}>
        Choose Instructor Incharge
      </DropdownMolecule>
      <div className="pt-3">
        <Button type="submit">Save</Button>
      </div>
    </div>
  );
}
