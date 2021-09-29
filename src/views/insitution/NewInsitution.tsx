import React from 'react';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import ILabel from '../../components/Atoms/Text/ILabel';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';

export default function NewInstitution() {
  const handleChange = (e: any) => {
    console.log(e);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
      <div className="hidden lg:flex justify-center items-center h-screen">
        <img src="/icons/login.svg" alt="login" className="block w-10/12" />
      </div>
      <div className="py-8 md:py-12 lg:py-16 px-6">
        <Heading color="primary" fontWeight="semibold" fontSize="3xl">
          Create a new institution
        </Heading>
        <div className="pb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="py-4">
            <InputMolecule
              name="name"
              value={''}
              placeholder="Rwanda National Police"
              handleChange={(e) => handleChange(e)}>
              Institution name
            </InputMolecule>
          </div>
          <div className="py-4">
            <InputMolecule
              name="email"
              value={''}
              placeholder="rnp@gov.rw"
              handleChange={(e) => handleChange(e)}>
              Institution email
            </InputMolecule>
          </div>
          <div className="py-4">
            <InputMolecule
              name="phone"
              value={''}
              placeholder="Enter passport number(if any)"
              handleChange={(e) => handleChange(e)}>
              Institution Phone number
            </InputMolecule>
          </div>
          <div className="py-4">
            <InputMolecule
              name="website"
              value={''}
              placeholder="www.rnp.gov.rw"
              handleChange={(e) => handleChange(e)}>
              Institution website(optinal)
            </InputMolecule>
          </div>
          <div className="py-4">
            <TextAreaMolecule
              name="passport"
              value={''}
              placeholder="Enter passport number(if any)"
              handleChange={(e) => handleChange(e)}>
              Institution website(optinal)
            </TextAreaMolecule>
          </div>
          <div className="py-4">
            <TextAreaMolecule
              name="passport"
              value={''}
              placeholder="Enter passport number(if any)"
              handleChange={(e) => handleChange(e)}>
              Institution website(optinal)
            </TextAreaMolecule>
          </div>
        </div>
        <div className="py-4">
          <ILabel className="block pb-1">Institution logo</ILabel>
          <Button styleType="outline">Upload logo</Button>
        </div>
        <div className="py-4">
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
