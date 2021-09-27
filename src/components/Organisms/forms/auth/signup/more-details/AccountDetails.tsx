import React from 'react';

import { CommonStepProps } from '../../../../../../types';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
function AccountDetails({
  details,
  handleChange,
  prevStep,
  isVertical,
  nextStep,
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
          Account Details
        </Heading>
      )}

      <div className="flex flex-col gap-4">
        <InputMolecule
          name="username"
          placeholder="username"
          value={details.username}
          handleChange={(e) => handleChange(e, 'accountDetails')}>
          Username
        </InputMolecule>
        <InputMolecule
          name="password"
          placeholder="password"
          type="password"
          value={details.password}
          handleChange={(e) => handleChange(e, 'accountDetails')}>
          Password
        </InputMolecule>
        <InputMolecule
          name="confirmPassword"
          placeholder="confirm password"
          type="password"
          value={details.confirmPassword}
          handleChange={(e) => handleChange(e, 'accountDetails')}>
          Confirm Password
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
        <Button onClick={() => moveForward()}>Complete</Button>
      </div>
    </div>
  );
}

export default AccountDetails;
