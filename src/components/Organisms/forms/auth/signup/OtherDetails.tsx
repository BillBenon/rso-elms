import React from 'react';

import { CommonStepProps } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import DropdownMolecule from '../../../../Molecules/input/DropdownMolecule';
import TextAreaMolecule from '../../../../Molecules/input/TextAreaMolecule';

function OtherDetails({ details, handleChange, prevStep, nextStep }: CommonStepProps) {
  const moveBack = () => {
    prevStep && prevStep();
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <DropdownMolecule
          isMulti
          name="hobbies"
          defaultValue={details.hobbies}
          onChange={(e) => handleChange(e, 'otherDetails')}
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
          onChange={(e) => handleChange(e, 'otherDetails')}
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
          handleChange={(e) => handleChange(e, 'otherDetails')}
          placeholder="Describe your chronic disease">
          Chronic disease description
        </TextAreaMolecule>
        <div className="flex w-80 justify-between">
          {prevStep && (
            <Button styleType="text" color="txt-secondary" onClick={() => moveBack()}>
              Back
            </Button>
          )}
          <Button onClick={() => nextStep()}>Next</Button>
        </div>
      </div>
    </>
  );
}

export default OtherDetails;
