import React from 'react';

import { CommonStepProps } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import DropdownMolecule from '../../../../Molecules/input/DropdownMolecule';
import TextAreaMolecule from '../../../../Molecules/input/TextAreaMolecule';

function OtherDetails({ details, handleChange, prevStep, nextStep }: CommonStepProps) {
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
        <div className="flex w-80 justify-between">
          {prevStep && (
            <Button styleType="text" color="txt-secondary" onClick={() => prevStep()}>
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
