import React from 'react';

import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import Input from '../../Atoms/Input/Input';
import Heading from '../../Atoms/Text/Heading';
import ILabel from '../../Atoms/Text/ILabel';
import InputMolecule from '../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';

export default function NewStudent() {
  const handleChange = (e: any) => {
    console.log(e);
  };

  const handleSubmit = () => {
    window.alert('submitted');
  };
  return (
    <>
      <div className="flex flex-wrap justify-start items-center">
        <ILabel size="sm" color="gray" weight="medium">
          Institution Admin
        </ILabel>
        <Icon name="chevron-right" />
        <ILabel size="sm" color="gray" weight="medium">
          Users
        </ILabel>
        <Icon name="chevron-right" fill="gray" />
        <ILabel size="sm" color="gray" weight="medium">
          Students
        </ILabel>
        <Icon name="chevron-right" fill="gray" />
        <ILabel size="sm" color="primary" weight="medium">
          New Student
        </ILabel>
      </div>

      <div className="popup-width">
        <Heading color="primary" fontSize="lg" fontWeight="medium">
          New student
        </Heading>
        <div className="mb-7"></div>
        <InputMolecule
          name="firstName"
          placeholder="eg: Kabera"
          value={''}
          handleChange={(e) => handleChange(e)}>
          First name
        </InputMolecule>
        <InputMolecule
          name="lastName"
          placeholder="eg: Claude"
          value={''}
          handleChange={(e) => handleChange(e)}>
          Last name
        </InputMolecule>
        <InputMolecule
          name="employmentNumber"
          placeholder="Army or Police number"
          value={''}
          handleChange={(e) => handleChange(e)}>
          Employment number
        </InputMolecule>
        <InputMolecule
          name="phoneNumber"
          placeholder="Phone number"
          type={'tel'}
          value={''}
          handleChange={(e) => handleChange(e)}>
          Phone number
        </InputMolecule>
        <InputMolecule
          name="email"
          type="email"
          value={''}
          placeholder="example@gmail.com"
          handleChange={(e) => handleChange(e)}>
          email
        </InputMolecule>
        <InputMolecule
          name="nid"
          type="text"
          value={''}
          placeholder="NID number"
          handleChange={(e) => handleChange(e)}>
          NID
        </InputMolecule>
        <InputMolecule
          name="passport"
          value={''}
          placeholder="Enter passport number(if any)"
          handleChange={(e) => handleChange(e)}>
          Passport (optional)
        </InputMolecule>
        <Button width="full" onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </>
  );
}
