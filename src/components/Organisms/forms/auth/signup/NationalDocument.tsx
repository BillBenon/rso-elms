import React, { useState } from 'react';

import { ValueType } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import CheckboxMolecule from '../../../../Molecules/input/CheckboxMolecule';
import DateMolecule from '../../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../Molecules/input/InputMolecule';

const NationalDocuments = () => {
  const [details, setDetails] = useState({
    nationality: '',
    national_id: '',
    passport: '',
    passport_expiry_date: '',
    place_of_birth: '',
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
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <DropdownMolecule
          width="60 md:w-80"
          name="nationality"
          defaultValue={details.nationality}
          onChange={handleChange}
          options={[
            { value: 'rw', label: 'Rwanda' },
            { value: 'ug', label: 'Uganda' },
            { value: 'tz', label: 'Tanzania' },
            { value: 'brd', label: 'Burundi' },
            { value: 'can', label: 'Canada' },
            { value: 'us', label: 'USA' },
          ]}>
          Nationality
        </DropdownMolecule>
        <InputMolecule
          name="national_id"
          value={details.national_id}
          placeholder="Enter 16 digit NID number"
          handleChange={handleChange}>
          National Identitification Number
        </InputMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="passport"
          value={details.passport}
          placeholder="----------------"
          handleChange={handleChange}>
          Passport Number(Optional)
        </InputMolecule>
        <DateMolecule
          handleDate={handleChange}
          name="passport_expiry_date"
          width="60 md:w-80">
          Passport expiry date
        </DateMolecule>
      </div>
      <div className="flex flex-col">
        <InputMolecule
          name="place_of_birth"
          value={details.place_of_birth}
          placeholder="Enter place you got birth from"
          handleChange={handleChange}>
          Place of Birth
        </InputMolecule>
        <CheckboxMolecule
          placeholder="Languages"
          onChange={handleChange}
          name="languages"
          options={[
            { value: 'kiny', label: 'Kinyarwanda' },
            { value: 'en', label: 'English' },
            { value: 'fr', label: 'French' },
            { value: 'kis', label: 'Kiswahili' },
          ]}
        />
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

export default NationalDocuments;
