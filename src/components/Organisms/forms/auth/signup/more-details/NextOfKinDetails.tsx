import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import countryList from 'react-select-country-list';

import { authenticatorStore } from '../../../../../../store/administration';
import usernextkinStore from '../../../../../../store/administration/usernextkin.store';
import { CommonFormProps, CommonStepProps, ValueType } from '../../../../../../types';
import {
  BasicPersonInfo,
  DocType,
  GenderStatus,
} from '../../../../../../types/services/user.types';
import { NextKinInfo } from '../../../../../../types/services/usernextkin.types';
import { getDropDownStatusOptions } from '../../../../../../utils/getOption';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import DateMolecule from '../../../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import LocationMolecule from '../../../../../Molecules/input/LocationMolecule';
import RadioMolecule from '../../../../../Molecules/input/RadioMolecule';

interface NextOfKin<E> extends CommonStepProps, CommonFormProps<E> {}

function NextOfKinDetails<E>({
  display_label,
  isVertical,
  prevStep,
  nextStep,
  onSubmit,
}: NextOfKin<E>) {
  const authUser = authenticatorStore.authUser().data?.data.data;
  const { mutateAsync } = usernextkinStore.createUserNextKin();
  // const inputRef = useRef<HTMLInputElement>(null);

  const [details, setDetails] = useState<BasicPersonInfo>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    sex: GenderStatus.MALE,
    birth_date: '',
    relationship: '',
    nationality: '',
    residence_location_id: 0,
    doc_type: DocType.NID,
    document_expire_on: '',
    nid: '',
    place_of_residence: '',
    user_id: authUser?.id + '',
  });

  const { data } = usernextkinStore.getPersonByNid(details.nid);

  useEffect(() => {
    setDetails({
      ...details,
      user_id: authUser?.id + '',
      first_name: data?.data.data.first_name || details.first_name,
      last_name: data?.data.data.last_name || details.last_name,
      email: data?.data.data.email || details.email,
      phone_number: data?.data.data.phone_number || details.phone_number,
      sex:
        data?.data.data.sex == null
          ? GenderStatus.MALE
          : data?.data.data.sex || details.sex == null
          ? GenderStatus.MALE
          : details.sex,
      birth_date: data?.data.data.birth_date || details.birth_date,
      relationship: data?.data.data.relationship || details.relationship,
      residence_location_id: details.residence_location_id,
      nationality: data?.data.data.nationality || details.nationality,
      doc_type:
        data?.data.data.doc_type == null
          ? DocType.NID
          : data?.data.data.doc_type || details.doc_type == null
          ? DocType.NID
          : details.doc_type,
      document_expire_on:
        data?.data.data.document_expire_on || details.document_expire_on,
      nid: data?.data.data.nid || details.nid,
      place_of_residence:
        data?.data.data.place_of_residence || details.place_of_residence,
    });
  }, [data?.data]);

  const handleChange = (e: ValueType) => {
    setDetails({ ...details, [e.name]: e.value });
  };

  const moveBack = () => {
    prevStep && prevStep();
  };
  const moveForward = async (e: any) => {
    e.preventDefault();

    const data: NextKinInfo = {
      user_id: authUser?.id + '',
      next_of_kins: [details],
    };

    await mutateAsync(data, {
      onSuccess(data) {
        toast.success(data.data.message);
      },
      onError(_error) {
        toast.error('Failed');
      },
    });

    nextStep(true);
    if (onSubmit) onSubmit(e, details);
  };

  const options = useMemo(() => countryList().getData(), []);

  return (
    <div className="flex flex-col gap-2 ">
      <form onSubmit={moveForward}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {!isVertical && (
            <Heading fontSize="base" fontWeight="semibold">
              {display_label}
            </Heading>
          )}
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
            // ref={inputRef}
            name="nid"
            // onBlur={(e) => console.log('called', e.target.value || '')}
            // @ts-ignore
            onBlur={(e) => setDetails({ ...details, nid: e.target.value || '' })}
            type="text"
            value={details.nid}
            placeholder={`Enter ${details.doc_type.replaceAll('_', ' ')} number`}
            handleChange={() => {}}>
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

          <InputMolecule
            readOnly={data?.data.data.first_name ? details.first_name !== '' : false}
            name="first_name"
            placeholder="eg: John"
            value={details.first_name}
            handleChange={handleChange}>
            First Name
          </InputMolecule>
          <InputMolecule
            readOnly={data?.data.data.last_name ? details.last_name !== '' : false}
            name="last_name"
            placeholder="eg: Doe"
            value={details.last_name}
            handleChange={handleChange}>
            Last Name
          </InputMolecule>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <InputMolecule
            readOnly={data?.data.data.email ? details.email !== '' : false}
            name="email"
            value={details.email}
            type="email"
            placeholder="username@example.com"
            handleChange={handleChange}>
            Email
          </InputMolecule>
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
          <InputMolecule
            readOnly={data?.data.data.phone_number ? details.phone_number !== '' : false}
            name="phone_number"
            value={details.phone_number}
            placeholder="+250 ---------"
            handleChange={handleChange}>
            Phone number
          </InputMolecule>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <RadioMolecule
            className="pb-2"
            defaultValue={details.sex}
            options={getDropDownStatusOptions(GenderStatus)}
            value={details.sex}
            handleChange={handleChange}
            name="sex">
            Gender
          </RadioMolecule>
          <InputMolecule
            name="relationship"
            value={details.relationship}
            handleChange={handleChange}>
            RelationShip
          </InputMolecule>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <LocationMolecule
            width="72 md:w-80"
            name="residence_location_id"
            handleChange={handleChange}>
            Residence location
          </LocationMolecule>
          <InputMolecule
            readOnly={
              data?.data.data.place_of_residence
                ? details.place_of_residence !== ''
                : false
            }
            name="place_of_residence"
            value={details.place_of_residence}
            handleChange={handleChange}>
            Other Location
            <span className="text-txt-secondary"> (State / Region)</span>
          </InputMolecule>
        </div>
        <div className="flex justify-between w-80">
          {prevStep && (
            <Button
              styleType="text"
              hoverStyle="no-underline"
              color="txt-secondary"
              onClick={() => moveBack()}>
              Back
            </Button>
          )}
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}

export default NextOfKinDetails;
