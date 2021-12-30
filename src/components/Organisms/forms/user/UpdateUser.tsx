import { pick } from 'lodash';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';

import { authenticatorStore } from '../../../../store/administration';
import academyStore from '../../../../store/administration/academy.store';
import {
  getIntakesByAcademy,
  getProgramsByIntake,
} from '../../../../store/administration/intake.store';
import { getLevelsByAcademicProgram } from '../../../../store/administration/program.store';
import usersStore from '../../../../store/administration/users.store';
import { CommonFormProps, ParamType, ValueType } from '../../../../types';
import { AcademyInfo } from '../../../../types/services/academy.types';
import { IntakeProgramInfo } from '../../../../types/services/intake-program.types';
import {
  DocType,
  EducationLevel,
  GenderStatus,
  MaritalStatus,
  UpdateUserInfo,
  UserInfo,
  UserType,
} from '../../../../types/services/user.types';
import {
  getDropDownOptions,
  getDropDownStatusOptions,
} from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import Heading from '../../../Atoms/Text/Heading';
import DateMolecule from '../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import SelectMolecule from '../../../Molecules/input/SelectMolecule';

export default function UpdateUser<E>({ onSubmit }: CommonFormProps<E>) {
  const history = useHistory();
  const updateUserType = pick(UserType, ['ADMIN', 'INSTRUCTOR', 'STUDENT']);
  const updateUserTypeWithSuper = { ...updateUserType, SUPER_ADMIN: 'SUPER_ADMIN' };
  const authUser = authenticatorStore.authUser();

  const [details, setDetails] = useState<UpdateUserInfo>({
    person: '',
    academic_program_level_id: '',
    academy_id: '',
    academy_name: '',
    birth_date: '',
    doc_type: DocType.NID,
    education_level: EducationLevel.ILLITERATE,
    email: '',
    first_name: '',
    id: '',
    intake_program_id: '',
    last_name: '',
    marital_status: MaritalStatus.MARRIED,
    nid: '',
    password: '',
    person_id: '',
    phone: '',
    sex: GenderStatus.MALE,
    user_type: UserType.STUDENT,
    username: '',
  });

  const { id } = useParams<ParamType>();
  const { data } = usersStore.getUserById(id);

  let selectedUser: UserInfo | undefined;
  useEffect(() => {
    selectedUser = data?.data.data;

    selectedUser &&
      setDetails({
        person: selectedUser.person,
        academic_program_level_id: selectedUser.academic_program_level_id,
        academy_id: selectedUser.academy_id,
        academy_name: selectedUser.academy.name,
        birth_date: selectedUser.person.birth_date,
        doc_type: selectedUser.person.doc_type,
        education_level: selectedUser.education_level,
        email: selectedUser.email,
        first_name: selectedUser.first_name,
        id: id,
        intake_program_id: selectedUser.intake_program_id,
        last_name: selectedUser.last_name,
        marital_status: selectedUser.person.marital_status,
        nid: selectedUser.person.nid,
        password: selectedUser.password,
        person_id: selectedUser.person_id,
        phone: selectedUser.phone.toString(),
        sex: selectedUser.sex,
        user_type: selectedUser.user_type,
        username: selectedUser.username,
      });
  }, [data]);

  const [otherDetails, setOtherDetails] = useState({
    intake: '',
    level: '',
  });

  function handleChange(e: ValueType) {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  }

  function otherhandleChange(e: ValueType) {
    setOtherDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  }

  const { mutateAsync } = usersStore.modifyUser();
  async function addUser<T>(e: FormEvent<T>) {
    e.preventDefault();

    if (onSubmit) onSubmit(e);

    Object.keys(details).map((val) => {
      //@ts-ignore
      if (!details[val]) details[val] = '';
    });

    await mutateAsync(details, {
      onSuccess(data) {
        toast.success(data.data.message);
        history.goBack();
      },
      onError(error: any) {
        toast.error(error.response.data.message);
      },
    });
  }
  // get all academies in an institution
  const academies: AcademyInfo[] | undefined =
    academyStore.fetchAcademies().data?.data.data;

  // get intakes based on selected academy
  let intakes = getIntakesByAcademy(details.academy_id, false);

  useEffect(() => {
    intakes.refetch();
  }, [details.academy_id]);

  // get programs based on selected intake
  let programs = getProgramsByIntake(otherDetails.intake, !!otherDetails.intake);
  useEffect(() => {
    programs.refetch();
  }, [otherDetails.intake]);

  //get levels based on selected program
  let selectedProgram = programs.data?.data.data.find(
    (p) => p.id == details.intake_program_id,
  );
  let programId = selectedProgram?.program.id + '';
  let levels = getLevelsByAcademicProgram(programId);

  useEffect(() => {
    levels.refetch();
  }, [details.intake_program_id]);

  return (
    <div className="p-6 w-5/12 pl-6 gap-3 rounded-lg bg-main mt-8">
      <div className="py-5 mb-3 capitalize">
        <Heading color="txt-primary" fontWeight="bold">
          Edit User
        </Heading>
      </div>
      <form onSubmit={addUser}>
        <SelectMolecule
          value={details.user_type}
          options={getDropDownStatusOptions(
            authUser.data?.data.data.user_type === UserType.SUPER_ADMIN
              ? updateUserTypeWithSuper
              : updateUserType,
          )}
          name="user_type"
          placeholder={authUser.data?.data.data.user_type || 'Select user type'}
          handleChange={handleChange}>
          User type
        </SelectMolecule>
        <InputMolecule
          name="first_name"
          placeholder="eg: Kabera"
          value={details.first_name}
          handleChange={handleChange}>
          First name
        </InputMolecule>
        <InputMolecule
          name="last_name"
          placeholder="eg: Claude"
          value={details.last_name}
          handleChange={handleChange}>
          Last name
        </InputMolecule>
        <InputMolecule
          name="email"
          placeholder="Enter email"
          value={details.email}
          handleChange={handleChange}>
          Email
        </InputMolecule>

        <InputMolecule
          name="username"
          placeholder="eg: tester"
          value={details.username}
          handleChange={handleChange}>
          Username
        </InputMolecule>

        <InputMolecule
          name="password"
          type="password"
          placeholder="eg: ********"
          value={details.password}
          handleChange={handleChange}>
          Password
        </InputMolecule>
        <DateMolecule
          defaultValue={details.birth_date}
          handleChange={handleChange}
          name="birth_date"
          width="60 md:w-80"
          date_time_type={false}>
          Date of Birth
        </DateMolecule>
        <InputMolecule
          name="phone"
          placeholder="Enter phone number"
          value={details.phone}
          handleChange={handleChange}>
          Phone number
        </InputMolecule>
        <RadioMolecule
          className="pb-2"
          defaultValue={details.sex}
          options={getDropDownStatusOptions(GenderStatus)}
          value={details.sex}
          handleChange={handleChange}
          name="sex">
          Gender
        </RadioMolecule>

        <SelectMolecule
          placeholder={'Select your reference'}
          value={details.doc_type}
          handleChange={handleChange}
          name="doc_type"
          options={getDropDownStatusOptions(DocType)}>
          Reference Number
        </SelectMolecule>
        <InputMolecule
          name="nid"
          type="text"
          value={details.nid}
          placeholder={`Enter ${details.doc_type.replaceAll('_', ' ')} number`}
          handleChange={handleChange}>
          {details.doc_type.replaceAll('_', ' ')}
        </InputMolecule>
        <SelectMolecule
          options={getDropDownStatusOptions(MaritalStatus)}
          name="marital_status"
          value={details.marital_status}
          handleChange={handleChange}>
          Marital Status
        </SelectMolecule>
        <SelectMolecule
          options={getDropDownStatusOptions(EducationLevel)}
          name="education_level"
          value={details.education_level}
          handleChange={handleChange}>
          Education level
        </SelectMolecule>
        {![UserType.SUPER_ADMIN].includes(details.user_type) && (
          <SelectMolecule
            options={getDropDownOptions({ inputs: academies || [] })}
            name="academy_id"
            value={details?.academy_id}
            placeholder={'Academy to be enrolled in'}
            handleChange={handleChange}>
            Academy
          </SelectMolecule>
        )}
        {details.user_type === 'STUDENT' && (
          <>
            <SelectMolecule
              options={getDropDownOptions({
                inputs: intakes.data?.data.data || [],
                labelName: ['code'],
              })}
              name="intake"
              value={otherDetails.intake}
              placeholder={'intake to be enrolled in'}
              handleChange={otherhandleChange}>
              Intake
            </SelectMolecule>
            <SelectMolecule
              options={getDropDownOptions({
                inputs: programs.data?.data.data || [],
                labelName: ['name'],
                //@ts-ignore
                getOptionLabel: (prog: IntakeProgramInfo) => prog.program.code,
              })}
              name="intake_program_id"
              value={details.intake_program_id}
              placeholder={'Program to be enrolled in'}
              handleChange={handleChange}>
              Programs
            </SelectMolecule>
            <SelectMolecule
              options={getDropDownOptions({
                inputs: levels.data?.data.data || [],
                labelName: ['name'], //@ts-ignore
                getOptionLabel: (level) => level.level && level.level.name,
              })}
              name="academic_program_level_id"
              placeholder={'Program to be enrolled in'}
              value={details.academic_program_level_id}
              handleChange={handleChange}>
              Levels
            </SelectMolecule>
          </>
        )}
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}
