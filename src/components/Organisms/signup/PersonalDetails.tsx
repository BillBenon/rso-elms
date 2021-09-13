import React, { KeyboardEventHandler, MouseEventHandler } from 'react';

import InputMolecule from '../../Molecules/input/InputMolecule';
import RadioMolecule from '../../Molecules/input/RadioMolecule';

const PersonalDetails = ({ details, setDetails, validate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    details[e.target.name] = e.target.value;
    setDetails(details);
    console.log(details);
  };

  return (
    <>
      <InputMolecule
        name="firstname"
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
        name="email"
        value={details.email}
        type="email"
        placeholder="username@example.com"
        handleChange={(e) => handleChange(e)}
        error={validate.email(details.email)}>
        Email
      </InputMolecule>
      <InputMolecule
        name="phone"
        value={details.phone}
        placeholder="+250 ---------"
        handleChange={(e) => handleChange(e)}
        error={validate.phone(details.phone)}>
        Phone number
      </InputMolecule>
      {/* <RadioMolecule
        list={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
        handleChange={(e) => handleChange(e)}>
        Gender
      </RadioMolecule>
      <RadioMolecule
        list={[
          { value: 'married', label: 'Married' },
          { value: 'single', label: 'Single' },
        ]}
        handleChange={(e) => handleChange(e)}>
        Martial Status
      </RadioMolecule> */}
    </>
  );
};

export default PersonalDetails;
