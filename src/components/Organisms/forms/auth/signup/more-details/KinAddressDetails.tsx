import React from 'react';

import { CommonStepProps } from '../../../../../../types';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';

function KinAddressDetails({
  details,
  handleChange,
  prevStep,
  nextStep,
  isVertical,
}: CommonStepProps) {
  const moveBack = () => {
    prevStep && prevStep();
  };
  const moveForward = () => {
    nextStep(true);
  };

  return (
    <div className="flex flex-col gap-4">
      {!isVertical && (
        <Heading fontSize="base" fontWeight="semibold">
          Next Of Kin Address Details
        </Heading>
      )}
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
          handleChange={(e) => handleChange(e, 'nextOfKinDetails')}>
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

export default KinAddressDetails;
