// import { Label } from "@headlessui/react/dist/components/label/label";
import './academy.scss';

import React from 'react';

import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import Heading from '../../Atoms/Text/Heading';
import ILabel from '../../Atoms/Text/ILabel';
import InputMolecule from '../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';

export default function AddAcademy() {
  function handleChange(_event: any) {
    console.log('here');
  }

  return (
    <>
      <div className="flex flex-wrap justify-start items-center">
        <ILabel size="sm" color="gray" weight="medium">
          Institution Admin
        </ILabel>
        <Icon name="chevron-right" />

        <ILabel size="sm" color="gray" weight="medium">
          Academies
        </ILabel>
        <Icon name="chevron-right" fill="gray" />
        <ILabel size="sm" color="primary" weight="medium">
          Academy
        </ILabel>
      </div>

      <div className="p-4 pl-6 popup-width gap-3">
        <div className="py-5 mb-3 capitalize">
          <Heading color="primary" fontWeight="bold">
            New academy
          </Heading>
        </div>
        <InputMolecule
          name="acname"
          placeholder="Type academy name"
          value={''}
          handleChange={(e) => handleChange(e)}>
          academy name
        </InputMolecule>
        <InputMolecule
          name="email"
          type="email"
          value={''}
          placeholder="example@gmail.com"
          handleChange={(e) => handleChange(e)}>
          academy email
        </InputMolecule>
        <InputMolecule
          name="phone"
          type="tel"
          value={''}
          placeholder="Type academy phone number"
          handleChange={(e) => handleChange(e)}>
          academy phone number
        </InputMolecule>
        <InputMolecule
          name="website"
          value={''}
          placeholder="Type website url"
          handleChange={(e) => handleChange(e)}>
          academy website
        </InputMolecule>
        <TextAreaMolecule
          name="website"
          value={''}
          placeholder="Type website url"
          handleChange={(e) => handleChange(e)}>
          academy description
        </TextAreaMolecule>
        <div>
          <div className="mb-3">
            <ILabel weight="bold">academy logo</ILabel>
          </div>
          <Button styleType="outline">upload logo</Button>
        </div>
        <div className="mt-5">
          <Button full>Save</Button>
        </div>
      </div>
    </>
  );
}
