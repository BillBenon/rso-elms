import React from 'react';

import { SelectData } from '../../../types';
import Button from '../../Atoms/custom/Button';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../Molecules/input/InputMolecule';

export default function NewStudent() {
  const handleChange = (e: any) => {
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
        placeholder={'Academy to be enrolled'}
        handleChange={(_e: any) => {}}>
        Academy
      </DropdownMolecule>
      <Button onClick={handleSubmit}>Create</Button>
    </>
  );
}
