import React, { useState } from 'react';

import { ValueType } from '../../../types';
import { validation } from '../../../utils/validations';
import DropDown from '../../Atoms/Input/Dropdown';
import InputMolecule from '../../Molecules/input/InputMolecule';

const EducationDetails = () => {
  const [details, setDetails] = useState({
    school: '',
    level: '',
    section: '',
    start_date: '',
    end_date: '',
  });

  const validate = {
    touched: false,
    completed: false,
    school: (name: string) => validation.nameValidation('School Name', name),
    level: (name: string) => validation.nameValidation('Education Level', name),
    section: (name: string) =>
      validation.nameValidation('Education section/ combination', name),
    start_date: validation.dateValidation,
    end_date: validation.dateValidation,
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
        name="school"
        value={details.school}
        handleChange={handleChange}
        error={validate.school(details.school)}>
        School Name
      </InputMolecule>
      <InputMolecule
        name="level"
        value={details.level}
        handleChange={handleChange}
        error={validate.level(details.level)}>
        Education Level
      </InputMolecule>
      <InputMolecule
        name="section"
        value={details.section}
        handleChange={handleChange}
        error={validate.section(details.section)}>
        Education section/ combination
      </InputMolecule>
    </>
  );
};

export default EducationDetails;
