import React, { useState } from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import InputMolecule from '../../Molecules/input/InputMolecule';
import RadioMolecule from '../../Molecules/input/RadioMolecule';

const PersonalDetails = () => {
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'male',
    dob: '',
    maritalStatus: 'married',
  });

  const moveNext = () => {
    window.alert('moveNext');
  };

  const handleChange = (e: ValueType) => {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
    console.log(details);
  };

  return (
    <>
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
      <RadioMolecule
        list={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
        handleChange={handleChange}
        name="Gender">
        Gender
      </RadioMolecule>
      <RadioMolecule
        list={[
          { value: 'married', label: 'Married' },
          { value: 'single', label: 'Single' },
        ]}
        handleChange={handleChange}
        name="maritalStatus">
        Martial Status
      </RadioMolecule>
      <div className="float-right">
        <Button onClick={moveNext}>Next</Button>
      </div>
    </>
  );
};

export default PersonalDetails;
