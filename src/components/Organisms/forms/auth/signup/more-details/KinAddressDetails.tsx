import React, { useState } from 'react';

import { CommonFormProps, CommonStepProps, ValueType } from '../../../../../../types';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';

interface KinAddress<E> extends CommonStepProps, CommonFormProps<E> {}

function KinAddressDetails<E>({
  display_label,
  isVertical,
  prevStep,
  nextStep,
  onSubmit,
}: KinAddress<E>) {
  const [details, setDetails] = useState({
    country: '',
    location: '',
    other_location: '',
  });
  const moveBack = () => {
    prevStep && prevStep();
  };
  const moveForward = (e: any) => {
    e.preventDefault();
    nextStep(true);
    if (onSubmit) onSubmit(e, details);
  };

  const handleChange = (e: ValueType) => {
    setDetails({ ...details, [e.name]: e.value });
  };

  return (
    <div className="flex flex-col gap-4">
      {!isVertical && (
        <Heading fontSize="base" fontWeight="semibold">
          {display_label}
        </Heading>
      )}
      <form onSubmit={moveForward}>
        <div className="flex flex-col gap-4">
          <DropdownMolecule
            width="60 md:w-80"
            name="country"
            defaultValue={details.country}
            handleChange={handleChange}
            options={[]}>
            Country
          </DropdownMolecule>
          <DropdownMolecule
            width="60 md:w-80"
            name="location"
            defaultValue={details.location}
            handleChange={handleChange}
            options={[]}>
            Location
          </DropdownMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <InputMolecule
            name="other_location"
            value={details.other_location}
            handleChange={handleChange}>
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
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}

export default KinAddressDetails;
