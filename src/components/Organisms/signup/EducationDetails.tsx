import React from 'react';

import DropDown from '../../../styles/components/atoms/custom/Dropdown';
import InputMolecule from '../../Molecules/input/InputMolecule';

const EducationDetails = ({ details, setDetails, validate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newVal = details;
    newVal[e.target.name] = e.target.value;
    setDetails(newVal);
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
        handleChange={(e) => handleChange(e)}
        error={validate.school(details.school)}>
        School Name
      </InputMolecule>
      <InputMolecule
        name="level"
        value={details.level}
        handleChange={(e) => handleChange(e)}
        error={validate.level(details.level)}>
        Education Level
      </InputMolecule>
      <InputMolecule
        name="section"
        value={details.section}
        handleChange={(e) => handleChange(e)}
        error={validate.section(details.section)}>
        Education section/ combination
      </InputMolecule>
    </>
  );
};

export default EducationDetails;
