import React from 'react';

import { CommonStepProps } from '../../../../../../types';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import DateMolecule from '../../../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../../../Molecules/input/TextAreaMolecule';

function PersonalDetails({
  details,
  handleChange,
  isVertical,
  nextStep,
}: CommonStepProps) {
  const moveForward = () => {
    nextStep(true);
  };

  return (
    <div className={`flex flex-col gap-4 ${!isVertical && 'pt-8'}`}>
      {!isVertical && <Heading fontWeight="semibold">Personal details</Heading>}
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="firstName"
          placeholder="eg: John"
          value={details.firstName}
          handleChange={(e) => handleChange(e, 'personalDetails')}>
          First Name
        </InputMolecule>
        <InputMolecule
          name="lastName"
          placeholder="eg: Doe"
          value={details.lastName}
          handleChange={(e) => handleChange(e, 'personalDetails')}>
          Last Name
        </InputMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="email"
          value={details.email}
          type="email"
          placeholder="username@example.com"
          handleChange={(e) => handleChange(e, 'personalDetails')}>
          Email
        </InputMolecule>
        <InputMolecule
          name="phone"
          value={details.phone}
          placeholder="+250 ---------"
          handleChange={(e) => handleChange(e, 'personalDetails')}>
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
          handleChange={(e) => handleChange(e, 'personalDetails')}
          name="gender">
          Gender
        </RadioMolecule>
        <DateMolecule
          handleChange={(e) => handleChange(e, 'personalDetails')}
          name="dob"
          width="60 md:w-80">
          Date of Birth
        </DateMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <DropdownMolecule
          placeholder="Select place of birth"
          width="60 md:w-80"
          name="placeOfBirth"
          defaultValue={details.placeOfBirth}
          handleChange={handleChange}
          options={[
            { value: 'rw', label: 'Rwanda' },
            { value: 'ug', label: 'Uganda' },
            { value: 'tz', label: 'Tanzania' },
            { value: 'brd', label: 'Burundi' },
            { value: 'can', label: 'Canada' },
            { value: 'us', label: 'USA' },
          ]}>
          Place of birth
        </DropdownMolecule>
        <TextAreaMolecule
          name="placeOfBirthDescription"
          value={details.placeOfBirthDescription}
          handleChange={(e) => handleChange(e, 'personalDetails')}>
          Place of birth description
        </TextAreaMolecule>
      </div>
      <div className="flex justify-end w-80">
        <Button onClick={() => moveForward()}>Next</Button>
      </div>
    </div>
  );
}

export default PersonalDetails;
