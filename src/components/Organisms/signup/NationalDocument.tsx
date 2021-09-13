import React from 'react';

import DropDown from '../../Atoms/Input/Dropdown';
import InputMolecule from '../../Molecules/input/InputMolecule';

const NationalDocuments = ({ details, setDetails, validate, handleChange }) => {
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let newVal = details;
  //   newVal[e.target.name] = e.target.value;
  //   setDetails(newVal);
  //   console.log(details);
  // };
  // console.log(details.nationality);

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
        handleChange={(e) => handleChange(e)}
        error={validate.passport(details.passport)}>
        Passport Number(Optional)
      </InputMolecule>
    </>
  );
};

export default NationalDocuments;
