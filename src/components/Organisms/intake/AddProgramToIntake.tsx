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
    <form>
      <Heading fontSize="lg" fontWeight="semibold" className="pb-5">
        Add a program to this intake
      </Heading>

      <DropdownMolecule
        name="program"
        handleChange={(_e: any) => {}}
        options={options}
        placeholder="Select period type">
        Choose Program
      </DropdownMolecule>
      <DropdownMolecule
        name="academicYear"
        handleChange={(_e: any) => {}}
        options={options}>
        Choose Academic Year
      </DropdownMolecule>
      <DropdownMolecule name="oic" handleChange={(_e: any) => {}} options={options}>
        Choose Instructor Incharge
      </DropdownMolecule>
      <div className="pt-3">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
