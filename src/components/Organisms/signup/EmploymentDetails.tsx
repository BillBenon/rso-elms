import React, { useState } from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import DropDown from '../../Atoms/Input/Dropdown';
import InputMolecule from '../../Molecules/input/InputMolecule';

const EmploymentDetails = () => {
  const [details, setDetails] = useState({
    currentRank: '',
    otherRank: '',
    RankDepart: 'Rwanda',
    EmpNo: '',
  });

  const movePrev = () => {
    window.alert('movePrev');
  };

  const moveNext = () => {
    window.alert('moveNext');
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
        name="currentRank"
        className="w-72"
        onChange={handleChange}
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
        name="otherRank"
        placeholder="other ranks u might hold"
        value={details.otherRank}
        handleChange={handleChange}>
        Other rank
      </InputMolecule>
      <InputMolecule
        name="RankDepart"
        placeholder="eg: Rwanda"
        value={details.RankDepart}
        handleChange={handleChange}>
        Current rank department
      </InputMolecule>
      <InputMolecule
        name="EmpNo"
        placeholder="Employment number"
        value={details.EmpNo}
        handleChange={handleChange}>
        Employment number
      </InputMolecule>
      <div className="flex gap-3">
        <Button type="text" color="txt-secondary" onClick={movePrev}>
          Back
        </Button>
        <Button onClick={moveNext}>Next</Button>
      </div>
    </>
  );
};

export default EmploymentDetails;
