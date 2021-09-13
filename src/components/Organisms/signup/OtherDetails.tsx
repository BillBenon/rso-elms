import React, { useState } from 'react';

import { ValueType } from '../../../types';
import { validation } from '../../../utils/validations';
import InputMolecule from '../../Molecules/input/InputMolecule';

const OtherDetails = () => {
  const [details, setDetails] = useState({
    hobbies: '',
    chronicDiseases: '',
    diseaseDescription: '',
  });

  const validate = {
    touched: false,
    completed: false,
    hobbies: (name: string) => validation.nameValidation('Hobbies', name),
    chronicDiseases: (name: string) => validation.nameValidation('Chronic disease', name),
    diseaseDescription: (name: string) =>
      validation.nameValidation('The disease description', name),
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
      <InputMolecule
        name="hobbies"
        value={details.hobbies}
        handleChange={handleChange}
        error={validate.hobbies(details.hobbies)}>
        Hobbies
      </InputMolecule>
      <InputMolecule
        name="chronicDiseases"
        value={details.chronicDiseases}
        handleChange={handleChange}
        error={validate.chronicDiseases(details.chronicDiseases)}>
        Chronic diseases
      </InputMolecule>
      <InputMolecule
        name="diseaseDescription"
        value={details.diseaseDescription}
        handleChange={handleChange}
        error={validate.diseaseDescription(details.diseaseDescription)}>
        Chronic disease description
      </InputMolecule>
    </>
  );
};

export default OtherDetails;
