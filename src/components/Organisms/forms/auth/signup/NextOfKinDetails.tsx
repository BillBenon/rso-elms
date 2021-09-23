import React from 'react';

import { CommonStepProps } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import Heading from '../../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../../Molecules/input/RadioMolecule';

function NextOfKinDetails({
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
        <InputMolecule
          name="firstName"
          placeholder="eg: John"
          value={details.firstName}
          handleChange={handleChange}>
          First Name
        </InputMolecule>
        <InputMolecule
          name="lastName"
          placeholder="eg: Doe"
          value={details.lastName}
          handleChange={handleChange}>
          Last Name
        </InputMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="email"
          value={details.email}
          type="email"
          placeholder="username@example.com"
          handleChange={handleChange}>
          Email
        </InputMolecule>
        <InputMolecule
          name="phone"
          value={details.phone}
          placeholder="+250 ---------"
          handleChange={handleChange}>
          Phone number
        </InputMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <RadioMolecule
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
          value={details.gender}
          handleChange={handleChange}
          name="gender">
          Gender
        </RadioMolecule>
        <InputMolecule
          name="relationShip"
          value={details.relationShip}
          handleChange={handleChange}>
          RelationShip
        </InputMolecule>
      </div>
      <Heading fontSize="sm" fontWeight="semibold">
        Address
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

export default NextOfKinDetails;
