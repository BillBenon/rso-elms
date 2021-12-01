import React, { useEffect, useState } from 'react';

import locationStore from '../../../../../../store/administration/location.store';
import usersStore from '../../../../../../store/administration/users.store';
import {
  CommonFormProps,
  CommonStepProps,
  SelectData,
  ValueType,
} from '../../../../../../types';
import { LocationInfo } from '../../../../../../types/services/location.types';
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
import {
  getDropDownOptions,
  getDropDownStatusOptions,
} from '../../../../../../utils/getOption';
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
    blood_group: '',
    father_names: '',
    mother_names: '',
    marital_status: MaritalStatus.SINGLE,
    spouse_name: '',
    residence_location_id: 0,
    place_of_residence: '',
  });
  const [residenceLocationLevel, setResidenceLocationLevel] = useState<number>(1);
  const [location, setLocation] = useState<LocationInfo[]>();
  const [choseResidenceLocations, setChoseResidenceLocations] = useState<string>('');
  const levels = ['country', 'province', 'district', 'sector', 'cell', 'village'];

  const { data: country } = locationStore.getLocationsByLevel('1');
  const { data: dbLocations, refetch: refetchDbLocations } = locationStore.findByParent(
    personalDetails.residence_location_id
      ? personalDetails.residence_location_id.toString()
      : '',
  );

  const handleChange = (e: ValueType) => {
    setPersonalDetails({ ...personalDetails, [e.name]: e.value });
  };

  const handleLocationChange = (e: ValueType) => {
    setPersonalDetails({ ...personalDetails, [e.name]: e.value });
    setChoseResidenceLocations(
      (old) => `${old} ${old.length > 0 ? '-> ' : ''} ${e.label} `,
    );

    // refetchDbLocations();

    setResidenceLocationLevel((old) => old + 1);

    console.log('input', e, residenceLocationLevel);
  };

  const locations: [] = [];

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

  function resetResidenceLocation() {
    setResidenceLocationLevel(1);
    country?.data.data && setLocation(country?.data.data);
    setChoseResidenceLocations('');
  }

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

  useEffect(() => {
    country?.data.data && setLocation(country?.data.data);
  }, [country?.data]);

  useEffect(() => {
    dbLocations?.data.data && setLocation(dbLocations?.data.data.content);
  }, [dbLocations?.data]);

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
            <DropdownMolecule
              placeholder="Select place of birth"
              name="place_of_birth"
              defaultValue={getDropDownOptions({ inputs: locations }).find(
                (location) =>
                  location.value === personalDetails.place_of_birth.toString(),
              )}
              handleChange={handleChange}
              options={[]}>
              Place of birth
            </DropdownMolecule>
            <TextAreaMolecule
              width="72 md:w-80"
              name="place_of_birth_description"
              value={personalDetails.place_of_birth_description}
              handleChange={handleChange}>
              Place of birth description (optional)
            </TextAreaMolecule>
            <div>
              <DropdownMolecule
                placeholder="Select place of residence"
                name="residence_location_id"
                defaultValue={getDropDownOptions({ inputs: location! }).find(
                  (location) =>
                    location.value ===
                    (personalDetails.residence_location_id &&
                      personalDetails.residence_location_id.toString()),
                )}
                handleChange={handleLocationChange}
                options={getDropDownOptions({ inputs: location! })}>
                Place of residence
                {' ' + levels[residenceLocationLevel] && (
                  <span className="text-error-500">
                    ( select {levels[residenceLocationLevel - 1]} )
                  </span>
                )}
              </DropdownMolecule>
              <div className="flex items-center mb-4">
                <p className="text-sm text-success-500 ">{choseResidenceLocations}</p>
                {choseResidenceLocations.length > 0 && (
                  <button
                    className="ml-4 hover:bg-lightblue"
                    onClick={resetResidenceLocation}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="15"
                      height="15">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <LocationMolecule
              placeholder="Select place of residence"
              name="residence_location_id"
              defaultValue={getDropDownOptions({ inputs: location! }).find(
                (location) =>
                  location.value ===
                  (personalDetails.residence_location_id &&
                    personalDetails.residence_location_id.toString()),
              )}
              handleChange={handleChange}>
              Place of living
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
