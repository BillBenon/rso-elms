import React, { useEffect, useState } from 'react';

import usersStore from '../../../../../../store/users.store';
import { CommonFormProps, CommonStepProps, ValueType } from '../../../../../../types';
import {
  BloodGroup,
  GenderStatus,
  PersonDetail,
} from '../../../../../../types/services/user.types';
import { getDropDownStatusOptions } from '../../../../../../utils/getOption';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import DateMolecule from '../../../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../../../Molecules/input/TextAreaMolecule';

interface Personal<E> extends CommonStepProps, CommonFormProps<E> {}

function PersonalDetails<E>({
  display_label,
  isVertical,
  nextStep,
  fetched_id,
}: Personal<E>) {
  const [personalDetails, setPersonalDetails] = useState<PersonDetail>({
    first_name: '',
    last_name: '',
    phone_number: '',
    sex: GenderStatus.MALE,
    place_of_birth: '',
    place_of_birth_description: '',
    birth_date: '',
    religion: '',
    blood_group: '',
  });

  const handleChange = (e: ValueType) => {
    setPersonalDetails({ ...personalDetails, [e.name]: e.value });
  };

  const moveForward = (e: any) => {
    e.preventDefault();
    let data: any = JSON.parse(localStorage.getItem('user') || '{}');
    let newObj = Object.assign({}, data, personalDetails);
    console.log(JSON.stringify(newObj));

    Object.keys(newObj).map((val) => {
      //@ts-ignore
      if (!newObj[val]) newObj[val] = '';
    });
    localStorage.setItem('user', JSON.stringify(newObj));
    nextStep(true);
  };
  const user = usersStore.getUserById(fetched_id.toString());
  useEffect(() => {
    let personInfo = user.data?.data.data.person;
    personInfo &&
      setPersonalDetails({
        first_name: personInfo.first_name,
        last_name: personInfo.last_name,
        phone_number: personInfo.phone_number,
        sex: personInfo.sex,
        place_of_birth: personInfo.place_of_birth,
        place_of_birth_description: personInfo.place_of_birth_description,
        birth_date: personInfo.birth_date,
        religion: personInfo.religion,
        blood_group: personInfo.blood_group,
      });
  }, [user.data?.data.data.person]);

  return (
    <div className={`flex flex-col gap-4 ${!isVertical && 'pt-8'}`}>
      {!isVertical && <Heading fontWeight="semibold">{display_label}</Heading>}
      <form onSubmit={moveForward}>
        <div className="flex flex-col gap-4">
          <InputMolecule
            name="first_name"
            placeholder="eg: John"
            value={personalDetails.first_name}
            handleChange={handleChange}>
            First Name
          </InputMolecule>
          <InputMolecule
            name="last_name"
            placeholder="eg: Doe"
            value={personalDetails.last_name}
            handleChange={handleChange}>
            Last Name
          </InputMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <InputMolecule
            name="phone_number"
            value={personalDetails.phone_number}
            placeholder="+250 ---------"
            handleChange={handleChange}>
            Phone number
          </InputMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <RadioMolecule
            options={getDropDownStatusOptions(GenderStatus)}
            value={personalDetails.sex}
            handleChange={handleChange}
            name="sex">
            Gender
          </RadioMolecule>
          <DropdownMolecule
            placeholder="Select your blood type"
            width="60 md:w-80"
            name="blood_group"
            defaultValue={getDropDownStatusOptions(BloodGroup).find(
              (grp) => grp.label === personalDetails.blood_group,
            )}
            handleChange={handleChange}
            options={getDropDownStatusOptions(BloodGroup)}>
            Blood type
          </DropdownMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <DateMolecule
            defaultValue={personalDetails.birth_date}
            handleChange={handleChange}
            name="birth_date"
            width="60 md:w-80"
            date_time_type={false}>
            Date of Birth
          </DateMolecule>
          <DropdownMolecule
            placeholder="Select place of birth"
            width="60 md:w-80"
            name="place_of_birth"
            // @ts-ignore
            defaultValue={personalDetails.place_of_birth}
            handleChange={handleChange}
            options={[]}>
            Place of birth
          </DropdownMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <TextAreaMolecule
            name="place_of_birth_description"
            value={personalDetails.place_of_birth_description}
            handleChange={handleChange}>
            Place of birth description
          </TextAreaMolecule>
          <InputMolecule
            name="religion"
            value={personalDetails.religion}
            placeholder="eg: Catholic"
            handleChange={handleChange}>
            Religion
          </InputMolecule>
        </div>
        <div className="flex justify-end w-80">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
