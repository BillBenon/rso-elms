// import { Label } from "@headlessui/react/dist/components/label/label";
import './academy.scss';

import React from 'react';

import Dashboard from '../../../layout/Dashboard';
import Icon from '../../Atoms/custom/Icon';
import ILabel from '../../atoms/Text/ILabel';
import InputMolecule from '../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';

export default function AddAcademy() {
  function handleChange(event) {
    console.log('here');
  }

  return (
    <Dashboard activeIndex={2}>
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

      <div className="p-4 pl-6 popup-width flex flex-col gap-3">
        <InputMolecule
          name="acname"
          placeholder="Type academy name"
          value={'='}
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
          academy website
        </TextAreaMolecule>
      </div>
    </Dashboard>
  );
}
