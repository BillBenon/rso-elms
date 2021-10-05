import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import academyStore from '../../../store/academy.store';
import { intakeStore } from '../../../store/intake.store';
import programStore from '../../../store/program.store';
import usersStore from '../../../store/users.store';
import { CommonFormProps, ValueType } from '../../../types';
import { AcademyInfo } from '../../../types/services/academy.types';
import {
  CreateUserInfo,
  DocType,
  EducationLevel,
  GenderStatus,
  MaritalStatus,
  UserType,
} from '../../../types/services/user.types';
import { formatDateToYyMmDd } from '../../../utils/date-helper';
import { getDropDownOptions, getDropDownStatusOptions } from '../../../utils/getOption';
import Button from '../../Atoms/custom/Button';
import Heading from '../../Atoms/Text/Heading';
import DateMolecule from '../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../Molecules/input/InputMolecule';
import RadioMolecule from '../../Molecules/input/RadioMolecule';

export default function NewUser<E>({ onSubmit }: CommonFormProps<E>) {
  const history = useHistory();
  const { ADMIN, INSTRUCTOR, STUDENT } = UserType;
  const newUserType = { ADMIN, INSTRUCTOR, STUDENT };

  const [details, setDetails] = useState<CreateUserInfo>({
    activation_key: '',
    academy_id: '',
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

    await mutateAsync(
      { ...details, birth_date: formatDateToYyMmDd(details.birth_date) },
      {
        onSuccess() {
          history.goBack();
        },
      },
    );
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
          defaultValue={getDropDownStatusOptions(newUserType).find(
            (type) => type.label === details.user_type,
          )}
          options={getDropDownStatusOptions(newUserType)}
          name="user_type"
          placeholder={'Select user type'}
          handleChange={handleChange}>
          User type
        </DropdownMolecule>
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
        <DateMolecule handleChange={handleChange} name="birth_date" width="60 md:w-80">
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
        <DropdownMolecule
          options={getDropDownOptions(academies)}
          name="academy_id"
          placeholder={'Academy to be enrolled in'}
          handleChange={handleChange}>
          Academy
        </DropdownMolecule>
        {details.user_type === 'STUDENT' && (
          <>
            <DropdownMolecule
              options={getDropDownOptions(intakes.data?.data.data, 'code')}
              name="intake"
              placeholder={'intake to be enrolled in'}
              handleChange={otherhandleChange}>
              Intake
            </DropdownMolecule>
            <DropdownMolecule
              options={getDropDownOptions(
                programs.data?.data.data,
                'name',
                //@ts-ignore
                (program) => program.program.name,
              )}
              name="intake_program_id"
              placeholder={'Program to be enrolled in'}
              handleChange={handleChange}>
              Programs
            </DropdownMolecule>
            <DropdownMolecule
              options={getDropDownOptions(
                levels.data?.data.data,
                'name',
                //@ts-ignore
                (level) => level.level && level.level.name,
              )}
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
