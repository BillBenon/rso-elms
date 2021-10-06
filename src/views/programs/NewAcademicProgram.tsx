/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import NewLevel from '../../components/Organisms/forms/level/NewLevel';
import { divisionStore } from '../../store/divisions.store';
import programStore from '../../store/program.store';
import usersStore from '../../store/users.store';
import { CommonFormProps, ValueType } from '../../types';
import {
  CreateProgramInfo,
  ProgramStatus,
  ProgramType,
} from '../../types/services/program.types';
import { UserType } from '../../types/services/user.types';
import { getDropDownOptions, getDropDownStatusOptions } from '../../utils/getOption';

interface INewAcademyProgram<K> extends CommonFormProps<K> {}

export default function NewAcademicProgram<E>({ onSubmit }: INewAcademyProgram<E>) {
  const history = useHistory();
  const [lopen, setLopen] = useState(false);

  const { data } = usersStore.fetchUsers();
  const instructors = data?.data.data.filter(
    (user) => user.user_type === UserType.INSTRUCTOR || user.user_type === UserType.ADMIN,
  );

  const departments = divisionStore.getDivisionByType('DEPARTMENT').data?.data.data;

  const [details, setDetails] = useState<CreateProgramInfo>({
    code: '',
    current_admin_id: '',
    department_id: '',
    description: '',
    name: '',
    type: ProgramType.SHORT_COURSE,
    status: ProgramStatus.ACTIVE,
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
      onSuccess(data) {
        toast.success(data.data.message);
        setLopen(true);
      },
      onError() {
        toast.error('An error occurred please try again later');
      },
    });
  }

  function handlePopupClose() {
    setLopen(false);
    history.push('/dashboard/programs');
  }

  return (
    <form onSubmit={createProgram}>
      <div className="p-6 w-5/12 pl-8 gap-3 rounded-lg bg-main mt-8">
        <div className="py-5 mb-3 capitalize">
          <Heading color="txt-primary" fontWeight="bold">
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
        <RadioMolecule
          className="pb-2"
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
          Program description
        </TextAreaMolecule>
        <DropdownMolecule
          width="64"
          placeholder="Select incharge"
          options={getDropDownOptions(instructors, 'username')}
          name="current_admin_id"
          handleChange={handleChange}>
          Incharge
        </DropdownMolecule>
        <DropdownMolecule
          width="64"
          placeholder="Select department"
          options={getDropDownOptions(departments)}
          name="department_id"
          handleChange={handleChange}>
          Department
        </DropdownMolecule>
        <RadioMolecule
          value={details.status}
          name="status"
          options={getDropDownStatusOptions(ProgramStatus)}
          handleChange={handleChange}>
          Status
        </RadioMolecule>
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
