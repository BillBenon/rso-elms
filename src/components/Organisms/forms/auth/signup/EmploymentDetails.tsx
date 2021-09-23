import React from 'react';

import { CommonStepProps } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import DateMolecule from '../../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../Molecules/input/InputMolecule';

function EmploymentDetails({
  details,
  handleChange,
  prevStep,
  nextStep,
}: CommonStepProps) {
  const moveBack = () => {
    prevStep && prevStep();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <DropdownMolecule
          placeholder="Select current rank"
          name="currentRank"
          className="w-72"
          onChange={handleChange}
          options={[
            { value: 'rw', label: 'Rwanda' },
            { value: 'ug', label: 'Uganda' },
            { value: 'tz', label: 'Tanzania' },
            { value: 'brd', label: 'Burundi' },
            { value: 'can', label: 'Canada' },
            { value: 'us', label: 'USA' },
          ]}>
          Current Rank
        </DropdownMolecule>
        <InputMolecule
          name="otherRank"
          placeholder="other ranks u might hold"
          value={details.otherRank}
          handleChange={handleChange}>
          Other rank
        </InputMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="RankDepart"
          placeholder="eg: Rwanda"
          value={details.RankDepart}
          handleChange={handleChange}>
          Current rank department
        </InputMolecule>
        <InputMolecule
          name="EmpNo"
          placeholder="Employment number"
          value={details.EmpNo}
          handleChange={handleChange}>
          Service / Employment number
        </InputMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <DateMolecule
          handleDate={handleChange}
          name="dateOfCommission"
          width="60 md:w-80">
          Date of commission
        </DateMolecule>
        <DateMolecule
          handleDate={handleChange}
          name="dateOfLastPromotion"
          width="60 md:w-80">
          Date of last promotion
        </DateMolecule>
      </div>
      <div className="flex w-80 justify-between">
        {prevStep && (
          <Button styleType="text" color="txt-secondary" onClick={() => moveBack()}>
            Back
          </Button>
        )}
        <Button onClick={() => nextStep(true)}>Next</Button>
      </div>
    </div>
  );
}

export default EmploymentDetails;
