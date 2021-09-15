import React from 'react';

import Button from '../../Atoms/custom/Button';
import InputMolecule from '../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';

export default function NewFaculty() {
  const handleChange = () => {
    console.log('when also');
  };
  return (
    <div className="p-5">
      <InputMolecule
        value=""
        error="imboga mbi"
        handleChange={handleChange}
        name="facultyName">
        Faculty name
      </InputMolecule>
      <div className="py-3">
        <TextAreaMolecule
          value=""
          className="resize-none h-64"
          error="welcome here"
          name="description"
          handleChange={handleChange}>
          Department description
        </TextAreaMolecule>
      </div>
      <Button>Save</Button>
    </div>
  );
}
