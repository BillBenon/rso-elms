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
  ProfileStatus,
  SendCommunicationMsg,
  UpdateUserInfo,
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

export default function UpdateUser<E>({ onSubmit }: CommonFormProps<E>) {
  const history = useHistory();
  const updateUserType = pick(UserType, ['ADMIN', 'INSTRUCTOR', 'STUDENT']);
  const updateUserTypeWithSuper = { ...updateUserType, SUPER_ADMIN: 'SUPER_ADMIN' };
  const authUser = authenticatorStore.authUser();

  const [details, setDetails] = useState<UpdateUserInfo>({
    person: '',
    academic_program_level_id: '',
    academy_id: '',
    activation_key: '',
    birth_date: '',
    blood_group: '',
    current_rank_id: '',
    date_of_commission: '',
    date_of_issue: '',
    date_of_last_promotion: '',
    doc_type: DocType.NID,
    document_expire_on: '',
    education_level: EducationLevel.ILLITERATE,
    email: '',
    emp_no: '',
    father_names: '',
    first_name: '',
    id: '',
    intake_program_id: '',
    last_name: '',
    marital_status: MaritalStatus.MARRIED,
    mother_names: '',
    nid: '',
    other_rank: '',
    password: '',
    password_reset_period_in_days: 0,
    person_id: '',
    phone: '',
    place_of_birth: '',
    place_of_birth_description: '',
    place_of_issue: '',
    place_of_residence: '',
    profile_status: ProfileStatus.INCOMPLETE,
    rank_depart: '',
    reset_date: '',
    residence_location_id: 0,
    sex: GenderStatus.MALE,
    spouse_name: '',
    user_type: UserType.STUDENT,
    send_communication_msg: SendCommunicationMsg.EMAIL,
    username: '',
  });

  const { id } = useParams<ParamType>();
  const { data } = usersStore.getUserById(id);

  useEffect(() => {
    const selectedUser = data?.data.data;

    selectedUser &&
      setDetails({
        person: selectedUser.person,
        academic_program_level_id: selectedUser.academic_program_level_id,
        academy_id: selectedUser.academy_id,
        activation_key: selectedUser.activation_key,
        birth_date: selectedUser.birth_date,
        blood_group: selectedUser.person.blood_group,
        current_rank_id: selectedUser.person.current_rank_id,
        date_of_commission: selectedUser.person.date_of_commission,
        date_of_issue: selectedUser.person.date_of_issue,
        date_of_last_promotion: selectedUser.person.date_of_last_promotion,
        doc_type: selectedUser.person.doc_type,
        document_expire_on: selectedUser.person.document_expire_on,
        education_level: selectedUser.education_level,
        email: selectedUser.email,
        emp_no: selectedUser.person.emp_no,
        father_names: selectedUser.father_names,
        first_name: selectedUser.first_name,
        id: id,
        intake_program_id: selectedUser.intake_program_id,
        last_name: selectedUser.last_name,
        marital_status: selectedUser.marital_status,
        mother_names: selectedUser.mother_names,
        nid: selectedUser.person.nid,
        other_rank: selectedUser.person.other_rank,
        password: selectedUser.password,
        password_reset_period_in_days: selectedUser.password_reset_period_in_days,
        person_id: selectedUser.person_id,
        phone: selectedUser.phone.toString(),
        place_of_birth: selectedUser.place_of_birth,
        place_of_birth_description: selectedUser.person.place_of_birth_description,
        place_of_issue: selectedUser.person.place_of_issue,
        place_of_residence: selectedUser.place_of_residence,
        profile_status: selectedUser.profile_status
          ? selectedUser.profile_status
          : ProfileStatus.INCOMPLETE,
        rank_depart: selectedUser.person.rank_depart,
        reset_date: selectedUser.reset_date,
        residence_location_id: selectedUser.residence_location_id,
        sex: selectedUser.sex,
        spouse_name: selectedUser.person.spouse_name,
        user_type: selectedUser.user_type,
        send_communication_msg: selectedUser.send_communication_msg
          ? selectedUser.send_communication_msg
          : SendCommunicationMsg.EMAIL,
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
  let intakes = getIntakesByAcademy(details.academy_id, false, !!details.academy_id);

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
        <DropdownMolecule
          defaultValue={getDropDownStatusOptions(
            authUser.data?.data.data.user_type === UserType.SUPER_ADMIN
              ? updateUserTypeWithSuper
              : updateUserType,
          ).find((type) => type.label === details.user_type)}
          options={getDropDownStatusOptions(
            authUser.data?.data.data.user_type === UserType.SUPER_ADMIN
              ? updateUserTypeWithSuper
              : updateUserType,
          )}
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
        <DateMolecule
          handleChange={handleChange}
          name="birth_date"
          width="60 md:w-80"
          date_time_type={false}>
          Date of Birth
        </DateMolecule>
        <InputMolecule
          name="place_of_residence"
          placeholder={'Enter place of residence'}
          value={details.place_of_residence}
          handleChange={handleChange}>
          Place of residence
        </InputMolecule>
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
          defaultValue={getDropDownStatusOptions(SendCommunicationMsg).find(
            (send_communication) =>
              send_communication.label === details.send_communication_msg,
          )}
          options={getDropDownStatusOptions(SendCommunicationMsg)}
          name="send_communication_msg"
          placeholder={'Select means of communication'}
          handleChange={handleChange}>
          Means of Communication
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
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}
