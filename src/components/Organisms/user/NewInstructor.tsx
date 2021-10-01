import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';

import academyStore from '../../../store/academy.store';
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
import { getDropDownOptions, getDropDownStatusOptions } from '../../../utils/getOption';
import Button from '../../Atoms/custom/Button';
import Heading from '../../Atoms/Text/Heading';
import DateMolecule from '../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../Molecules/input/InputMolecule';
import RadioMolecule from '../../Molecules/input/RadioMolecule';

export default function NewInstructor<E>({ onSubmit }: CommonFormProps<E>) {
  const history = useHistory();
  const [details, setDetails] = useState<CreateUserInfo>({
    activation_key: '',
    birth_date: '',
    doc_type: DocType.NID,
    education_level: EducationLevel.NONE,
    email: '',
    father_names: '',
    first_name: '',
    intake_id: '',
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

  function handleChange(e: ValueType) {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  }

  const { mutateAsync } = usersStore.createUser();
  async function addInstructor<T>(e: FormEvent<T>) {
    e.preventDefault();

    if (onSubmit) onSubmit(e);

    await mutateAsync(details, {
      onSuccess() {
        history.push('/dashboard/users');
      },
    });
  }

  const academies: AcademyInfo[] | undefined =
    academyStore.fetchAcademies().data?.data.data;

  return (
    <div className="p-6 w-5/12 pl-6 gap-3 rounded-lg bg-main mt-8">
      <div className="py-5 mb-3 capitalize">
        <Heading color="txt-primary" fontWeight="bold">
          New Instructor
        </Heading>
      </div>
      <form onSubmit={addInstructor}>
        <InputMolecule
          name="first_name"
          placeholder="eg: Kabera"
          value={details.first_name}
          handleChange={handleChange}>
          First name
        </InputMolecule>
        <InputMolecule
          name="lastName"
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
        <DateMolecule handleChange={handleChange} name="dob" width="60 md:w-80">
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
          type="block"
          className="pb-2"
          defaultValue={details.sex}
          options={getDropDownStatusOptions(GenderStatus)}
          value={details.sex}
          handleChange={handleChange}
          name="sex">
          Gender
        </RadioMolecule>
        <InputMolecule
          name="employmentNumber"
          placeholder="Army or Police number"
          value={''}
          handleChange={handleChange}>
          Employment number
        </InputMolecule>
        <RadioMolecule
          type="block"
          className="pb-2"
          defaultValue={details.marital_status}
          options={getDropDownStatusOptions(MaritalStatus)}
          value={details.marital_status}
          handleChange={handleChange}
          name="marital_status">
          Marital Status
        </RadioMolecule>
        <InputMolecule
          name="nid"
          type="text"
          value={details.nid}
          placeholder="NID number"
          handleChange={handleChange}>
          NID
        </InputMolecule>
        <InputMolecule
          name="passport"
          value={''}
          placeholder="Enter passport number(if any)"
          handleChange={handleChange}>
          Passport (optional)
        </InputMolecule>
        <RadioMolecule
          type="block"
          className="pb-2"
          options={getDropDownStatusOptions(EducationLevel)}
          name="education_level"
          value={details.education_level}
          handleChange={handleChange}>
          Education level
        </RadioMolecule>
        <DropdownMolecule
          options={getDropDownOptions(academies)}
          name="academy"
          placeholder={'Academy to be enrolled in'}
          handleChange={handleChange}>
          Academy
        </DropdownMolecule>
        <DropdownMolecule
          options={getDropDownOptions(academies)}
          name="programs"
          placeholder={'Program to be enrolled in'}
          handleChange={handleChange}>
          Programs
        </DropdownMolecule>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
