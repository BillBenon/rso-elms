import React from 'react';

import { CommonStepProps } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import InputMolecule from '../../../../Molecules/input/InputMolecule';
function AccountDetails({ details, handleChange, prevStep, nextStep }: CommonStepProps) {
  const moveBack = () => {
    prevStep && prevStep();
  };
  return (
    <div className="flex flex-col gap-4">
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
          <Button styleType="text" color="txt-secondary" onClick={() => moveBack()}>
            Back
          </Button>
        )}
        <Button onClick={() => nextStep(true)}>Complete</Button>
      </div>
    </div>
  );
}

export default AccountDetails;
