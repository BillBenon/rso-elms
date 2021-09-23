import React from 'react';

import { CommonStepProps } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import CheckboxMolecule from '../../../../Molecules/input/CheckboxMolecule';
import DateMolecule from '../../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../Molecules/input/InputMolecule';

function NationalDocuments({
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
          width="60 md:w-80"
          name="nationality"
          defaultValue={details.nationality}
          onChange={handleChange}
          options={[
            { value: 'rw', label: 'Rwanda' },
            { value: 'ug', label: 'Uganda' },
            { value: 'tz', label: 'Tanzania' },
            { value: 'brd', label: 'Burundi' },
            { value: 'can', label: 'Canada' },
            { value: 'us', label: 'USA' },
          ]}>
          Nationality
        </DropdownMolecule>
        <InputMolecule
          name="nationalId"
          value={details.nationalId}
          placeholder="Enter 16 digit NID number"
          handleChange={handleChange}>
          National Identitification Number
        </InputMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="nidPlaceOfIssue"
          value={details.nidPlaceOfIssue}
          placeholder="Enter place you got NID from"
          handleChange={handleChange}>
          Place of issue
        </InputMolecule>
        <DateMolecule handleDate={handleChange} name="dateOfIssue" width="60 md:w-80">
          Date of issue
        </DateMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="passport"
          value={details.passport}
          placeholder="----------------"
          handleChange={handleChange}>
          Passport Number(Optional)
        </InputMolecule>
        <InputMolecule
          name="passPlaceOfIssue"
          value={details.passPlaceOfIssue}
          placeholder="Enter place you got passport from"
          handleChange={handleChange}>
          Place of issue
        </InputMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <DateMolecule
          handleDate={handleChange}
          name="passportExpiryDate"
          width="60 md:w-80">
          Passport expiry date
        </DateMolecule>
        <CheckboxMolecule
          placeholder="Languages"
          onChange={handleChange}
          name="languages"
          options={[
            { value: 'kiny', label: 'Kinyarwanda' },
            { value: 'en', label: 'English' },
            { value: 'fr', label: 'French' },
            { value: 'kis', label: 'Kiswahili' },
          ]}
        />
      </div>
      <div className="flex w-80 justify-between">
        {prevStep && (
          <Button styleType="text" color="txt-secondary" onClick={() => moveBack()}>
            Back
          </Button>
        )}
        <Button onClick={() => nextStep()}>Next</Button>
      </div>
    </div>
  );
}

export default NationalDocuments;
