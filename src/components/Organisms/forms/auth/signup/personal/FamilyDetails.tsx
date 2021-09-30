import React from 'react';

import { CommonStepProps } from '../../../../../../types';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../../../Molecules/input/RadioMolecule';

function FamilyDetails({
  details,
  handleChange,
  nextStep,
  prevStep,
  isVertical,
}: CommonStepProps) {
  const moveBack = () => {
    prevStep && prevStep();
  };
  const moveForward = () => {
    nextStep(true);
  };
  return (
    <div className={`flex flex-col gap-4 ${!isVertical && 'pt-8'}`}>
      {!isVertical && <Heading fontWeight="semibold">Family details</Heading>}
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="fatherName"
          placeholder="eg: John"
          value={details.fatherName}
          handleChange={(e) => handleChange(e, 'familyDetails')}>
          Father&apos;s name
        </InputMolecule>
        <InputMolecule
          name="motherName"
          placeholder="eg: Doe"
          value={details.motherName}
          handleChange={(e) => handleChange(e, 'familyDetails')}>
          Mother&apos;s name
        </InputMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <RadioMolecule
          options={[
            { value: 'married', label: 'Married' },
            { value: 'single', label: 'Single' },
          ]}
          value={details.maritalStatus}
          handleChange={(e) => handleChange(e, 'familyDetails')}
          name="maritalStatus">
          Marital Status
        </RadioMolecule>
        <InputMolecule
          name="spouseName"
          value={details.spouseName}
          handleChange={(e) => handleChange(e, 'familyDetails')}>
          Spouse Name
        </InputMolecule>
      </div>
      <Heading fontSize="sm" fontWeight="semibold">
        Family address
      </Heading>
      <div className="flex flex-col gap-4">
        <DropdownMolecule
          width="60 md:w-80"
          name="country"
          defaultValue={details.country}
          handleChange={handleChange}
          options={[
            { value: 'rw', label: 'Rwanda' },
            { value: 'ug', label: 'Uganda' },
            { value: 'tz', label: 'Tanzania' },
            { value: 'brd', label: 'Burundi' },
            { value: 'can', label: 'Canada' },
            { value: 'us', label: 'USA' },
          ]}>
          Country
        </DropdownMolecule>
        <DropdownMolecule
          width="60 md:w-80"
          name="country"
          defaultValue={details.country}
          handleChange={handleChange}
          options={[
            { value: 'rw', label: 'Rwanda' },
            { value: 'ug', label: 'Uganda' },
            { value: 'tz', label: 'Tanzania' },
            { value: 'brd', label: 'Burundi' },
            { value: 'can', label: 'Canada' },
            { value: 'us', label: 'USA' },
          ]}>
          Location
        </DropdownMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="otherLocation"
          value={details.otherLocation}
          handleChange={(e) => handleChange(e, 'familyDetails')}>
          Other Location
          <span className="text-txt-secondary"> (State / Region)</span>
        </InputMolecule>
      </div>
      <div className="flex justify-between w-80">
        {prevStep && (
          <Button
            styleType="text"
            hoverStyle="no-underline"
            color="txt-secondary"
            onClick={() => moveBack()}>
            Back
          </Button>
        )}
        <Button onClick={() => moveForward()}>Next</Button>
      </div>
    </div>
  );
}

export default FamilyDetails;
