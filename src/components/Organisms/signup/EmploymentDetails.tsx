import React, { useState } from 'react';

import DropDown from '../../../styles/components/atoms/custom/Dropdown';
import { ValueType } from '../../../types';
import { validation } from '../../../utils/validations';
import InputMolecule from '../../Molecules/input/InputMolecule';

const EmploymentDetails = () => {
  const [details, setDetails] = useState({
    currentRank: '',
    otherRank: '',
    RankDepart: 'Rwanda',
    EmpNo: '',
  });

  const validate = {
    touched: false,
    completed: false,
    currentRank: (name: string) => validation.nameValidation('The current rank', name),
    otherRank: (name: string) => validation.nameValidation('The other rank', name),
    RankDepart: (name: string) =>
      validation.nameValidation('Current rank department', name),
    EmpNo: (name: string) => validation.nameValidation('Employment number', name),
  };

  const handleChange = (e: ValueType) => {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
    console.log(details);
  };

  return (
    <>
      <DropDown
        name="nationality"
        className="w-72"
        onChange={() => console.log('chANGED')}
        options={[
          { value: 'rw', label: 'Rwanda' },
          { value: 'ug', label: 'Uganda' },
          { value: 'tz', label: 'Tanzania' },
          { value: 'brd', label: 'Burundi' },
          { value: 'can', label: 'Canada' },
          { value: 'us', label: 'USA' },
        ]}
      />
      <InputMolecule
        name="currentRank"
        value={details.currentRank}
        handleChange={handleChange}
        error={validate.currentRank(details.currentRank)}>
        Current rank
      </InputMolecule>
      <InputMolecule
        name="otherRank"
        value={details.otherRank}
        handleChange={handleChange}
        error={validate.otherRank(details.otherRank)}>
        Other rank
      </InputMolecule>
      <InputMolecule
        name="RankDepart"
        value={details.RankDepart}
        handleChange={handleChange}
        error={validate.RankDepart(details.RankDepart)}>
        Current rank department
      </InputMolecule>
      <InputMolecule
        name="RankDepart"
        value={details.EmpNo}
        handleChange={handleChange}
        error={validate.RankDepart(details.EmpNo)}>
        Employment number
      </InputMolecule>
    </>
  );
};

export default EmploymentDetails;
