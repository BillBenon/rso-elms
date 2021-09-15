import React, { useState } from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import DateMolecule from '../../Molecules/input/DateMolecule';
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
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
      </div>
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="section"
          placeholder="section"
          value={details.section}
          handleChange={handleChange}>
          Education section/ combination
        </InputMolecule>
        <DateMolecule width="60 md:w-80">Start Date</DateMolecule>
      </div>
      <div className="my-4">
        <DateMolecule width="60 md:w-80">End Date</DateMolecule>
      </div>
      <Button>Attachment</Button>
      <div className="flex justify-between">
        <Button styleType="text" color="txt-secondary" onClick={movePrev}>
          Back
        </Button>
        <Button onClick={moveNext}>Next</Button>
      </div>
    </div>
  );
};

export default EducationDetails;
