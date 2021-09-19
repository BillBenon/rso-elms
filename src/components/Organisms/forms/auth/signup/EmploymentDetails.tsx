import React, { useState } from 'react';

import { ValueType } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import DropdownMolecule from '../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../Molecules/input/InputMolecule';

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <DropdownMolecule
          placeholder="Select current rank"
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
          ]}>
          Current Rank
        </DropdownMolecule>
        <InputMolecule
          name="otherRank"
          placeholder="other ranks u might hold"
          value={details.otherRank}
          handleChange={handleChange}>
          Other rank
        </InputMolecule>
      </div>
      <div className="flex flex-col gap-4">
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
      </div>
      <div className="flex justify-between">
        <Button styleType="text" color="txt-secondary" onClick={movePrev}>
          Back
        </Button>
        <Button onClick={moveNext}>Next</Button>
      </div>
    </div>
  );
};

export default EmploymentDetails;
