import React, { KeyboardEventHandler, MouseEventHandler } from 'react';

import InputMolecule from '../../Molecules/input/InputMolecule';
import RadioMolecule from '../../Molecules/input/RadioMolecule';

const PersonalDetails = ({ details, setDetails, validate }) => {
  const handleChange2 = (
    _value: string,
    e: KeyboardEventHandler<HTMLDivElement> | MouseEventHandler<HTMLDivElement>,
  ) => {
    let inputs = details;
    inputs[e.target.name] = _value;
    setDetails(inputs);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputs = details;
    inputs[e.target.name] = e.target.value;
    setDetails(inputs);
  };

  return (
    <>
      <InputMolecule
        name={details.firstname[0]}
        value={details.firstname}
        handleChange={(e) => handleChange(e)}
        error={validate.firstName(details.firstname)}>
        First Name
      </InputMolecule>
      <InputMolecule
        name={details.lastname[0]}
        value={details.lastname}
        handleChange={(e) => handleChange(e)}
        error={validate.lastName(details.lastname)}>
        Last Name
      </InputMolecule>
      <InputMolecule
        name={details.email[0]}
        value={details.email}
        type="email"
        placeholder="username@example.com"
        handleChange={(e) => handleChange(e)}
        error={validate.email(details.email)}>
        Email
      </InputMolecule>
      <InputMolecule
        name={details.phone[0]}
        value={details.phone}
        placeholder="+250 ---------"
        handleChange={(e) => handleChange(e)}
        error={validate.phone(details.phone)}>
        Phone number
      </InputMolecule>
      <RadioMolecule
        list={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
        handleChange={handleChange2}>
        Gender
      </RadioMolecule>
      <RadioMolecule
        list={[
          { value: 'married', label: 'Married' },
          { value: 'single', label: 'Single' },
        ]}
        handleChange={handleChange2}>
        Martial Status
      </RadioMolecule>
    </>
  );
};

export default PersonalDetails;
