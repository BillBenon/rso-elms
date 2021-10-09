/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import { divisionStore } from '../../store/divisions.store';
import programStore from '../../store/program.store';
import usersStore from '../../store/users.store';
import { CommonFormProps, ParamType, ValueType } from '../../types';
import {
  CreateProgramInfo,
  ProgramStatus,
  ProgramType,
} from '../../types/services/program.types';
import { UserType } from '../../types/services/user.types';
import { getDropDownOptions, getDropDownStatusOptions } from '../../utils/getOption';

interface IUpdateAcademicProgram<K> extends CommonFormProps<K> {}
export default function UpdateAcademicProgram<E>({
  onSubmit,
}: IUpdateAcademicProgram<E>) {
  const history = useHistory();
  const { id } = useParams<ParamType>();

  const users = usersStore.fetchUsers().data;
  const instructors = users?.data.data.filter(
    (user) => user.user_type === UserType.INSTRUCTOR || user.user_type === UserType.ADMIN,
  );

  const { data } = programStore.getProgramById(id);

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
  const { mutateAsync } = programStore.modifyProgram();

  useEffect(() => {
    data?.data.data && setDetails({ ...data?.data.data });
  }, [data]);

  function handleChange(e: ValueType) {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  }

  async function updateProgram<T>(e: FormEvent<T>) {
    const toastId = toast.loading('Upading program control');

    e.preventDefault();
    await mutateAsync(details, {
      onSuccess() {
        history.goBack();
        toast.success('program updated', { id: toastId });
      },
      onError(error) {
        toast.error(error + '', { id: toastId });
      },
    });
    if (onSubmit) onSubmit(e);
  }

  return (
    <form onSubmit={updateProgram}>
      <div className="p-6 w-5/12 pl-6 gap-3 rounded-lg bg-main mt-8">
        <div className="py-5 mb-3 capitalize">
          <Heading color="txt-primary" fontWeight="bold">
            Edit Program
          </Heading>
        </div>
        <InputMolecule
          value={details.name}
          error=""
          handleChange={(e) => handleChange(e)}
          name="name">
          program name
        </InputMolecule>
        <InputMolecule
          value={details.code}
          error=""
          handleChange={(e) => handleChange(e)}
          name="code">
          Program code
        </InputMolecule>
        <RadioMolecule
          className="pb-2"
          value={details.type}
          name="type"
          options={getDropDownStatusOptions(ProgramType)}
          handleChange={(e) => handleChange(e)}>
          Program Type
        </RadioMolecule>
        <TextAreaMolecule
          value={details.description}
          name="description"
          handleChange={(e) => handleChange(e)}>
          Program description
        </TextAreaMolecule>
        <DropdownMolecule
          // defaultValue={data?.data.data.incharge?.username}
          width="64"
          placeholder="Select incharge"
          options={getDropDownOptions(instructors, 'username')}
          name="current_admin_id"
          handleChange={(e: ValueType) => handleChange(e)}>
          Incharge
        </DropdownMolecule>
        <DropdownMolecule
          width="64"
          placeholder="Select department"
          options={getDropDownOptions(departments)}
          name="department_id"
          handleChange={(e: ValueType) => handleChange(e)}>
          Department
        </DropdownMolecule>
        <RadioMolecule
          value={details.status}
          name="status"
          options={getDropDownStatusOptions(ProgramStatus)}
          handleChange={handleChange}>
          Status
        </RadioMolecule>
        <div className="mt-5">
          <Button type="submit">Update</Button>
        </div>
      </div>
    </form>
  );
}
