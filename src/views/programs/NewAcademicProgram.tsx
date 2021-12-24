/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useLocation } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import { authenticatorStore } from '../../store/administration';
import { divisionStore } from '../../store/administration/divisions.store';
import programStore from '../../store/administration/program.store';
import usersStore from '../../store/administration/users.store';
import { Link as LinkList } from '../../types';
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
  const { search } = useLocation();
  const facultyId = new URLSearchParams(search).get('dp');

  const { data: userInfo } = authenticatorStore.authUser();
  const { data: inCharge } = usersStore.getUsersByAcademy(
    userInfo?.data.data.academy.id.toString() || '',
  );

  const instructors = inCharge?.data.data.filter(
    (user) => user.user_type === UserType.INSTRUCTOR,
  );

  const departments = divisionStore.getDivisionByType('DEPARTMENT').data?.data.data;
  // const { data: levelsInfo } = levelStore.getLevels(); // fetch levels

  const [details, setDetails] = useState<CreateProgramInfo>({
    code: '',
    in_charge_id: '',
    department_id: facultyId ? facultyId : '',
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

  const list: LinkList[] = [
    { to: '/', title: 'Home' },
    { to: 'dashboard/divisions', title: 'Divisions' },
    { to: '/dashboard/divisions/departments', title: 'Departments' },
    { to: '/', title: 'New Program' },
  ];

  async function createProgram<T>(e: FormEvent<T>) {
    e.preventDefault();

    if (onSubmit) onSubmit(e);
    await mutateAsync(details, {
      onSuccess(newData) {
        toast.success('Program created');
        history.push(`/dashboard/programs/${newData.data.data.id}/level/add`);
      },
      onError(error: any) {
        toast.error(error.response.data.message);
      },
    });
  }

  return (
    <>
      <section>
        <BreadCrumb list={list}></BreadCrumb>
      </section>
      <form onSubmit={createProgram}>
        <div className="p-6 w-auto lg:w-5/12 pl-8 gap-3 rounded-lg bg-main mt-8 flex-col">
          <div className="py-5 mb-3 capitalize">
            <Heading color="txt-primary" fontWeight="bold">
              New Program
            </Heading>
          </div>
          <InputMolecule
            required
            value={details.name}
            handleChange={handleChange}
            name="name">
            program name
          </InputMolecule>
          <InputMolecule
            value={details.code}
            required
            handleChange={handleChange}
            name="code">
            Program code
          </InputMolecule>
          <RadioMolecule
            className="pb-2"
            value={details.type}
            required
            name="type"
            options={getDropDownStatusOptions(ProgramType)}
            handleChange={handleChange}>
            Program Type
          </RadioMolecule>
          <TextAreaMolecule
            value={details.description}
            required
            name="description"
            handleChange={handleChange}>
            Program description
          </TextAreaMolecule>
          <DropdownMolecule
            width="60 md:w-80"
            placeholder="Select incharge"
            options={getDropDownOptions({
              inputs: instructors || [],
              labelName: ['first_name', 'last_name'],
            })}
            name="in_charge_id"
            handleChange={handleChange}>
            Incharge
          </DropdownMolecule>

          {!facultyId && (
            <DropdownMolecule
              width="60 md:w-80"
              placeholder="Select department"
              options={getDropDownOptions({ inputs: departments || [] })}
              name="department_id"
              handleChange={handleChange}>
              Department
            </DropdownMolecule>
          )}

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
      </form>
    </>
  );
}
