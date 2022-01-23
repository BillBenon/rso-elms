// import { pick } from 'lodash';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Renderable, Toast, ValueFunction } from 'react-hot-toast/dist/core/types';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import DateMolecule from '../../components/Molecules/input/DateMolecule';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import useAuthenticator from '../../hooks/useAuthenticator';
import usersStore from '../../store/administration/users.store';
import { CommonFormProps, CommonStepProps, ValueType } from '../../types';
import {
  DocType,
  EducationLevel,
  GenderStatus,
  MaritalStatus,
  ProfileStatus,
  SendCommunicationMsg,
  UpdateUserInfo,
  UserType,
} from '../../types/services/user.types';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../utils/getLocalStorageItem';
import { getDropDownStatusOptions } from '../../utils/getOption';

interface Personal<E> extends CommonStepProps, CommonFormProps<E> {}

export default function SupAdminProfile<E>({
  onSubmit,
  nextStep,
  isVertical,
  display_label,
}: Personal<E>) {
  const { user } = useAuthenticator();

  const [details, setDetails] = useState<UpdateUserInfo>({
    place_of_residence: '',
    send_communication_msg: SendCommunicationMsg.EMAIL,
    person: '',
    academic_program_level_id: '',
    academy_id: '',
    // academy_name: '',
    birth_date: '',
    doc_type: DocType.NID,
    education_level: EducationLevel.BACHELOR,
    email: '',
    first_name: '',
    id: '',
    intake_program_id: '',
    last_name: '',
    marital_status: MaritalStatus.SINGLE,
    nid: '',
    person_id: '',
    phone: '',
    sex: GenderStatus.MALE,
    user_type: UserType.STUDENT,
    username: '',
    profile_status: ProfileStatus.COMPLETD,
    // acdemic_year_id: '',
    activation_key: '',
    blood_group: '',
    current_rank_id: '',
    date_of_commission: '',
    date_of_issue: '',
    date_of_last_promotion: '',
    // deployed_on: '',
    // deployment_number: '',
    document_expire_on: '',
    emp_no: '',
    father_names: '',
    // institution_id: '',
    mother_names: '',
    other_rank: '',
    password_reset_period_in_days: 0,
    place_of_birth: '',
    place_of_birth_description: '',
    // place_of_birth_id: '',
    place_of_issue: '',
    rank_depart: '',
    reset_date: '',
    residence_location_id: 0,
    spouse_name: '',
  });

  const moveForward = () => {
    let data: any = getLocalStorageData('user');
    let newObj = Object.assign({}, data, details);

    Object.keys(newObj).map((val) => {
      //@ts-ignore
      if (!newObj[val]) newObj[val] = '';
    });
    setLocalStorageData('user', newObj);
    nextStep(true);
  };

  // useEffect(() => {
  //   setDetails({ ...details, id: fetched_id.toString() });
  // }, [user]);

  useEffect(() => {
    setDetails((dets) => {
      return {
        ...dets,
        id: user?.id.toString() || '',
        username: user?.username.toString() || '',
        user_type: user?.user_type || UserType.STUDENT,
      };
    });
  }, [user]);

  function handleChange(e: ValueType) {
    setDetails((details: any) => ({
      ...details,
      [e.name]: e.value,
    }));
  }

  const { mutateAsync } = usersStore.updateUser();
  async function addUser<T>(e: FormEvent<T>) {
    e.preventDefault();

    if (onSubmit) onSubmit(e);

    Object.keys(details).map((val) => {
      //@ts-ignore
      if (!details[val]) details[val] = '';
    });

    await mutateAsync(details, {
      onSuccess(data: {
        data: { message: Renderable | ValueFunction<Renderable, Toast> };
      }) {
        toast.success(data.data.message);
        // history.goBack();
      },
      onError(error: any) {
        const msg = toast.error(error.response.data.message);
        console.log(msg);
      },
    });
    moveForward();
  }

  return (
    // <div className="w-5/12 pl-6 gap-3 rounded-lg bg-main">
    //   <div className="pb-5 capitalize">
    //     <Heading color="txt-primary" fontWeight="bold">
    //       Complete information
    //     </Heading>
    // </div>
    <div className={`flex flex-col gap-4 ${!isVertical && 'pt-8'}`}>
      {!isVertical && <Heading fontWeight="semibold">{display_label}</Heading>}
      <form onSubmit={addUser}>
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
            (doc: { label: any }) => doc.label === details.doc_type,
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
            (marital_status: { label: any }) =>
              marital_status.label === details.marital_status,
          )}
          options={getDropDownStatusOptions(MaritalStatus)}
          name="marital_status"
          placeholder={'Select your marital status'}
          handleChange={handleChange}>
          Marital Status
        </DropdownMolecule>
        <DropdownMolecule
          defaultValue={getDropDownStatusOptions(SendCommunicationMsg).find(
            (send_communication: { label: any }) =>
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
            (level: { label: any }) => level.label === details.education_level,
          )}
          options={getDropDownStatusOptions(EducationLevel)}
          name="education_level"
          placeholder={'Select your education level'}
          handleChange={handleChange}>
          Education level
        </DropdownMolecule>
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}
