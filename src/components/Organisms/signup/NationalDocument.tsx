import React, { useState } from 'react';

import DropDown from '../../../styles/components/atoms/custom/Dropdown';
import { ValueType } from '../../../types';
import { validation } from '../../../utils/validations';
import InputMolecule from '../../Molecules/input/InputMolecule';

const NationalDocuments = () => {
  const [details, setDetails] = useState({
    nationality: '',
    national_id: '',
    passport: '',
    passport_expiry_date: '',
    language: '',
  });

  const validate = {
    touched: false,
    completed: false,
    nationality: (name: string) => validation.nameValidation('Nationality', name),
    national_id: (name: string) =>
      validation.nameValidation('National Identitification Number', name),
    passport: (name: string) => validation.nameValidation('Passport Number', name),
    passport_expiry_date: validation.dateValidation,
    language: (name: string) => validation.nameValidation('Language', name),
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
        name={details.nationality}
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
        name="national_id"
        value={details.national_id}
        handleChange={handleChange}
        error={validate.national_id(details.national_id)}>
        National Identitification Number
      </InputMolecule>
      <InputMolecule
        name="passport"
        value={details.passport[0]}
        handleChange={handleChange}
        error={validate.passport(details.passport)}>
        Passport Number(Optional)
      </InputMolecule>
    </>
  );
};

export default NationalDocuments;
