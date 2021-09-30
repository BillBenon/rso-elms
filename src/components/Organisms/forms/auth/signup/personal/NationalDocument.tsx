import React from 'react';

import { CommonStepProps } from '../../../../../../types';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import CheckboxMolecule from '../../../../../Molecules/input/CheckboxMolecule';
import DateMolecule from '../../../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';

function NationalDocuments({
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
    <div className={`flex flex-col gap-4 ${!isVertical && 'pt-8'}`}>
      {!isVertical && <Heading fontWeight="semibold">National Documents</Heading>}
      <div className="flex flex-col gap-4">
        <DropdownMolecule
          width="60 md:w-80"
          name="nationality"
          defaultValue={details.nationality}
          handleChange={handleChange}
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
          handleChange={(e) => handleChange(e, 'nationalDocuments')}>
          National Identitification Number
        </InputMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="nidPlaceOfIssue"
          value={details.nidPlaceOfIssue}
          placeholder="Enter place you got NID from"
          handleChange={(e) => handleChange(e, 'nationalDocuments')}>
          Place of issue
        </InputMolecule>
        <DateMolecule
          handleChange={(e) => handleChange(e, 'nationalDocuments')}
          name="dateOfIssue"
          width="60 md:w-80">
          Date of issue
        </DateMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="passport"
          value={details.passport}
          placeholder="----------------"
          handleChange={(e) => handleChange(e, 'nationalDocuments')}>
          Passport Number(Optional)
        </InputMolecule>
        <InputMolecule
          name="passPlaceOfIssue"
          value={details.passPlaceOfIssue}
          placeholder="Enter place you got passport from"
          handleChange={(e) => handleChange(e, 'nationalDocuments')}>
          Place of issue
        </InputMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <DateMolecule
          handleChange={(e) => handleChange(e, 'nationalDocuments')}
          name="passportExpiryDate"
          width="60 md:w-80">
          Passport expiry date
        </DateMolecule>
        <CheckboxMolecule
          placeholder="Languages"
          handleChange={handleChange}
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

export default NationalDocuments;
