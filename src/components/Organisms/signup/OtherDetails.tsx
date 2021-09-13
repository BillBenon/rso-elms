import React, { useState } from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import InputMolecule from '../../Molecules/input/InputMolecule';

const OtherDetails = () => {
  const [details, setDetails] = useState({
    hobbies: '',
    chronicDiseases: '',
    diseaseDescription: '',
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
    <>
      <InputMolecule
        name="hobbies"
        placeholder="football, swimming, etc"
        value={details.hobbies}
        handleChange={handleChange}>
        Hobbies
      </InputMolecule>
      <InputMolecule
        name="chronicDiseases"
        placeholder="Asthma, Ulcers, etc"
        value={details.chronicDiseases}
        handleChange={handleChange}>
        Chronic diseases
      </InputMolecule>
      <div className="flex gap-3">
        <Button type="text" color="txt-secondary" onClick={movePrev}>
          Back
        </Button>
        <Button onClick={moveNext}>Complete</Button>
      </div>
    </>
  );
};

export default OtherDetails;
