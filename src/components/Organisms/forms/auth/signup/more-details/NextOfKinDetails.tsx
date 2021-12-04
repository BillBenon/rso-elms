import React, { useState } from 'react';

import { CommonFormProps, CommonStepProps, ValueType } from '../../../../../../types';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import LocationMolecule from '../../../../../Molecules/input/LocationMolecule';
import RadioMolecule from '../../../../../Molecules/input/RadioMolecule';

interface NextOfKin<E> extends CommonStepProps, CommonFormProps<E> {}

function NextOfKinDetails<E>({
  display_label,
  isVertical,
  prevStep,
  nextStep,
  onSubmit,
}: NextOfKin<E>) {
  const [details, setDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: 'male',
    relationship: '',
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
    <div className="flex flex-col gap-2 ">
      <form onSubmit={moveForward}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {!isVertical && (
            <Heading fontSize="base" fontWeight="semibold">
              {display_label}
            </Heading>
          )}

          <InputMolecule
            name="first_name"
            placeholder="eg: John"
            value={details.first_name}
            handleChange={handleChange}>
            First Name
          </InputMolecule>
          <InputMolecule
            name="last_name"
            placeholder="eg: Doe"
            value={details.last_name}
            handleChange={handleChange}>
            Last Name
          </InputMolecule>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 ">
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
        <div className="grid grid-cols-1 md:grid-cols-2">
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
            name="relationship"
            value={details.relationship}
            handleChange={handleChange}>
            RelationShip
          </InputMolecule>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <LocationMolecule
            width="72 md:w-80"
            name="location"
            handleChange={handleChange}>
            Location
          </LocationMolecule>
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

export default NextOfKinDetails;
