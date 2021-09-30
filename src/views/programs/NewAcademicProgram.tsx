/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import NewLevel from '../../components/Organisms/forms/level/NewLevel';
import programStore from '../../store/program.store';
import { CommonFormProps, ValueType } from '../../types';
import { CreateProgramInfo, ProgramType } from '../../types/services/program.types';
import { getDropDownStatusOptions } from '../../utils/getOption';

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
  const history = useHistory();
  const [lopen, setLopen] = useState(false);

  const [details, setDetails] = useState<CreateProgramInfo>({
    code: '',
    department_id: '025e5365-74e3-4c21-885e-0dca6974dfc0',
    description: '',
    name: '',
    type: ProgramType.SHORT_COURSE,
  });
  const { mutateAsync } = programStore.createProgram();

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
        setLopen(true);
      },
      onError() {},
    });
  }

  function handlePopupClose() {
    setLopen(false);
    history.push('/dashboard/programs');
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
          handleChange={handleChange}>
          Program-in-charge
        </DropdownMolecule>
        <DropdownMolecule
          width="64"
          placeholder="Select department"
          options={options}
          name="academy"
          handleChange={handleChange}>
          Department
        </DropdownMolecule>
        <RadioMolecule
          type="block"
          value={details.type}
          name="type"
          options={getDropDownStatusOptions(ProgramType)}
          handleChange={handleChange}>
          Program Type
        </RadioMolecule>
        <TextAreaMolecule
          value={details.description}
          name="description"
          handleChange={handleChange}>
          Description
        </TextAreaMolecule>
        {/* <RadioMolecule
          value="ACTIVE"
          name="status"
          options={[
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Inactive', value: 'INACTIVE' },
          ]}
          handleChange={handleChange}>
          Status
        </RadioMolecule> */}
        {/* save button */}
        <div className="mt-5">
          <Button type="submit">Save</Button>
        </div>
      </div>
      <PopupMolecule
        title="Create levels to this program"
        open={lopen}
        onClose={handlePopupClose}>
        <NewLevel />
      </PopupMolecule>
    </form>
  );
}
