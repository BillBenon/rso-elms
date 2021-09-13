import React, { useState } from 'react';

import { ValueType } from '../../../types';
import { validation } from '../../../utils/validations';
import InputMolecule from '../../Molecules/input/InputMolecule';
import RadioMolecule from '../../Molecules/input/RadioMolecule';

const PersonalDetails = () => {
  const [details, setDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    gender: 'male',
    dob: '',
    maritalStatus: 'married',
  });

  const validate = {
    touched: false,
    completed: false,
    firstName: (name: string) => validation.nameValidation('First Name', name),
    lastName: (name: string) => validation.nameValidation('Last Name', name),
    email: validation.emailValidation,
    age: validation.dateValidation,
    phone: validation.phoneValidation,
    gender: 'male',
    dob: '',
    maritalStatus: 'married',
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
        name="firstname"
        value={details.firstname}
        handleChange={handleChange}
        error={validate.firstName(details.firstname)}>
        First Name
      </InputMolecule>
      <InputMolecule
        name="lastname"
        value={details.lastname}
        handleChange={handleChange}
        error={validate.lastName(details.lastname)}>
        Last Name
      </InputMolecule>
      <InputMolecule
        name="email"
        value={details.email}
        type="email"
        placeholder="username@example.com"
        handleChange={handleChange}
        error={validate.email(details.email)}>
        Email
      </InputMolecule>
      <InputMolecule
        name="phone"
        value={details.phone}
        placeholder="+250 ---------"
        handleChange={handleChange}
        error={validate.phone(details.phone)}>
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
    </>
  );
};

export default PersonalDetails;
