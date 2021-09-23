import React from 'react';

import { CommonStepProps } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import Heading from '../../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../../Molecules/input/RadioMolecule';

function FamilyDetails({ details, handleChange, nextStep }: CommonStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="fatherName"
          placeholder="eg: John"
          value={details.fatherName}
          handleChange={handleChange}>
          Father&apos;s name
        </InputMolecule>
        <InputMolecule
          name="motherName"
          placeholder="eg: Doe"
          value={details.motherName}
          handleChange={handleChange}>
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
          handleChange={handleChange}
          name="maritalStatus">
          Marital Status
        </RadioMolecule>
        <InputMolecule
          name="spouseName"
          value={details.spouseName}
          handleChange={handleChange}>
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          handleChange={handleChange}>
          Other Location
          <span className="text-txt-secondary"> (State / Region)</span>
        </InputMolecule>
      </div>
      <div>
        <Button onClick={() => nextStep()}>Next</Button>
      </div>
    </div>
  );
}

export default FamilyDetails;
