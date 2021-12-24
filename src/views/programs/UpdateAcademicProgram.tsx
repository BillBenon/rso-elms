import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import { divisionStore } from '../../store/administration/divisions.store';
import programStore from '../../store/administration/program.store';
import usersStore from '../../store/administration/users.store';
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

  const { data: departments, isLoading } = divisionStore.getDivisionByType('DEPARTMENT');

  const [details, setDetails] = useState<CreateProgramInfo>({
    code: '',
    in_charge_id: '',
    department_id: '',
    description: '',
    name: '',
    type: ProgramType.SHORT_COURSE,
    status: ProgramStatus.ACTIVE,
  });
  const { mutate } = programStore.modifyProgram();

  useEffect(() => {
    data?.data.data && setDetails({ ...data?.data.data });
  }, [data]);

  function handleChange(e: ValueType) {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  }

  function updateProgram<T>(e: FormEvent<T>) {
    e.preventDefault();
    mutate(details, {
      onSuccess() {
        toast.success('Successfully updated program', { duration: 1200 });
        setTimeout(() => {
          history.goBack();
        }, 900);
      },
      onError(error) {
        toast.error(error + '');
      },
    });
    if (onSubmit) onSubmit(e);
  }

  return (
    <form onSubmit={updateProgram}>
      <div className="p-6 w-auto lg:w-5/12 pl-6 gap-3 rounded-lg bg-main mt-8">
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
          defaultValue={getDropDownOptions({
            inputs: instructors || [],
            labelName: ['username'],
          }).find((incharge) => incharge.value === data?.data.data.current_admin_names)}
          width="64"
          placeholder="Select incharge"
          options={getDropDownOptions({
            inputs: instructors || [],
            labelName: ['first_name', 'last_name'],
          })}
          name="in_charge_id"
          handleChange={(e: ValueType) => handleChange(e)}>
          Incharge
        </DropdownMolecule>
        <DropdownMolecule
          width="64"
          placeholder={isLoading ? 'Loading departments' : 'Select department'}
          options={getDropDownOptions({ inputs: departments?.data.data || [] })}
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
