import React, { useState } from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import InputMolecule from '../../Molecules/input/InputMolecule';

const EducationDetails = () => {
  const [details, setDetails] = useState({
    school: '',
    level: '',
    section: '',
    start_date: '',
    end_date: '',
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
        placeholder="school"
        name="school"
        value={details.school}
        handleChange={handleChange}>
        School Name
      </InputMolecule>
      <InputMolecule
        placeholder="level"
        name="level"
        value={details.level}
        handleChange={handleChange}>
        Education Level
      </InputMolecule>
      <InputMolecule
        name="section"
        placeholder="section"
        value={details.section}
        handleChange={handleChange}>
        Education section/ combination
      </InputMolecule>
      {/* start date || end date ||Attachment */}
      <div className="flex gap-3">
        <Button type="text" color="txt-secondary" onClick={movePrev}>
          Back
        </Button>
        <Button onClick={moveNext}>Next</Button>
      </div>
    </>
  );
};

export default EducationDetails;
