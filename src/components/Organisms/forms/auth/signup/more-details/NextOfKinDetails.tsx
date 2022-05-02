import { AxiosResponse } from 'axios';
import moment from 'moment';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { UseMutateFunction } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import countryList from 'react-select-country-list';

import useAuthenticator from '../../../../../../hooks/useAuthenticator';
import { queryClient } from '../../../../../../plugins/react-query';
import usernextkinStore from '../../../../../../store/administration/usernextkin.store';
import {
  CommonFormProps,
  CommonStepProps,
  Response,
  ValueType,
} from '../../../../../../types';
import {
  BasicPersonInfo,
  DocType,
  GenderStatus,
  MaritalStatus,
  UserType,
} from '../../../../../../types/services/user.types';
import {
  CreateNextOfKin,
  NextKinInfo,
} from '../../../../../../types/services/usernextkin.types';
import { getDropDownStatusOptions } from '../../../../../../utils/getOption';
import { nextOfKinSchema } from '../../../../../../validations/complete-profile/more-info.validation';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import DateMolecule from '../../../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import LocationMolecule from '../../../../../Molecules/input/LocationMolecule';
import RadioMolecule from '../../../../../Molecules/input/RadioMolecule';

interface NextOfKin<E> extends CommonStepProps, CommonFormProps<E> {
  mutate: UseMutateFunction<
    AxiosResponse<Response<NextKinInfo>, any>,
    unknown,
    CreateNextOfKin,
    unknown
  >;
}

interface NextOfKinErrors
  extends Pick<
    BasicPersonInfo,
    | 'first_name'
    | 'last_name'
    | 'email'
    | 'phone_number'
    | 'relationship'
    | 'document_expire_on'
    | 'nid'
    | 'spouse_name'
  > {
  residence_location_id: string;
}

interface ParamType {
  kinid: string;
}

function NextOfKinDetails<E>({
  display_label,
  isVertical,
  prevStep,
  nextStep,
  onSubmit,
  mutate,
}: NextOfKin<E>) {
  const { user } = useAuthenticator();
  const { kinid } = useParams<ParamType>();

  const history = useHistory();

  const initialErrorState: NextOfKinErrors = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    relationship: '',
    residence_location_id: '',
    document_expire_on: '',
    nid: '',
    spouse_name: '',
  };

  const [details, setDetails] = useState<BasicPersonInfo>({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    sex: GenderStatus.MALE,
    birth_date: '',
    relationship: '',
    nationality: '',
    residence_location_id: null,
    doc_type: DocType.NID,
    document_expire_on: '',
    nid: '',
    place_of_residence: '',
    user_id: user?.id + '',
    marital_status: MaritalStatus.SINGLE,
    spouse_name: '',
  });

  const [errors, setErrors] = useState(initialErrorState);

  const { data: nextOfKin } = usernextkinStore.getHisNextKinById(user?.id + '');

  const nextKinToUpdate = nextOfKin?.data.data.find((kin) => kin.id == kinid);

  const [nationality, setnationality] = useState({
    residence: '',
  });

  const nationhandleChange = (e: ValueType) => {
    setnationality({ ...nationality, [e.name]: e.value });
  };

  useEffect(() => {
    setDetails((prevState) => {
      return {
        ...prevState,
        id: kinid || '',
        user_id: user?.id + '',
        first_name: nextKinToUpdate?.nextOfKin.first_name || prevState.first_name,
        last_name: nextKinToUpdate?.nextOfKin.last_name || prevState.last_name,
        email: nextKinToUpdate?.nextOfKin.email || prevState.email,
        phone_number: nextKinToUpdate?.nextOfKin.phone_number || prevState.phone_number,
        sex:
          nextKinToUpdate?.nextOfKin.sex == null
            ? GenderStatus.MALE
            : nextKinToUpdate?.nextOfKin.sex || prevState.sex == null
            ? GenderStatus.MALE
            : prevState.sex,
        birth_date: nextKinToUpdate?.nextOfKin.birth_date || prevState.birth_date,
        relationship: nextKinToUpdate?.nextOfKin.relationship || prevState.relationship,
        residence_location_id: prevState.residence_location_id,
        nationality: nationality.residence || prevState.nationality,
        doc_type:
          nextKinToUpdate?.nextOfKin.doc_type == null
            ? DocType.NID
            : nextKinToUpdate?.nextOfKin.doc_type || prevState.doc_type == null
            ? DocType.NID
            : prevState.doc_type,
        document_expire_on:
          nextKinToUpdate?.nextOfKin.document_expire_on || prevState.document_expire_on,
        nid: nextKinToUpdate?.nextOfKin.nid || prevState.nid,
        place_of_residence:
          nextKinToUpdate?.nextOfKin.place_of_residence || prevState.place_of_residence,
        marital_status:
          nextKinToUpdate?.nextOfKin.marital_status || prevState.marital_status,
        spouse_name: nextKinToUpdate?.nextOfKin.spouse_name || prevState.spouse_name,
      };
    });
  }, [
    kinid,
    nationality.residence,
    nextKinToUpdate?.nextOfKin.birth_date,
    nextKinToUpdate?.nextOfKin.doc_type,
    nextKinToUpdate?.nextOfKin.document_expire_on,
    nextKinToUpdate?.nextOfKin.email,
    nextKinToUpdate?.nextOfKin.first_name,
    nextKinToUpdate?.nextOfKin.last_name,
    nextKinToUpdate?.nextOfKin.marital_status,
    nextKinToUpdate?.nextOfKin.nid,
    nextKinToUpdate?.nextOfKin.phone_number,
    nextKinToUpdate?.nextOfKin.place_of_residence,
    nextKinToUpdate?.nextOfKin.relationship,
    nextKinToUpdate?.nextOfKin.sex,
    nextKinToUpdate?.nextOfKin.spouse_name,
    user?.id,
  ]);

  const handleChange = (e: ValueType) => {
    setDetails({ ...details, [e.name]: e.value });
  };

  const moveBack = () => {
    prevStep && prevStep();
  };
  const moveForward = (e: FormEvent) => {
    e.preventDefault();
    const cloneDetails = { ...details };
    Object.assign(cloneDetails, {
      has_spouse:
        details.marital_status === MaritalStatus.MARRIED ||
        details.marital_status === MaritalStatus.WIDOWED,
      has_passport: details.doc_type === DocType.PASSPORT,
      has_rwanda_nationality: nationality.residence === 'Rwanda',
    });

    const validatedForm = nextOfKinSchema.validate(cloneDetails, {
      abortEarly: false,
    });

    validatedForm
      .then(() => {
        const data: CreateNextOfKin = {
          user_id: user?.id + '',
          next_of_kins: [details],
        };

        // if (
        //   details.doc_type === DocType.NID &&
        //   validation.nidRwandaValidation(details.nid) !== ''
        // ) {
        //   setErrors({
        //     ...errors,
        //     nid: validation.nidRwandaValidation(details.nid),
        //   });
        // } else {
        mutate(data, {
          onSuccess(data) {
            toast.success(data.data.message);
            queryClient.invalidateQueries(['next/user_id', user?.id]);
            history.push(
              user?.user_type === UserType.INSTRUCTOR
                ? '/dashboard/inst-module'
                : user?.user_type === UserType.STUDENT
                ? '/dashboard/student'
                : '/dashboard/users',
            );
            nextStep(true);
          },
          onError(_error) {
            toast.error('Failed');
          },
        });
        if (onSubmit) onSubmit(e, details);
        // }
      })
      .catch((err: any) => {
        const validatedErr: NextOfKinErrors = initialErrorState;
        err.inner.map((el: { path: string | number; message: string }) => {
          validatedErr[el.path as keyof NextOfKinErrors] = el.message;
        });

        setErrors(validatedErr);
      });
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
              (doc) => doc.value === details.doc_type,
            )}
            options={getDropDownStatusOptions(DocType)}>
            Reference Number
          </DropdownMolecule>

          <InputMolecule
            // ref={inputRef}
            required={false}
            error={errors.nid}
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
              error={errors.document_expire_on}
              handleChange={handleChange}
              name="document_expire_on"
              defaultValue={details.document_expire_on}
              endYear={moment().year() + 50}
              startYear={moment().year()}
              width="60 md:w-80">
              Passport expiry date
            </DateMolecule>
          )}

          <InputMolecule
            error={errors.first_name}
            required={false}
            name="first_name"
            placeholder="Next of Kin's First name"
            value={details.first_name}
            handleChange={handleChange}>
            First Name
          </InputMolecule>
          <InputMolecule
            error={errors.last_name}
            required={false}
            name="last_name"
            placeholder="Next of Kin's Last name"
            value={details.last_name}
            handleChange={handleChange}>
            Last Name
          </InputMolecule>
          {/* </div>
        <div className="grid grid-cols-1 md:grid-cols-2 "> */}
          <InputMolecule
            error={errors.email}
            readOnly={nextKinToUpdate?.nextOfKin.email ? details.email !== '' : false}
            required={false}
            name="email"
            value={details.email}
            type="email"
            placeholder="username@example.com"
            handleChange={handleChange}>
            Email
          </InputMolecule>
          <InputMolecule
            error={errors.phone_number}
            required={false}
            readOnly={
              nextKinToUpdate?.nextOfKin.phone_number
                ? details.phone_number !== ''
                : false
            }
            name="phone_number"
            value={details.phone_number}
            placeholder="07---------"
            handleChange={handleChange}>
            Phone number
          </InputMolecule>
          <DropdownMolecule
            defaultValue={getDropDownStatusOptions(MaritalStatus).find(
              (marital_status) => marital_status.value === details.marital_status,
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
              error={errors.spouse_name}
              required={false}
              name="spouse_name"
              value={details.spouse_name}
              handleChange={handleChange}>
              Spouse Name
            </InputMolecule>
          )}
          {/* </div>
        <div className="grid grid-cols-1 md:grid-cols-2"> */}
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
            error={errors.relationship}
            required={false}
            name="relationship"
            placeholder="Relationship between you and next of kin"
            value={details.relationship}
            handleChange={handleChange}>
            Relationship
          </InputMolecule>
          {/* </div>
        <div className="grid grid-cols-1 md:grid-cols-2"> */}
          <DropdownMolecule
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
              error={errors.residence_location_id}
              placeholder="Select place of residence"
              name="residence_location_id"
              handleChange={handleChange}
            />
          )}
          <InputMolecule
            readOnly={
              nextKinToUpdate?.nextOfKin.place_of_residence
                ? details.place_of_residence !== ''
                : false
            }
            required={false}
            name="place_of_residence"
            placeholder="Location of next of kin"
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
