import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import countryList from 'react-select-country-list';

import usersStore from '../../../../../../store/administration/users.store';
import { CommonFormProps, CommonStepProps, ValueType } from '../../../../../../types';
import {
  BloodGroup,
  DocType,
  GenderStatus,
  MaritalStatus,
  PersonDetail,
  UserInfo,
} from '../../../../../../types/services/user.types';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../../../../../utils/getLocalStorageItem';
import { getDropDownStatusOptions } from '../../../../../../utils/getOption';
import { personalDetailsSchema } from '../../../../../../validations/complete-profile/complete-profile.validation';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import LocationMolecule from '../../../../../Molecules/input/LocationMolecule';
import TextAreaMolecule from '../../../../../Molecules/input/TextAreaMolecule';

interface Personal<E> extends CommonStepProps, CommonFormProps<E> {}

interface PersonalDetailErrors
  extends Pick<
    PersonDetail,
    | 'first_name'
    | 'last_name'
    | 'place_of_birth'
    | 'place_of_birth_description'
    | 'religion'
    | 'father_names'
    | 'mother_names'
    | 'place_of_residence'
    | 'nationality'
    | 'spouse_name'
  > {
  blood_group: string;
  residence_location_id: string;
}

export default function UpdatePersonalDetails<E>({
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
    residence_location_id: null,
    place_of_residence: '',
    doc_type: DocType.NID,
    nationality: '',
  });
  // const { user } = useAuthenticator();

  const initialErrorState: PersonalDetailErrors = {
    first_name: '',
    last_name: '',
    place_of_birth: '',
    place_of_birth_description: '',
    religion: '',
    blood_group: '',
    father_names: '',
    mother_names: '',
    residence_location_id: '',
    place_of_residence: '',
    nationality: '',
    spouse_name: '',
  };

  const [errors, setErrors] = useState<PersonalDetailErrors>(initialErrorState);
  const { id } = useParams<ParamType>();
  const { data } = usersStore.getUserById(id);

  useEffect(() => {
    const selectedUser = data?.data.data;

    selectedUser &&
      setPersonalDetails({
        first_name: selectedUser.first_name,
        last_name: selectedUser.last_name,
        phone_number: selectedUser.phone,
        sex: selectedUser.person.sex || GenderStatus.MALE,
        place_of_birth: selectedUser.person.place_of_birth,
        place_of_birth_description: selectedUser.person.place_of_birth_description,
        birth_date: selectedUser.person.birth_date,
        religion: selectedUser.person.religion,
        blood_group: selectedUser.person.blood_group || BloodGroup['A+'],
        father_names: selectedUser.person.father_names,
        mother_names: selectedUser.person.mother_names,
        marital_status: selectedUser.person.marital_status || MaritalStatus.SINGLE,
        spouse_name: selectedUser.person.spouse_name || '',
        residence_location_id: selectedUser.person.residence_location_id || 0,
        place_of_residence: selectedUser.person.place_of_residence,
        doc_type: selectedUser.person.doc_type || DocType.NID,
        nationality: selectedUser.person.nationality || '',
      });
  }, [data]);

  const [nationality, setnationality] = useState({
    birth: '',
    residence: '',
  });
  const nationhandleChange = (e: ValueType) => {
    setnationality({ ...nationality, [e.name]: e.value });
  };

  const handleChange = (e: ValueType) => {
    setPersonalDetails({ ...personalDetails, [e.name]: e.value });
  };

  const options = useMemo(
    () =>
      countryList()
        .getData()
        .map((country) => {
          return {
            value: country.label,
            label: country.label,
          };
        }),
    [],
  );

  const moveForward = (e: FormEvent) => {
    e.preventDefault();
    let data: any = getLocalStorageData('user');
    let newObj = Object.assign({}, data, personalDetails);

    Object.keys(newObj).map((val) => {
      if (!newObj[val]) newObj[val] = '';
    });

    const validatedForm = personalDetailsSchema.validate(personalDetails, {
      abortEarly: false,
    });

    validatedForm
      .then(() => {
        setLocalStorageData('user', newObj);
        nextStep(true);
      })
      .catch((err) => {
        const validatedErr: PersonalDetailErrors = initialErrorState;
        err.inner.map((el: { path: string | number; message: string }) => {
          validatedErr[el.path as keyof PersonalDetailErrors] = el.message;
        });
        setErrors(validatedErr);
      });
  };

  const user = usersStore.getUserById(fetched_id.toString());
  const [userInfo] = useState<UserInfo>(getLocalStorageData('user'));

  //when information change from the backend
  useEffect(() => {
    let personInfo = user.data?.data.data.person;
    personInfo &&
      !userInfo &&
      setPersonalDetails((old) => {
        return { ...old, ...personInfo };
      });
  }, [user.data?.data.data.person, userInfo]);

  //when user comes back to this step
  useEffect(() => {
    setPersonalDetails((old) => {
      {
        return { ...old, ...userInfo };
      }
    });
  }, [userInfo]);

  return (
    <div className={`flex flex-col gap-4 ${!isVertical && 'pt-8'}`}>
      {!isVertical && <Heading fontWeight="semibold">{display_label}</Heading>}
      <form onSubmit={moveForward}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <InputMolecule
            required={false}
            error={errors.first_name}
            readOnly={
              user.data?.data.data.person ? personalDetails.first_name !== '' : false
            }
            name="first_name"
            placeholder="Your First Name"
            value={personalDetails.first_name}
            handleChange={handleChange}
          />
          <InputMolecule
            required={false}
            error={errors.last_name}
            readOnly={
              user.data?.data.data.person ? personalDetails.last_name !== '' : false
            }
            name="last_name"
            placeholder="Your Last Name"
            value={personalDetails.last_name}
            handleChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div>
            <InputMolecule
              required={false}
              error={errors.father_names}
              name="father_names"
              placeholder="eg: John"
              value={personalDetails.father_names}
              handleChange={handleChange}>
              Father&apos;s names
            </InputMolecule>
            <InputMolecule
              required={false}
              error={errors.mother_names}
              name="mother_names"
              placeholder="eg: Doe"
              value={personalDetails.mother_names}
              handleChange={handleChange}>
              Mother&apos;s names
            </InputMolecule>
            <DropdownMolecule
              error={errors.blood_group}
              hasError={errors.blood_group !== ''}
              placeholder="Select your blood type"
              name="blood_group"
              defaultValue={getDropDownStatusOptions(BloodGroup).find(
                (grp) => grp.value === personalDetails.blood_group,
              )}
              handleChange={handleChange}
              options={getDropDownStatusOptions(BloodGroup)}>
              Blood type
            </DropdownMolecule>
            {(personalDetails.marital_status === MaritalStatus.MARRIED ||
              personalDetails.marital_status === MaritalStatus.WIDOWED) && (
              <InputMolecule
                error={errors.spouse_name}
                name="spouse_name"
                value={personalDetails.spouse_name}
                handleChange={handleChange}>
                Spouse Name
              </InputMolecule>
            )}
            <InputMolecule
              required={false}
              error={errors.religion}
              name="religion"
              value={personalDetails.religion}
              placeholder="eg: Catholic"
              handleChange={handleChange}>
              Religion
            </InputMolecule>
          </div>
          <div>
            <DropdownMolecule
              error={errors.place_of_birth}
              hasError={errors.place_of_birth !== ''}
              width="60 md:w-80"
              name="birth"
              placeholder="Select the Nation"
              defaultValue={options.find(
                (national) => national.value === nationality.birth,
              )}
              handleChange={nationhandleChange}
              options={options}>
              Place of birth
            </DropdownMolecule>
            {nationality.birth == 'Rwanda' && (
              <LocationMolecule
                placeholder="Select place of birth"
                name="place_of_birth"
                handleChange={handleChange}
                isRequired={errors.place_of_birth !== ''}
                requiredMessage={errors.place_of_birth}
              />
            )}
            <TextAreaMolecule
              error={errors.place_of_birth_description}
              width="72 md:w-80"
              name="place_of_birth_description"
              value={personalDetails.place_of_birth_description}
              handleChange={handleChange}>
              Place of birth description (optional)
            </TextAreaMolecule>
            <DropdownMolecule
              error={errors.nationality}
              hasError={errors.nationality !== ''}
              width="60 md:w-80"
              name="residence"
              placeholder="Select the Nation"
              defaultValue={options.find(
                (national) => national.value === nationality.residence,
              )}
              handleChange={nationhandleChange}
              options={options}>
              Place of residence
            </DropdownMolecule>
            {nationality.residence == 'Rwanda' && (
              <LocationMolecule
                placeholder="Select place of residence"
                name="residence_location_id"
                handleChange={handleChange}
                isRequired={errors.residence_location_id !== ''}
                requiredMessage={errors.residence_location_id}
              />
            )}
            <TextAreaMolecule
              error={errors.place_of_residence}
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
