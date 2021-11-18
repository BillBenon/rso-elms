import { pick } from 'lodash';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';

import { authenticatorStore } from '../../../../store/administration';
import academyStore from '../../../../store/administration/academy.store';
import { intakeStore } from '../../../../store/administration/intake.store';
import programStore from '../../../../store/administration/program.store';
import usersStore from '../../../../store/administration/users.store';
import { CommonFormProps, ValueType } from '../../../../types';
import { AcademyInfo } from '../../../../types/services/academy.types';
import { IntakeProgramInfo } from '../../../../types/services/intake-program.types';
import {
  CreateUserInfo,
  DocType,
  EducationLevel,
  GenderStatus,
  MaritalStatus,
  SendCommunicationMsg,
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

export default function NewUser<E>({ onSubmit }: CommonFormProps<E>) {
  const history = useHistory();
  const newUserType = pick(UserType, ['ADMIN', 'INSTRUCTOR', 'STUDENT']);
  const newUserTypeWithSuper = { ...newUserType, SUPER_ADMIN: 'SUPER_ADMIN' };
  const authUser = authenticatorStore.authUser();

  const [details, setDetails] = useState<CreateUserInfo>({
    activation_key: '',
    academy_id: '',
    deployed_on: '',
    deployment_number: `DEP-${parseInt(Math.random() * 10000 + '')}`,
    birth_date: '',
    doc_type: DocType.NID,
    education_level: EducationLevel.ILLITERATE,
    email: '',
    father_names: '',
    first_name: '',
    academic_program_level_id: '',
    intake_program_id: '',
    last_name: '',
    marital_status: MaritalStatus.SINGLE,
    mother_names: '',
    next_of_keen_proculation_reason: '',
    nid: '',
    password: '',
    password_reset_period_in_days: 0,
    person_id: '',
    phone: '',
    place_of_birth: '',
    place_of_residence: '',
    relationship_with_next_of_ken: '',
    reset_date: '',
    residence_location_id: 0,
    sex: GenderStatus.MALE,
    user_type: UserType.STUDENT,
    username: '',
    intake_id: '',
    nationality: '',
    document_expire_on: '',
    send_communication_msg: SendCommunicationMsg.BOTH,
  });

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

  const { mutateAsync } = usersStore.createUser();
  async function addUser<T>(e: FormEvent<T>) {
    e.preventDefault();

    if (onSubmit) onSubmit(e);

    await mutateAsync(details, {
      onSuccess(data) {
        toast.success(data.data.message);
        history.goBack();
      },
      onError() {
        toast.error('An error occurred when creating user, please try again later');
      },
    });
  }
  // get all academies in an institution
  const academies: AcademyInfo[] | undefined =
    academyStore.fetchAcademies().data?.data.data;

  // get intakes based on selected academy
  let intakes = intakeStore.getIntakesByAcademy(details.academy_id);

  useEffect(() => {
    intakes.refetch();
  }, [details.academy_id]);

  // get programs based on selected intake
  let programs = intakeStore.getProgramsByIntake(otherDetails.intake);

  useEffect(() => {
    programs.refetch();
  }, [otherDetails.intake]);

  //get levels based on selected program
  let selectedProgram = programs.data?.data.data.find(
    (p) => p.id == details.intake_program_id,
  );
  let programId = selectedProgram?.program.id.toString() || '';
  let levels = programStore.getLevelsByAcademicProgram(programId);

  let nationalities: [] = [];

  useEffect(() => {
    levels.refetch();
  }, [details.intake_program_id]);

  return (
    <div className="p-6 w-5/12 pl-6 gap-3 rounded-lg bg-main mt-8">
      <div className="py-5 mb-3 capitalize">
        <Heading color="txt-primary" fontWeight="bold">
          New User
        </Heading>
      </div>
      <form onSubmit={addUser}>
        <DropdownMolecule
          defaultValue={getDropDownStatusOptions(
            authUser.data?.data.data.user_type === UserType.SUPER_ADMIN
              ? newUserTypeWithSuper
              : newUserType,
          ).find((type) => type.label === details.user_type)}
          options={getDropDownStatusOptions(
            authUser.data?.data.data.user_type === UserType.SUPER_ADMIN
              ? newUserTypeWithSuper
              : newUserType,
          )}
          name="user_type"
          placeholder={'Select user type'}
          handleChange={handleChange}>
          User type
        </DropdownMolecule>
        {details.user_type === UserType.INSTRUCTOR ? (
          <>
            <DateMolecule
              handleChange={handleChange}
              startYear={new Date().getFullYear()}
              endYear={new Date().getFullYear() + 100}
              padding={3}
              reverse={false}
              name="deployed_on"
              width="60 md:w-80">
              Deployment date
            </DateMolecule>
            <InputMolecule
              readOnly
              name="deployment_number"
              placeholder="eg: Manzi"
              value={details.deployment_number}
              handleChange={handleChange}>
              Deployment number
            </InputMolecule>
          </>
        ) : null}
        <InputMolecule
          name="first_name"
          placeholder="eg: Manzi"
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
          placeholder="Enter username"
          value={details.username}
          handleChange={handleChange}>
          Username
        </InputMolecule>
        <InputMolecule
          type="password"
          name="password"
          placeholder="Enter password"
          value={details.password}
          handleChange={handleChange}>
          Password
        </InputMolecule>
        <DateMolecule
          handleChange={handleChange}
          name="birth_date"
          width="60 md:w-80"
          padding={3}
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
        <DropdownMolecule
          width="60 md:w-80"
          name="nationality"
          defaultValue={getDropDownOptions({ inputs: nationalities }).find(
            (national) => national.value === details.nationality,
          )}
          handleChange={handleChange}
          options={[]}>
          Nationality
        </DropdownMolecule>
        <DropdownMolecule
          placeholder={'Select your reference'}
          handleChange={handleChange}
          name="doc_type"
          defaultValue={getDropDownStatusOptions(DocType).find(
            (doc) => doc.label === details.doc_type,
          )}
          options={getDropDownStatusOptions(DocType)}>
          Reference Number
        </DropdownMolecule>

        <InputMolecule
          name="nid"
          type="text"
          value={details.nid}
          placeholder={`Enter ${details.doc_type.replaceAll('_', ' ')} number`}
          handleChange={handleChange}>
          {details.doc_type.replaceAll('_', ' ')}
        </InputMolecule>
        {details.doc_type == DocType.PASSPORT && (
          <DateMolecule
            handleChange={handleChange}
            name="document_expire_on"
            defaultValue={details.document_expire_on}
            endYear={new Date().getFullYear() + 50}
            startYear={new Date().getFullYear()}
            width="60 md:w-80">
            Passport expiry date
          </DateMolecule>
        )}
        <DropdownMolecule
          defaultValue={getDropDownStatusOptions(MaritalStatus).find(
            (marital_status) => marital_status.label === details.marital_status,
          )}
          options={getDropDownStatusOptions(MaritalStatus)}
          name="marital_status"
          placeholder={'Select your marital status'}
          handleChange={handleChange}>
          Marital Status
        </DropdownMolecule>
        <DropdownMolecule
          defaultValue={getDropDownStatusOptions(EducationLevel).find(
            (level) => level.label === details.education_level,
          )}
          options={getDropDownStatusOptions(EducationLevel)}
          name="education_level"
          placeholder={'Select your education level'}
          handleChange={handleChange}>
          Education level
        </DropdownMolecule>
        {![UserType.SUPER_ADMIN].includes(details.user_type) && (
          <DropdownMolecule
            options={getDropDownOptions({ inputs: academies || [] })}
            name="academy_id"
            placeholder={'Academy to be enrolled in'}
            handleChange={handleChange}>
            Academy
          </DropdownMolecule>
        )}
        {details.user_type === 'STUDENT' && (
          <>
            <DropdownMolecule
              options={getDropDownOptions({
                inputs: intakes.data?.data.data || [],
                labelName: ['code'],
              })}
              name="intake"
              placeholder={'intake to be enrolled in'}
              handleChange={otherhandleChange}>
              Intake
            </DropdownMolecule>
            <DropdownMolecule
              options={getDropDownOptions({
                inputs: programs.data?.data.data || [],
                labelName: ['name'],
                //@ts-ignore
                getOptionLabel: (prog: IntakeProgramInfo) => prog.program.code,
              })}
              name="intake_program_id"
              placeholder={'Program to be enrolled in'}
              handleChange={handleChange}>
              Programs
            </DropdownMolecule>
            <DropdownMolecule
              options={getDropDownOptions({
                inputs: levels.data?.data.data || [],
                labelName: ['name'], //@ts-ignore
                getOptionLabel: (level) => level.level && level.level.name,
              })}
              name="academic_program_level_id"
              placeholder={'Program to be enrolled in'}
              handleChange={handleChange}>
              Levels
            </DropdownMolecule>
          </>
        )}
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}