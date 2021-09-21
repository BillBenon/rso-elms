import React, { FormEvent, useState } from 'react';

import { CommonFormProps, ValueType } from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import Icon from '../../../Atoms/custom/Icon';
import Heading from '../../../Atoms/Text/Heading';
import ILabel from '../../../Atoms/Text/ILabel';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';
import PopupMolecule from '../../../Molecules/Popup';

interface INewAcademyProgram<K> extends CommonFormProps<K> {}

const options = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'French',
    value: 'fr',
  },
  {
    label: 'Kinyarwanda',
    value: 'kiny',
  },
];

export default function NewAcademicProgram<E>({ onSubmit }: INewAcademyProgram<E>) {
  const [open, setOpen] = useState(false); // state to controll the popup

  function handleChange(_e: ValueType) {}

  function submitForm(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:
    if (onSubmit) onSubmit(e);
  }

  return (
    <form onSubmit={submitForm}>
      <div className="p-4 pl-8 popup-width">
        <div className="py-5 mb-3 capitalize">
          <Heading color="primary" fontWeight="bold">
            New Program
          </Heading>
        </div>
        <InputMolecule value="" error="" handleChange={handleChange} name="model-name">
          program name
        </InputMolecule>{' '}
        <InputMolecule value="" error="" handleChange={handleChange} name="model-name">
          Program code
        </InputMolecule>
        <DropdownMolecule
          width="64"
          placeholder="Select faculty"
          options={options}
          name="academy"
          onChange={(_e: object) => {}}
          error="Please select faculty">
          Faculty
        </DropdownMolecule>
        <DropdownMolecule
          width="64"
          placeholder="select program levels"
          options={options}
          name="academy"
          onChange={(_e: object) => {}}
          error="">
          Program Type
        </DropdownMolecule>
        <TextAreaMolecule value="" name="description" handleChange={handleChange}>
          Descripiton
        </TextAreaMolecule>
        <RadioMolecule
          value="ACTIVE"
          name="status"
          options={[
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Inactive', value: 'INACTIVE' },
          ]}
          handleChange={handleChange}>
          Status
        </RadioMolecule>
        {/* save button */}
        <div className="mt-5">
          <Button type="submit" onClick={() => setOpen(true)}>
            Save
          </Button>
        </div>
      </div>

      {/* add prerequesite popup */}
      <PopupMolecule
        title="Add a level to this program"
        open={open}
        onClose={() => setOpen(false)}>
        <div className="w-82 h-40">
          <DropdownMolecule
            placeholder="Select Level"
            options={options}
            name="academy"
            onChange={(_e: object) => {}}
            error="">
            Choose Level
          </DropdownMolecule>
          <div className="flex gap-2 items-center mt-3z">
            <Icon name="add" size={15} />
            <ILabel size="sm" weight="medium" color="primary">
              Add level
            </ILabel>
          </div>
          <div className="mt-5">
            <Button type="submit" onClick={() => setOpen(true)}>
              Save
            </Button>
          </div>
        </div>
      </PopupMolecule>
    </form>
  );
}
