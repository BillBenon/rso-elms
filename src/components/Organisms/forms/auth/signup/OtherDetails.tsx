import React, { useState } from 'react';

import { ValueType } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import DropdownMolecule from '../../../../Molecules/input/DropdownMolecule';
import TextAreaMolecule from '../../../../Molecules/input/TextAreaMolecule';

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
      <div className="flex flex-col gap-4">
        <DropdownMolecule
          isMulti
          name="hobbies"
          defaultValue={details.hobbies}
          onChange={handleChange}
          options={[
            { value: 'football', label: 'football' },
            { value: 'swimming', label: 'swimming' },
            { value: 'volleyball', label: 'volleyball' },
            { value: 'basketball', label: 'basketball' },
            { value: 'singing', label: 'singing' },
            { value: 'dancing', label: 'dancing' },
            { value: 'readingbooks', label: 'reading books' },
          ]}>
          Hobbies
        </DropdownMolecule>
        <DropdownMolecule
          isMulti
          placeholder="Select chronic diseases u have"
          name="chronicDiseases"
          defaultValue={details.chronicDiseases}
          onChange={handleChange}
          options={[
            { value: 'asthma', label: 'Asthma' },
            { value: 'ulcers', label: 'Ulcers' },
            { value: 'diabetes', label: 'Diabetes' },
            { value: 'sinusitus', label: 'Sinusitus' },
          ]}>
          Chronic diseases
        </DropdownMolecule>
        <TextAreaMolecule
          name="diseaseDescription"
          value={details.diseaseDescription}
          handleChange={handleChange}>
          Chronic disease description
        </TextAreaMolecule>
      </div>
      <div className="flex justify-between">
        <Button styleType="text" color="txt-secondary" onClick={movePrev}>
          Back
        </Button>
        <Button onClick={moveNext}>Complete</Button>
      </div>
    </>
  );
};

export default OtherDetails;
