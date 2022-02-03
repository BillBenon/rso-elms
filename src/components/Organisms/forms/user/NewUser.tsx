import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';
import countryList from 'react-select-country-list';

import useAuthenticator from '../../../../hooks/useAuthenticator';
import { queryClient } from '../../../../plugins/react-query';
import academyStore from '../../../../store/administration/academy.store';
import {
  getIntakesByAcademy,
  getProgramsByIntake,
} from '../../../../store/administration/intake.store';
import { getLevelsByAcademicProgram } from '../../../../store/administration/program.store';
import usersStore from '../../../../store/administration/users.store';
import { CommonFormProps, ValueType } from '../../../../types';
import { AcademyInfo } from '../../../../types/services/academy.types';
import { IntakeProgramInfo } from '../../../../types/services/intake-program.types';
import { ProgramInfo } from '../../../../types/services/program.types';
import {
  CreateUserInfo,
  DocType,
  EducationLevel,
  GenderStatus,
  MaritalStatus,
  ProfileStatus,
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
// import SelectMolecule from '../../../Molecules/input/SelectMolecule';

interface IParams {
  userType: UserType;
}

export default function NewUser<E>({ onSubmit }: CommonFormProps<E>) {
  const history = useHistory();
  // const newUserType = pick(UserType, ['ADMIN', 'INSTRUCTOR', 'STUDENT']);
  // const newUserTypeWithSuper = { ...newUserType, SUPER_ADMIN: 'SUPER_ADMIN' };
  const { user } = useAuthenticator();

  let { userType } = useParams<IParams>();

  // get all academies in an institution
  const academies: AcademyInfo[] | undefined =
    academyStore.fetchAcademies().data?.data.data;

  const [details, setDetails] = useState<CreateUserInfo>({
    activation_key: '',
    spouse_name: '',
    academy_id: user?.academy?.id + '',
    deployed_on: '',
    deployment_number: `DEP-${parseInt(Math.random() * 10000 + '')}`,
    birth_date: '',
    doc_type: DocType.NID,
    education_level: EducationLevel.ILLITERATE,
    email: '',
    father_names: '',
    first_name: '',
    // academic_program_level_id: '',
    intake_program_id: '',
    last_name: '',
    marital_status: MaritalStatus.SINGLE,
    mother_names: '',
    nid: '',
    password: '',
    password_reset_period_in_days: 0,
    person_id: '',
    phone: '',
    place_of_birth: '',
    place_of_residence: '',
    reset_date: '',
    residence_location_id: 0,
    sex: GenderStatus.MALE,
    user_type: userType,
    username: '',
    nationality: '',
    document_expire_on: '',
    send_communication_msg: SendCommunicationMsg.BOTH,
    profile_status: ProfileStatus.INCOMPLETE,
    id: '',
  });

  const [otherDetails, setOtherDetails] = useState({
    intake: '',
    level: '',
  });

  const options = useMemo(() => countryList().getData(), []);

  // const [nationalities, setNationalitites] = useState({
  //   country: '',
  //   region: '',
  // });

  const [selectedProgram, setSelectedProgram] = useState<ProgramInfo>();

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

  const { mutateAsync, isLoading } = usersStore.createUser();
  async function addUser<T>(e: FormEvent<T>) {
    e.preventDefault();
    if (onSubmit) onSubmit(e);

    let toastId = toast.loading(`Saving new ${userType.toLowerCase()}`);

    await mutateAsync(details, {
      onSuccess(data) {
        toast.success(data.data.message, { id: toastId });
        queryClient.invalidateQueries(['users', 'users/academy', 'users/academy/type']);
        history.goBack();
      },
      onError(error: any) {
        toast.error(error.response.data.message.split(':')[2], { id: toastId });
      },
    });
  }

  // get intakes based on selected academy
  const intakes = getIntakesByAcademy(details.academy_id, false, !!details.academy_id);
  // get programs based on selected intake
  const programs = getProgramsByIntake(otherDetails.intake, !!otherDetails.intake);
  //get levels based on selected program
  useEffect(() => {
    setSelectedProgram(
      programs.data?.data.data.find((p) => p.id == details.intake_program_id)?.program,
    );
  }, [details.intake_program_id, programs.data?.data.data]);

  let levels = getLevelsByAcademicProgram(selectedProgram?.id + '');

  // let nationalities: [] = [];

  useEffect(() => {
    levels.refetch();
  }, [levels, selectedProgram?.id]);
  return (
    <div className="p-6 w-5/12 pl-6 gap-3 rounded-lg bg-main mt-8">
      <div className="py-5 mb-3 capitalize">
        <Heading color="txt-primary" fontWeight="bold">
          New {userType.toLowerCase()}
        </Heading>
      </div>
      <form onSubmit={addUser}>
        {details.user_type === UserType.INSTRUCTOR ? (
          <>
            <DateMolecule
              handleChange={handleChange}
              startYear={new Date().getFullYear() - 20}
              endYear={new Date().getFullYear()}
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
              Service number
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
          startYear={new Date().getFullYear() - 100}
          defaultValue={(new Date().getFullYear() - 16).toString()}
          endYear={new Date().getFullYear() - 16}
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
        <DropdownMolecule
          width="60 md:w-80"
          name="nationality"
          defaultValue={options.find(
            (national) => national.value === details.nationality,
          )}
          handleChange={handleChange}
          options={options}>
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
            endYear={new Date(details.document_expire_on).getFullYear() + 7}
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
        {(details.marital_status === MaritalStatus.MARRIED ||
          details.marital_status === MaritalStatus.WIDOWED) && (
          <InputMolecule
            name="spouse_name"
            value={details.spouse_name}
            handleChange={handleChange}>
            Spouse Name
          </InputMolecule>
        )}
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
        {user?.user_type === UserType.SUPER_ADMIN && (
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
                labelName: ['title'],
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
                getOptionLabel: (prog: IntakeProgramInfo) => prog.program.name,
              })}
              name="intake_program_id"
              placeholder={'Program to be enrolled in'}
              handleChange={handleChange}>
              Programs
            </DropdownMolecule>
            {/* <DropdownMolecule
              options={getDropDownOptions({
                inputs: levels.data?.data.data || [],
                labelName: ['name'], //@ts-ignore
                getOptionLabel: (level) => level.level && level.level.name,
              })}
              name="academic_program_level_id"
              placeholder={'Program to be enrolled in'}
              handleChange={handleChange}>
              Levels
            </DropdownMolecule> */}
          </>
        )}
        <Button type="submit" disabled={isLoading}>
          Create
        </Button>
      </form>
    </div>
  );
}
