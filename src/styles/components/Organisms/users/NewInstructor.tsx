import React from 'react';

import Button from '../../../../components/Atoms/custom/Button';
import DropdownMolecule from '../../../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../components/Molecules/input/InputMolecule';
import { SelectData, ValueType } from '../../../../types';

export default function NewInstructor() {
  const handleChange = (e: ValueType) => {
    console.log(e);
  };

  const handleSubmit = () => {
    window.alert('submitted');
  };
  const academies: SelectData[] = [
    {
      value: 'Gako MA',
      label: 'M.A GAKO',
    },
    {
      value: 'Nasho',
      label: 'Nasho',
    },
    {
      value: 'Nyakinama',
      label: 'Nyakinama high staff',
    },
  ];
  return (
    <>
      <div>
        <InputMolecule
          name="firstName"
          placeholder="eg: Kabera"
          value={''}
          handleChange={(e) => handleChange(e)}>
          First name
        </InputMolecule>
        <InputMolecule
          name="lastName"
          placeholder="eg: Claude"
          value={''}
          handleChange={(e) => handleChange(e)}>
          Last name
        </InputMolecule>
        <InputMolecule
          name="employmentNumber"
          placeholder="Army or Police number"
          value={''}
          handleChange={(e) => handleChange(e)}>
          Employment number
        </InputMolecule>
        <InputMolecule
          name="nid"
          type="text"
          value={''}
          placeholder="NID number"
          handleChange={(e) => handleChange(e)}>
          NID
        </InputMolecule>
        <InputMolecule
          name="passport"
          value={''}
          placeholder="Enter passport number(if any)"
          handleChange={(e) => handleChange(e)}>
          Passport (optional)
        </InputMolecule>
        <DropdownMolecule
          options={academies}
          name="academy"
          placeholder={'Academy to be deployed to'}
          handleChange={(_e: any) => {}}>
          Academy
        </DropdownMolecule>
        <Button onClick={handleSubmit}>Create</Button>
      </div>
    </>
  );
}
