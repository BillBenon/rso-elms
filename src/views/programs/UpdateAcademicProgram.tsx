import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import { authenticatorStore } from '../../store/administration';
// import { divisionStore } from '../../store/administration/divisions.store';
import programStore from '../../store/administration/program.store';
import usersStore from '../../store/administration/users.store';
import { Link as LinkList } from '../../types';
import { CommonFormProps, ParamType, ValueType } from '../../types';
import {
  ProgramStatus,
  ProgramType,
  UpdateProgramInfo,
} from '../../types/services/program.types';
import { UserType } from '../../types/services/user.types';
import { getDropDownOptions, getDropDownStatusOptions } from '../../utils/getOption';

interface IUpdateAcademicProgram<K> extends CommonFormProps<K> {}
export default function UpdateAcademicProgram<E>({
  onSubmit,
}: IUpdateAcademicProgram<E>) {
  const history = useHistory();
  const { id } = useParams<ParamType>();

  const authUser = authenticatorStore.authUser().data?.data.data;

  const { data: users } = usersStore.getUsersByAcademyAndUserType(
    authUser?.academy.id.toString() || '',
    UserType.INSTRUCTOR,
    { page: 0, pageSize: 1000, sortyBy: 'username' },
  );

  const instructors = users?.data.data.content;

  const { data } = programStore.getProgramById(id);

  // const departments = divisionStore.getDivisionByType('DEPARTMENT').data?.data.data;

  const [details, setDetails] = useState<UpdateProgramInfo>({
    code: '',
    id: '',
    in_charge_id: '',
    department_id: '',
    description: '',
    name: '',
    type: ProgramType.SHORT_COURSE,
    status: ProgramStatus.ACTIVE,
  });
  const { mutate } = programStore.modifyProgram();

  useEffect(() => {
    data?.data.data &&
      setDetails({
        ...details,
        department_id: data?.data.data.department.id.toString(),
        id: data?.data.data.id,
        name: data.data.data.name,
        code: data.data.data.code,
        description: data.data.data.description,
        type: data?.data.data.type,
      });
    console.log(details);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function handleChange(e: ValueType) {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  }

  // eslint-disable-next-line no-undef
  const list: LinkList[] = [
    { to: '/', title: 'Home' },
    { to: 'dashboard/divisions', title: 'Divisions' },
    { to: '/dashboard/divisions/departments', title: 'Departments' },
    { to: `dashboard/programs/${id}/edit`, title: 'Edit Program' },
  ];

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
    <>
      <section>
        <BreadCrumb list={list}></BreadCrumb>
      </section>
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
          {/* <DropdownMolecule
            width="64"
            placeholder="Select department"
            options={getDropDownOptions({ inputs: departments || [] })}
            name="department_id"
            handleChange={(e: ValueType) => handleChange(e)}>
            Department
          </DropdownMolecule> */}
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
    </>
  );
}
