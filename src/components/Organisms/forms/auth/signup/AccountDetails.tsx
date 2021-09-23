import React from 'react';

import { CommonStepProps } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import InputMolecule from '../../../../Molecules/input/InputMolecule';
function AccountDetails({ details, handleChange, nextStep }: CommonStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="username"
          placeholder="username"
          value={details.username}
          handleChange={handleChange}>
          Username
        </InputMolecule>
        <InputMolecule
          name="password"
          placeholder="password"
          type="password"
          value={details.password}
          handleChange={handleChange}>
          Password
        </InputMolecule>
        <InputMolecule
          name="confirmPassword"
          placeholder="confirm password"
          type="password"
          value={details.confirmPassword}
          handleChange={handleChange}>
          Confirm Password
        </InputMolecule>
      </div>
      <div className="pt-12">
        <Button onClick={() => nextStep()}>Complete</Button>
      </div>
    </div>
  );
}

export default AccountDetails;
