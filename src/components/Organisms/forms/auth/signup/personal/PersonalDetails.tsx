import React, { useEffect, useState } from 'react';

import usersStore from '../../../../../../store/administration/users.store';
import { CommonFormProps, CommonStepProps, ValueType } from '../../../../../../types';
import {
  BloodGroup,
  GenderStatus,
  MaritalStatus,
  PersonDetail,
} from '../../../../../../types/services/user.types';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../../../../../utils/getLocalStorageItem';
import { getDropDownStatusOptions } from '../../../../../../utils/getOption';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import LocationMolecule from '../../../../../Molecules/input/LocationMolecule';
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
    blood_group: BloodGroup['A+'],
    father_names: '',
    mother_names: '',
    marital_status: MaritalStatus.SINGLE,
    spouse_name: '',
    residence_location_id: 0,
    place_of_residence: '',
  });

  const handleChange = (e: ValueType) => {
    setPersonalDetails({ ...personalDetails, [e.name]: e.value });
  };

  const moveForward = (e: any) => {
    e.preventDefault();
    let data: any = getLocalStorageData('user');
    let newObj = Object.assign({}, data, personalDetails);

    Object.keys(newObj).map((val) => {
      //@ts-ignore
      if (!newObj[val]) newObj[val] = '';
    });
    setLocalStorageData('user', newObj);
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
        father_names: personInfo.father_names,
        mother_names: personInfo.mother_names,
        marital_status: personInfo.marital_status,
        spouse_name: personInfo.spouse_name,
        residence_location_id: personInfo.residence_location_id,
        place_of_residence: personInfo.place_of_residence,
      });
  }, [user.data?.data.data.person]);

  return (
    <div className={`flex flex-col gap-4 ${!isVertical && 'pt-8'}`}>
      {!isVertical && <Heading fontWeight="semibold">{display_label}</Heading>}
      <form onSubmit={moveForward}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <InputMolecule
            readOnly={personalDetails.first_name !== ''}
            name="first_name"
            placeholder="eg: John"
            value={personalDetails.first_name}
            handleChange={handleChange}
          />
          <InputMolecule
            readOnly={personalDetails.last_name !== ''}
            name="last_name"
            placeholder="eg: Doe"
            value={personalDetails.last_name}
            handleChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div>
            <InputMolecule
              name="father_names"
              placeholder="eg: John"
              value={personalDetails.father_names}
              handleChange={handleChange}>
              Father&apos;s names
            </InputMolecule>
            <InputMolecule
              name="mother_names"
              placeholder="eg: Doe"
              value={personalDetails.mother_names}
              handleChange={handleChange}>
              Mother&apos;s names
            </InputMolecule>
            <DropdownMolecule
              placeholder="Select your blood type"
              name="blood_group"
              defaultValue={getDropDownStatusOptions(BloodGroup).find(
                (grp) => grp.label === personalDetails.blood_group,
              )}
              handleChange={handleChange}
              options={getDropDownStatusOptions(BloodGroup)}>
              Blood type
            </DropdownMolecule>
            {personalDetails.marital_status === MaritalStatus.MARRIED ||
              (personalDetails.marital_status === MaritalStatus.WIDOWED && (
                <DropdownMolecule
                  defaultValue={getDropDownStatusOptions(MaritalStatus).find(
                    (marital) => marital.label === personalDetails.marital_status,
                  )}
                  options={getDropDownStatusOptions(MaritalStatus)}
                  handleChange={handleChange}
                  name="marital_status">
                  Marital Status
                </DropdownMolecule>
              ))}
            {(personalDetails.marital_status === MaritalStatus.MARRIED ||
              personalDetails.marital_status === MaritalStatus.WIDOWED) && (
              <InputMolecule
                name="spouse_name"
                value={personalDetails.spouse_name}
                handleChange={handleChange}>
                Spouse Name
              </InputMolecule>
            )}
            <InputMolecule
              name="religion"
              value={personalDetails.religion}
              placeholder="eg: Catholic"
              handleChange={handleChange}>
              Religion
            </InputMolecule>
          </div>
          <div>
            <LocationMolecule
              placeholder="Select place of birth"
              name="place_of_birth"
              handleChange={handleChange}>
              Place of birth
            </LocationMolecule>
            <TextAreaMolecule
              width="72 md:w-80"
              name="place_of_birth_description"
              value={personalDetails.place_of_birth_description}
              handleChange={handleChange}>
              Place of birth description (optional)
            </TextAreaMolecule>

            <LocationMolecule
              placeholder="Select place of residence"
              name="residence_location_id"
              handleChange={handleChange}>
              Place of residence
            </LocationMolecule>
            <TextAreaMolecule
              width="72 md:w-80"
              name="place_of_residence"
              value={personalDetails.place_of_residence}
              handleChange={handleChange}>
              Place of residence description (optional)
            </TextAreaMolecule>
          </div>
        </div>
        <div className="flex justify w-4/5">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
