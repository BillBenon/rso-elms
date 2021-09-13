import React from 'react';

import DropDown from '../../Atoms/Input/Dropdown';
import InputMolecule from '../../Molecules/input/InputMolecule';

const OtherDetails = ({ details, setDetails, validate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newVal = details;
    newVal[e.target.name] = e.target.value;
    setDetails(newVal);
    console.log(details);
  };
  return (
    <>
      <InputMolecule
        name="hobbies"
        value={details.hobbies}
        handleChange={(e) => handleChange(e)}
        error={validate.hobbies(details.hobbies)}>
        Hobbies
      </InputMolecule>
      <InputMolecule
        name="chronicDiseases"
        value={details.chronicDiseases}
        handleChange={(e) => handleChange(e)}
        error={validate.otherRank(details.otherRank)}>
        Chronic diseases
      </InputMolecule>
      <InputMolecule
        name="diseaseDescription"
        value={details.diseaseDescription}
        handleChange={(e) => handleChange(e)}
        error={validate.description(details.diseaseDescription)}>
        Chronic disease description
      </InputMolecule>
    </>
  );
};

export default OtherDetails;
