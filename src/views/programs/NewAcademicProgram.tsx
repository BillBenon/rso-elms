/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import ILabel from '../../components/Atoms/Text/ILabel';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import NewLevel from '../../components/Organisms/forms/level/NewLevel';
import programStore from '../../store/program.store';
import { CommonFormProps, ValueType } from '../../types';
import { CreateProgramInfo, ProgramType } from '../../types/services/program.types';

interface INewAcademyProgram<K> extends CommonFormProps<K> {}

const options = [
  {
    label: 'Year 1',
    value: 'en',
  },
  {
    label: 'Year 2',
    value: 'fr',
  },
  {
    label: 'Year 3',
    value: 'kiny',
  },
];

export default function NewAcademicProgram<E>({ onSubmit }: INewAcademyProgram<E>) {
  const [open, setOpen] = useState(false); // state to controll the popup
  const [lopen, setLopen] = useState(false);

  const [details, setDetails] = useState<CreateProgramInfo>({
    code: '',
    department_id: '',
    description: '',
    name: '',
    type: ProgramType.SHORT_COURSE,
  });
  const { mutateAsync } = programStore.createProgram();
  const history = useHistory();

  function handleChange(e: ValueType) {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  }

  async function createProgram<T>(e: FormEvent<T>) {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
    await mutateAsync(details, {
      onSuccess() {
        history.push('/dashboard/academies');
      },
    });
  }

  function handlePopupClose() {
    setLopen(false);
    setOpen(true);
  }

  function handleProgramPopup() {
    setOpen(false);
    setLopen(true);
  }
  return (
    <form onSubmit={createProgram}>
      <div className="p-4 pl-8 popup-width">
        <div className="py-5 mb-3 capitalize">
          <Heading color="primary" fontWeight="bold">
            New Program
          </Heading>
        </div>
        <InputMolecule
          value={details.name}
          error=""
          handleChange={handleChange}
          name="name">
          program name
        </InputMolecule>
        <InputMolecule
          value={details.code}
          error=""
          handleChange={handleChange}
          name="code">
          Program code
        </InputMolecule>
        <DropdownMolecule
          width="64"
          placeholder="Select user"
          options={options}
          name="academy"
          onChange={handleChange}>
          Program-in-charge
        </DropdownMolecule>
        <DropdownMolecule
          width="64"
          placeholder="Select faculty"
          options={options}
          name="academy"
          onChange={handleChange}>
          Faculty
        </DropdownMolecule>
        <DropdownMolecule
          width="64"
          placeholder="select program levels"
          options={[
            { label: 'SHORT COURSE', value: ProgramType.SHORT_COURSE.toString() },
            { label: 'ACADEMIC', value: ProgramType.ACADEMIC.toString() },
          ]}
          name={details.type.toString()}
          onChange={handleChange}
          error="">
          Program Type
        </DropdownMolecule>
        <TextAreaMolecule
          value={details.description}
          name="description"
          handleChange={handleChange}>
          Description
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
        <div className="w-82 h-48">
          <DropdownMolecule
            placeholder="Select Level"
            options={options}
            name="academy"
            onChange={handleChange}
            error="">
            Choose Level
          </DropdownMolecule>
          <div className="flex items-center" onClick={handleProgramPopup}>
            <Icon name="add" size={15} />
            <ILabel size="sm" weight="medium" className="cursor-pointer" color="primary">
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
      <PopupMolecule title="New Level" open={lopen} onClose={handlePopupClose}>
        <NewLevel />
      </PopupMolecule>
    </form>
  );
}
