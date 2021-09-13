import React, { useState } from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import DropDown from '../../Atoms/Input/Dropdown';
import InputMolecule from '../../Molecules/input/InputMolecule';

const NationalDocuments = () => {
  const [details, setDetails] = useState({
    nationality: '',
    national_id: '',
    passport: '',
    passport_expiry_date: '',
    language: '',
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
    <div>
      <DropDown
        name={details.nationality}
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
        name="national_id"
        value={details.national_id}
        placeholder="----------------"
        handleChange={handleChange}>
        National Identitification Number
      </InputMolecule>
      <InputMolecule
        name="passport"
        value={details.passport}
        placeholder="----------------"
        handleChange={handleChange}>
        Passport Number(Optional)
      </InputMolecule>
      <div className="flex gap-3">
        <Button type="text" color="txt-secondary" onClick={movePrev}>
          Back
        </Button>
        <Button onClick={moveNext}>Next</Button>
      </div>
    </div>
  );
};

export default NationalDocuments;
