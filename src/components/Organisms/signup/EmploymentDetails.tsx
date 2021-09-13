import React from 'react';

import DropDown from '../../Atoms/Input/Dropdown';
import InputMolecule from '../../Molecules/input/InputMolecule';

const EmploymentDetails = ({ details, setDetails, validate }) => {
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
        name="currentRank"
        value={details.currentRank}
        handleChange={(e) => handleChange(e)}
        error={validate.currentRank(details.currentRank)}>
        Current rank
      </InputMolecule>
      <InputMolecule
        name="otherRank"
        value={details.otherRank}
        handleChange={(e) => handleChange(e)}
        error={validate.otherRank(details.otherRank)}>
        Other rank
      </InputMolecule>
      <InputMolecule
        name="RankDepart"
        value={details.RankDepart}
        handleChange={(e) => handleChange(e)}
        error={validate.RankDepart(details.RankDepart)}>
        Current rank department
      </InputMolecule>
      <InputMolecule
        name="RankDepart"
        value={details.EmpNo}
        handleChange={(e) => handleChange(e)}
        error={validate.RankDepart(details.EmpNo)}>
        Employment number
      </InputMolecule>
    </>
  );
};

export default EmploymentDetails;
