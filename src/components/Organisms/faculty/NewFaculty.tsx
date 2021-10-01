import React from 'react';

import Button from '../../Atoms/custom/Button';
import InputMolecule from '../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';

export default function NewFaculty() {
  const handleChange = () => {};
  return (
    <div>
      <InputMolecule
        value=""
        error="Name is required"
        handleChange={handleChange}
        name="facultyName">
        Faculty name
      </InputMolecule>
      <div className="py-3">
        <TextAreaMolecule
          value=""
          // className="resize-none h-64"
          error="Description is required"
          name="description"
          handleChange={handleChange}>
          Department description
        </TextAreaMolecule>
      </div>
      <Button>Save</Button>
    </div>
  );
}
